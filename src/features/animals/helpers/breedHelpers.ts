import type { Breed } from '../breeds/interface/breed';

/**
 * Pure helper function to resolve breed name from breed ID
 * @param breedId - The breed ID to resolve
 * @param breeds - List of available breeds
 * @returns The breed name if found, otherwise returns the breedId as fallback
 */
export const getBreedName = (
  breedId: string,
  breeds: Breed[] | undefined
): string => {
  if (!breeds) return breedId; // Fallback to ID if breeds not available
  const breed = breeds.find((b) => b.id === breedId);
  return breed?.value ?? breedId; // Fallback to ID if breed not found
};
