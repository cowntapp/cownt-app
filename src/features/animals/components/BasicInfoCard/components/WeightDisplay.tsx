import { TypoLead } from '@/shadcn/components/typography/TypoLead';
import { Button } from '@/shadcn/components/ui/button';
import { Edit } from 'lucide-react';
import { formatWeight } from '@/shared/utils/formatWeight';

interface WeightDisplayProps {
  weight: string | null;
  onEdit: () => void;
  isEditingWeight?: boolean;
}

export const WeightDisplay = ({
  weight,
  onEdit,
  isEditingWeight,
}: WeightDisplayProps) => {
  return (
    <>
      <TypoLead className="font-semibold">
        {formatWeight(weight) ?? '-'}
      </TypoLead>
      <Button
        variant="outline"
        size="sm"
        onClick={onEdit}
        disabled={isEditingWeight}
      >
        <Edit className="w-4 h-4" />
      </Button>
    </>
  );
};
