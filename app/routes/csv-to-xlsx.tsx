// vendors
import { useState } from "react";
import { useDropzone } from "react-dropzone-esm";
// materials
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
// icons
import { CloudUploadIcon, RefreshCwIcon, Trash2Icon } from "lucide-react";
//
import type CustomFile from "~/types/custom-file";
import csvToXlsx from "~/utils/csv-to-xlsx";
import FileListItem from "~/components/file-list-item";

export default function CsvToXlsx() {
  const [files, setFiles] = useState<CustomFile[]>([]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/csv": [".csv"],
    },
    multiple: true,
    onDrop: handleFilesChange,
  });

  function handleFilesChange(newFiles: File[]) {
    setFiles((prev) => {
      // Remove duplicate files
      const uniqueFiles = newFiles.filter(
        (newFile) => !prev.some((prevFile) => newFile.name === prevFile.name)
      );

      return [...prev, ...uniqueFiles];
    });
  }

  function handleDeleteFile(file: CustomFile) {
    if (file.resultUrl) {
      URL.revokeObjectURL(file.resultUrl);
    }

    setFiles((prev) => prev.filter((f) => f !== file));
  }

  function deleteAllFiles() {
    files.forEach((file) => {
      if (file.resultUrl) {
        URL.revokeObjectURL(file.resultUrl);
      }
    });

    setFiles([]);
  }

  function handleConvert() {
    const unconvertedFiles = files.filter((file) => !file.resultUrl);

    if (unconvertedFiles.length > 0) {
      unconvertedFiles.forEach(async (file) => {
        file.resultUrl = await csvToXlsx(file);

        setFiles((prevFiles) =>
          prevFiles.map((f) => {
            if (f === file) {
              return file;
            }

            return f;
          })
        );
      });
    }
  }

  return (
    <div>
      <Paper
        {...getRootProps()}
        variant="outlined"
        sx={{
          p: 4,
          border: "2px dashed",
          borderColor: "primary.main",
          backgroundColor: isDragActive ? "action.hover" : "background.paper",
          textAlign: "center",
          cursor: "pointer",
          "&:hover": {
            borderColor: "primary.dark",
          },
        }}
      >
        <input {...getInputProps()} />
        <CloudUploadIcon size={64} color="var(--mui-palette-primary-main)" />
        <Typography variant="body2">
          {isDragActive
            ? "Drop the file(s) here"
            : "Drag the file(s) here or click to upload"}
        </Typography>
      </Paper>

      {files.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
            Your file(s):
          </Typography>

          <List>
            {files.map((file, i) => (
              <FileListItem
                key={file.name}
                file={file}
                onDelete={handleDeleteFile}
                divider={i !== files.length - 1}
              />
            ))}
          </List>

          <Box display="flex" justifyContent="flex-end" mt={2} gap={2}>
            <Button
              aria-label="delete all"
              color="error"
              onClick={deleteAllFiles}
              startIcon={<Trash2Icon size={16} />}
            >
              Delete All
            </Button>

            <Button
              aria-label="convert"
              disabled={
                !files.map((file) => file.resultUrl).includes(undefined)
              }
              onClick={handleConvert}
              variant="contained"
              size="large"
              startIcon={<RefreshCwIcon />}
            >
              Convert
            </Button>
          </Box>
        </>
      )}
    </div>
  );
}

export const handle = {
  pageTitle: "CSV to XLSX",
  pageDescription:
    "Convert CSV to XLSX instantly with Reformat Delight - No registration required. Free online tool for spreadsheet conversions.",
};
