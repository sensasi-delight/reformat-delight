import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
//
import DarkModeToggleButton from "./dark-mode-toggle-button";

export default function TopBar() {
  return (
    <AppBar variant="outlined" elevation={0} color="inherit" position="static">
      <Container
        maxWidth="md"
        sx={{
          py: 0.5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          fontFamily="monospace"
          variant="h6"
          sx={{
            textDecoration: "none",
          }}
          component="a"
          href="/"
          color="inherit"
        >
          Reformat Delight
        </Typography>
        <DarkModeToggleButton />
      </Container>
    </AppBar>
  );
}
