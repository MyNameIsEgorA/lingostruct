import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Providers from "@/components/ overall/Providers";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient()

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} id={"__next"}>
          {children}    
      </body>
    </html>
  );
}
