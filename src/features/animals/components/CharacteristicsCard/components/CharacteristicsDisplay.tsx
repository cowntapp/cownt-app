import { TypoMuted } from '@/shadcn/components/typography/TypoMuted';
import { Badge } from '@/shadcn/components/ui/badge';
import { Button } from '@/shadcn/components/ui/button';
import { Edit } from 'lucide-react';
import type { Characteristic } from '../../../characteristics/interface/characteristic';

interface CharacteristicsDisplayProps {
  characteristics: Characteristic[];
  onEdit: () => void;
  isEditing?: boolean;
}

export const CharacteristicsDisplay = ({
  characteristics,
  onEdit,
  isEditing,
}: CharacteristicsDisplayProps) => {
  return (
    <>
      <div className="flex flex-wrap gap-2 flex-1">
        {characteristics.length > 0 ? (
          characteristics.map((char) => (
            <Badge
              key={char.id}
              variant={'secondary'}
            >
              {char.value}
            </Badge>
          ))
        ) : (
          <TypoMuted>Sense característiques</TypoMuted>
        )}
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onEdit}
        disabled={isEditing}
      >
        <Edit className="w-4 h-4" />
      </Button>
    </>
  );
};
