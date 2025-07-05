import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AnimalPath } from '../../interfaces/animalType';
import { editCharacteristic } from '../actions/editCharacteristic';
import type { CharacteristicFormData } from '../schemas/characteristicSchema';
import { useNavigate } from 'react-router';
import type { ApiError } from '@/api/lib/ApiError';
import { toast } from 'sonner';
import { i18n_errors } from '@/shared/translations/translations';

interface MutationVariables {
  characteristicId: string;
  data: CharacteristicFormData;
}

export const useEditCharacteristic = (animalType: AnimalPath) => {
  const queryClient = useQueryClient();
  const navigte = useNavigate();

  const editCharacteristicMutation = useMutation({
    mutationFn: ({ characteristicId, data }: MutationVariables) =>
      editCharacteristic(animalType, characteristicId, data),

    onError: (error: ApiError) => {
      if (error?.status && error.status !== 500) {
        toast.error(error.message);
      } else {
        toast.error(i18n_errors[500]);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [animalType], type: 'all' });
      toast.success('Characterística actualitzada amb èxit');
      navigte(`/${animalType}/characteristics`);
    },
  });

  return {
    editCharacteristicMutation: {
      editCharacteristic: editCharacteristicMutation.mutate,
      ...editCharacteristicMutation,
    },
  };
};
