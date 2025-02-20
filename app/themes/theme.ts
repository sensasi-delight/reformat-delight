import { createTheme } from "@mui/material/styles";

// Create a theme instance.
const theme = createTheme({
  colorSchemes: {
    light: true,
    dark: true,
  },
  cssVariables: {
    colorSchemeSelector: "class",
  },
});

export default theme;
