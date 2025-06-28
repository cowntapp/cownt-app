import type { EntityKey } from '@/config/interfaces/configInterfaces';
import { ABSENCE, ORIGIN, SEX } from '@/features/animals/consts/animal.consts';

export const originLabels: Record<ORIGIN, string> = {
  [ORIGIN.BOUGHT]: 'Comprada',
  [ORIGIN.BORN]: 'Nascuda',
};

export const sexLabels: Record<SEX, string> = {
  [SEX.F]: 'Femella',
  [SEX.M]: 'Mascle',
};

export const absenceLabels: Record<ABSENCE, string> = {
  [ABSENCE.SOLD]: 'Venguda',
  [ABSENCE.DEAD]: 'Morta',
};

export const entities: Record<EntityKey, string> = {
  statistics: 'Estadístiques',
  cows: 'Vaques',
  cow: 'Vaca',
  sheeps: 'Ovelles',
  sheep: 'Ovella',
  breeds: 'Races',
  breed: 'Raça',
  characteristics: 'Característiques',
  characteristic: 'Característica',
};
