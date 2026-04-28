import {
  AlignmentType,
  Document,
  Packer,
  Paragraph,
  TextRun,
  convertInchesToTwip,
} from 'docx';

import jsPDF from 'jspdf';

export type CreateAnimalsDocsParams = {
  title: string;
  codes: string[];
  columns?: number;
  date?: Date;
};

const formatDateLabel = (date: Date) => {
  const year = date.getFullYear();
  const month = new Intl.DateTimeFormat('ca', { month: 'short' })
    .format(date)
    .toLowerCase()
    .replace('.', '');
  const day = String(date.getDate()).padStart(2, '0');

  return { year, month, day, label: `${day}-${month}-${year}` };
};

export const createAnimalsPdfDoc = ({
  title,
  codes,
  columns: docColumns = 3,
  date = new Date(),
}: CreateAnimalsDocsParams) => {
  const { label } = formatDateLabel(date);

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const marginX = 40;
  const marginTop = 55;
  const marginBottom = 40;
  const gap = 18;
  const columns = docColumns;
  const lineHeight = 16;

  const colWidth = (pageWidth - marginX * 2 - gap * (columns - 1)) / columns;
  const availableHeight = pageHeight - marginTop - marginBottom;
  const itemsPerColumn = Math.floor(availableHeight / lineHeight);
  const itemsPerPage = itemsPerColumn * columns;

  const renderHeader = () => {
    doc.setFontSize(18);
    doc.text(`${title} Presents · ${label}`, marginX, 30);
    doc.setFontSize(11);
  };

  renderHeader();

  codes.forEach((code, index) => {
    if (index > 0 && index % itemsPerPage === 0) {
      doc.addPage();
      renderHeader();
    }

    const localIndex = index % itemsPerPage;
    const columnIndex = Math.floor(localIndex / itemsPerColumn);
    const rowIndex = localIndex % itemsPerColumn;

    const x = marginX + columnIndex * (colWidth + gap);
    const y = marginTop + rowIndex * lineHeight;

    doc.text(code, x, y);
  });

  return doc;
};

export const createAnimalsDocxFile = async ({
  title,
  codes,
  columns,
  date = new Date(),
}: CreateAnimalsDocsParams) => {
  const { label } = formatDateLabel(date);

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertInchesToTwip(0.5),
              right: convertInchesToTwip(0.5),
              bottom: convertInchesToTwip(0.5),
              left: convertInchesToTwip(0.5),
            },
          },
          column: {
            count: columns,
            space: convertInchesToTwip(0.25),
          },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 },
            children: [
              new TextRun({
                text: `${title} Presents · ${label}`,
                bold: true,
                size: 28,
              }),
            ],
          }),
          ...codes.map(
            (code) =>
              new Paragraph({
                spacing: { after: 120 },
                children: [
                  new TextRun({
                    text: code,
                    size: 20,
                  }),
                ],
              }),
          ),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);

  return new File([blob], `${title.toLowerCase()}-presents-${label}.docx`, {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
};
