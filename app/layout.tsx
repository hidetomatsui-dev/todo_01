import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ToDo - シンプルなToDoアプリ",
  description: "タスクを追加・完了・削除できるシンプルなToDoアプリ",
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
