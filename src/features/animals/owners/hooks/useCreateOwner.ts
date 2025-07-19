import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import type { OwnerFormData } from '../schemas/ownerSchema';
import { createOwner } from '../actions/createOwner';
import type { ApiError } from '@/api/lib/ApiError';
import { toast } from 'sonner';
import { i18n_errors } from '@/shared/translations/translations';
import type { AnimalPath } from '../../interfaces/animalType';

export const useCreateOwner = (animalPath: AnimalPath) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createOwnerMutation = useMutation({
    mutationFn: (data: OwnerFormData) => createOwner(data),
    onError: (error: ApiError) => {
      if (error.status && error.status !== 500) {
        toast.error(error.message);
      } else {
        toast.error(i18n_errors[500]);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['owners'] });
      toast.success('Propietari creat amb èxit');
      navigate(`/${animalPath}/owners`);
    },
  });

  return {
    createOwnerMutation: {
      createOwner: createOwnerMutation.mutate,
      ...createOwnerMutation,
    },
  };
};
