import {
  createAnimalsDocxFile,
  createAnimalsPdfDoc,
} from '@/shared/utils/exportAnimalsDocs';

import type { AnimalPath } from '@/features/animals/interfaces/animalType';
import { Button } from '@/shadcn/components/ui/button';
import { QueryBoundary } from '@/shared/components/QueryBoundary';
import { useAnimalsList } from '@/features/animals/hooks/useAnimalsList';
import { useRouterParams } from '@/shared/hooks/useRouterParams';

const AnimalsList = () => {
  const workspace = useRouterParams('workspace').workspace as AnimalPath;
  const { animalsListQuery } = useAnimalsList(workspace);
  const animalTitle = workspace === 'cows' ? 'Vaques' : 'Ovelles';

  const animalsList = animalsListQuery.animals ?? [];

  const codes = animalsList
    .map((animal) => animal.shortCode)
    .filter((code): code is string => Boolean(code));

  const columns = 4;

  const handleCreatePdf = () => {
    if (!codes.length) return;

    const doc = createAnimalsPdfDoc({
      title: animalTitle,
      codes,
      columns,
    });

    const date = new Date();
    const year = date.getFullYear();
    const month = new Intl.DateTimeFormat('ca', { month: 'short' })
      .format(date)
      .toLowerCase()
      .replace('.', '');
    const day = String(date.getDate()).padStart(2, '0');

    doc.save(
      `${animalTitle.toLowerCase()}-presents-${year}-${month}-${day}.pdf`,
    );
  };

  const handleCreateDocx = async () => {
    if (!codes.length) return;

    const file = await createAnimalsDocxFile({
      title: animalTitle,
      codes,
      columns,
    });

    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold my-8 text-center">
        {animalTitle} Presents ({animalsList.length})
      </h1>

      <div className="space-x-4 space-y-4">
        <Button
          disabled={!animalsList.length}
          onClick={handleCreatePdf}
        >
          Descarregar Pdf
        </Button>
        <Button
          disabled={!animalsList.length}
          onClick={handleCreateDocx}
        >
          Descarregar Word
        </Button>
      </div>

      <QueryBoundary query={animalsListQuery}>
        {({ animalsList }) => (
          <div className="overflow-auto max-h-[70vh] border rounded-xl my-12">
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 border-b bg-background">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">
                    Codi Curt
                  </th>
                  <th className="text-left px-4 py-3 font-semibold">
                    Codi Llarg
                  </th>
                  <th className="text-left px-4 py-3 font-semibold">
                    Propietari
                  </th>
                </tr>
              </thead>

              <tbody>
                {animalsList.map((animal, index) => (
                  <tr
                    key={animal.longCode}
                    className={
                      index % 2 === 0 ? 'bg-primary/10' : 'bg-background'
                    }
                  >
                    <td className="px-4 py-2">{animal.shortCode}</td>
                    <td className="px-4 py-2 font-medium">{animal.longCode}</td>
                    <td className="px-4 py-2">{animal.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </QueryBoundary>
    </div>
  );
};

export default AnimalsList;
