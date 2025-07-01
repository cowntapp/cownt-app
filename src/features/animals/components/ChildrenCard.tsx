import { TypoH2 } from '@/shadcn/components/typography/TypoH2';
import { TypoLead } from '@/shadcn/components/typography/TypoLead';
import { TypoMuted } from '@/shadcn/components/typography/TypoMuted';
import { Badge } from '@/shadcn/components/ui/badge';
import { Button } from '@/shadcn/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shadcn/components/ui/card';
import { ResponsiveTooltip } from '@/shadcn/components/ui/responsive-tooltip';
import { ArrowUpRightFromSquare, Baby, Info } from 'lucide-react';
import { Link } from 'react-router';
import type { AnimalRaw } from '../interfaces/animal';

interface ChildrenCardProps {
  workspace: string;
  children: AnimalRaw[];
}

export const ChildrenCard = ({ workspace, children }: ChildrenCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-baseline gap-x-3">
          <Baby />
          <TypoH2>Fills</TypoH2>
        </CardTitle>
        <CardAction>
          <TypoLead>{children.length}</TypoLead>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-y-2">
        {children.map((child) => (
          <div
            key={`descendence-child-${child.id}`}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-x-2">
              <Badge
                className="font-mono"
                asChild
              >
                <Link to={`/${workspace}/${child.id}`}>
                  {child.shortCode}
                  <ArrowUpRightFromSquare />
                </Link>
              </Badge>
              <ResponsiveTooltip
                content={child.longCode}
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
            <TypoMuted>Parts ({child.children.length})</TypoMuted>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
