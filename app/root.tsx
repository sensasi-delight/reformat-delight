import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import { withEmotionCache } from "@emotion/react";
import { useContext } from "react";
import ClientStyleContext from "./themes/client-style-context";
import { unstable_useEnhancedEffect as useEnhancedEffect } from "@mui/material/utils";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import TopBar from "./components/top-bar";
import { Box, Container } from "@mui/material";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap",
  },
];

export const Layout = withEmotionCache(
  ({ children }: { children: React.ReactNode }, cache) => {
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

          <Container component="main">{children}</Container>

          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    );
  }
);

export default function App() {
  return <Outlet />;
}
