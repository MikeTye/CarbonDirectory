import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Carbon Economy",
  description: "The climate system is now searchable.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-tce-ink text-tce-mist antialiased">{children}</body>
    </html>
  );
}