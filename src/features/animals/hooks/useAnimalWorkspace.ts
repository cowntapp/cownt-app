import { isAnimalPath } from '../interfaces/animalType';
import { useRouterParams } from '@/shared/hooks/useRouterParams';

export const useAnimalWorkspace = () => {
  const { workspace } = useRouterParams('workspace');

  const isValidWorkspace = workspace && isAnimalPath(workspace);

  return {
    workspace: isValidWorkspace ? workspace : null,
    isValidWorkspace: !!isValidWorkspace,
  };
};
