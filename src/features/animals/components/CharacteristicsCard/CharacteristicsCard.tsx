import { TypoH2 } from '@/shadcn/components/typography/TypoH2';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shadcn/components/ui/card';
import { ArrowUpRightFromSquare, Tag } from 'lucide-react';
import { Link } from 'react-router';
import type { Characteristic } from '../../characteristics/interface/characteristic';
import type { AnimalPath } from '../../interfaces/animalType';
import { CharacteristicsSection } from './components/CharacteristicsSection';

interface CharacteristicsCardProps {
  characteristics: Characteristic[];
  workspace: AnimalPath;
  onEditCharacteristics?: (characteristics: string[]) => void;
  isEditingCharacteristics?: boolean;
}

export const CharacteristicsCard = ({
  characteristics,
  workspace,
  onEditCharacteristics,
  isEditingCharacteristics,
}: CharacteristicsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-baseline gap-x-3">
          <Tag />
          <TypoH2>Característiques</TypoH2>
        </CardTitle>
        <CardAction>
          <Link
            to={`/${workspace}/characteristics`}
            className="flex items-baseline gap-x-2"
          >
            <span className="sr-only">veure totes les característiques</span>
            <ArrowUpRightFromSquare size={18} />
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <CharacteristicsSection
          characteristics={characteristics}
          workspace={workspace}
          onEditCharacteristics={onEditCharacteristics}
          isEditingCharacteristics={isEditingCharacteristics}
        />
      </CardContent>
    </Card>
  );
};
