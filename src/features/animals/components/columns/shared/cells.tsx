import { Badge } from '@/shadcn/components/ui/badge';
import { Button } from '@/shadcn/components/ui/button';
import { ResponsiveTooltip } from '@/shadcn/components/ui/responsive-tooltip';
import { formatDate } from '@/shared/utils/formatDate';
import { getFormattedPriceStringIntl } from '@/shared/utils/formatPrice';
import { ArrowUpRightFromSquare, Info, Check } from 'lucide-react';
import { Link } from 'react-router';
import type { LucideIcon } from 'lucide-react';

interface LinkCellProps {
  url: string;
  label: string;
  tooltip?: boolean;
  tooltipContent?: string;
}

export const LinkCell = ({
  url,
  label,
  tooltip = false,
  tooltipContent,
}: LinkCellProps) => (
  <div className="flex items-center gap-x-1 w-full">
    {tooltip && (
      <ResponsiveTooltip
        content={tooltipContent}
        contentClassName="font-mono uppercase text-sm font-semibold"
        side="left"
      >
        <Button
          size={'icon'}
          variant={'ghost'}
        >
          <Info className="h-4 w-4 text-muted-foreground" />
        </Button>
      </ResponsiveTooltip>
    )}
    <Badge
      asChild
      className="font-mono"
    >
      <Link to={url}>
        {label}
        <ArrowUpRightFromSquare className="text-muted size-3" />
      </Link>
    </Badge>
  </div>
);

interface DateCellProps {
  timestamp: string | null;
}

export const DateCell = ({ timestamp }: DateCellProps) => {
  const formattedDate = formatDate(timestamp) ?? '-';

  return <div className="font-mono">{formattedDate}</div>;
};

interface ChipListCellProps {
  itemsList: string[];
}
export const ChipListCell = ({ itemsList }: ChipListCellProps) => {
  if (!itemsList || itemsList.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-1">
      <Badge
        key={itemsList[0]}
        variant="secondary"
      >
        {itemsList[0]}
      </Badge>
      {itemsList.length > 1 && (
        <ResponsiveTooltip
          side="right"
          content={
            <div className="space-y-1">
              {itemsList.slice(1).map((label) => (
                <div
                  key={label}
                  className="text-sm"
                >
                  {label}
                </div>
              ))}
            </div>
          }
        >
          <Badge variant="outline">+{itemsList.length - 1}</Badge>
        </ResponsiveTooltip>
      )}
    </div>
  );
};

interface PriceCellProps {
  price: string | number | null;
}
export const PriceCell = ({ price }: PriceCellProps) => {
  const formattedPrice = getFormattedPriceStringIntl(price);

  return <span className="font-mono">{formattedPrice}</span>;
};

interface ChipWithNullCellProps<T> {
  value: T | null;
  nullConfig: {
    label: string;
    icon?: LucideIcon;
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
    className?: string;
  };
  valueConfig: Record<
    string,
    {
      label: string;
      icon?: LucideIcon;
      variant?: 'default' | 'secondary' | 'destructive' | 'outline';
      className?: string;
    }
  >;
  defaultIcon?: LucideIcon;
}

export const ChipWithNullCell = <T extends string | number>({
  value,
  nullConfig,
  valueConfig,
  defaultIcon = Info,
}: ChipWithNullCellProps<T>) => {
  // Handle null/undefined values
  if (!value) {
    const NullIcon = nullConfig.icon || Check;
    return (
      <Badge
        variant={nullConfig.variant || 'default'}
        className={nullConfig.className}
      >
        <NullIcon className="h-3 w-3 mr-1" />
        {nullConfig.label}
      </Badge>
    );
  }

  // Handle non-null values
  const config = valueConfig[String(value)];
  if (!config) {
    return null;
  }

  const ValueIcon = config.icon || defaultIcon;

  return (
    <Badge
      variant={config.variant || 'secondary'}
      className={config.className}
    >
      <ValueIcon className="h-3 w-3 mr-1" />
      {config.label}
    </Badge>
  );
};
