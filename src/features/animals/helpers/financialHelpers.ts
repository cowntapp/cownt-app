import type { AnimalRaw } from '../interfaces/animal';

/**
 * Calculate the profit from an animal based on the business rule:
 * Profit = Sale Price + Children Sale Prices - Purchase Price
 *
 * Note: Animals born on the farm (buyPrice = null) can still generate profit
 * if they or their children are sold. Lack of buyPrice is treated as 0 cost.
 *
 * @param buyPrice - The purchase price of the animal (null = born on farm, treated as 0)
 * @param salePrice - The sale price of the animal (if sold)
 * @param children - Array of children animals to calculate their sale prices
 * @returns The calculated profit, or null if no financial activity exists
 */
export const calculateAnimalProfit = (
  buyPrice: number | null,
  salePrice: number | null,
  children: AnimalRaw[]
): number | null => {
  let totalRevenue = 0;
  const totalCost = buyPrice ?? 0; // Treat null buyPrice as 0 (born on farm)

  // Add animal's own sale price if sold
  if (salePrice !== null) {
    totalRevenue += salePrice;
  }

  // Add children's sale prices
  const childrenRevenue = children.reduce((total, child) => {
    if (child.salePrice !== null) {
      return total + child.salePrice;
    }
    return total;
  }, 0);

  totalRevenue += childrenRevenue;

  // If no financial activity at all (no purchases, no sales), return null
  if (totalRevenue === 0 && buyPrice === null) {
    return null;
  }

  // Profit = Total Revenue - Total Cost
  return totalRevenue - totalCost;
};

/**
 * Calculate potential profit including unsold animals at estimated market value
 * This is useful for animals that haven't been sold yet but have market value
 *
 * @param buyPrice - The purchase price of the animal (null = born on farm, treated as 0)
 * @param salePrice - The sale price of the animal (if sold)
 * @param children - Array of children animals
 * @param estimatedMarketValue - Estimated market value for unsold animals
 * @returns The calculated potential profit
 */
export const calculatePotentialProfit = (
  buyPrice: number | null,
  salePrice: number | null,
  children: AnimalRaw[],
  estimatedMarketValue: number = 0
): number | null => {
  let totalRevenue = 0;
  const totalCost = buyPrice ?? 0; // Treat null buyPrice as 0 (born on farm)

  // Add animal's own sale price or estimated value if not sold
  if (salePrice !== null) {
    totalRevenue += salePrice;
  } else if (estimatedMarketValue > 0) {
    totalRevenue += estimatedMarketValue;
  }

  // Add children's sale prices or estimated values
  const childrenRevenue = children.reduce((total, child) => {
    if (child.salePrice !== null) {
      return total + child.salePrice;
    } else if (estimatedMarketValue > 0) {
      return total + estimatedMarketValue;
    }
    return total;
  }, 0);

  totalRevenue += childrenRevenue;

  // If no financial activity and no estimated value, return null
  if (totalRevenue === 0 && buyPrice === null) {
    return null;
  }

  // Potential Profit = Total Revenue - Total Cost
  return totalRevenue - totalCost;
};

/**
 * Calculate simple buy/sell price difference (excluding children)
 * This represents the direct profit/loss from the animal itself
 *
 * @param buyPrice - The purchase price of the animal (null = born on farm, treated as 0)
 * @param salePrice - The sale price of the animal (null = not sold yet, treated as 0)
 * @returns The price difference (can be negative if costs exceed sales)
 */
export const calculateDirectProfit = (
  buyPrice: number | null,
  salePrice: number | null
): number => {
  const cost = buyPrice ?? 0; // Treat null buyPrice as 0 (born on farm)
  const revenue = salePrice ?? 0; // Treat null salePrice as 0 (not sold yet)

  // Direct profit = Sale Price - Purchase Price (can be negative)
  return revenue - cost;
};
