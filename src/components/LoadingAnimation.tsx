import React from 'react';
import { Luggage, CheckCircle2 } from 'lucide-react';

interface LoadingAnimationProps {
  progress: number;
  message: string;
}

export function LoadingAnimation({ progress, message }: LoadingAnimationProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center">
          {progress < 100 ? (
            <Luggage className="w-16 h-16 text-blue-600 animate-bounce" />
          ) : (
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          )}
          
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            {message}
          </h3>
          
          <div className="w-full mt-4">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 text-center text-sm text-gray-600">
              {progress}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}