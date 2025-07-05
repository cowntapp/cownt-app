import { i18n_errors } from '@/shared/translations/translations';
import { toast } from 'sonner';
import type { AnimalPath } from '../../interfaces/animalType';
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBreed } from '../actions/createBreed';
import type { ApiError } from '@/api/lib/ApiError';
import type { BreedFormData } from '../schemas/breedSchema';

export const useCreateBreed = (animalPath: AnimalPath) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createBreedMutation = useMutation({
    mutationFn: (data: BreedFormData) => createBreed(animalPath, data),
    onError: (error: ApiError) => {
      if (error.status && error.status === 500) {
        toast.error(i18n_errors[500]);
      } else {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [animalPath, 'breeds'] });
      toast.success('Raça creada amb èxit');
      navigate(`/${animalPath}/breeds`);
    },
  });

  return {
    createBreedMutation: {
      createBreed: createBreedMutation.mutate,
      ...createBreedMutation,
    },
  };
};
