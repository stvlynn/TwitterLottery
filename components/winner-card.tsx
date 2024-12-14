interface WinnerCardProps {
  username: string;
  displayName: string;
  index: number;
}

import { Card } from '@/components/ui/card';

export function WinnerCard({ username, displayName, index }: WinnerCardProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg bg-yellow-100 text-yellow-700">
            {index + 1}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
            {displayName}
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            @{username}
          </p>
        </div>
      </div>
    </Card>
  );
}