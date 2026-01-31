import "./globals.css";
// import CityFrame from "@/components/ui/CityFrame";
// import CircuitFlux3D from "@/components/ui/CircuitFlux3D";

export const metadata = {
  title: "My Portfolio",
  description: "My Portfolio Website",
};

import { SystemProvider } from "@/context/SystemContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        {/* <div className="fixed inset-0 top-0 z-0 min-h-screen w-full pointer-events-none overflow-hidden"> */}
        {/* <CityFrame /> */}
        {/* <CircuitFlux3D /> */}
        {/* </div> */}
        <SystemProvider>
          <main className="relative z-100 min-h-screen w-full">
            {children}
          </main>
        </SystemProvider>
      </body>
    </html>
  );
}
