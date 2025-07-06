import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AnimalPath } from '../interfaces/animalType';
import { deleteAnimal } from '../actions/deleteAnimal';
import type { ApiError } from '@/api/lib/ApiError';
import { toast } from 'sonner';
import { i18n_errors } from '@/shared/translations/translations';
import { useNavigate } from 'react-router';

interface MutationVariables {
  animalId: string;
}

export const useDeleteAnimal = (animalType: AnimalPath) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteAnimalMutation = useMutation({
    mutationFn: ({ animalId }: MutationVariables) =>
      deleteAnimal(animalType, animalId),
    onError: (error: ApiError) => {
      if (error?.status && error.status !== 500) {
        toast.error(error.message);
      } else {
        toast.error(i18n_errors[500]);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [animalType], type: 'all' });
      toast.success('Animal Eliminat amb èxit');
      navigate(`/${animalType}`);
    },
  });
  return {
    deleteAnimalMutation: {
      deleteAnimal: deleteAnimalMutation.mutate,
      ...deleteAnimalMutation,
    },
  };
};
