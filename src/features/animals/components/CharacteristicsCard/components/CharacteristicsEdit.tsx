import { Button } from '@/shadcn/components/ui/button';
import { Badge } from '@/shadcn/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shadcn/components/ui/dropdown-menu';
import { Save, XCircle, ChevronDown, Check } from 'lucide-react';
import type { Characteristic } from '../../../characteristics/interface/characteristic';

interface CharacteristicsEditProps {
  availableCharacteristics: Characteristic[];
  selectedCharacteristics: string[];
  onToggleCharacteristic: (characteristicId: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  hasChanges: boolean;
  hasValidationError: boolean;
  validationError: string | null;
}

export const CharacteristicsEdit = ({
  availableCharacteristics,
  selectedCharacteristics,
  onToggleCharacteristic,
  onConfirm,
  onCancel,
  hasChanges,
  hasValidationError,
  validationError,
}: CharacteristicsEditProps) => {
  const selectedCount = selectedCharacteristics.length;

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center gap-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="min-w-[200px] justify-between"
            >
              {selectedCount === 0
                ? 'Selecciona característiques'
                : `${selectedCount} seleccionades`}
              <ChevronDown className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-64"
          >
            {availableCharacteristics.length > 0 ? (
              availableCharacteristics.map((characteristic) => (
                <DropdownMenuItem
                  key={characteristic.id}
                  onClick={() => onToggleCharacteristic(characteristic.id)}
                  className="flex items-center gap-x-2 cursor-pointer"
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    {selectedCharacteristics.includes(characteristic.id) && (
                      <Check className="w-3 h-3" />
                    )}
                  </div>
                  {characteristic.value}
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem disabled>
                No hi ha característiques disponibles
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant="outline"
          size="sm"
          onClick={onConfirm}
          disabled={!hasChanges || hasValidationError}
        >
          <Save className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={onCancel}
        >
          <XCircle className="w-4 h-4" />
        </Button>
      </div>

      {/* Selected characteristics preview */}
      {selectedCharacteristics.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedCharacteristics.map((charId) => {
            const characteristic = availableCharacteristics.find(
              (c) => c.id === charId
            );
            return characteristic ? (
              <Badge
                key={charId}
                variant="secondary"
                className="text-xs"
              >
                {characteristic.value}
              </Badge>
            ) : null;
          })}
        </div>
      )}

      {validationError && (
        <p className="text-sm text-red-500">{validationError}</p>
      )}
    </div>
  );
};
