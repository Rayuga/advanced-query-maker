import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "advance-query-maker",
  description:
    "A library to create complex search queries with AND/OR operators, NOT options, and parentheses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
