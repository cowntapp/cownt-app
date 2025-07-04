import { SEX } from '../../consts/animal.consts';
import type { AnimalPath } from '../../interfaces/animalType';
import { CowIcon } from './CowIcon';
import { CowMaleIcon } from './CowMaleIcon';
import { SheepIcon } from './SheepIcon';
import { SheepMaleIcon } from './SheepMaleIcon';

interface AnimalIconProps {
  type: AnimalPath;
  sex: SEX;
  className?: string;
}

export const AnimalIcon = ({ type, sex, className }: AnimalIconProps) => {
  let icon;
  if (type === 'cows') {
    if (sex === SEX.F) {
      icon = <CowIcon className={className} />;
    } else {
      icon = <CowMaleIcon className={className} />;
    }
  } else if (type === 'sheeps') {
    if (sex === SEX.F) {
      icon = <SheepIcon className={className} />;
    } else {
      icon = <SheepMaleIcon className={className} />;
    }
  }
  return icon;
};
