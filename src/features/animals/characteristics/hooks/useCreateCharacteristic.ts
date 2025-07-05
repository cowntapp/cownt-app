import { i18n_errors } from '@/shared/translations/translations';
import { toast } from 'sonner';
import type { AnimalPath } from '../../interfaces/animalType';
import { useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ApiError } from '@/api/lib/ApiError';
import type { CharacteristicFormData } from '../schemas/characteristicSchema';
import { createCharacteristic } from '../actions/createCharacteristic';

export const useCreateCharacteristic = (animalPath: AnimalPath) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createCharacteristicMutation = useMutation({
    mutationFn: (data: CharacteristicFormData) =>
      createCharacteristic(animalPath, data),
    onError: (error: ApiError) => {
      if (error.status && error.status !== 500) {
        toast.error(error.message);
      } else {
        toast.error(i18n_errors[500]);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [animalPath, 'characteristics'],
      });
      toast.success('Caracterítica creada amb èxit');
      navigate(`/${animalPath}/characteristics`);
    },
  });

  return {
    createCharacteristicMutation: {
      createCharacteristic: createCharacteristicMutation.mutate,
      ...createCharacteristicMutation,
    },
  };
};
