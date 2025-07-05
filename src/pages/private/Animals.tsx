import { useBreeds } from '@/features/animals/breeds/hooks/useBreeds';
import { useCharacteristics } from '@/features/animals/characteristics/hooks/useCharacteristics';
import { useAnimals } from '@/features/animals/hooks/useAnimals';
import { useAnimalWorkspace } from '@/features/animals/hooks/useAnimalWorkspace';
import {
  animalColumns,
  loadingAnimalsColumns,
} from '@/features/animals/components/columns';
import { TypoH1 } from '@/shadcn/components/typography/TypoH1';
import { DataTableScrollable } from '@/shadcn/components/ui/data-table';
import { QueryBoundary } from '@/shared/components/QueryBoundary';
import { i18n_entities } from '@/shared/translations/translations';
import type { EntityKey } from '@/config/interfaces/configInterfaces';
import { Navigate } from 'react-router';

export const Animals = () => {
  const { workspace, isValidWorkspace } = useAnimalWorkspace();

  // Siempre llamamos los hooks, pero solo usaremos los datos si el workspace es válido
  // Usamos un valor por defecto para evitar el error de hooks condicionales
  const validWorkspace = isValidWorkspace && workspace ? workspace : 'cows';

  const { animalsQuery } = useAnimals(validWorkspace);
  const { breedsQuery } = useBreeds(validWorkspace);
  const { characteristicsQuery } = useCharacteristics(validWorkspace);

  // Si el workspace no es válido, redirigir a 404
  if (!isValidWorkspace || !workspace) {
    return <Navigate to={'/not-found'} />;
  }

  // TODO: refactorizar para quitar esto tan feo!
  // Se hace un componente intermedio: AnimalsTable.
  // A este se le pasa por prop un workspace valido: animalType: AnimalPath
  // Aquí se hace la validación del workspace sin el hook feo useAnimalWorkspace. Simplemente se coge workspace de params, y si no es un workspace valido se retorna Navigate (a otro sitio).
  // Ver NewBreed.tsx y BreedsForm.tsx

  const { breeds = [] } = breedsQuery;
  const { characteristics = [] } = characteristicsQuery;

  // Get the entity name for the title
  const entityKey = workspace as EntityKey;
  const title = i18n_entities[entityKey] || workspace;

  return (
    <div className="w-full">
      <TypoH1>{title}</TypoH1>

      <QueryBoundary
        query={animalsQuery}
        loaderComponent={
          <DataTableScrollable
            filterColumnId="longCode"
            filterInputPlaceholder="Carregant..."
            columns={loadingAnimalsColumns}
            data={new Array(3)}
          />
        }
      >
        {(data) => {
          return (
            <DataTableScrollable
              key={`${workspace}-list-table`}
              filterColumnId="longCode"
              filterInputPlaceholder="Filtra per codi..."
              columns={animalColumns({
                breeds,
                characteristics,
                workspace,
              })}
              data={data}
            />
          );
        }}
      </QueryBoundary>
    </div>
  );
};
