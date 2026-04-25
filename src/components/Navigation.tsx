import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Scissors, Menu as MenuIcon, X, ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = [
    { name: "Home", path: "/", id: "01" },
    { name: "Services", path: "/services", id: "02" },
    { name: "Artisans", path: "/artisans", id: "03" },
    { name: "Gallery", path: "/gallery", id: "04" }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 border-b border-white/5 transition-colors duration-500 ${isOpen ? 'bg-black' : 'bg-black/40 backdrop-blur-md'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group relative z-50">
            <Scissors className="w-6 h-6 text-[#c9a86a] group-hover:rotate-12 transition-transform" />
            <span className="text-xl font-bold tracking-tighter uppercase font-sans whitespace-nowrap">
              Sharp & Co
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <li key={item.name} className="relative group">
                <Link 
                  to={item.path} 
                  className="flex flex-col text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 hover:text-[#c9a86a] transition-colors"
                >
                  <span className="text-[7px] text-[#c9a86a]/40 group-hover:text-[#c9a86a] mb-0.5 transition-colors font-mono tracking-normal">{item.id}</span>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-3">
               <div className="w-1.5 h-1.5 bg-[#c9a86a] rounded-full animate-pulse"></div>
               <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.3em]">Barbershop Open</span>
            </div>

            <Link 
              to="/booking"
              className="hidden md:flex items-center gap-2 bg-[#c9a86a] text-black px-6 py-2.5 rounded-full text-[12px] font-black uppercase tracking-wider hover:bg-white transition-all shadow-[0_5px_15px_rgba(201,168,106,0.2)]"
            >
              Book Now
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center text-[#c9a86a]"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5">
              <motion.div 
                animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -7 }}
                className="absolute top-1/2 left-0 w-full h-[1.5px] bg-current origin-center"
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                animate={isOpen ? { opacity: 0, x: 10 } : { opacity: 1, x: 0 }}
                className="absolute top-1/2 left-0 w-full h-[1.5px] bg-current"
                transition={{ duration: 0.2 }}
              />
              <motion.div 
                animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 7 }}
                className="absolute top-1/2 left-0 w-full h-[1.5px] bg-current origin-center"
                transition={{ duration: 0.3 }}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#0a0a0a] z-[45] md:hidden flex flex-col pt-20"
          >
            {/* Background Atmosphere */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c9a86a]/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/4"></div>
              <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/5 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/4"></div>
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>

            <div className="relative z-10 flex flex-col h-full overflow-y-auto pb-12 px-8">
              {/* Menu Header (Title) */}
              <div className="mt-12 mb-8">
                <span className="text-[10px] font-black text-[#c9a86a] uppercase tracking-[0.5em] block mb-2 opacity-100">Browse Menu</span>
                <div className="h-px w-12 bg-[#c9a86a]/30"></div>
              </div>

              <nav className="flex-grow">
                <ul className="flex flex-col">
                  {navItems.map((item, idx) => (
                    <motion.li 
                      key={item.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05 }}
                      className="border-b border-white/[0.03]"
                    >
                      <Link 
                        to={item.path}
                        className="group flex items-center justify-between py-8"
                      >
                         <div className="flex items-center gap-6">
                            <span className="text-xs font-mono text-[#c9a86a] opacity-40">{item.id}</span>
                            <span className="text-4xl font-serif italic text-white uppercase tracking-tight group-active:text-[#c9a86a] transition-colors">
                              {item.name}
                            </span>
                         </div>
                         <ArrowUp className="w-5 h-5 text-white/10 rotate-90" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-12 space-y-10"
              >
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <span className="block text-[9px] font-black text-[#c9a86a] uppercase tracking-[0.4em]">Location</span>
                    <address className="not-italic text-[13px] text-white/40 leading-relaxed font-light">
                      Lousienstraße 42<br />
                      10117 Berlin, DE
                    </address>
                  </div>
                  <div className="space-y-4">
                    <span className="block text-[9px] font-black text-[#c9a86a] uppercase tracking-[0.4em]">Contact</span>
                    <div className="flex flex-col gap-1">
                      <p className="text-[13px] text-white/40 font-light">+49 30 123 456 78</p>
                      <p className="text-[13px] text-[#c9a86a]/60 font-light underline underline-offset-4 decoration-white/10 italic">contact@sharpco.de</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <Link 
                    to="/booking"
                    className="w-full bg-[#c9a86a] text-black h-16 rounded-full flex items-center justify-center gap-3 text-[10px] font-black uppercase tracking-[0.5em] active:scale-[0.98] transition-transform"
                  >
                    Initialize Ritual
                    <ArrowUp className="w-4 h-4 rotate-45" />
                  </Link>

                  <div className="flex justify-between items-center text-[8px] text-white/20 font-bold uppercase tracking-[0.5em]">
                     <span>Insta</span>
                     <span>X-Corp</span>
                     <span>Culture</span>
                     <div className="flex items-center gap-2">
                        <div className="w-1 h-1 bg-[#c9a86a] rounded-full animate-pulse"></div>
                        <span>Open Today</span>
                     </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
