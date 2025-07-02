import type { SEX, ORIGIN, ABSENCE } from '../consts/animal.consts';
import type { Breed } from '../breeds/interface/breed';
import type { Characteristic } from '../characteristics/interface/characteristic';

// Generic animal interface
export interface AnimalRaw {
  id: string;
  longCode: string;
  shortCode: string;
  breed: string;
  sex: SEX;
  birthDate: string | null;
  weight: string | null;
  origin: ORIGIN;
  buyPrice: number | null;
  salePrice: number | null;
  absence: ABSENCE | null;
  characteristics: string[];
  mother: string | null;
  children: string[];
}

export interface AnimalPopulated
  extends Omit<AnimalRaw, 'breed' | 'characteristics' | 'mother' | 'children'> {
  breed: Breed;
  characteristics: Characteristic[];
  mother: AnimalRaw | null;
  children: AnimalRaw[];
}
