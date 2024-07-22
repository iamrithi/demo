import type { Metadata } from "next";
import { Lato } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";
import Provider from "@/query-client/provider";

const lato = Lato({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Veterans Outreach",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session) {
  }
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <Provider>
          <body className={lato.className}>{children}</body>
        </Provider>
        <Toaster richColors closeButton />
      </html>
    </SessionProvider>
  );
}
