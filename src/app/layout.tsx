import type { Metadata } from "next";
import "./globals.css";
import { Inter, Merriweather } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Intent",
  description: "Habits, analytics, and goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", inter.variable, merriweather.variable)}
    >
      <body className="min-h-dvh flex flex-col">{children}</body>
    </html>
  );
}
