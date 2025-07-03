import type { SEX, ORIGIN, ABSENCE } from '../../consts/animal.consts';
import type { Breed } from '../../breeds/interface/breed';
import type { Characteristic } from '../../characteristics/interface/characteristic';

export interface CowRaw {
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

export interface CowPopulated
  extends Omit<CowRaw, 'breed' | 'characteristics' | 'mother' | 'children'> {
  breed: Breed;
  characteristics: Characteristic[];
  mother: CowRaw | null;
  children: CowRaw[];
}

export interface CowsStatisticsResponse {
  cows: CowWithStatistics[];
  averageOfAverages: number;
}

export interface CowWithStatistics extends Omit<CowRaw, 'children'> {
  children: StatisticsChild[];
  birthAverageDays: number | null;
  lastIntervalDays: number | null;
  reproductiveIntervalDays: number | null;
}

export interface StatisticsChild {
  birthDate: string;
  id: string;
}
