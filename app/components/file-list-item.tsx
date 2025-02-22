// materials
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
// icons
import { DownloadIcon, FileIcon, Trash2Icon } from "lucide-react";
//
import type CustomFile from "~/types/custom-file";

export default function FileListItem({
  file,
  onDelete,
  divider,
}: {
  file: CustomFile;
  onDelete: (file: CustomFile) => void;
  divider: boolean;
}) {
  return (
    <>
      {divider && <Divider />}

      <ListItem>
        <ListItemAvatar
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <FileIcon />
        </ListItemAvatar>

        <Box
          display="flex"
          flexWrap="wrap"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Typography>{file.name}</Typography>

          <Box display="flex" alignItems="center" gap={1.5}>
            <Typography component="span" variant="body2" color="textSecondary">
              convert to
            </Typography>

            <Select
              margin="none"
              size="small"
              disabled
              value="xlsx"
              sx={{
                minWidth: "fit-content",
              }}
              slotProps={{
                input: {
                  sx: {
                    p: 0.5,
                    pl: 1.2,
                  },
                },
              }}
            >
              <MenuItem value="xlsx">XLSX</MenuItem>
            </Select>
          </Box>

          <Box display="flex" gap={2} alignItems="center">
            {file.resultUrl && (
              <IconButton
                aria-label="download"
                color="primary"
                href={file.resultUrl}
                download={file.name.replace(".csv", ".xlsx")}
              >
                <DownloadIcon />
              </IconButton>
            )}

            <IconButton
              size="small"
              aria-label="delete"
              color="error"
              edge="end"
              sx={{
                maxHeight: 24,
                maxWidth: 24,
              }}
              onClick={() => onDelete(file)}
            >
              <Trash2Icon />
            </IconButton>
          </Box>
        </Box>
      </ListItem>
    </>
  );
}
