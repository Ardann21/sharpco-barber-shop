import { motion, AnimatePresence } from "motion/react";
import { Clock, Scissors, Zap, Sparkles, Star, User, Shield, Target, Cpu, Activity, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const services = [
  { 
    id: "SRV-01",
    name: "The Signature Cut", 
    price: "€45", 
    duration: "45 MIN", 
    desc: "A bespoke styling experience. Includes our signature hot-towel treatment and a relaxing scalp massage.", 
    icon: Scissors,
    specs: ["Precision Cut", "Thermal Treatment", "Scalp Massage"]
  },
  { 
    id: "SRV-02",
    name: "Beard Sculpting", 
    price: "€25", 
    duration: "30 MIN", 
    desc: "Expert shaping of facial hair using traditional tools and premium botanical oils.", 
    icon: Zap,
    specs: ["Razor Detailing", "Hot Towel Finish", "Beard Oil Ritual"]
  },
  { 
    id: "SRV-03",
    name: "Classic Hot Shave", 
    price: "€40", 
    duration: "45 MIN", 
    desc: "The timeless barbershop ritual. Double steam cycles, pre-shave lubricants, and a straight-razor finish.", 
    icon: Sparkles,
    specs: ["Straight Razor", "Triple Steam", "Aftershave Balm"]
  },
  { 
    id: "SRV-04",
    name: "Precision Fade", 
    price: "€50", 
    duration: "60 MIN", 
    desc: "Our high-fidelity gradient cut. Seamless transitions executed with masterful technique.", 
    icon: Target,
    specs: ["Micro Taper", "Foil Shave", "Premium Styling"]
  },
  { 
    id: "SRV-05",
    name: "The Ultimate Ritual", 
    price: "€85", 
    duration: "90 MIN", 
    desc: "A complete grooming reset. The full combination of hair, beard, and facial treatments.", 
    icon: Star,
    specs: ["VIP Experience", "Full Service", "Refreshments"]
  },
  { 
    id: "SRV-06",
    name: "Young Gent's Cut", 
    price: "€35", 
    duration: "30 MIN", 
    desc: "Premium grooming for our younger clients under 12. Establishing the foundation of style.", 
    icon: User,
    specs: ["Youth Styling", "Modern Shape", "Quick Finish"]
  }
];

export default function Services() {
  return (
    <div className="pt-32 pb-40 bg-[#060606] relative overflow-hidden min-h-screen">
      {/* Background Technical Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#c9a86a]/5 to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.02),rgba(0,0,255,0.02))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-20"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="flex flex-col lg:flex-row justify-between items-end gap-12 mb-40">
           <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px w-8 bg-[#c9a86a]"></div>
                <span className="text-[#c9a86a] text-[10px] font-bold tracking-[0.5em] uppercase">Signature Menu</span>
              </div>
              <h1 className="text-[60px] md:text-[110px] font-serif italic leading-[0.85] mb-12">
                Our <br /> <span className="text-[#c9a86a]">Services.</span>
              </h1>
              <p className="text-white/40 text-lg font-light leading-relaxed max-w-xl">
                Crafting confidence through technical excellence. Select your treatment from our collection of premium services.
              </p>
           </div>
           
           <div className="flex flex-col items-end gap-2 text-right">
              <div className="text-[10px] text-white/20 font-mono tracking-widest uppercase">Barbers Ready</div>
              <div className="flex gap-1">
                 {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-3 bg-[#c9a86a]/20"></div>)}
                 <div className="w-1 h-3 bg-[#c9a86a] animate-pulse"></div>
              </div>
           </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {services.map((s, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-white/[0.01] rounded-[40px] border border-white/5 transition-all duration-500 group-hover:border-[#c9a86a]/40 group-hover:bg-[#c9a86a]/5"></div>
              
              <div className="relative p-10 md:p-14 flex flex-col md:flex-row gap-12">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-3xl bg-black border border-white/10 flex items-center justify-center text-[#c9a86a] group-hover:scale-110 transition-transform duration-500">
                     <s.icon className="w-10 h-10" />
                  </div>
                  <div className="mt-6 text-center">
                    <div className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{s.id}</div>
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-3xl md:text-4xl font-serif italic">{s.name}</h3>
                    <div className="text-2xl font-serif italic text-white group-hover:text-[#c9a86a] transition-colors">{s.price}</div>
                  </div>
                  
                  <p className="text-white/40 font-light leading-relaxed mb-8 max-w-sm">{s.desc}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                    {s.specs.map((spec, i) => (
                       <div key={i} className="flex items-center gap-2">
                          <div className="w-1 h-1 bg-[#c9a86a] rounded-full"></div>
                          <span className="text-[10px] text-white/40 uppercase tracking-widest">{spec}</span>
                       </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-10 border-t border-white/5">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#c9a86a]">
                        <Clock className="w-3 h-3" />
                        {s.duration}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest text-white/20">
                        <Shield className="w-3 h-3" />
                        SECURE
                      </div>
                    </div>
                    
                    <Link 
                      to="/booking"
                      className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-white group-hover:text-[#c9a86a] transition-colors relative"
                    >
                      <motion.span
                        whileHover={{ x: -2 }}
                        className="flex items-center gap-2"
                      >
                        Book Now <ArrowRight className="w-4 h-4 text-[#c9a86a] group-hover:translate-x-1 transition-transform" />
                      </motion.span>
                      
                      {/* Interactive Underline */}
                      <motion.div 
                        initial={{ width: 0 }}
                        whileHover={{ width: "100%" }}
                        className="absolute -bottom-1 left-0 h-[1px] bg-[#c9a86a]/40"
                      />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="absolute top-4 right-4 w-4 h-[1px] bg-[#c9a86a]"></div>
                 <div className="absolute top-4 right-4 h-4 w-[1px] bg-[#c9a86a]"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Footer Section */}
        <div className="mt-40 relative group">
           <div className="absolute inset-0 bg-white/[0.02] border border-white/5 rounded-[60px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <div className="relative p-12 md:p-24 rounded-[60px] bg-black border border-white/5 flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-8 flex gap-2">
                 <Cpu className="w-8 h-8 text-[#c9a86a]/10" />
                 <Activity className="w-8 h-8 text-[#c9a86a]/10" />
              </div>
              
              <div className="max-w-xl">
                 <span className="text-[#c9a86a] text-[10px] font-bold tracking-[0.5em] uppercase mb-6 block">Bespoke Experiences</span>
                 <h2 className="text-4xl md:text-5xl font-serif mb-8 italic">Need a custom <span className="text-[#c9a86a]">Treatment?</span></h2>
                 <p className="text-white/40 text-lg font-light leading-relaxed">For events, group bookings, or complete aesthetic changes, our master barbers can develop a custom grooming experience tailored to your vision.</p>
              </div>
              
              <Link 
                to="/contact"
                className="flex-shrink-0 bg-white text-black px-14 py-8 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#c9a86a] transition-all relative z-10 shadow-[0_20px_50px_rgba(255,255,255,0.1)] block"
              >
                 Inquire Now
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}

