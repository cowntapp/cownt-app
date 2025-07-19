import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AnimalPath } from '../../interfaces/animalType';
import type { OwnerFormData } from '../schemas/ownerSchema';
import { useNavigate } from 'react-router';
import { editOwner } from '../actions/editOwner';
import type { ApiError } from '@/api/lib/ApiError';
import { toast } from 'sonner';
import { i18n_errors } from '@/shared/translations/translations';

interface EditMutationVariables {
  ownerId: string;
  data: OwnerFormData;
}

export const useEditOwner = (animalType: AnimalPath) => {
  const queryClient = useQueryClient();
  const navigte = useNavigate();

  const editOwnerMutation = useMutation({
    mutationFn: ({ ownerId, data }: EditMutationVariables) =>
      editOwner(ownerId, data),
    onError: (error: ApiError) => {
      if (error?.status && error.status !== 500) {
        toast.error(error.message);
      } else {
        toast.error(i18n_errors[500]);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['owners'], type: 'all' });
      toast.success('Propietari actualitzat amb èxit');
      navigte(`/${animalType}/owners`);
    },
  });

  return {
    editOwnerMutation: {
      editOwner: editOwnerMutation.mutate,
      ...editOwnerMutation,
    },
  };
};
