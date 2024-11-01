import dynamic from 'next/dynamic';
import DailyQuote from '@/components/DailyQuote';

const Clock = dynamic(() => import('@/app/components/clock/Clock'), {
  ssr: false
});

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <DailyQuote />
      <Clock />
    </main>
  );
} 