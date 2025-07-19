import { TypoLead } from '@/shadcn/components/typography/TypoLead';
import { LoaderCircle } from 'lucide-react';
import type { Owner } from '../../../../owners/interface/owner';

interface OwnerLoadingProps {
  tempOwnerId: string;
  availableOwners: Owner[];
}

export const OwnerLoading = ({
  tempOwnerId,
  availableOwners,
}: OwnerLoadingProps) => {
  const selectedOwner = availableOwners.find(
    (owner) => owner.id === tempOwnerId
  );

  return (
    <div className="flex items-center gap-x-2 flex-1">
      <div className="flex-1">
        <TypoLead className="font-mono font-semibold">
          {selectedOwner?.value || 'Propietari desconegut'}
        </TypoLead>
      </div>
      <LoaderCircle
        size={16}
        className="animate-spin text-muted-foreground"
      />
    </div>
  );
};
