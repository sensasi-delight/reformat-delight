import { utils, write } from "xlsx";

export default async function csvToXlsx(csvFile: File): Promise<string> {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      readerOnLoad(e, resolve);
    };

    reader.readAsText(csvFile);
  });
}

function readerOnLoad(
  e: ProgressEvent<FileReader>,
  resolve: (url: string) => void
) {
  const csvString = e.target?.result as string;
  const data = csvString
    .split("\n")
    .map((row) => row.replaceAll('"', "").split(","));

  const wb = utils.book_new();
  const ws = utils.aoa_to_sheet(data);
  utils.book_append_sheet(wb, ws, "Sheet1");

  const xlsxBuffer = write(wb, { type: "array", bookType: "xlsx" });
  const blob = new Blob([xlsxBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  resolve(URL.createObjectURL(blob));
}
