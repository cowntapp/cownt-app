import { useRouterParams } from '@/shared/hooks/useRouterParams';
import { useAnimal } from './useAnimal';
import { isAnimalPath } from '../interfaces/animalType';
import { ANIMALS_ROUTE } from '../consts/animal.consts';
import { useDeleteAnimal } from './useDeleteAnimal';

export const useAnimalPage = () => {
  const { workspace, id } = useRouterParams('workspace', 'id');

  const isValidWorkspace = isAnimalPath(workspace);
  // Si no es válido, usamos un valor por defecto para evitar el error de hooks condicionales
  const validWorkspace = isValidWorkspace ? workspace : ANIMALS_ROUTE.COWS;

  // Siempre llamamos al hook, pero solo usaremos los datos si el workspace es válido
  const { animalQuery } = useAnimal(validWorkspace, id);
  const { deleteAnimalMutation } = useDeleteAnimal(validWorkspace);

  return {
    isValidWorkspace,
    workspace: isValidWorkspace ? workspace : null,
    id,
    animalQuery,
    deleteAnimalMutation,
  };
};
