export interface Workspace {
  name: string;
  logo: React.ElementType;
  url: string;
}

export interface MenuItem {
  title: string;
  url?: string;
  icon?: React.ElementType;
  items?: MenuItem[];
}

export interface MenuData {
  workspaces: Workspace[];
  navMain: MenuItem[];
}

export interface UserMenuItem extends MenuItem {
  group: string;
}

export const entityKeys = [
  'statistics',
  'cows',
  'cow',
  'sheeps',
  'sheep',
  'breeds',
  'breed',
  'characteristics',
  'characteristic',
] as const;

export type EntityKey = (typeof entityKeys)[number];
