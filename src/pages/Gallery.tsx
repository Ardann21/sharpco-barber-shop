import { motion } from "motion/react";

const frames = [
  10, 25, 40, 55, 70, 85, 100, 115, 130, 145, 160, 175, 
  30, 60, 90, 120, 150, 180, 15, 45, 75, 105, 135, 165
];

export default function Gallery() {
  return (
    <div className="pt-32 pb-40 bg-[#060606] relative overflow-hidden min-h-screen">
      {/* Technical Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#c9a86a]/5 to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.02),rgba(0,0,255,0.02))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-32 group">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-[#c9a86a]"></div>
              <span className="text-[#c9a86a] text-[10px] font-black tracking-[0.5em] uppercase">
                Our Gallery
              </span>
            </div>
            <h1 className="text-[50px] md:text-[100px] font-serif italic leading-[0.85] mb-8">
              Visions Of <br /> New <span className="text-[#c9a86a]">Appearances.</span>
            </h1>
            <p className="text-white/40 text-xl font-light leading-relaxed max-w-2xl border-l border-white/5 pl-8 mt-12">
              A visual documentation of transformations, tools of the trade, and the atmosphere that makes Sharp & Co the premier grooming destination.
            </p>
          </div>

          <div className="hidden lg:flex flex-col items-end gap-4 text-right mb-4">
             <div className="text-[10px] font-mono text-white/20 tracking-widest uppercase">Total Captures: {frames.length}</div>
             <div className="flex gap-1.5 items-end h-8">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className={`w-1 bg-[#c9a86a]/20 ${i === 6 ? 'h-full bg-[#c9a86a] animate-pulse' : 'h-2/3'}`}></div>
                ))}
             </div>
          </div>
        </header>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {frames.map((f, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: (i % 6) * 0.1 }}
               className="relative group rounded-3xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700"
             >
                <img 
                  src={`/photos/${f.toString().padStart(4, '0')}.jpg`} 
                  alt={`Gallery ${f}`} 
                  loading="lazy"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-1000"
                />
                
                {/* Technical Overlay */}
                <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform -translate-y-2 group-hover:translate-y-0">
                  <div className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-full font-mono text-[8px] text-white/40 uppercase tracking-widest">
                    FRAME {f.toString().padStart(2, '0')}
                  </div>
                </div>

                <div className="absolute inset-0 bg-[#c9a86a]/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="relative">
                      <div className="absolute inset-0 blur-xl bg-[#c9a86a]/20 rounded-full"></div>
                      <span className="relative text-[10px] font-black tracking-[0.3em] uppercase border border-[#c9a86a]/40 bg-black/40 backdrop-blur-xl px-10 py-4 rounded-full">View Appearance</span>
                   </div>
                </div>
             </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
