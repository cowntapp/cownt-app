import type { Breed } from '../breeds/interface/breed';
import type { Characteristic } from '../characteristics/interface/characteristic';
import type { ABSENCE, ORIGIN, SEX } from '../consts/animal.consts';
import type { Owner } from '../owners/interface/owner';

export interface AnimalRaw {
  id: string;
  longCode: string;
  shortCode: string;
  breed: string;
  sex: SEX;
  birthDate: string | null;
  weight: string | null;
  origin: ORIGIN;
  owner: string;
  buyPrice: number | null;
  salePrice: number | null;
  absence: ABSENCE | null;
  absenceDetail: string | null;
  characteristics: string[];
  mother: string | null;
  children: string[];
}

export interface AnimalPopulated
  extends Omit<
    AnimalRaw,
    'breed' | 'characteristics' | 'owner' | 'mother' | 'children'
  > {
  breed: Breed;
  characteristics: Characteristic[];
  owner: Owner;
  mother: AnimalRaw | null;
  children: AnimalRaw[];
}

export interface AnimalsStatisticsResponse {
  cows: AnimalWithStatistics[];
  averageOfAverages: number;
}

export interface AnimalWithStatistics extends Omit<AnimalRaw, 'children'> {
  children: StatisticsChild[];
  birthAverageDays: number | null;
  lastIntervalDays: number | null;
  reproductiveIntervalDays: number | null;
}

export interface StatisticsChild {
  birthDate: string;
  id: string;
}
