import type { Metadata } from "next";
import "./globals.css";
import LayoutWrapper from "@/app/(components)/(layouts)/LayoutWrapper";

export const metadata: Metadata = {
  title: "Harrison's Photobook",
  description: "I created this website to share my photography with those in the photos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LayoutWrapper>
          { children }
        </LayoutWrapper>
      </body>
    </html>
  );
}
