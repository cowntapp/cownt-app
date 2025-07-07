import { TypoH2 } from '@/shadcn/components/typography/TypoH2';
import { TypoLead } from '@/shadcn/components/typography/TypoLead';
import { TypoMuted } from '@/shadcn/components/typography/TypoMuted';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shadcn/components/ui/card';
import { Calendar, Info } from 'lucide-react';
import type { Breed } from '../../breeds/interface/breed';
import type { SEX, ORIGIN } from '../../consts/animal.consts';
import { formatDate } from '@/shared/utils/formatDate';
import {
  i18n_originLabels,
  i18n_sexLabels,
} from '@/shared/translations/translations';
import { WeightSection } from './components';

interface BasicInfoCardProps {
  longCode: string;
  breed: Breed;
  birthDate: string | null;
  sex: SEX;
  origin: ORIGIN;
  weight: string | null;
  onEditWeight?: (weight: string | null) => void;
  isEditingWeight?: boolean;
}

export const BasicInfoCard = ({
  longCode,
  breed,
  birthDate,
  sex,
  origin,
  weight,
  onEditWeight,
  isEditingWeight,
}: BasicInfoCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-baseline gap-x-3">
          <Info />
          <TypoH2>Informació bàsica</TypoH2>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
        <div className="flex flex-col gap-y-4">
          <div>
            <TypoMuted>Codi llarg</TypoMuted>
            <TypoLead className="font-mono uppercase font-semibold">
              {longCode}
            </TypoLead>
          </div>
          <div>
            <TypoMuted>Raça</TypoMuted>
            <TypoLead className="font-semibold">{breed.value}</TypoLead>
          </div>
          <div>
            <TypoMuted>Data de naixament</TypoMuted>
            <TypoLead className="font-semibold flex items-center gap-x-2">
              <Calendar size={18} /> {formatDate(birthDate) ?? '-'}
            </TypoLead>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <TypoMuted>Sexe</TypoMuted>
            <TypoLead className="font-semibold">{i18n_sexLabels[sex]}</TypoLead>
          </div>
          <div>
            <TypoMuted>Origen</TypoMuted>
            <TypoLead className="font-semibold">
              {i18n_originLabels[origin]}
            </TypoLead>
          </div>
          <WeightSection
            weight={weight}
            onEditWeight={onEditWeight}
            isEditingWeight={isEditingWeight}
          />
        </div>
      </CardContent>
    </Card>
  );
};
