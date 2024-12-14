'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, BarChart3 } from 'lucide-react';
import { runTweetUrlLottery, runKeywordLottery } from '@/lib/dify';
import { isValidTwitterUrl } from '@/lib/utils/url';
import { isValidTwitterId } from '@/lib/utils/validation';
import type { LotteryMode } from '@/lib/types';

export function LotteryForm() {
  const [mode, setMode] = useState<LotteryMode>('tweet_url');
  const [tweetUrl, setTweetUrl] = useState('');
  const [keyword, setKeyword] = useState('');
  const [twitterId, setTwitterId] = useState('');
  const [twitterIdError, setTwitterIdError] = useState<string | null>(null);
  const [winnerCount, setWinnerCount] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleTwitterIdChange = (value: string) => {
    setTwitterId(value);
    if (value && !isValidTwitterId(value)) {
      setTwitterIdError('Twitter ID can only contain letters, numbers, and underscores');
    } else {
      setTwitterIdError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'tweet_url' && !isValidTwitterUrl(tweetUrl)) {
      toast({
        title: 'Invalid URL',
        description: 'Please enter a valid Twitter/X.com URL',
        variant: 'destructive',
      });
      return;
    }

    if (mode === 'keyword' && twitterId && !isValidTwitterId(twitterId)) {
      toast({
        title: 'Invalid Twitter ID',
        description: 'Twitter ID can only contain letters, numbers, and underscores',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
      const winners = mode === 'tweet_url'
        ? await runTweetUrlLottery(tweetUrl, parseInt(winnerCount))
        : await runKeywordLottery(keyword, twitterId, parseInt(winnerCount));

      localStorage.setItem('winners', JSON.stringify(winners));
      if (mode === 'tweet_url') {
        localStorage.setItem('lottery_tweet_url', tweetUrl);
      }
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
      <div className="space-y-4">
        <Label className="text-base">Lottery Mode</Label>
        <div className="grid grid-cols-2 gap-4">
          <div
            className={`relative flex cursor-pointer items-center justify-center rounded-xl border-2 bg-white p-4 shadow-sm dark:bg-gray-800 ${
              mode === 'tweet_url'
                ? 'border-primary ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-900'
                : 'border-gray-200 hover:border-primary dark:border-gray-700'
            }`}
            onClick={() => setMode('tweet_url')}
          >
            <input
              type="radio"
              name="lottery-mode"
              value="tweet_url"
              className="sr-only"
              checked={mode === 'tweet_url'}
              onChange={(e) => setMode(e.target.value as LotteryMode)}
            />
            <div className="text-center">
              <svg
                viewBox="0 0 24 24"
                className="mx-auto h-8 w-8 text-primary"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <div className="mt-2 font-medium">Tweet URL</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Draw from a specific tweet
              </div>
            </div>
          </div>
          <div
            className={`relative flex cursor-pointer items-center justify-center rounded-xl border-2 bg-white p-4 shadow-sm dark:bg-gray-800 ${
              mode === 'keyword'
                ? 'border-primary ring-2 ring-primary ring-offset-2 dark:ring-offset-gray-900'
                : 'border-gray-200 hover:border-primary dark:border-gray-700'
            }`}
            onClick={() => setMode('keyword')}
          >
            <input
              type="radio"
              name="lottery-mode"
              value="keyword"
              className="sr-only"
              checked={mode === 'keyword'}
              onChange={(e) => setMode(e.target.value as LotteryMode)}
            />
            <div className="text-center">
              <svg
                className="mx-auto h-8 w-8 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                />
              </svg>
              <div className="mt-2 font-medium">Keyword</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Draw from keyword search
              </div>
            </div>
          </div>
        </div>
      </div>

      {mode === 'tweet_url' ? (
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
      ) : (
        <>
          <div className="space-y-2">
            <Label htmlFor="keyword">Keyword</Label>
            <Input
              id="keyword"
              placeholder="Enter search keyword"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="twitter-id">Exclude Twitter ID</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">@</span>
              <Input
                id="twitter-id"
                className={`pl-7 ${twitterIdError ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Your Twitter ID (without @)"
                value={twitterId}
                onChange={(e) => handleTwitterIdChange(e.target.value)}
                required
              />
            </div>
            {twitterIdError && (
              <p className="text-sm text-red-500 mt-1">{twitterIdError}</p>
            )}
          </div>
        </>
      )}
      
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
        <Button 
          type="submit" 
          className="w-full" 
          disabled={Boolean(isLoading || (mode === 'keyword' && twitterId && twitterIdError))}
        >
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
          variant="outline"
          className="w-full gap-2"
          onClick={() => window.open('https://twi.am', '_blank')}
        >
          <BarChart3 className="h-4 w-4" />
          More Analytics
        </Button>
      </div>
    </form>
  );
}