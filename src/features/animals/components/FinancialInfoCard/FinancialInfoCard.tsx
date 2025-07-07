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
import { PriceSection } from './components';

interface FinancialInfoCardProps {
  purchasePrice: number | null;
  salePrice: number | null;
  profit: number | null;
  onEditPurchasePrice?: (purchasePrice: number | null) => void;
  onEditSalePrice?: (salePrice: number | null) => void;
  isEditingPurchasePrice?: boolean;
  isEditingSalePrice?: boolean;
}

export const FinancialInfoCard = ({
  purchasePrice,
  salePrice,
  profit,
  onEditPurchasePrice,
  onEditSalePrice,
  isEditingPurchasePrice,
  isEditingSalePrice,
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
          <PriceSection
            label="Preu de compra"
            price={purchasePrice}
            onEditPrice={onEditPurchasePrice}
            isEditingPrice={isEditingPurchasePrice}
            placeholder="Preu en €"
          />
          <PriceSection
            label="Preu de venda"
            price={salePrice}
            onEditPrice={onEditSalePrice}
            isEditingPrice={isEditingSalePrice}
            placeholder="Preu en €"
          />
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
