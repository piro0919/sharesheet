// eslint-disable-next-line filenames/match-exported
import "handsontable/dist/handsontable.full.min.css";
import type { Metadata } from "next";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "ress";
import "./globals.scss";

export const metadata: Metadata = {
  description:
    "Share Sheets を使用して、オンライン シェアシートを作成、編集しましょう。直感的かつ素早くシートの共有ができます。",
  title: "Share Sheets: オンライン シェアシート エディター",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
