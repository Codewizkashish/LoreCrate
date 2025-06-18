// /app/update-prompt/page.jsx
import { Suspense } from 'react';
import EditPrompt from './EditPrompt'; 

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditPrompt />
    </Suspense>
  );
}
