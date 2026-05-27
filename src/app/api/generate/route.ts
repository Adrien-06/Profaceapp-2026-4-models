import { NextResponse } from 'next/server';
import { fal } from '@fal-ai/client';
import { createClient, createServiceClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';
export const maxDuration = 300;

const FAL_KEY = (process.env.FAL_KEY ?? '').trim().replace(/^["']|["']$/g, '');

const CREDITS_PER_GENERATION = 10;

type ModelId = 'realtor' | 'executive' | 'analyst' | 'innovator';

const MODEL_PROMPTS: Record<ModelId, string> = {
  realtor:
    'A warm and approachable professional real estate headshot from this selfie. The subject is looking directly into the camera with a genuine, confident smile — welcoming and trustworthy. Maintaining the natural mouth shape and facial expression from the reference image. Wearing a smart blazer in navy or warm grey over a clean shirt or blouse. Shot against a soft warm neutral background (light beige or warm white). Natural, soft directional lighting — bright and flattering. Medium format camera, 85mm lens, shallow depth of field. Visible from chest up. No added teeth, no exaggerated smile. Photorealistic, hyper-detailed skin texture, individual hair strands, no too much light reflect on skin or glasses or hair or clothes. High-resolution 8k commercial portrait photography.',

  executive:
    'A professional corporate three-quarter right studio portrait from this selfie, arms crossed, torso position slightly turned on his/her right side, looking directly into the camera with Maintaining the natural mouth shape with slight smile and exact facial expression from the reference image. No added teeth, no exaggerated smile. Wearing a premium tailored matt black business suit with a crisp white shirt. Shot on a high-end medium format camera, 85mm lens, f/2.8 aperture, The lighting is soft and directional (clamshell or light Rembrandt style) against a plain medium united #3D3A3A dark charcoal background. The focus is sharp on her face, with a shallow depth of field. we can see the body to below arms. High-quality corporate portrait photography style Photorealistic, hyper-detailed skin texture, pores, individual hair strands, no too much light reflect on skin or glasses or hair or clothes. high-resolution 8k, commercial advertising photography style.',

  analyst:
    'A clean, precise and authoritative financial professional headshot from this selfie. The subject looks directly at the camera with a composed, confident expression — calm and trustworthy. Maintaining the natural mouth shape and exact facial expression from the reference image. No added teeth, no exaggerated smile. Wearing a well-fitted dark navy suit with a subtle tie or silk blouse. Shot against a neutral medium grey or off-white gradient background. Balanced, even studio lighting — no harsh shadows. 85mm lens, medium format camera, crisp focus on the face. Visible from chest up. Photorealistic, hyper-detailed skin texture, pores, individual hair strands, no too much light reflect on skin or glasses or hair or clothes. High-resolution 8k. Corporate finance and consulting photography style.',

  innovator:
    'A modern, dynamic and forward-looking startup founder headshot from this selfie. The subject looks directly at the camera with energy and vision — confident, creative, approachable. Maintaining the natural mouth shape and exact facial expression from the reference image. No exaggerated smile. Smart casual attire: fitted premium t-shirt or open-collar shirt, no tie. Shot against a gradient background blending deep navy to electric indigo or modern teal. Dramatic yet flattering side lighting with a soft fill. 85mm lens, medium format camera. Visible from chest up. Photorealistic, hyper-detailed skin texture, individual hair strands, no too much light reflect on skin or glasses or hair or clothes. High-resolution 8k. Tech startup editorial photography style.',
};

type FalEditOutput = {
  images?: { url: string }[];
  seed?: number;
};

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { selfiePath, model } = await req.json() as { selfiePath?: string; model?: string };
  if (!selfiePath) return NextResponse.json({ error: 'No selfie provided' }, { status: 400 });

  if (!selfiePath.startsWith(`${user.id}/`)) {
    return NextResponse.json({ error: 'Invalid selfie path' }, { status: 403 });
  }

  const validModels: ModelId[] = ['realtor', 'executive', 'analyst', 'innovator'];
  const modelId: ModelId = validModels.includes(model as ModelId) ? (model as ModelId) : 'executive';

  if (!FAL_KEY) {
    console.error('[generate] FAL_KEY is not set in the environment');
    return NextResponse.json(
      { error: 'Image generation is temporarily unavailable. Please try again later.' },
      { status: 503 },
    );
  }
  fal.config({ credentials: FAL_KEY });

  const admin = createServiceClient();

  const { data: profile } = await admin
    .from('profiles')
    .select('credits')
    .eq('id', user.id)
    .single();

  if (!profile || profile.credits < CREDITS_PER_GENERATION) {
    return NextResponse.json(
      { error: 'Insufficient credits. You need at least 10 credits to generate a photo.' },
      { status: 402 },
    );
  }

  const { data: signed, error: signErr } = await admin
    .storage
    .from('selfies')
    .createSignedUrl(selfiePath, 60 * 10);

  if (signErr || !signed?.signedUrl) {
    return NextResponse.json({ error: 'Could not access uploaded selfie' }, { status: 500 });
  }

  const { data: pack, error: packError } = await admin
    .from('packs')
    .insert({ user_id: user.id, status: 'processing' })
    .select()
    .single();

  if (packError || !pack) {
    return NextResponse.json({ error: 'Failed to create pack' }, { status: 500 });
  }

  const { error: spendErr } = await admin
    .from('profiles')
    .update({ credits: profile.credits - CREDITS_PER_GENERATION, updated_at: new Date().toISOString() })
    .eq('id', user.id)
    .gte('credits', CREDITS_PER_GENERATION);

  if (spendErr) {
    await admin.from('packs').delete().eq('id', pack.id);
    return NextResponse.json({ error: 'Insufficient credits' }, { status: 402 });
  }

  await admin
    .from('credits_log')
    .insert({ user_id: user.id, delta: -CREDITS_PER_GENERATION, reason: 'generation' });

  const failAndRefund = async (message: string) => {
    await admin
      .from('profiles')
      .update({ credits: profile.credits, updated_at: new Date().toISOString() })
      .eq('id', user.id);
    await admin
      .from('credits_log')
      .insert({ user_id: user.id, delta: CREDITS_PER_GENERATION, reason: 'refund_failed_generation' });
    await admin
      .from('packs')
      .update({ status: 'failed', updated_at: new Date().toISOString() })
      .eq('id', pack.id);
    console.error('[generate]', message);
  };

  try {
    const result = await fal.subscribe('fal-ai/flux-2-pro/edit', {
      input: {
        prompt: MODEL_PROMPTS[modelId],
        image_size: 'portrait_4_3',
        safety_tolerance: '1',
        enable_safety_checker: true,
        output_format: 'png',
        image_urls: [signed.signedUrl],
      },
      logs: false,
    });

    const data = result.data as FalEditOutput;
    const outputUrl = data?.images?.[0]?.url;
    if (!outputUrl) {
      await failAndRefund('fal.ai returned no image');
      return NextResponse.json({ error: 'Generation failed', packId: pack.id }, { status: 502 });
    }

    const imgRes = await fetch(outputUrl);
    if (!imgRes.ok) {
      await failAndRefund(`Failed to download fal.ai output (${imgRes.status})`);
      return NextResponse.json({ error: 'Generation failed', packId: pack.id }, { status: 502 });
    }
    const bytes = new Uint8Array(await imgRes.arrayBuffer());
    const storagePath = `${user.id}/${pack.id}.png`;

    const { error: uploadErr } = await admin
      .storage
      .from('headshots')
      .upload(storagePath, bytes, { contentType: 'image/png', upsert: true });

    if (uploadErr) {
      await failAndRefund(`Storage upload failed: ${uploadErr.message}`);
      return NextResponse.json({ error: 'Could not save photo', packId: pack.id }, { status: 500 });
    }

    const { data: pub } = admin.storage.from('headshots').getPublicUrl(storagePath);
    const photoUrl = pub.publicUrl;

    await admin
      .from('packs')
      .update({ status: 'completed', photos: [photoUrl], updated_at: new Date().toISOString() })
      .eq('id', pack.id);

    return NextResponse.json({ packId: pack.id, photos: [photoUrl], model: modelId });
  } catch (err: unknown) {
    const e = err as { status?: number; message?: string; body?: unknown };
    const status = e?.status;
    const detail = e?.body ? JSON.stringify(e.body) : (e?.message ?? 'Unknown error');
    await failAndRefund(`fal.ai error (status ${status ?? '?'}): ${detail}`);

    const userMessage = status === 401 || status === 403
      ? 'Image generation service rejected the request (authentication). Please contact support.'
      : 'Generation failed. Please try again.';
    return NextResponse.json({ error: userMessage, packId: pack.id }, { status: 502 });
  }
}
