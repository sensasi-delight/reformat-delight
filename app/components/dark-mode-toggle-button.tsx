import { useColorScheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Moon } from "lucide-react";

export default function DarkModeToggleButton() {
  const { mode, setMode } = useColorScheme();

  return (
    <Tooltip
      arrow
      title={mode === "dark" ? "Deactivate dark mode" : "Activate dark mode"}
    >
      <IconButton
        color="inherit"
        onClick={() => setMode(mode === "dark" ? "light" : "dark")}
      >
        <Moon />
      </IconButton>
    </Tooltip>
  );
}
