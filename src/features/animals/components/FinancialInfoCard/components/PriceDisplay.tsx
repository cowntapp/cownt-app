import { TypoLead } from '@/shadcn/components/typography/TypoLead';
import { Button } from '@/shadcn/components/ui/button';
import { Edit } from 'lucide-react';
import { getFormattedPriceStringIntl } from '@/shared/utils/formatPrice';

interface PriceDisplayProps {
  price: number | null;
  onEdit: () => void;
  isEditing?: boolean;
}

export const PriceDisplay = ({
  price,
  onEdit,
  isEditing,
}: PriceDisplayProps) => {
  return (
    <>
      <TypoLead className="font-semibold">
        {getFormattedPriceStringIntl(price) ?? '-'}
      </TypoLead>
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
