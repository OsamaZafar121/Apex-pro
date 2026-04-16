export const SERVICES = {
  residential: {
    id: 'residential',
    name: 'Residential Cleaning',
    duration: 120,
    price: 150,
    icon: '🏠',
  },
  commercial: {
    id: 'commercial',
    name: 'Commercial Cleaning',
    duration: 180,
    price: 250,
    icon: '🏢',
  },
  deep: {
    id: 'deep',
    name: 'Deep Cleaning',
    duration: 240,
    price: 300,
    icon: '🧹',
  },
  moveinout: {
    id: 'moveinout',
    name: 'Move In/Out Cleaning',
    duration: 180,
    price: 220,
    icon: '📦',
  },
  carpet: {
    id: 'carpet',
    name: 'Carpet Cleaning',
    duration: 90,
    price: 120,
    icon: '🧼',
  },
  window: {
    id: 'window',
    name: 'Window Cleaning',
    duration: 60,
    price: 80,
    icon: '🪟',
  },
};

export function getServiceDefinition(serviceId) {
  return SERVICES[serviceId] || SERVICES.residential;
}
