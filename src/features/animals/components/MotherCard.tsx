import { TypoH2 } from '@/shadcn/components/typography/TypoH2';
import { TypoLead } from '@/shadcn/components/typography/TypoLead';
import { TypoMuted } from '@/shadcn/components/typography/TypoMuted';
import { Badge } from '@/shadcn/components/ui/badge';
import { Button } from '@/shadcn/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shadcn/components/ui/card';
import { ResponsiveTooltip } from '@/shadcn/components/ui/responsive-tooltip';
import { ArrowUpRightFromSquare, Calendar, Heart, Info } from 'lucide-react';
import { Link } from 'react-router';
import type { AnimalRaw } from '../interfaces/animal';
import { formatDate } from '@/shared/utils/formatDate';

interface MotherCardProps {
  workspace: string;
  mother: AnimalRaw | null;
  motherBreedName: string;
}

export const MotherCard = ({
  workspace,
  mother,
  motherBreedName,
}: MotherCardProps) => {
  if (!mother) {
    return null; // Don't render the card if there's no mother
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-baseline gap-x-3">
          <Heart />
          <TypoH2>Mare</TypoH2>
        </CardTitle>
        <CardAction>
          <Link
            to={`/${workspace}/${mother.id}`}
            className="flex items-baseline gap-x-2"
          >
            <ArrowUpRightFromSquare size={18} />
            <span className="sr-only">Veure mare</span>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-4">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-x-2">
              <Badge
                className="font-mono"
                asChild
              >
                <Link to={`/${workspace}/${mother.id}`}>
                  {mother.shortCode} <ArrowUpRightFromSquare />
                </Link>
              </Badge>
              <ResponsiveTooltip
                content={mother.longCode}
                side="right"
                contentClassName="font-mono uppercase text-sm font-semibold"
              >
                <Button
                  size={'icon'}
                  variant={'ghost'}
                >
                  <Info className="h-4 w-4 text-muted-foreground" />
                </Button>
              </ResponsiveTooltip>
            </div>
            <TypoMuted>Parts ({mother.children.length})</TypoMuted>
          </div>
          <div>
            <TypoMuted>Raça</TypoMuted>
            <TypoLead className="font-semibold">{motherBreedName}</TypoLead>
          </div>
          <div>
            <TypoMuted>Data de naixament</TypoMuted>
            <TypoLead className="font-semibold flex items-center gap-x-2">
              <Calendar size={18} /> {formatDate(mother.birthDate) ?? '-'}
            </TypoLead>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          asChild
          variant={'secondary'}
        >
          <Link to={`/${workspace}/${mother.id}`}>Veure detalls</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
