import { TypoH2 } from '@/shadcn/components/typography/TypoH2';
import { TypoLead } from '@/shadcn/components/typography/TypoLead';
import { TypoMuted } from '@/shadcn/components/typography/TypoMuted';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shadcn/components/ui/card';
import { getFormattedPriceStringIntl } from '@/shared/utils/formatPrice';
import { Euro } from 'lucide-react';

interface FinancialInfoCardProps {
  purchasePrice: number | null;
  salePrice: number | null;
  profit: number | null;
}

export const FinancialInfoCard = ({
  purchasePrice,
  salePrice,
  profit,
}: FinancialInfoCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-baseline gap-x-3">
          <Euro />
          <TypoH2>Informació financera</TypoH2>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2">
        <div className="flex flex-col gap-y-4">
          <div>
            <TypoMuted>Preu de compra</TypoMuted>
            <TypoLead className="font-semibold">
              {getFormattedPriceStringIntl(purchasePrice) ?? '-'}
            </TypoLead>
          </div>
          <div>
            <TypoMuted>Preu de venda</TypoMuted>
            <TypoLead className="font-semibold">
              {getFormattedPriceStringIntl(salePrice) ?? '-'}
            </TypoLead>
          </div>
        </div>
        <div className="flex flex-col gap-y-4">
          <div>
            <TypoMuted>Benefici</TypoMuted>
            <TypoLead className="font-semibold">
              {/* Profit calculated using: Sale Price + Children Sale Prices - Purchase Price */}
              {getFormattedPriceStringIntl(profit) ?? '-'}
            </TypoLead>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
