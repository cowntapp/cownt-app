import { TypoLead } from '@/shadcn/components/typography/TypoLead';
import { Button } from '@/shadcn/components/ui/button';
import { Edit } from 'lucide-react';
import type { Owner } from '../../../../owners/interface/owner';

interface OwnerDisplayProps {
  owner: Owner;
  onEdit: () => void;
  isEditing?: boolean;
}

export const OwnerDisplay = ({
  owner,
  onEdit,
  isEditing,
}: OwnerDisplayProps) => {
  return (
    <>
      <TypoLead className="font-mono font-semibold">{owner.value}</TypoLead>
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
