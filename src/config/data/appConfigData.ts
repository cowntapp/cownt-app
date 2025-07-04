import {
  BadgeCheck,
  // Bell,
  // CreditCard,
  LogOut,
  ChartColumn,
  ListOrdered,
  Tags,
  Shapes,
  // Settings2,
} from 'lucide-react';
import type { MenuData, UserMenuItem } from '../interfaces/configInterfaces';
import { i18n_entities } from '@/shared/translations/translations';
import { CowIcon } from '@/features/animals/components/icons/CowIcon';
import { SheepIcon } from '@/features/animals/components/icons/SheepIcon';

export const AppLogo = CowIcon;

export const menuData: MenuData = {
  workspaces: [
    {
      name: i18n_entities.cows,
      logo: CowIcon,
      url: '/cows',
    },
    {
      name: i18n_entities.sheeps,
      logo: SheepIcon,
      url: '/sheeps',
    },
  ],
  navMain: [
    {
      title: i18n_entities.statistics,
      url: '/:animal/statistics',
      icon: ChartColumn,
    },
    {
      title: 'Llista',
      url: '/:animal',
      icon: ListOrdered,
    },
    {
      title: i18n_entities.breeds,
      url: '/:animal/breeds',
      icon: Shapes,
    },
    {
      title: i18n_entities.characteristics,
      url: '/:animal/characteristics',
      icon: Tags,
    },
  ],
};
export const userMenuItems: UserMenuItem[] = [
  // {
  //   title: 'Some Main Settings',
  //   icon: Settings2,
  //   url: '/settings',
  //   group: 'main',
  // },
  {
    title: 'Sessions',
    icon: BadgeCheck,
    url: '/sessions',
    group: 'secondary',
  },
  // DO NOT EDIT (only title or icon)
  {
    title: 'Tanca sessió',
    icon: LogOut,
    url: undefined,
    group: 'logout',
  },
];
