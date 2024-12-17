import React from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from './components/Header';
import { TravelForm } from './components/TravelForm';
import { TripSummary } from './components/TripSummary';
import { Statistics } from './components/Statistics';
import { CategoryList } from './components/CategoryList';
import { LoadingAnimation } from './components/LoadingAnimation';
import { SaveTripModal } from './components/modals/SaveTripModal';
import { ShareModal } from './components/modals/ShareModal';
import { SavedTripsModal } from './components/modals/SavedTripsModal';
import { generateAIChecklist } from './services/openai';
import { saveToLocalStorage, loadFromLocalStorage, saveTrip, getSavedTrips, deleteTrip, generateShareLink } from './utils/storage';
import type { ChecklistItem, TravelDetails, SavedTrip } from './types';

function App() {
  const { t } = useTranslation();
  const [items, setItems] = React.useState<ChecklistItem[]>([]);
  const [travelDetails, setTravelDetails] = React.useState<TravelDetails | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [loadingProgress, setLoadingProgress] = React.useState(0);
  const [showSaveModal, setShowSaveModal] = React.useState(false);
  const [showShareModal, setShowShareModal] = React.useState(false);
  const [showSavedTripsModal, setShowSavedTripsModal] = React.useState(false);
  const [shareLink, setShareLink] = React.useState('');
  const [savedTrips, setSavedTrips] = React.useState<SavedTrip[]>([]);

  // Load saved trips
  React.useEffect(() => {
    const trips = getSavedTrips();
    setSavedTrips(trips);

    const savedData = loadFromLocalStorage();
    if (savedData?.travelDetails && savedData?.items) {
      setTravelDetails(savedData.travelDetails);
      setItems(savedData.items);
    }
  }, []);

  // Auto-save to local storage
  React.useEffect(() => {
    if (travelDetails && items.length > 0) {
      saveToLocalStorage({ travelDetails, items });
    }
  }, [travelDetails, items]);

  const handleTravelDetailsSubmit = async (details: TravelDetails) => {
    setIsLoading(true);
    setError(null);
    
    setLoadingProgress(0);
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    try {
      const aiGeneratedItems = await generateAIChecklist(details);
      setTravelDetails(details);
      setItems(aiGeneratedItems);
      setLoadingProgress(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.error'));
    } finally {
      clearInterval(progressInterval);
      setTimeout(() => {
        setIsLoading(false);
        setLoadingProgress(0);
      }, 1000);
    }
  };

  const handleToggleItem = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSaveTrip = (name: string) => {
    if (travelDetails && items.length > 0) {
      const newTrip = saveTrip(name, travelDetails, items);
      setSavedTrips(prev => [...prev, newTrip]);
    }
  };

  const handleShareTrip = (trip: SavedTrip) => {
    const link = generateShareLink(trip);
    setShareLink(link);
    setShowShareModal(true);
  };

  const handleDeleteTrip = (id: string) => {
    deleteTrip(id);
    setSavedTrips(prev => prev.filter(trip => trip.id !== id));
  };

  const handleLoadTrip = (trip: SavedTrip) => {
    setTravelDetails(trip.travelDetails);
    setItems(trip.items);
    setShowSavedTripsModal(false);
  };

  const categories = Array.from(new Set(items.map(item => item.category)));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Header />

        {!travelDetails ? (
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-6">
              <TravelForm onSubmit={handleTravelDetailsSubmit} isLoading={isLoading} />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => setShowSaveModal(true)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  {t('app.saveTrip')}
                </button>
                <button
                  onClick={() => setShowSavedTripsModal(true)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  {t('app.savedTrips')}
                </button>
              </div>
              <button
                onClick={() => setTravelDetails(null)}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                {t('app.editTrip')}
              </button>
            </div>

            <TripSummary
              details={travelDetails}
              onEdit={() => setTravelDetails(null)}
            />

            <Statistics items={items} />

            <div className="bg-white rounded-lg shadow-sm p-6">
              {categories.map(category => (
                <CategoryList
                  key={category}
                  category={category}
                  items={items}
                  onToggle={handleToggleItem}
                  onDelete={handleDeleteItem}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {isLoading && (
        <LoadingAnimation
          progress={Math.round(loadingProgress)}
          message={loadingProgress >= 100 ? t('loading.complete') : t('loading.generating')}
        />
      )}

      {showSaveModal && (
        <SaveTripModal
          onClose={() => setShowSaveModal(false)}
          onSave={handleSaveTrip}
          defaultName={`${travelDetails?.destination} ${travelDetails?.days}${t('form.days.label')}`}
        />
      )}

      {showShareModal && (
        <ShareModal
          shareLink={shareLink}
          onClose={() => setShowShareModal(false)}
        />
      )}

      {showSavedTripsModal && (
        <SavedTripsModal
          trips={savedTrips}
          onClose={() => setShowSavedTripsModal(false)}
          onLoad={handleLoadTrip}
          onDelete={handleDeleteTrip}
          onShare={handleShareTrip}
        />
      )}
    </div>
  );
}

export default App;