import "./globals.css";

export const metadata = {
  title: "My Portfolio",
  description: "My Portfolio Website",
};

import { SystemProvider } from "@/context/SystemContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        <SystemProvider>
          <main className="relative z-100 min-h-screen w-full">
            {children}
          </main>
        </SystemProvider>
      </body>
    </html>
  );
}
