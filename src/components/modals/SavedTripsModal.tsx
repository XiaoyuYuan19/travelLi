import React from 'react';
import { Modal } from './Modal';
import { SavedTrips } from '../SavedTrips';
import type { SavedTrip } from '../../types';

interface SavedTripsModalProps {
  trips: SavedTrip[];
  onClose: () => void;
  onLoad: (trip: SavedTrip) => void;
  onDelete: (id: string) => void;
  onShare: (trip: SavedTrip) => void;
}

export function SavedTripsModal({
  trips,
  onClose,
  onLoad,
  onDelete,
  onShare
}: SavedTripsModalProps) {
  return (
    <Modal title="已保存的行程" onClose={onClose} maxWidth="2xl">
      <SavedTrips
        trips={trips}
        onLoad={onLoad}
        onDelete={onDelete}
        onShare={onShare}
      />
    </Modal>
  );
}