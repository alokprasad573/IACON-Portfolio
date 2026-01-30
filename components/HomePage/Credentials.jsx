
import Screen from "../ui/Screen";
import Image from "next/image";
import { FileCheck, Activity } from "lucide-react";


const Credentials = ({ certifications, index }) => {
  return (
    <section
      id="clearences"
      className="relative w-full min-h-screen bg-black  pointer-events-none px-16 py-20"
    >
      <div className="relative w-full flex flex-col">
        <div className="mb-15 shrink-0">
          <h2 className="text-4xl md:text-6xl text-zinc-300 mb-2">Verified Clearance</h2>
          <p className="text-yellow-500  text-xs my-2 tracking-[0.2em] ">Official Credentials</p>
          <div className="h-1 w-24 bg-yellow-500 shadow-[0_0_15px_#FFD700]"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-2 gap-6 pointer-events-auto">
          {certifications.map((cert, i) => (
            <Screen key={i} className="">
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-15 h-15 shrink-0 border border-yellow-500/20 overflow-hidden bg-white/5">
                  <Image
                    src={cert.logo}
                    alt={cert.organization}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-zinc-100 text-sm font-bold leading-tight border-b border-yellow-500/20 pb-2 mb-1">{cert.title}</h4>
                  <p className="text-zinc-400 text-[12px]">{cert.organization}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {cert.learnings.slice(0, 6).map(l => (
                  <span key={l} className="px-2 py-1 bg-yellow-500/10 text-zinc-400 text-[10px] border border-yellow-500/20 tracking-wider">
                    {l}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center w-full">
                <a
                  href={cert.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[10px] font-bold text-brand-yellow hover:text-brand-yellow transition-colors uppercase tracking-widest"
                >
                  <FileCheck size={20} /> View_Certificate
                </a>
                <span className="text-[10px] text-green-500/60 font-mono">VERIFIED</span>
              </div>
            </Screen>
          ))}
        </div>
        {/* Footer */}
        <div className="w-full mt-75 relative flex justify-center items-end pb-2 pointer-events-auto">
          {/* Left HUD */}
          <div className="absolute bottom-0 left-0 tracking-[0.4em] text-[12px] text-zinc-500 opacity-50 hidden md:block">
            Autobot Comd Center // IACON
          </div>

          {/* Center Links */}
          <div className="flex flex-col gap-3 items-center justify-center font-black uppercase text-[10px] tracking-[0.3em] text-gray-500">
            <div className="flex gap-6">
              {[
                { name: "Archive", url: "https://github.com/alokprasad573" },
                { name: "SparkConnect", url: "https://www.linkedin.com/in/alok-prasad-474962289/" },
                { name: "Email", url: "#" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="relative group transition-all duration-300 hover:text-yellow-500 hover:scale-110"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-yellow-500 shadow-[0_0_8px_#EAB308] group-hover:w-full transition-all duration-500"></span>
                </a>
              ))}
            </div>

            <p className="text-yellow-500/20 text-[12px] tracking-[0.4em] uppercase animate-pulse">
              End Of Transmission // ©2027
            </p>
          </div>

          {/* Right HUD */}
          <div className="absolute bottom-0 right-0 flex items-center gap-2 tracking-[0.4em] text-[12px] text-zinc-500 opacity-50 md:flex">
            <Activity size={12} className="animate-pulse" />
            <span>CYBRTRN OS V4.2.6</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credentials;