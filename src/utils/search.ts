import { InventoryItem, SearchResult } from '@/types/inventory';

/**
 * Simple string similarity scoring (Levenshtein-based approximation)
 * For production, integrate with proper CLIP embeddings from Python backend
 */
function calculateSimilarity(text1: string, text2: string): number {
  const s1 = text1.toLowerCase();
  const s2 = text2.toLowerCase();

  if (s1 === s2) return 1;
  if (s1.includes(s2) || s2.includes(s1)) return 0.8;

  const words1 = s1.split(/\s+/);
  const words2 = s2.split(/\s+/);

  let matches = 0;
  for (const w1 of words1) {
    if (words2.some((w2) => w2.startsWith(w1) || w1.startsWith(w2))) {
      matches++;
    }
  }

  return matches / Math.max(words1.length, words2.length);
}

/**
 * Semantic search using text similarity
 * In production, this will use CLIP embeddings from Python backend
 */
export function semanticSearch(
  query: string,
  items: InventoryItem[]
): SearchResult[] {
  if (!query.trim()) return [];

  const results = items
    .map((item) => {
      const nameScore = calculateSimilarity(query, item.name);
      const descScore = calculateSimilarity(query, item.description);
      const categoryScore = calculateSimilarity(query, item.category);
      const subcategoryScore = calculateSimilarity(query, item.subcategory);

      const score =
        nameScore * 0.4 +
        descScore * 0.3 +
        categoryScore * 0.15 +
        subcategoryScore * 0.15;

      return { item, score };
    })
    .filter((result) => result.score > 0.1)
    .sort((a, b) => b.score - a.score);

  return results;
}

/**
 * Search by exact category
 */
export function searchByCategory(
  category: string,
  items: InventoryItem[]
): InventoryItem[] {
  return items.filter((item) => item.category === category);
}

/**
 * Filter items by multiple criteria
 */
export function filterItems(
  items: InventoryItem[],
  filters: {
    category?: string;
    subcategory?: string;
    minPrice?: number;
    maxPrice?: number;
    condition?: string;
    inStock?: boolean;
  }
): InventoryItem[] {
  return items.filter((item) => {
    if (filters.category && item.category !== filters.category) return false;
    if (
      filters.subcategory &&
      item.subcategory !== filters.subcategory
    )
      return false;
    if (filters.minPrice && item.price < filters.minPrice) return false;
    if (filters.maxPrice && item.price > filters.maxPrice) return false;
    if (filters.condition && item.condition !== filters.condition)
      return false;
    if (filters.inStock && item.quantity <= 0) return false;
    return true;
  });
}
