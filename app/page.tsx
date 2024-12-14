import { LotteryForm } from '@/components/lottery-form';
import { PageHeader } from '@/components/ui/page-header';
import { GiftIcon } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl" style={{ fontFamily: 'DotMatrix' }}>
            Twitter Lottery
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Draw winners from Twitter/X post replies.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6">
          <LotteryForm />
        </div>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          Note: Twitter Lottery may not be able to retrieve all user information due to crawler limitations.
        </p>

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
    </main>
  );
}