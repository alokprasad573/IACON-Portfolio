
import CyberFrame from "@/components/screens/CyberFrame";
import Image from "next/image";
import { FileCheck, Activity } from "lucide-react";


const Credentials = ({ certifications, index }) => {
  return (
    <section
      id="clearences"
      className="relative w-full min-h-screen  px-6 py-12 md:px-12 md:py-20"
    >
      <div className="relative w-full flex flex-col">
        <div className="mb-12 shrink-0">
          <h2 className="text-4xl md:text-6xl text-cyan-200 mb-2">Verified Clearance</h2>
          <p className="text-cyan-400  text-xs my-2 tracking-[0.2em] ">Command Seal</p>
          <div className="h-1 w-24 bg-cyan-400 shadow-[0_0_15px_#22d3ee]"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-2 gap-6 pointer-events-auto">
          {certifications.map((cert, i) => (
            <CyberFrame key={i} delay={i * 0.1} className="px-12 py-15">
              <div className="flex items-start gap-4 mb-4">
                <div className="relative w-14 h-14 shrink-0 border border-cyan-400/20 overflow-hidden bg-white/5">
                  <Image
                    src={cert.logo}
                    alt={cert.organization}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-cyan-100 text-sm font-bold leading-tight border-b border-cyan-400/20 pb-2 mb-1">{cert.title}</h4>
                  <p className="text-cyan-400/60 text-[12px]">{cert.organization}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {cert.learnings.slice(0, 6).map(l => (
                  <span key={l} className="px-2 py-1 bg-cyan-400/10 text-cyan-300 text-[10px] border border-cyan-400/20 tracking-wider">
                    {l}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center w-full">
                <a
                  href={cert.certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[10px] font-bold text-cyan-400 hover:text-cyan-200 transition-colors uppercase tracking-widest"
                >
                  <FileCheck size={20} /> View_Certificate
                </a>
                <span className="text-[10px] text-cyan-400 font-mono">VERIFIED</span>
              </div>
            </CyberFrame>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Credentials;