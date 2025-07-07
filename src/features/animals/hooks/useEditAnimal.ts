import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AnimalPath } from '../interfaces/animalType';
import { editAnimal, type EditAnimalPayload } from '../actions/editAnimal';
import type { ApiError } from '@/api/lib/ApiError';
import { toast } from 'sonner';
import { i18n_errors } from '@/shared/translations/translations';

interface MutationVariables {
  animalId: string;
  payload: EditAnimalPayload;
}

export const useEditAnimal = (animalType: AnimalPath) => {
  const queryClient = useQueryClient();

  const editAnimalMutation = useMutation({
    mutationFn: ({ animalId, payload }: MutationVariables) =>
      editAnimal(animalType, animalId, payload),
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
      toast.success('Animal actualitzat amb èxit');
    },
  });

  return {
    editAnimalMutation: {
      editAnimal: editAnimalMutation.mutate,
      ...editAnimalMutation,
    },
  };
};
