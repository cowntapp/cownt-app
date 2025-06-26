import { useRouterParams } from '@/shared/hooks/useRouterParams';

export const WorkspaceDashboard = () => {
  const { workspace } = useRouterParams('workspace');

  return <div>Dashboard of {workspace}</div>;
};
