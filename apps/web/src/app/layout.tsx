import type { Metadata } from "next";
import "./globals.css";
import { Shell } from "@/components/Shell";

export const metadata: Metadata = {
  title: "Cominfy - Topluluk Yöneticisi Paneli",
  description: "Topluluklarınızı tek yerden yönetin.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased min-h-screen" suppressHydrationWarning>
        <Shell>
          {children}
        </Shell>
      </body>
    </html>
  );
}
