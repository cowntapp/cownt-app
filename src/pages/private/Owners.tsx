import {
  loadingOwnerColumns,
  ownerColumns,
} from '@/features/animals/owners/components/columns';
import { OwnersHeader } from '@/features/animals/owners/components/OwnersHeader';
import { useDeleteOwner } from '@/features/animals/owners/hooks/useDeleteOwner';
import { useOwners } from '@/features/animals/owners/hooks/useOwners';
import { DataTable } from '@/shadcn/components/ui/data-table';
import { QueryBoundary } from '@/shared/components/QueryBoundary';

export const Owners = () => {
  const { ownersQuery } = useOwners();
  const { deleteOwnerMutation } = useDeleteOwner();

  const onRefetch = () => ownersQuery.refetch();
  const onOwnerDelete = (ownerId: string) => {
    deleteOwnerMutation.deleteOwner({ ownerId });
  };

  return (
    <div>
      <OwnersHeader
        onRefetch={onRefetch}
        isFetching={ownersQuery.isFetching}
      />

      <QueryBoundary
        query={ownersQuery}
        loaderComponent={
          <DataTable
            columns={loadingOwnerColumns}
            data={new Array(3)}
          />
        }
      >
        {({ owners }) => (
          <DataTable
            columns={ownerColumns({ onOwnerDelete })}
            data={owners}
          />
        )}
      </QueryBoundary>
    </div>
  );
};
