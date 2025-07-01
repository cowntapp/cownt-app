import { useRouterParams } from '@/shared/hooks/useRouterParams';
import { useAnimal } from './useAnimal';
import { isAnimalPath, type AnimalPath } from '../interfaces/animalType';
import { ANIMALS_ROUTE } from '../consts/animal.consts';
import type { AnimalPopulated } from '../interfaces/animal';
import type { UseQueryResult } from '@tanstack/react-query';

interface UseAnimalPageResult {
  isValidWorkspace: boolean;
  workspace: AnimalPath | null;
  id: string;
  animalQuery: UseQueryResult<AnimalPopulated, Error> & {
    animal: AnimalPopulated | undefined;
  };
}

export const useAnimalPage = (): UseAnimalPageResult => {
  const { workspace, id } = useRouterParams('workspace', 'id');

  const isValidWorkspace = isAnimalPath(workspace);
  // Si no es válido, usamos un valor por defecto para evitar el error de hooks condicionales
  const validWorkspace = isValidWorkspace ? workspace : ANIMALS_ROUTE.COWS;

  // Siempre llamamos al hook, pero solo usaremos los datos si el workspace es válido
  const { animalQuery } = useAnimal(validWorkspace, id);

  return {
    isValidWorkspace,
    workspace: isValidWorkspace ? workspace : null,
    id,
    animalQuery,
  };
};
