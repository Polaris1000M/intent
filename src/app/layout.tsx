import type { Metadata } from "next";
import { Fira_Code, Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const firaCode = Fira_Code({
  variable: "--font-mono",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Intent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        firaCode.variable,
        inter.variable,
        merriweather.variable,
      )}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
