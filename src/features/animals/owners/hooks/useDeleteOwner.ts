import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOwner } from '../actions/deleteOwner';
import type { ApiError } from '@/api/lib/ApiError';
import { toast } from 'sonner';
import { i18n_errors } from '@/shared/translations/translations';

interface MutationVariables {
  ownerId: string;
}

export const useDeleteOwner = () => {
  const queryClient = useQueryClient();

  const deleteOwnerMutation = useMutation({
    mutationFn: ({ ownerId }: MutationVariables) => deleteOwner(ownerId),
    onError: (error: ApiError) => {
      if (error.status && error.status !== 500) {
        toast.error(error.message);
      } else {
        toast.error(i18n_errors[500]);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['owners'], type: 'all' });
      toast.success('Propietari eliminat amb èxit');
    },
  });

  return {
    deleteOwnerMutation: {
      deleteOwner: deleteOwnerMutation.mutate,
      ...deleteOwnerMutation,
    },
  };
};
