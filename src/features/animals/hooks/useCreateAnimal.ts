import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AnimalPath } from '../interfaces/animalType';
import {
  createAnimal,
  type CreateAnimalPayload,
} from '../actions/createAnimal';
import type { ApiError } from '@/api/lib/ApiError';
import { toast } from 'sonner';
import { i18n_errors } from '@/shared/translations/translations';
import { useNavigate } from 'react-router';

interface MutationVariables {
  payload: CreateAnimalPayload;
}

export const useCreateAnimal = (animalType: AnimalPath) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const createAnimalMutation = useMutation({
    mutationFn: ({ payload }: MutationVariables) =>
      createAnimal(animalType, payload),
    onError: (error: ApiError) => {
      if (error?.status && error.status !== 500) {
        toast.error(error.message);
      } else {
        toast.error(i18n_errors[500]);
      }
    },
    onSuccess: () => {
      // Invalidar queries para refrescar los datos
      queryClient.invalidateQueries({ queryKey: [animalType], type: 'all' });
      toast.success('Animal creat amb èxit');
      navigate(`/${animalType}`, { replace: true });
    },
  });

  return {
    createAnimalMutation: {
      createAnimal: createAnimalMutation.mutate,
      ...createAnimalMutation,
    },
  };
};
