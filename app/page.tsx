import dynamic from 'next/dynamic';

const Clock = dynamic(() => import('@/app/components/clock/Clock'), {
  ssr: false
});

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Clock />
    </main>
  );
} 