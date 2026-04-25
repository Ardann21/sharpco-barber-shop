import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Scissors, Award } from "lucide-react";

const artisans = [
  { 
    name: "Luca Santoro", 
    role: "Founder & Master", 
    img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=1200",
    bio: "20 years of experience across Italy and London. Specialist in the architecture of the modern silhouette and traditional sharp-edge transitions.",
    awards: ["Best Master 2022", "Innovation Lead"]
  },
  { 
    name: "James Ward", 
    role: "Fade Specialist", 
    img: "https://images.unsplash.com/photo-1599566147214-ce487862ea4f?auto=format&fit=crop&q=80&w=1200",
    bio: "Winner of the NYC Fade Expo. Bringing modern urban energy to traditional shears.",
    awards: ["Fade Master 2023", "NYC Favorite"]
  },
  { 
    name: "Dimitri Volk", 
    role: "Beard Artisan", 
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1200",
    bio: "Obsessed with geometry. Transforming facial hair into architectural masterpieces.",
    awards: ["Beard Sculptor 2021", "Top 5 NY"]
  },
  { 
    name: "Sarah Chen", 
    role: "Creative Director", 
    img: "https://images.unsplash.com/photo-1600481176431-47ad2ab2745d?auto=format&fit=crop&q=80&w=1200",
    bio: "Editorial stylist with a passion for vintage revival and gender-neutral grooming.",
    awards: ["Creative Vision 2023"]
  }
];

export default function Artisans() {
  const navigate = useNavigate();

  const handleBook = (name: string) => {
    const params = new URLSearchParams();
    params.set("barber", name);
    navigate(`/booking?${params.toString()}`);
  };

  return (
    <div className="pt-32 pb-40 bg-[#060606] relative overflow-hidden min-h-screen">
      {/* Technical Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#c9a86a]/5 to-transparent pointer-events-none"></div>
      
      {/* technical scanline effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.02),rgba(0,0,255,0.02))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-32 group">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-[#c9a86a]"></div>
              <span className="text-[#c9a86a] text-[10px] font-black tracking-[0.5em] uppercase">
                The Artisans
              </span>
            </div>
            <h1 className="text-[50px] md:text-[100px] font-serif italic leading-[0.85] mb-8">
              Master Hands. <br /> Visionary <span className="text-[#c9a86a]">Styles.</span>
            </h1>
            <p className="text-white/40 text-xl font-light leading-relaxed max-w-2xl border-l border-white/5 pl-8 mt-12">
              Our barbers are not just employees; they are artisans dedicated to their craft. Every member of our collective brings a unique perspective and world-class skillset.
            </p>
          </div>
          
          <div className="hidden lg:flex flex-col items-end gap-4 text-right mb-4">
             <div className="text-[10px] font-mono text-white/20 tracking-widest uppercase">Barbershop Status: Open</div>
             <div className="flex gap-1.5 items-end h-8">
                {[1,2,3,4,5,6,7].map(i => (
                  <div key={i} className={`w-1 bg-[#c9a86a]/20 ${i === 7 ? 'h-full bg-[#c9a86a] animate-pulse' : 'h-1/2'}`}></div>
                ))}
             </div>
          </div>
        </header>

        <div className="space-y-40">
          {artisans.map((a, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-20 items-center relative group`}
            >
              <div className="lg:w-1/2 aspect-[4/5] rounded-[50px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 border border-white/10 relative">
                <img src={a.img} alt={a.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                
                {/* subtle identifier */}
                <div className="absolute top-8 left-8 p-3 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="text-[10px] font-mono text-white/40 tracking-[0.2em] uppercase">MEMBER NO. 0{idx + 1}</div>
                </div>
              </div>
              
              <div className="lg:w-1/2 relative">
                {/* Background Subtle Label */}
                <div className="absolute -top-10 -left-10 text-[60px] font-black text-white/[0.02] select-none pointer-events-none hidden lg:block uppercase tracking-tighter italic">
                   ARTISAN_0{idx + 1}
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <Scissors className="w-5 h-5 text-[#c9a86a]" />
                   <span className="text-[#c9a86a] text-xs font-black tracking-widest uppercase">{a.role}</span>
                </div>
                <h2 className="text-[50px] md:text-[70px] font-serif italic mb-8 leading-none relative">{a.name}</h2>
                <p className="text-white/50 text-lg font-light leading-relaxed mb-10 max-w-lg border-l border-[#c9a86a]/20 pl-6">
                  {a.bio}
                </p>
                
                <div className="flex flex-wrap gap-4 mb-12">
                   {a.awards.map((award, i) => (
                     <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors">
                        <Award className="w-3 h-3 text-[#c9a86a]" />
                        <span className="text-[10px] font-bold uppercase tracking-widest">{award}</span>
                     </div>
                   ))}
                </div>

                <button 
                  onClick={() => handleBook(a.name)}
                  className="group/btn relative bg-white text-black px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#c9a86a] transition-all flex items-center gap-3"
                >
                  Book with {a.name.split(' ')[0]}
                  <div className="w-2 h-2 bg-black rounded-full animate-pulse group-hover/btn:bg-white"></div>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
