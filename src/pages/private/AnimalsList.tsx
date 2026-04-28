import type { AnimalPath } from '@/features/animals/interfaces/animalType';
import { Button } from '@/shadcn/components/ui/button';
import { QueryBoundary } from '@/shared/components/QueryBoundary';
import { autoTable } from 'jspdf-autotable';
import jsPDF from 'jspdf';
import { useAnimalsList } from '@/features/animals/hooks/useAnimalsList';
import { useRouterParams } from '@/shared/hooks/useRouterParams';

const AnimalsList = () => {
  const workspace = useRouterParams('workspace').workspace as AnimalPath;
  const { animalsListQuery } = useAnimalsList(workspace);
  const animalTitle = workspace === 'cows' ? 'Vaques' : 'Ovelles';

  const animalsList = animalsListQuery.animals ?? [];

  const handleDownloadPdf = () => {
    if (!animalsList.length) return;

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });

    doc.setFontSize(18);
    doc.text(`${animalTitle} Presents`, 40, 40);

    autoTable(doc, {
      startY: 60,
      head: [['Codi Curt', 'Codi Llarg', 'Propietari']],
      body: animalsList.map((animal) => [
        animal.shortCode ?? '',
        animal.longCode ?? '',
        animal.owner ?? '',
      ]),
      styles: {
        fontSize: 10,
        cellPadding: 6,
        valign: 'middle',
      },
      headStyles: {
        fillColor: [240, 240, 240],
        textColor: 20,
        fontStyle: 'bold',
      },
      alternateRowStyles: {
        fillColor: [250, 250, 250],
      },
      margin: { left: 40, right: 40 },
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

  return (
    <div>
      <h1 className="text-3xl font-bold my-8 text-center">
        {animalTitle} Presents ({animalsList.length})
      </h1>

      <Button
        disabled={!animalsList.length}
        onClick={handleDownloadPdf}
      >
        Descarregar Llista
      </Button>

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
