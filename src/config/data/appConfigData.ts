import {
  AudioWaveform,
  BookOpen,
  Bot,
  GalleryVerticalEnd,
  SquareTerminal,
  BadgeCheck,
  // Bell,
  // CreditCard,
  LogOut,
  Settings2,
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
      icon: SquareTerminal,
    },
    {
      title: 'Llista',
      url: '/:animal',
      icon: Bot,
    },
    {
      title: 'Opcions',
      icon: BookOpen,
      items: [
        {
          title: i18n_entities.breeds,
          url: '/:animal/breeds',
        },
        {
          title: i18n_entities.characteristics,
          url: '/:animal/characteristics',
        },
      ],
    },
  ],
};
export const userMenuItems: UserMenuItem[] = [
  {
    title: 'Some Main Settings',
    icon: Settings2,
    url: '/settings',
    group: 'main',
  },
  {
    title: 'Sessions',
    icon: BadgeCheck,
    url: '/sessions',
    group: 'secondary',
  },
  // DO NOT EDIT (only title or icon)
  {
    title: 'Log out',
    icon: LogOut,
    url: undefined,
    group: 'logout',
  },
];
