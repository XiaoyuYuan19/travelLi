export default {
  app: {
    title: 'Smart Packing List',
    subtitle: 'Let AI plan your perfect trip',
    saveTrip: 'Save Trip',
    savedTrips: 'Saved Trips',
    editTrip: 'Edit Trip',
  },

  form: {
    destination: {
      label: 'Destination',
      placeholder: 'Enter city name or select from popular cities...',
    },
    days: {
      label: 'Duration',
      unit: 'days',
    },
    purpose: {
      label: 'Purpose',
      placeholder: 'Describe your trip purpose...',
      types: {
        business: 'Business',
        leisure: 'Leisure',
        study: 'Study',
        family: 'Family Visit',
        adventure: 'Adventure',
      },
    },
    accommodation: {
      label: 'Accommodation',
      types: {
        hotel: 'Hotel',
        hostel: 'Hostel',
        apartment: 'Apartment',
        camping: 'Camping',
        other: 'Other',
      },
    },
    transportation: {
      label: 'Transportation',
      types: {
        walk: 'Walking',
        public: 'Public Transit',
        car: 'Car/Rental',
        bike: 'Bicycle',
      },
    },
    activities: {
      label: 'Planned Activities',
      add: 'Add Activity',
      name: 'Activity Name',
      description: 'Description',
      duration: 'Duration (hours)',
      delete: 'Delete',
    },
    submit: 'Generate List',
    generating: 'Generating...',
  },

  weather: {
    title: {
      week: '7-Day Forecast',
      full: '14-Day Forecast',
    },
    showMore: 'Show More',
    showLess: 'Show Less',
    stats: {
      avgTemp: 'Average Temp',
      tempRange: 'Temp Range',
      rainDays: 'Rain Days',
      rainChance: 'Rain Chance',
    },
    details: {
      days: 'Days',
      humidity: 'Humidity',
      uv: {
        label: 'UV Index',
        low: 'Low',
        moderate: 'Moderate',
        high: 'High',
        extreme: 'Extreme',
      },
      sunrise: 'Sunrise',
      sunset: 'Sunset',
    },
    analysis: {
      title: 'Weather Analysis',
      warm: 'warm',
      cool: 'cool',
      hot: 'Hot weather, please take precautions against heat.',
      cold: 'Cold weather, please dress warmly.',
      template: 'The weather in {{city}} for the next {{days}} days will be generally {{temp}}, with temperatures ranging from {{min}}°C to {{max}}°C. Rain is expected on {{rainDays}} days, bringing an umbrella is recommended. {{extra}}',
    },
    tip: '* Click on weather cards for more details',
  },

  modals: {
    save: {
      title: 'Save Trip',
      name: 'Trip Name',
      placeholder: 'e.g., Tokyo 5 Days',
      cancel: 'Cancel',
      confirm: 'Save',
    },
    share: {
      title: 'Share Trip',
      description: 'Copy the link below to share with friends:',
      copy: 'Copy',
      copied: 'Copied',
    },
    savedTrips: {
      title: 'Saved Trips',
      empty: 'No saved trips yet',
      load: 'Load Trip',
      share: 'Share',
      delete: 'Delete',
    },
  },

  loading: {
    generating: 'Generating your smart packing list...',
    complete: 'List generated successfully!',
  },

  categories: {
    documents: 'Documents',
    clothing: 'Clothing',
    electronics: 'Electronics',
    toiletries: 'Toiletries',
    accessories: 'Accessories',
    health: 'Health',
    equipment: 'Equipment',
    progress: '{{completed}}/{{total}}',
  },

  priorities: {
    essential: 'Essential',
    recommended: 'Recommended',
    optional: 'Optional',
  },

  common: {
    error: 'An error occurred, please try again',
    delete: 'Delete',
    toggleItem: 'Toggle item',
    itemCount: '{{count}} items',
    addCustomItem: 'Add custom item',
    customItemName: 'Item name',
    customItemCategory: 'Category',
    customItemPriority: 'Priority',
    customItemNotes: 'Notes',
    searchError: 'Search failed',
    searching: 'Searching...',
    popularCities: 'Popular Cities',
    selectLocation: 'Please select a location from the list',
  },
  statistics: {
    progress: 'Packing Progress',
    packedItems: 'Packed: {{packedItems}} / {{totalItems}} items',
    percent: '%',
    packed: 'Packed',
    pending: 'Pending',
  },
};