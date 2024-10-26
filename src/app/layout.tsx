import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const title: string = "デカ文字ジェネレータ";
const description: string =
  "カタカナ、英数字、記号をデカいアスキーアートに変換できます。";

// https://nextjs.org/docs/14/app/building-your-application/optimizing/metadata
// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
export const metadata: Metadata = {
  title: title,
  description: description,
  metadataBase: new URL("https://dekamoji-generator.com/"),
  alternates: {
    canonical: "/",
    languages: {
      "ja-JP": "/",
      "en-US": "/en-US",
      "de-DE": "/de-DE",
    },
  },
  openGraph: {
    title: title,
    description: description,
    images: "/opengraph-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: ["https://dekamoji-generator.com/twitter-image.png"], // Must be an absolute URL
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
