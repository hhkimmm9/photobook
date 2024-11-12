import "./globals.css";
import type { Metadata } from "next";
import { Dancing_Script } from 'next/font/google';
import LayoutWrapper from "@/app/(components)/(layouts)/LayoutWrapper";

export const metadata: Metadata = {
  title: "Harrison's Photobook",
  description: "I created this website to share my photography with those in the photos.",
};

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={dancingScript.className}>
      <body className="antialiased">
        <LayoutWrapper>
          { children }
        </LayoutWrapper>
      </body>
    </html>
  );
}
