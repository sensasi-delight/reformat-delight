import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// vendors
import { useContext } from "react";
import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useMatches,
} from "@remix-run/react";
// material
import { withEmotionCache } from "@emotion/react";
import { unstable_useEnhancedEffect as useEnhancedEffect } from "@mui/material/utils";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
// icons
import { MoveUpRightIcon } from "lucide-react";
//
import ClientStyleContext from "../themes/client-style-context";
import TopBar from "../components/top-bar";

interface MatchItem {
  handle: {
    [key: string]: string;
  };
}

const Layout = withEmotionCache(
  ({ children }: { children: React.ReactNode }, cache) => {
    const matches = useMatches() as MatchItem[];
    const clientStyleData = useContext(ClientStyleContext);

    useEnhancedEffect(() => {
      cache.sheet.container = document.head;
      const tags = cache.sheet.tags;
      cache.sheet.flush();
      tags.forEach((tag) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (cache.sheet as any)._insertTag(tag);
      });
      clientStyleData.reset();
    }, []);

    return (
      <html lang="en" suppressHydrationWarning>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <meta
            name="emotion-insertion-point"
            content="emotion-insertion-point"
          />
        </head>
        <body>
          <InitColorSchemeScript attribute="class" />

          <Box mb={8}>
            <TopBar />
          </Box>

          <Container
            maxWidth="md"
            component="main"
            sx={{
              minHeight: "calc(100vh - 256px)",
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              {matches.find((m) => m.handle)?.handle.pageTitle}
            </Typography>

            <Typography
              variant="body1"
              component="p"
              mb={4}
              color="textSecondary"
            >
              {matches.find((m) => m.handle)?.handle.pageDescription}
            </Typography>

            <Alert severity="info">
              <Typography variant="caption">
                <strong>Data Privacy:</strong> All conversions happen locally in
                your browser - we never see your data.
              </Typography>
            </Alert>

            {children}
          </Container>

          <Box mt={8} mb={2}>
            <Typography
              variant="caption"
              component="footer"
              color="textSecondary"
            >
              <Container maxWidth="md">
                Reformat Delight. Made with ❤️ by{" "}
                <Link href="https://github.com/sensasi-delight" target="_blank">
                  🍕sensasi-delight
                  <MoveUpRightIcon size="0.875rem" />
                </Link>
                .
              </Container>
            </Typography>
          </Box>

          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    );
  }
);

export default Layout;
