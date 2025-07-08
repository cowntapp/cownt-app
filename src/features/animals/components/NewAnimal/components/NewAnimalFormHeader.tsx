import { TypoH1 } from '@/shadcn/components/typography/TypoH1';
import { TypoLead } from '@/shadcn/components/typography/TypoLead';

interface NewAnimalFormHeaderProps {
  origin?: 'bought' | 'born' | null;
}

export const NewAnimalFormHeader = ({ origin }: NewAnimalFormHeaderProps) => {
  const getFormTitle = () => {
    if (origin === 'born') return 'Registrar Nou Part';
    if (origin === 'bought') return 'Registrar Nova Compra';
    return 'Nou Animal';
  };

  const getFormSubtitle = () => {
    if (origin === 'born') return "Registra el naixement d'un nou animal";
    if (origin === 'bought') return "Registra la compra d'un nou animal";
    return 'Crea un nou animal';
  };

  return (
    <div>
      <TypoH1 className="mb-2">{getFormTitle()}</TypoH1>
      <TypoLead>{getFormSubtitle()}</TypoLead>
    </div>
  );
};
