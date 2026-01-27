import type { Metadata } from "next";
import "./globals.css";
import MoonScene from "@/components/ui/MoonScene";
import GridOverlay from "@/components/ui/GridOverlay";
import SystemStatus from "@/components/ui/SystemStatus";

export const metadata: Metadata = {
  title: "My Portfolio",
  description: "My Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <div className="fixed inset-0 top-0 z-[0] min-h-screen w-full pointer-events-none overflow-hidden">
          <MoonScene />
        </div>
        <GridOverlay />
        <SystemStatus />
        <main className="relative z-10 min-h-screen w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
