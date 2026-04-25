import { Link } from "react-router-dom";
import { Scissors, MapPin, Clock, Instagram, Facebook, ArrowUp, Send, Globe, Shield } from "lucide-react";
import { motion } from "motion/react";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 bg-black pt-60 pb-12 px-6 overflow-hidden">
      {/* Background Transition Gradient */}
      <div className="absolute top-0 left-0 w-full h-80 bg-gradient-to-b from-[#060606] via-[#060606]/50 to-black -translate-y-full pointer-events-none"></div>

      {/* Background Tech Pulse */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#c9a86a]/5 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-40 mb-60">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-12 bg-[#c9a86a]"></div>
                <span className="text-[#c9a86a] text-[10px] tracking-[0.5em] uppercase">Join The Collective</span>
              </div>
              <h2 className="text-[60px] md:text-[110px] font-serif italic text-white leading-[0.85] mb-20">
                Defining <br /> The New <br /> <span className="text-[#c9a86a] underline decoration-1 underline-offset-[20px]">Elegance.</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/20">
                  <MapPin className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Location</span>
                </div>
                <p className="text-white/60 text-lg font-light leading-relaxed">
                  72 Madison Ave, <br /> New York, NY 10016
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/20">
                  <Clock className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Ritual Hours</span>
                </div>
                <div className="text-white/60 text-lg font-light leading-relaxed">
                  <p>Mon — Sat: 09:00 — 20:00</p>
                  <p>Sun: By Invite Only</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white/[0.02] border border-white/5 p-12 md:p-16 rounded-[60px] backdrop-blur-3xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8">
                <Send className="w-8 h-8 text-[#c9a86a]/20" />
              </div>
              
              <h3 className="text-4xl font-serif mb-6 italic">Stay Updated</h3>
              <p className="text-white/40 mb-12 font-light text-lg">Receive exclusive invitations to special releases and elite grooming rituals.</p>
              
              <form className="space-y-10" onSubmit={e => e.preventDefault()}>
                <div className="relative group">
                  <input 
                    type="email"
                    placeholder="Email Address" 
                    className="w-full bg-transparent border-b border-white/10 py-6 text-xl focus:outline-none focus:border-[#c9a86a] transition-all font-serif italic" 
                  />
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#c9a86a] group-focus-within:w-full transition-all duration-700"></div>
                </div>
                <button className="w-full h-20 bg-white text-black font-black uppercase tracking-[0.4em] text-[10px] rounded-full hover:bg-[#c9a86a] transition-all flex items-center justify-center gap-4 group">
                  Subscribe Now
                  <ArrowUp className="w-4 h-4 rotate-45 group-hover:rotate-90 transition-transform" />
                </button>
              </form>

              <div className="mt-12 flex gap-6 grayscale opacity-20 hover:opacity-40 transition-opacity">
                <Globe className="w-5 h-5" />
                <Shield className="w-5 h-5" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Semantic Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 pt-16 border-t border-white/5">
           <div className="flex items-center gap-4 group cursor-pointer" onClick={scrollToTop}>
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#c9a86a] transition-colors">
              <Scissors className="w-5 h-5 text-[#c9a86a]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xs uppercase tracking-[0.2em]">Sharp & Co</span>
              <span className="text-[8px] text-white/20 uppercase tracking-[0.4em]">Est. MMXI</span>
            </div>
          </div>

          <nav className="flex gap-12">
            <Link to="/terms" className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/20 hover:text-[#c9a86a] transition-colors">Terms of Service</Link>
            <Link to="/privacy" className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/20 hover:text-[#c9a86a] transition-colors">Privacy Policy</Link>
            <Link to="/careers" className="text-[9px] font-bold tracking-[0.3em] uppercase text-white/20 hover:text-[#c9a86a] transition-colors">Careers</Link>
          </nav>

          <div className="flex items-center gap-10">
            <div className="flex gap-6">
              <Instagram className="w-5 h-5 text-white/20 hover:text-[#c9a86a] transition-colors cursor-pointer" />
              <Facebook className="w-5 h-5 text-white/20 hover:text-[#c9a86a] transition-colors cursor-pointer" />
            </div>
            <div className="h-8 w-px bg-white/5"></div>
            <button 
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#c9a86a] hover:text-black transition-all"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[8px] text-white/10 uppercase tracking-[0.6em]">© 2024 SHARP & CO. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
};
