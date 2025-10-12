import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "東工大マリオカートサークル",
  description: "東工大マリオカートサークルのブログ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
