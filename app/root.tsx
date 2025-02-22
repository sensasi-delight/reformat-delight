import { Outlet } from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";

export { default as Layout } from "./components/layout";

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

export default function App() {
  return <Outlet />;
}

export const meta: MetaFunction = ({ matches }) => {
  const pageHandle = matches.find((m) => m.id === "root")?.handle as {
    pageTitle?: string;
    pageDescription?: string;
  };

  const pageTitle =
    (pageHandle?.pageTitle ? pageHandle.pageTitle + " — " : "") +
    "Reformat Delight — Free Online CSV to XLSX Converter";

  return [
    {
      title: pageTitle,
    },
    {
      name: "description",
      content:
        pageHandle?.pageDescription ??
        "Convert CSV to XLSX instantly with Reformat Delight - No registration required. Free online tool for perfect spreadsheet conversions with preview feature.",
    },

    { name: "author", content: "sensasi-delight" },

    {
      name: "keywords",
      content:
        "CSV to Excel, Online CSV Converter, Free XLSX Converter, Convert CSV to XLSX, Spreadsheet Converter",
    },
    {
      "og:title": "Reformat Delight - Free Online CSV to Excel Converter",
    },
    {
      "og:description":
        "Instant CSV to XLSX conversion. 100% free online tool with no data tracking.",
    },
    {
      "og:type": "website",
    },

    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: "Reformat Delight",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        description: "Free online CSV to Excel converter",
      },
    },
  ];
};
