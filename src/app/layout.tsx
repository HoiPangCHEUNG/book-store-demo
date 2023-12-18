import { Theme } from "@radix-ui/themes";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";

import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Store Demo",
  description: "a demo site for book store, built with nextjs with radix-ui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* The suppressHydrationWarning only apply one level deep and won't affect its children */}
      {/* https://www.radix-ui.com/themes/docs/theme/dark-mode#automatic-background-color */}
      <body className={inter.className}>
        <StoreProvider>
          <Theme
            appearance="dark"
            accentColor="yellow"
            grayColor="slate"
            scaling="100%"
            radius="large"
          >
            {children}
          </Theme>
        </StoreProvider>
      </body>
    </html>
  );
}
