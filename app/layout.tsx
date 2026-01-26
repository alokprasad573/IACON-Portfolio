import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LiquidEther from "@/components/ui/LiquidEther";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="fixed inset-0 top-0 z-0 min-h-screen w-full pointer-events-none">
          <LiquidEther
            colors={['#eadaff', '#f8f3ff', '#dcd0ff']}
            mouseForce={13}
            cursorSize={95}
            isViscous
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={true}
            autoDemo
            autoSpeed={0.5}
            autoIntensity={0.8}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
        </div>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
