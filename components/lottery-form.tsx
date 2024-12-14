'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, BarChart3 } from 'lucide-react';
import { runLotteryWorkflow } from '@/lib/dify';
import { isValidTwitterUrl } from '@/lib/utils/url';
import { storeWinners } from '@/lib/storage';

export function LotteryForm() {
  const [tweetUrl, setTweetUrl] = useState('');
  const [winnerCount, setWinnerCount] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidTwitterUrl(tweetUrl)) {
      toast({
        title: 'Invalid URL',
        description: 'Please enter a valid Twitter/X.com URL',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
      const winners = await runLotteryWorkflow(tweetUrl, parseInt(winnerCount));
      storeWinners(winners);
      localStorage.setItem('lottery_tweet_url', tweetUrl);
      router.push('/results');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to draw winners. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="tweet-url">Tweet URL</Label>
        <Input
          id="tweet-url"
          placeholder="https://twitter.com/user/status/123..."
          value={tweetUrl}
          onChange={(e) => setTweetUrl(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="winner-count">Number of Winners</Label>
        <Input
          id="winner-count"
          type="number"
          min="1"
          value={winnerCount}
          onChange={(e) => setWinnerCount(e.target.value)}
          required
        />
      </div>

      <div className="space-y-4">
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Drawing winners...
            </>
          ) : (
            'Draw Winners'
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => window.open('https://twi.am', '_blank')}
        >
          <BarChart3 className="mr-2 h-4 w-4" />
          More Analytics
        </Button>
      </div>
    </form>
  );
}