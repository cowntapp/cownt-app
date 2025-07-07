import { Loader } from '@/shadcn/components/Loader/Loader';
import { Badge } from '@/shadcn/components/ui/badge';
import type { Characteristic } from '../../../characteristics/interface/characteristic';

interface CharacteristicsLoadingProps {
  tempCharacteristics: string[];
  availableCharacteristics: Characteristic[];
}

export const CharacteristicsLoading = ({
  tempCharacteristics,
  availableCharacteristics,
}: CharacteristicsLoadingProps) => {
  return (
    <div className="flex items-center gap-x-3">
      <div className="flex flex-wrap gap-2 flex-1">
        {tempCharacteristics.length > 0 ? (
          tempCharacteristics.map((charId) => {
            const characteristic = availableCharacteristics.find(
              (c) => c.id === charId
            );
            return characteristic ? (
              <Badge
                key={charId}
                variant="secondary"
              >
                {characteristic.value}
              </Badge>
            ) : null;
          })
        ) : (
          <span className="text-sm text-muted-foreground">
            Sense característiques
          </span>
        )}
      </div>
      <Loader className="w-6 h-6" />
    </div>
  );
};
