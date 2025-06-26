import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
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
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      url: '/acme-inc',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      url: '/acme-corp',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      url: '/evil-corp',
    },
  ],
  navMain: [
    {
      title: 'Playground',
      url: '#',
      icon: SquareTerminal,
      items: [
        {
          title: 'History',
          url: '#',
        },
        {
          title: 'Starred',
          url: '#',
        },
        {
          title: 'Settings',
          url: '#',
        },
      ],
    },
    {
      title: 'Models',
      url: '#',
      icon: Bot,
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
    },
    {
      title: 'Documentation',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
    },
    {
      title: 'Settings',
      url: '#',
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
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
