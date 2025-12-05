import "./globals.css";
import { Provider } from "context/Provider";
import type { Metadata } from "next";
import { ReactDOM } from "next/dist/server/route-modules/app-page/vendored/rsc/entrypoints";

export const metadata: Metadata = {
  title: "東工大マリオカートサークル",
  description: "東工大マリオカートサークルのブログ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ref: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#link-relpreload
  ReactDOM.preload(
    "https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap",
    { as: "style" },
  );
  return (
    <html lang="ja">
      <Provider>
        <body>{children}</body>
      </Provider>
    </html>
  );
}
