'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { WinnerCard } from '@/components/winner-card';
import { ArrowLeft, Trophy, Download, BarChart3, Share2 } from 'lucide-react';
import type { Winner } from '@/lib/types';
import { getWinners, clearWinners } from '@/lib/storage';
import { shareToTwitter } from '@/lib/share';
import html2canvas from 'html2canvas';
import { ConfettiEffect } from '@/components/confetti-effect';
import { TweetEmbed } from '@/components/tweet-embed';

export default function ResultsPage() {
  const [winners, setWinners] = useState<Winner[]>([]);
  const [tweetUrl, setTweetUrl] = useState('');
  const router = useRouter();
  const receiptRef = useRef<HTMLDivElement>(null);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const storedWinners = getWinners();
    if (storedWinners.length === 0) {
      router.push('/');
      return;
    }
    setWinners(storedWinners);
    
    const url = localStorage.getItem('lottery_tweet_url');
    if (url) {
      setTweetUrl(url);
    }
    
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleBackClick = () => {
    clearWinners();
    localStorage.removeItem('lottery_tweet_url');
    router.push('/');
  };

  const handleDownload = async () => {
    if (!receiptRef.current) return;
    
    try {
      // 临时设置固定宽度
      const originalWidth = receiptRef.current.style.width;
      receiptRef.current.style.width = '600px';
      
      const canvas = await html2canvas(receiptRef.current, {
        backgroundColor: null,
        scale: 2,
        width: 600,
        windowWidth: 600,
      });
      
      // 恢复原始宽度
      receiptRef.current.style.width = originalWidth;
      
      const link = document.createElement('a');
      link.download = 'twitter-lottery-result.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      {showConfetti && <ConfettiEffect />}
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <Button variant="ghost" className="gap-2" onClick={handleBackClick}>
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div ref={receiptRef} className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8">
              <PageHeader
                icon={<Trophy className="h-12 w-12 text-yellow-500" />}
                title="Winners Announced!"
                description="Congratulations to our lucky winners"
              />

              <div className="grid gap-4 mt-6">
                {winners.map((winner: Winner, index: number) => (
                  <WinnerCard 
                    key={index} 
                    username={winner.userName} 
                    displayName={winner.userId}
                    index={index}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={handleDownload}
                className="w-full gap-2"
                size="lg"
              >
                <Download className="h-4 w-4" />
                Download Result
              </Button>

              <Button
                onClick={() => shareToTwitter(winners)}
                className="w-full gap-2"
                size="lg"
                variant="secondary"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>

              <Button
                variant="outline"
                className="w-full gap-2"
                size="lg"
                onClick={() => window.open('https://twi.am', '_blank')}
              >
                <BarChart3 className="h-4 w-4" />
                More Analytics
              </Button>
            </div>

            <div className="flex justify-center items-center space-x-4">
              <a 
                href="https://twitter.com/stv_lynn" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center hover:opacity-80 transition-opacity"
              >
                <img 
                  alt="Twitter Follow" 
                  loading="lazy" 
                  width="120" 
                  height="20" 
                  decoding="async" 
                  style={{ color: 'transparent' }} 
                  src="https://img.shields.io/twitter/follow/stv_lynn"
                />
              </a>
              <a 
                href="https://www.buymeacoffee.com/stvlynn" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center hover:opacity-80 transition-opacity"
              >
                <img 
                  alt="Buy Me A Coffee" 
                  loading="lazy" 
                  width="80" 
                  height="20" 
                  decoding="async" 
                  style={{ color: 'transparent' }} 
                  src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png"
                />
              </a>
              <a 
                href="https://dify.ai" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center hover:opacity-80 transition-opacity"
              >
                <div className="h-5">
                  <img 
                    alt="Dify" 
                    loading="lazy" 
                    width="60" 
                    height="20" 
                    decoding="async" 
                    className="h-full w-auto" 
                    style={{ color: 'transparent' }} 
                    src="https://assets.dify.ai/images/dify_logo_dark_s.png"
                  />
                </div>
              </a>
            </div>
          </div>

          <div className="hidden lg:block sticky top-4">
            {tweetUrl && <TweetEmbed tweetUrl={tweetUrl} key={tweetUrl} />}
          </div>
        </div>
      </div>
    </main>
  );
}
