import React from 'react';
import { Calendar, Share2, Trash2 } from 'lucide-react';
import type { SavedTrip } from '../types';

interface SavedTripsProps {
  trips: SavedTrip[];
  onLoad: (trip: SavedTrip) => void;
  onDelete: (id: string) => void;
  onShare: (trip: SavedTrip) => void;
}

export function SavedTrips({ trips, onLoad, onDelete, onShare }: SavedTripsProps) {
  if (trips.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        还没有保存的行程
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {trips.map((trip) => (
        <div
          key={trip.id}
          className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">
                {trip.name}
              </h3>
              <div className="mt-1 text-sm text-gray-500 space-y-1">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(trip.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  {trip.travelDetails.destination} · {trip.travelDetails.days}天
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => onShare(trip)}
                className="p-1 text-gray-400 hover:text-blue-600"
                title="分享"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(trip.id)}
                className="p-1 text-gray-400 hover:text-red-600"
                title="删除"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <button
            onClick={() => onLoad(trip)}
            className="mt-3 w-full px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
          >
            加载此行程
          </button>
        </div>
      ))}
    </div>
  );
}