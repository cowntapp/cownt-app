import { Button } from '@/shadcn/components/ui/button';
import { Input } from '@/shadcn/components/ui/input';
import { Save, XCircle, Trash2 } from 'lucide-react';

interface AbsenceDetailEditProps {
  tempValue: string;
  onValueChange: (value: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  onClear: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  hasChanges: boolean;
  placeholder: string;
}

export const AbsenceDetailEdit = ({
  tempValue,
  onValueChange,
  onConfirm,
  onCancel,
  onClear,
  onKeyDown,
  hasChanges,
  placeholder,
}: AbsenceDetailEditProps) => {
  return (
    <div className="flex items-center gap-x-2">
      <Input
        value={tempValue}
        onChange={(e) => onValueChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="w-48"
        autoFocus
        type="text"
      />
      <Button
        variant="outline"
        size="sm"
        onClick={onConfirm}
        disabled={!hasChanges}
      >
        <Save className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onClear}
        disabled={!tempValue.trim()}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onCancel}
      >
        <XCircle className="w-4 h-4" />
      </Button>
    </div>
  );
};
