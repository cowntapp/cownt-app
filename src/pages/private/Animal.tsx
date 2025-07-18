import type { EntityKey } from '@/config/interfaces/configInterfaces';
import { TypoH1 } from '@/shadcn/components/typography/TypoH1';
import { i18n_entities } from '@/shared/translations/translations';
import { Link, Navigate } from 'react-router';
import { useAnimalPage } from '@/features/animals/hooks/useAnimalPage';
import { useBreeds } from '@/features/animals/breeds/hooks/useBreeds';
import type { AnimalPath } from '@/features/animals/interfaces/animalType';
import {
  AnimalHeader,
  BasicInfoCard,
  FinancialInfoCard,
  CharacteristicsCard,
  MotherCard,
  ChildrenCard,
  StatusCard,
} from '@/features/animals/components';
import { getBreedName } from '@/features/animals/helpers/breedHelpers';
import { calculateAnimalProfit } from '@/features/animals/helpers/financialHelpers';
import { QueryBoundary } from '@/shared/components/QueryBoundary';
import { DeleteAnimalCard } from '@/features/animals/components/DeleteAnimalCard';
import { Button } from '@/shadcn/components/ui/button';

export const Animal = () => {
  const {
    isValidWorkspace,
    workspace,
    animalQuery,
    deleteAnimalMutation,
    editAnimalMutation,
  } = useAnimalPage();

  // Get breeds for resolving breed names
  const { breedsQuery } = useBreeds(workspace as AnimalPath);

  // Función para editar un animal
  const onEditAnimal = (
    field: string,
    value: string | number | string[] | null
  ) => {
    if (!animalQuery.data) return;

    const payload = { [field]: value };
    editAnimalMutation.editAnimal({
      animalId: animalQuery.data.id,
      payload,
    });
  };

  // Si el workspace no es válido, redirigir a 404
  if (!isValidWorkspace || !workspace) {
    return <Navigate to={'/not-found'} />;
  }

  return (
    <QueryBoundary query={animalQuery}>
      {(animal) => (
        <div>
          <AnimalHeader
            workspace={workspace}
            animalCode={animal.shortCode}
          />
          <main className="max-w-7xl">
            <div className="flex items-start gap-x-4 justify-between mb-6 mt-2">
              <TypoH1>
                Detalls {i18n_entities[workspace.slice(0, -1) as EntityKey]}{' '}
                {animal.shortCode}
              </TypoH1>
              <Button
                asChild
                className="hidden md:block"
              >
                <Link
                  to={`/${workspace}/new?origin=born&motherId=${animal.id}`}
                >
                  Registra nou part
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="col-span-1 lg:col-span-2 flex flex-col gap-y-6">
                <Button
                  className="block md:hidden text-center"
                  asChild
                >
                  <Link
                    to={`/${workspace}/new?origin=born&motherId=${animal.id}`}
                  >
                    Registra nou part
                  </Link>
                </Button>
                <StatusCard
                  absence={animal.absence}
                  absenceDetail={animal.absenceDetail}
                  onEditAbsence={(absence) => onEditAnimal('absence', absence)}
                  onEditAbsenceDetail={(absenceDetail) =>
                    onEditAnimal('absenceDetail', absenceDetail)
                  }
                  isEditingAbsence={editAnimalMutation.isPending}
                  isEditingAbsenceDetail={editAnimalMutation.isPending}
                />
                <BasicInfoCard
                  longCode={animal.longCode}
                  breed={animal.breed}
                  birthDate={animal.birthDate}
                  sex={animal.sex}
                  origin={animal.origin}
                  weight={animal.weight}
                  onEditWeight={(weight) => onEditAnimal('weight', weight)}
                  isEditingWeight={editAnimalMutation.isPending}
                />
                <FinancialInfoCard
                  purchasePrice={animal.buyPrice}
                  salePrice={animal.salePrice}
                  profit={calculateAnimalProfit(
                    animal.buyPrice,
                    animal.salePrice,
                    animal.children
                  )}
                  onEditPurchasePrice={(buyPrice) =>
                    onEditAnimal('buyPrice', buyPrice)
                  }
                  onEditSalePrice={(salePrice) =>
                    onEditAnimal('salePrice', salePrice)
                  }
                  isEditingPurchasePrice={editAnimalMutation.isPending}
                  isEditingSalePrice={editAnimalMutation.isPending}
                />
                <CharacteristicsCard
                  characteristics={animal.characteristics}
                  workspace={workspace}
                  onEditCharacteristics={(characteristics) =>
                    onEditAnimal('characteristics', characteristics)
                  }
                  isEditingCharacteristics={editAnimalMutation.isPending}
                />
              </div>

              <div className="col-span-1 flex flex-col gap-y-6">
                {animal.mother && (
                  <MotherCard
                    workspace={workspace}
                    mother={animal.mother}
                    motherBreedName={getBreedName(
                      animal.mother.breed,
                      breedsQuery.breeds
                    )}
                  />
                )}
                {animal.children.length > 0 && (
                  <ChildrenCard
                    workspace={workspace}
                    children={animal.children}
                  />
                )}
              </div>
              <div className="col-span-1 lg:col-span-2">
                <DeleteAnimalCard
                  longCode={animal.longCode}
                  onDeleteAnimal={() =>
                    deleteAnimalMutation.deleteAnimal({ animalId: animal.id })
                  }
                  isPending={deleteAnimalMutation.isPending}
                />
              </div>
            </div>
          </main>
        </div>
      )}
    </QueryBoundary>
  );
};
