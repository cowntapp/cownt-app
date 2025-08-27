import { TypoLead } from '@/shadcn/components/typography/TypoLead';
import { formatDate } from '@/shared/utils/formatDate';
import { Calendar } from 'lucide-react';

interface DeathDateDisplayProps {
  deathDate: string | null;
}

export const DeathDateDisplay = ({ deathDate }: DeathDateDisplayProps) => {
  return (
    <>
      <TypoLead className="font-semibold flex items-center gap-x-2">
        <Calendar size={18} /> {formatDate(deathDate) ?? '-'}
      </TypoLead>
    </>
  );
};
