import type { EntityKey } from '@/config/interfaces/configInterfaces';
import { TypoH1 } from '@/shadcn/components/typography/TypoH1';
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
import { Separator } from '@/shadcn/components/ui/separator';
import { useRouterParams } from '@/shared/hooks/useRouterParams';
import { i18n_entities } from '@/shared/translations/translations';
import { ResponsiveTooltip } from '@/shadcn/components/ui/responsive-tooltip';
import {
  ArrowLeft,
  ArrowUpRightFromSquare,
  Baby,
  Calendar,
  Euro,
  Heart,
  Info,
  Tag,
} from 'lucide-react';
import { Link } from 'react-router';

export const Animal = () => {
  const { workspace } = useRouterParams('workspace');

  return (
    <div>
      <header className="h-16 flex items-center gap-x-4">
        <Button
          asChild
          variant={'link'}
        >
          <Link to={`/${workspace}`}>
            <ArrowLeft />
            <span>Tronar a la llista</span>
          </Link>
        </Button>
        <Separator
          orientation="vertical"
          className="data-[orientation=vertical]:h-6"
        />
        <Badge className="font-mono">0001</Badge>
        <TypoLead asChild>
          <h1>{i18n_entities[workspace.slice(0, -1) as EntityKey]}</h1>
        </TypoLead>
      </header>
      <main>
        <TypoH1 className="my-2">
          Detalls de la {i18n_entities[workspace.slice(0, -1) as EntityKey]}{' '}
          0001
        </TypoH1>
        <div className="container grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-1 lg:col-span-2 flex flex-col gap-y-6">
            {/* INFO BASICA */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-baseline gap-x-3">
                  <Info />
                  <TypoH2>Informació bàsica</TypoH2>
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 sm:grid-cols-2">
                <div className="flex flex-col gap-y-4">
                  <div>
                    <TypoMuted>Codi llarg</TypoMuted>
                    <TypoLead className="font-mono uppercase font-semibold">
                      Cow000000000001
                    </TypoLead>
                  </div>
                  <div>
                    <TypoMuted>Raça</TypoMuted>
                    <TypoLead className="font-semibold">Xarolesa</TypoLead>
                  </div>
                  <div>
                    <TypoMuted>Data de naixament</TypoMuted>
                    <TypoLead className="font-semibold flex items-center gap-x-2">
                      <Calendar size={18} /> 14/07/2009
                    </TypoLead>
                  </div>
                </div>
                <div className="flex flex-col gap-y-4">
                  <div>
                    <TypoMuted>Sexe</TypoMuted>
                    <TypoLead className="font-semibold">Femella</TypoLead>
                  </div>
                  <div>
                    <TypoMuted>Origen</TypoMuted>
                    <TypoLead className="font-semibold">Comprada</TypoLead>
                  </div>
                  <div>
                    <TypoMuted>Pes</TypoMuted>
                    <TypoLead className="font-semibold">650 kg</TypoLead>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* INFO € */}
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
                      {getFormattedPriceString(823)}
                    </TypoLead>
                  </div>
                  <div>
                    <TypoMuted>Preu de venda</TypoMuted>
                    <TypoLead className="font-semibold">
                      {getFormattedPriceString(null)}
                    </TypoLead>
                  </div>
                </div>
                <div className="flex flex-col gap-y-4">
                  <div>
                    <TypoMuted>Benefici</TypoMuted>
                    <TypoLead className="font-semibold">
                      {getFormattedPriceString(-832)}
                    </TypoLead>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CHARACT */}
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
                    <span className="sr-only">
                      veure totes les característiques
                    </span>
                    <ArrowUpRightFromSquare size={18} />
                  </Link>
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'Coixera', value: 'Coixera' },
                    { id: 'Mal caràcter', value: 'Mal caràcter' },
                    { id: 'Mala llet', value: 'Mala llet' },
                  ].map((char) => (
                    <Badge
                      key={char.id}
                      variant={'secondary'}
                    >
                      {char.value}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="col-span-1 flex flex-col gap-y-6">
            {/* MARE */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-baseline gap-x-3">
                  <Heart />
                  <TypoH2>Mare</TypoH2>
                </CardTitle>
                <CardAction>
                  <Link
                    // TODO: replace
                    to={`/${workspace}/asasdfasdfasdf`}
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
                        <Link to={`/${workspace}/asasdfasdfasdf`}>
                          0050 <ArrowUpRightFromSquare />
                        </Link>
                      </Badge>
                      <ResponsiveTooltip
                        content={'cow0000000050'}
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
                    <TypoMuted>Parts (2)</TypoMuted>
                  </div>
                  <div>
                    <TypoMuted>Raça</TypoMuted>
                    <TypoLead className="font-semibold">Xarolesa</TypoLead>
                  </div>
                  <div>
                    <TypoMuted>Data de naixament</TypoMuted>
                    <TypoLead className="font-semibold flex items-center gap-x-2">
                      <Calendar size={18} /> 14/07/2009
                    </TypoLead>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant={'secondary'}
                >
                  <Link to={`/${workspace}/asasdfasdfasdf`}>Veure detalls</Link>
                </Button>
              </CardFooter>
            </Card>

            {/* FILLS */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-baseline gap-x-3">
                  <Baby />
                  <TypoH2>Fills</TypoH2>
                </CardTitle>
                <CardAction>
                  <TypoLead>{3}</TypoLead>
                </CardAction>
              </CardHeader>
              <CardContent className="flex flex-col gap-y-2">
                {[
                  {
                    id: 'child1',
                    shortCode: '0025',
                    longCode: 'Cow000000000025',
                    children: ['cow5', 'cow6', 'cow7'],
                  },
                  {
                    id: 'child2',
                    shortCode: '0026',
                    longCode: 'Cow000000000026',
                    children: ['cow8', 'cow9', 'cow10'],
                  },
                  {
                    id: 'child3',
                    shortCode: '0027',
                    longCode: 'Cow000000000027',
                    children: null,
                  },
                ].map((child) => (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2">
                      <Badge
                        key={`descendence-child-${child.id}`}
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
                    <TypoMuted>
                      Parts ({child.children?.length ?? '-'})
                    </TypoMuted>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

const getFormattedPriceString = (price: string | number | null) => {
  if (!price) return '- €';

  if (typeof price === 'string') {
    const numPrice = Number(price);

    return isNaN(numPrice) ? '- €' : `${numPrice.toFixed(2)} €`;
  }

  return `${price.toFixed(2)} €`;
};
