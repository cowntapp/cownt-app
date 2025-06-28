import {
  AudioWaveform,
  BookOpen,
  Bot,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  SquareTerminal,
  BadgeCheck,
  // Bell,
  // CreditCard,
  LogOut,
  Settings2,
} from 'lucide-react';
import type { MenuData, UserMenuItem } from '../interfaces/configInterfaces';

export const AppLogo = GalleryVerticalEnd;

export const menuData: MenuData = {
  workspaces: [
    {
      name: 'Vaques',
      logo: GalleryVerticalEnd,
      url: '/cows',
    },
    {
      name: 'Ovelles',
      logo: AudioWaveform,
      url: '/sheeps',
    },
  ],
  navMain: [
    {
      title: 'Estadístiques',
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
          title: 'Races',
          url: '/:animal/breeds',
        },
        {
          title: 'Característiques',
          url: '/:animal/characteristics',
        },
      ],
    },
  ],
  projects: [
    {
      title: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      title: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      title: 'Travel',
      url: '#',
      icon: Map,
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
  // {
  //   title: 'Upgrade to Pro',
  //   icon: Sparkles,
  //   url: undefined,
  //   group: 'main',
  // },
  {
    title: 'Sessions',
    icon: BadgeCheck,
    url: '/sessions',
    group: 'secondary',
  },
  // {
  //   title: 'Account',
  //   icon: BadgeCheck,
  //   url: '/account',
  //   group: 'secondary',
  // },
  // {
  //   title: 'Billing',
  //   icon: CreditCard,
  //   url: '/billing',
  //   group: 'secondary',
  // },
  // {
  //   title: 'Notifications',
  //   icon: Bell,
  //   url: '/notifications',
  //   group: 'secondary',
  // },
  // DO NOT EDIT (only title or icon)
  {
    title: 'Log out',
    icon: LogOut,
    url: undefined,
    group: 'logout',
  },
];
