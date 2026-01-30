export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  category: InventoryCategory;
  subcategory: string;
  quantity: number;
  price: number;
  image?: string;
  condition: 'excellent' | 'good' | 'fair';
  donatedDate: Date;
  clipEmbedding?: number[];
}

export enum InventoryCategory {
  PAINTS = 'Paints & Mediums',
  DRAWING = 'Drawing & Marking',
  SURFACES = 'Surfaces & Substrates',
  BRUSHES = 'Brushes & Application Tools',
  SPECIALTY = 'Specialty Process Supplies',
}

export interface InventoryCategoryData {
  id: string;
  name: string;
  description: string;
  items: InventoryItem[];
}

export interface SearchResult {
  item: InventoryItem;
  score: number;
}

export interface CartItem {
  item: InventoryItem;
  quantity: number;
}
