import { nanoid } from 'nanoid';
import { encodeData, decodeData } from './encoding';
import type { ChecklistItem, TravelDetails, SavedTrip, ShareData } from '../types';

const STORAGE_KEY = 'travel-checklist-data';
const SAVED_TRIPS_KEY = 'saved-trips';

// 保存当前行程到本地存储
export const saveToLocalStorage = (data: {
  travelDetails: TravelDetails | null;
  items: ChecklistItem[];
}) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      ...data,
      lastUpdated: Date.now()
    }));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// 从本地存储加载当前行程
export const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return null;
  }
};

// 保存行程到收藏夹
export const saveTrip = (name: string, details: TravelDetails, items: ChecklistItem[]): SavedTrip => {
  const savedTrips = getSavedTrips();
  
  const newTrip: SavedTrip = {
    id: nanoid(),
    name,
    createdAt: Date.now(),
    lastUpdated: Date.now(),
    travelDetails: details,
    items
  };

  savedTrips.push(newTrip);
  localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(savedTrips));
  
  return newTrip;
};

// 获取所有保存的行程
export const getSavedTrips = (): SavedTrip[] => {
  try {
    const data = localStorage.getItem(SAVED_TRIPS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// 删除保存的行程
export const deleteTrip = (id: string) => {
  const trips = getSavedTrips().filter(trip => trip.id !== id);
  localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(trips));
};

// 生成分享链接
export const generateShareLink = (trip: SavedTrip): string => {
  const shareData: ShareData = {
    version: '1.0',
    trip
  };
  
  const encoded = encodeData(shareData);
  return `${window.location.origin}?share=${encoded}`;
};

// 从分享链接导入数据
export const importFromShareLink = (shareParam: string): SavedTrip | null => {
  const data = decodeData<ShareData>(shareParam);
  
  if (data?.version === '1.0' && data.trip) {
    return data.trip;
  }
  return null;
};