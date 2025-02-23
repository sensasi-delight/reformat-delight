// vendors
import type { Writable } from "node:stream";
import type { EntryContext } from "@remix-run/node";
import { CacheProvider } from "@emotion/react";
import { PassThrough } from "node:stream";
import { RemixServer } from "@remix-run/react";
import createEmotionServer from "@emotion/server/create-instance";
import ReactDOMServer from "react-dom/server";
// materials
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import CssBaseline from "@mui/material/CssBaseline";
//
import createEmotionCache from "./themes/create-emotion-cache";
import theme from "./themes/theme";

const ABORT_TIMEOUT = 5000;

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  function MuiRemixServer() {
    return (
      <CacheProvider value={cache}>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <RemixServer context={remixContext} url={request.url} />
        </ThemeProvider>
      </CacheProvider>
    );
  }

  // Render the component to a string.
  const html = await new Promise<string>((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = ReactDOMServer.renderToPipeableStream(
      <MuiRemixServer />,
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          pipe(body);
          streamToString(body).then(resolve, reject);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error) {
          // eslint-disable-next-line no-param-reassign
          responseStatusCode = 500;
          if (shellRendered) {
            console.error("Error during SSR pass: ", error);
          }
        },
      }
    );

    setTimeout(abort, ABORT_TIMEOUT);
  });

  // Grab the CSS from emotion
  const { styles } = extractCriticalToChunks(html);

  let stylesHTML = "";

  styles.forEach(({ key, ids, css }) => {
    const emotionKey = `${key} ${ids.join(" ")}`;
    const newStyleTag = `<style data-emotion="${emotionKey}">${css}</style>`;
    stylesHTML = `${stylesHTML}${newStyleTag}`;
  });

  // Add the Emotion style tags after the insertion point meta tag
  const markup = html.replace(
    /<meta(\s)*name="emotion-insertion-point"(\s)*content="emotion-insertion-point"(\s)*\/>/,
    `<meta name="emotion-insertion-point" content="emotion-insertion-point"/>${stylesHTML}`
  );

  responseHeaders.set("Content-Type", "text/html");

  return new Response(`<!DOCTYPE html>${markup}`, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}

function streamToString(stream: Writable): Promise<string> {
  const chunks: Buffer[] = [];
  return new Promise<string>((resolve, reject) => {
    stream.on("data", (chunk: Buffer) => chunks.push(Buffer.from(chunk)));
    stream.on("error", (err: unknown) => reject(err));
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}
