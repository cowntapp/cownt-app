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
  workspaces?: Workspace[];
  navMain: MenuItem[];
  projects: MenuItem[];
}

export interface UserMenuItem extends MenuItem {
  group: string;
}
