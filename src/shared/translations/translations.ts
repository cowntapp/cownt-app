import type { EntityKey } from '@/config/interfaces/configInterfaces';
import { ABSENCE, ORIGIN, SEX } from '@/features/animals/consts/animal.consts';
import type { AnimalRaw } from '@/features/animals/interfaces/animal';

export const i18n_originLabels: Record<ORIGIN, string> = {
  [ORIGIN.BOUGHT]: 'Comprada',
  [ORIGIN.BORN]: 'Nascuda',
};

export const i18n_sexLabels: Record<SEX, string> = {
  [SEX.F]: 'Femella',
  [SEX.M]: 'Mascle',
};

export const i18n_absenceLabels: Record<ABSENCE, string> = {
  [ABSENCE.SOLD]: 'Venguda',
  [ABSENCE.DEAD]: 'Morta',
};

export const i18n_entities: Record<EntityKey, string> = {
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

export type AppAction = 'new' | 'edit' | 'delete';

export const i18n_actions: Record<AppAction, string> = {
  new: 'Nova',
  edit: 'Edita',
  delete: 'Elimina',
};

export const i18n_errors: Record<number | string, string> = {
  500: 'Alguna cosa ha fallat',
};

export type AnimalRawKeys = keyof AnimalRaw;

export const i18n_animalProps: Partial<Record<AnimalRawKeys, string>> = {
  sex: 'Sexe',
  shortCode: 'Codi curt',
  origin: 'Origen',
  children: 'Parts',
  breed: 'Raça',
  characteristics: 'Característiques',
  birthDate: 'Naixament',
  buyPrice: '€ Compra',
  salePrice: '€ Venta',
  absence: 'Present',
};
