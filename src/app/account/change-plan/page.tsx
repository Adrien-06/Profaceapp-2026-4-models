import { Suspense } from 'react';
import ChangePlanClient from './change-plan-client';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Change or Cancel Plan — ProFaceApp',
  description: 'Manage your subscription',
};

export default function ChangePlanPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>}>
      <ChangePlanClient />
    </Suspense>
  );
}
