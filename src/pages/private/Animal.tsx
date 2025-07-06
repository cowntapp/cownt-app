import type { EntityKey } from '@/config/interfaces/configInterfaces';
import { TypoH1 } from '@/shadcn/components/typography/TypoH1';
import { i18n_entities } from '@/shared/translations/translations';
import { Navigate } from 'react-router';
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
} from '@/features/animals/components';
import { getBreedName } from '@/features/animals/helpers/breedHelpers';
import { calculateAnimalProfit } from '@/features/animals/helpers/financialHelpers';
import { QueryBoundary } from '@/shared/components/QueryBoundary';
import { DeleteAnimalCard } from '@/features/animals/components/DeleteAnimalCard';

export const Animal = () => {
  const { isValidWorkspace, workspace, animalQuery, deleteAnimalMutation } =
    useAnimalPage();

  // Get breeds for resolving breed names
  const { breedsQuery } = useBreeds(workspace as AnimalPath);

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
          <main>
            <TypoH1 className="my-2">
              Detalls de la {i18n_entities[workspace.slice(0, -1) as EntityKey]}{' '}
              {animal.shortCode}
            </TypoH1>
            <div className="container grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="col-span-1 lg:col-span-2 flex flex-col gap-y-6">
                <BasicInfoCard
                  longCode={animal.longCode}
                  breed={animal.breed}
                  birthDate={animal.birthDate}
                  sex={animal.sex}
                  origin={animal.origin}
                  weight={animal.weight}
                />
                <FinancialInfoCard
                  purchasePrice={animal.buyPrice}
                  salePrice={animal.salePrice}
                  profit={calculateAnimalProfit(
                    animal.buyPrice,
                    animal.salePrice,
                    animal.children
                  )}
                />
                <CharacteristicsCard
                  characteristics={animal.characteristics}
                  workspace={workspace}
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
