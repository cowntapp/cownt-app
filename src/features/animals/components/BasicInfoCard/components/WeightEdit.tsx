import { Button } from '@/shadcn/components/ui/button';
import { Input } from '@/shadcn/components/ui/input';
import { Save, XCircle } from 'lucide-react';

interface WeightEditProps {
  tempValue: string;
  onValueChange: (value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  hasChanges: boolean;
  hasValidationError: boolean;
  validationError: string | null;
}

export const WeightEdit = ({
  tempValue,
  onValueChange,
  onConfirm,
  onCancel,
  onKeyDown,
  hasChanges,
  hasValidationError,
  validationError,
}: WeightEditProps) => {
  return (
    <div className="flex flex-col gap-y-1">
      <div className="flex items-center gap-x-2">
        <Input
          value={tempValue}
          onChange={(e) => onValueChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Pes en kg"
          className={`w-32 ${
            hasValidationError ? 'border-red-500 focus:border-red-500' : ''
          }`}
          autoFocus
        />
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
      {validationError && (
        <p className="text-sm text-red-500 mt-1">{validationError}</p>
      )}
    </div>
  );
};
