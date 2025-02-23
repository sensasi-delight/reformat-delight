import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
//
import DarkModeToggleButton from "./dark-mode-toggle-button";
import GitHubIcon from "./icons/git-hub";
import { MoveUpRightIcon } from "lucide-react";

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

        <span>
          <Tooltip
            title={
              <>
                GitHub
                <MoveUpRightIcon
                  size="0.875rem"
                  style={{
                    verticalAlign: "text-bottom",
                  }}
                />
              </>
            }
            arrow
          >
            <IconButton
              href="https://github.com/sensasi-delight/reformat-delight"
              color="inherit"
              target="_blank"
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
          <DarkModeToggleButton />
        </span>
      </Container>
    </AppBar>
  );
}
