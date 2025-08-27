import { Textarea } from '@/shadcn/components/ui/textarea';

interface DetailsEditProps {
  tempValue: string;
  onValueChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  hasValidationError: boolean;
  validationError: string | null;
}

export const DetailsEdit = ({
  tempValue,
  onValueChange,
  onKeyDown,
  hasValidationError,
  validationError,
}: DetailsEditProps) => {
  return (
    <div className="flex flex-col gap-y-1 w-full">
      <div className="flex items-center gap-x-2">
        <Textarea
          value={tempValue}
          onChange={(e) => onValueChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Detalls extres de l'animal"
          className={`mt-4 ${
            hasValidationError ? 'border-red-500 focus:border-red-500' : ''
          }`}
          autoFocus
        />
      </div>
      {validationError && (
        <p className="text-sm text-red-500 mt-1">{validationError}</p>
      )}
    </div>
  );
};
