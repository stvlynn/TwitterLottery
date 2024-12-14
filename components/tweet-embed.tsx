'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    twttr: any;
  }
}

interface TweetEmbedProps {
  tweetUrl: string;
}

function getTweetId(url: string): string | null {
  const match = url.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/);
  return match ? match[1] : null;
}

export function TweetEmbed({ tweetUrl }: TweetEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tweetId = getTweetId(tweetUrl);

  useEffect(() => {
    if (!tweetId || !containerRef.current) return;

    // 清除容器内容
    containerRef.current.innerHTML = '';

    const loadTweet = () => {
      window.twttr?.widgets.createTweet(
        tweetId,
        containerRef.current,
        {
          theme: document.documentElement.classList.contains('dark') ? 'dark' : 'light',
          width: '100%',
        }
      );
    };

    if (window.twttr) {
      loadTweet();
    } else {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.onload = loadTweet;
      document.head.appendChild(script);
    }
  }, [tweetId]);

  if (!tweetId) {
    return null;
  }

  return <div ref={containerRef} className="w-full" />;
}
