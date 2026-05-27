import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.5'

const supabaseUrl = Deno.env.get('SUPABASE_URL')
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const supabase = createClient(supabaseUrl!, supabaseServiceKey!)

serve(async (req: Request) => {
  try {
    // Verify this is a cron request from Supabase
    const authHeader = req.headers.get('authorization')
    if (authHeader !== `Bearer ${Deno.env.get('SUPABASE_CRON_TOKEN')}`) {
      return new Response('Unauthorized', { status: 401 })
    }

    // Call the distribute_monthly_credits function
    const { data, error } = await supabase.rpc('distribute_monthly_credits')

    if (error) {
      console.error('Error distributing credits:', error)
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    console.log('Monthly credits distributed:', data)
    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err: unknown) {
    const error = err as Error
    console.error('Function error:', error.message)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
