import { blue } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  colorSchemes: {
    light: true,
    dark: {
      palette: {
        primary: {
          main: blue[500],
        },
        Alert: {
          infoStandardBg: "#001b30",
        },
      },
    },
  },
  palette: {
    background: {
      default: "#F1FAFF",
      paper: "#F1FAFF",
    },
    primary: {
      main: blue[800],
    },
  },
  cssVariables: {
    colorSchemeSelector: "class",
  },
});

export default theme;
