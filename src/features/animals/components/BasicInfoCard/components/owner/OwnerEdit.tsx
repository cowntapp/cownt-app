import { Button } from '@/shadcn/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shadcn/components/ui/select';
import { Save, XCircle } from 'lucide-react';
import type { Owner } from '../../../../owners/interface/owner';

interface OwnerEditProps {
  availableOwners: Owner[];
  selectedOwnerId: string;
  onOwnerChange: (ownerId: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
  hasChanges: boolean;
}

export const OwnerEdit = ({
  availableOwners,
  selectedOwnerId,
  onOwnerChange,
  onConfirm,
  onCancel,
  hasChanges,
}: OwnerEditProps) => {
  const selectedOwner = availableOwners.find(
    (owner) => owner.id === selectedOwnerId
  );

  return (
    <div className="flex items-center gap-x-2">
      <Select
        value={selectedOwnerId}
        onValueChange={onOwnerChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecciona un propietari">
            {selectedOwner?.value || 'Selecciona un propietari'}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {availableOwners.map((owner) => (
            <SelectItem
              key={owner.id}
              value={owner.id}
            >
              {owner.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex gap-x-1">
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
          onClick={onCancel}
        >
          <XCircle className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
