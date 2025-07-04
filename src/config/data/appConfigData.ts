import {
  AudioWaveform,
  GalleryVerticalEnd,
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

export const AppLogo = GalleryVerticalEnd;

export const menuData: MenuData = {
  workspaces: [
    {
      name: i18n_entities.cows,
      logo: GalleryVerticalEnd,
      url: '/cows',
    },
    {
      name: i18n_entities.sheeps,
      logo: AudioWaveform,
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
