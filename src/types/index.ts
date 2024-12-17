export interface Location {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

export interface TravelPurpose {
  type: 'business' | 'leisure' | 'study' | 'family' | 'adventure';
  description?: string;
}

export interface Activity {
  name: string;
  description: string;
  duration: number; // 小时
  location?: string;
}

export interface TravelDetails {
  destination: string;
  days: number;
  purpose: TravelPurpose;
  activities: Activity[];
  accommodation: 'hotel' | 'hostel' | 'apartment' | 'camping' | 'other';
  transportation: ('walk' | 'public' | 'car' | 'bike')[];
  specialNeeds?: string[];
}

export interface ChecklistItem {
  id: string;
  name: string;
  category: string;
  checked: boolean;
  quantity?: string;
  priority: 'essential' | 'recommended' | 'optional';
  description?: string;
  weather?: string[];
  activities?: string[];
  notes?: string;
}

export interface SavedTrip {
  id: string;
  name: string;
  createdAt: number;
  lastUpdated: number;
  travelDetails: TravelDetails;
  items: ChecklistItem[];
}

export interface ShareData {
  version: string;
  trip: SavedTrip;
}