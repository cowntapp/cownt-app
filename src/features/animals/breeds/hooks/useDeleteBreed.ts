import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AnimalPath } from '../../interfaces/animalType';
import { deleteBreed } from '../actions/deleteBreed';
import type { ApiError } from '@/api/lib/ApiError';
import { toast } from 'sonner';
import { i18n_errors } from '@/shared/translations/translations';

interface MutationVariables {
  breedId: string;
}

export const useDeleteBreed = (animalType: AnimalPath) => {
  const queryClient = useQueryClient();

  const deleteBreedMutation = useMutation({
    mutationFn: ({ breedId }: MutationVariables) =>
      deleteBreed(animalType, breedId),
    onError: (error: ApiError) => {
      if (error.status && error.status !== 500) {
        toast.error(error.message);
      } else {
        toast.error(i18n_errors[500]);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [animalType], type: 'all' });
      toast.success('Raça eliminada amb èxit');
    },
  });

  return {
    deleteBreedMutation: {
      deleteBreed: deleteBreedMutation.mutate,
      ...deleteBreedMutation,
    },
  };
};
