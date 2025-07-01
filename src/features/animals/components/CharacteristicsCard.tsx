import { TypoH2 } from '@/shadcn/components/typography/TypoH2';
import { TypoMuted } from '@/shadcn/components/typography/TypoMuted';
import { Badge } from '@/shadcn/components/ui/badge';
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shadcn/components/ui/card';
import { ArrowUpRightFromSquare, Tag } from 'lucide-react';
import { Link } from 'react-router';
import type { Characteristic } from '../characteristics/interface/characteristic';

interface CharacteristicsCardProps {
  characteristics: Characteristic[];
  workspace: string;
}

export const CharacteristicsCard = ({
  characteristics,
  workspace,
}: CharacteristicsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-baseline gap-x-3">
          <Tag />
          <TypoH2>Característiques</TypoH2>
        </CardTitle>
        <CardAction>
          <Link
            to={`/${workspace}/characteristics`}
            className="flex items-baseline gap-x-2"
          >
            <span className="sr-only">veure totes les característiques</span>
            <ArrowUpRightFromSquare size={18} />
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {characteristics.length > 0 ? (
            characteristics.map((char) => (
              <Badge
                key={char.id}
                variant={'secondary'}
              >
                {char.value}
              </Badge>
            ))
          ) : (
            <TypoMuted>Sense característiques</TypoMuted>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
