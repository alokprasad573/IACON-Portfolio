
import Screen from "../ui/Screen";
import Image from "next/image";
import { FileCheck } from "lucide-react";


const Credentials = ({ certifications, index }) => {
  return (
    <section
      className="sticky top-0 w-full min-h-screen h-fit bg-black border-t border-yellow-500/10 pointer-events-none"
      style={{ zIndex: index }}
    >
      <div className="relative w-full h-full min-h-screen flex items-center justify-center p-4 md:p-12 pointer-events-auto">
        <div className="w-full h-full max-w-[1600px] flex justify-center items-center p-8">
          <div className="w-full h-fit flex flex-col">
            <div className="mb-8 shrink-0">
              <h2 className="text-4xl md:text-6xl text-zinc-300 mb-2">Verified Clearance</h2>
              <p className="text-yellow-500  text-xs my-2 tracking-[0.2em] ">Official Credentials</p>
              <div className="h-1 w-24 bg-yellow-500 shadow-[0_0_15px_#FFD700]"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-2 gap-6">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credentials;