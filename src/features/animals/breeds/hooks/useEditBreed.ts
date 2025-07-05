import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AnimalPath } from '../../interfaces/animalType';
import { editBreed } from '../actions/editBreed';
import type { BreedFormData } from '../schemas/breedSchema';
import type { ApiError } from '@/api/lib/ApiError';
import { toast } from 'sonner';
import { i18n_errors } from '@/shared/translations/translations';
import { useNavigate } from 'react-router';

interface EditMutationVariables {
  breedId: string;
  data: BreedFormData;
}

export const useEditBreed = (animalType: AnimalPath) => {
  const queryClient = useQueryClient();
  const navigte = useNavigate();

  const editBreedMutation = useMutation({
    mutationFn: ({ breedId, data }: EditMutationVariables) =>
      editBreed(animalType, breedId, data),
    onError: (error: ApiError) => {
      if (error?.status && error.status !== 500) {
        toast.error(error.message);
      } else {
        toast.error(i18n_errors[500]);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [animalType], type: 'all' });
      toast.success('Raça actualitzada amb èxit');
      navigte(`/${animalType}/breeds`);
    },
  });

  return {
    editBreedMutation: {
      editBreed: editBreedMutation.mutate,
      ...editBreedMutation,
    },
  };
};
