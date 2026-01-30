export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  image?: string;
  availableQuantity: number;
  trainingRequired: boolean;
}

export const tools: Tool[] = [
  {
    id: 'tool-001',
    name: 'Precision Mat Cutter',
    description: 'Professional-grade rotary mat cutter for precise cutting',
    category: 'Cutting & Mounting',
    availableQuantity: 2,
    trainingRequired: false,
  },
  {
    id: 'tool-002',
    name: 'Screen Printing Press',
    description: 'Hydraulic screen printing press with exposure unit',
    category: 'Printing',
    availableQuantity: 1,
    trainingRequired: true,
  },
  {
    id: 'tool-003',
    name: 'Heat Press',
    description: 'Industrial heat press for sublimation and heat transfer',
    category: 'Heat Transfer',
    availableQuantity: 1,
    trainingRequired: false,
  },
  {
    id: 'tool-004',
    name: 'Airbrush Kit',
    description: 'Professional airbrush with compressor and accessories',
    category: 'Painting & Airbrushing',
    availableQuantity: 2,
    trainingRequired: true,
  },
  {
    id: 'tool-005',
    name: 'Paper Cutter',
    description: 'Large format programmable paper cutter',
    category: 'Cutting & Mounting',
    availableQuantity: 1,
    trainingRequired: false,
  },
  {
    id: 'tool-006',
    name: 'Pottery Wheel',
    description: 'Electric pottery wheel for ceramic work',
    category: 'Ceramics',
    availableQuantity: 1,
    trainingRequired: true,
  },
  {
    id: 'tool-007',
    name: 'Laser Engraver',
    description: 'CO2 laser engraver for wood, acrylic, and fabric',
    category: 'Other',
    availableQuantity: 1,
    trainingRequired: true,
  },
  {
    id: 'tool-008',
    name: 'Vinyl Cutter',
    description: 'Large format vinyl cutter for design work',
    category: 'Cutting & Mounting',
    availableQuantity: 1,
    trainingRequired: false,
  },
];

export interface Booking {
  id: string;
  toolIds: string[];
  date: string;
  startTime: string;
  endTime: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  purpose?: string;
  createdAt: Date;
}

// Store bookings in localStorage
export const bookings: Booking[] = [];

export const addBooking = (booking: Omit<Booking, 'id' | 'createdAt'>) => {
  const newBooking: Booking = {
    ...booking,
    id: `booking-${Date.now()}`,
    createdAt: new Date(),
  };
  bookings.push(newBooking);
  localStorage.setItem('krog-bookings', JSON.stringify(bookings));
  return newBooking;
};

export const loadBookings = () => {
  const stored = localStorage.getItem('krog-bookings');
  if (stored) {
    return JSON.parse(stored);
  }
  return [];
};
