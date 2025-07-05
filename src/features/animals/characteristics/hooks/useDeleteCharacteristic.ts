import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCharacteristic } from '../actions/deleteCharacteristic';
import type { AnimalPath } from '../../interfaces/animalType';
import type { ApiError } from '@/api/lib/ApiError';
import { toast } from 'sonner';
import { i18n_errors } from '@/shared/translations/translations';

interface MutationVariables {
  characteristicId: string;
}

export const useDeleteCharacteristic = (animalType: AnimalPath) => {
  const queryClient = useQueryClient();

  const deleteCharacteristicMutation = useMutation({
    mutationFn: ({ characteristicId }: MutationVariables) =>
      deleteCharacteristic(animalType, characteristicId),
    onError: (error: ApiError) => {
      if (error?.status && error.status !== 500) {
        toast.error(error.message);
      } else {
        toast.error(i18n_errors[500]);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [animalType], type: 'all' });
      toast.success('Característica eliminada amb èxit');
    },
  });

  return {
    deleteCharacteristicMutation: {
      deleteCharacteristic: deleteCharacteristicMutation.mutate,
      ...deleteCharacteristicMutation,
    },
  };
};
