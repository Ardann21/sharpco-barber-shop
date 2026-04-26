import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { Star, ArrowRight, ShieldCheck, Zap, Scissors, Activity, Cpu, Wind, Thermometer, Globe } from "lucide-react";
import { ImageSequence } from "../components/ImageSequence";
import { Link } from "react-router-dom";

export default function Home() {
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-[#060606] relative">
      {/* Scrollable Container for Hero Scrollytell */}
      <div ref={heroRef} className="relative h-[500vh] z-10">
        <ImageSequence progress={smoothProgress} />

        {/* Hero Content Overlay */}
        <div className="sticky top-0 h-[100dvh] flex flex-col items-center justify-center px-6 text-center z-10">
          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [0, 0.4, 0.6, 1], [1, 1, 0, 0]),
              y: useTransform(smoothProgress, [0, 1], [0, -100])
            }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#c9a86a]/10 rounded-full border border-[#c9a86a]/20 mb-6">
              <Star className="w-3 h-3 text-[#c9a86a] fill-[#c9a86a]" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#c9a86a]">
                Awarded Best Shop 2023
              </span>
            </div>

            <h1 className="text-[60px] md:text-[130px] font-serif italic text-white leading-[0.85] mb-8 tracking-tighter">
              The Art <br /> Of Modern <span className="text-[#c9a86a]">Grooming.</span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 max-w-xl mx-auto mb-10 leading-relaxed font-light">
              Where heritage meets modern style. Master artisans crafting the perfect look for every gentleman.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/booking" className="w-full sm:w-auto bg-[#c9a86a] text-black px-10 py-5 rounded-full text-[14px] font-bold uppercase tracking-widest hover:bg-white transition-all shadow-[0_10px_30px_rgba(201,168,106,0.3)]">
                Book Appointment
              </Link>
            </div>
          </motion.div>

          {/* Secondary Hero Text */}
          <motion.div
            style={{
              opacity: useTransform(smoothProgress, [0.4, 0.6, 0.8, 1], [0, 1, 1, 0]),
              y: useTransform(smoothProgress, [0.4, 1], [50, -50])
            }}
            className="absolute max-w-2xl px-6"
          >
            <h2 className="text-[40px] md:text-[60px] font-serif italic mb-6">
              Tradition in every blade.
            </h2>
            <p className="text-lg text-white/60 font-light leading-relaxed">
              Experience the ritual of a classic hot towel shave and precision haircutting. Our shop is a sanctuary for the modern man who values quality.
            </p>
          </motion.div>

          <div className="absolute bottom-12 flex flex-col items-center gap-4 opacity-50">
            <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Scroll to explore</span>
          </div>
        </div>
      </div>

      {/* Content Sections with Technical Design */}
      <div className="relative">
        {/* Technical Background Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0"></div>
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#c9a86a]/5 to-transparent pointer-events-none z-0"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.02),rgba(0,0,255,0.02))] bg-[size:100%_4px,3px_100%] pointer-events-none opacity-20 z-0"></div>

        {/* Redesigned Home Sections */}
        <section className="relative z-10 py-40 px-6 bg-[#060606]">
          {/* Transition Fade from Hero */}
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-[#060606] -translate-y-full pointer-events-none"></div>

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative p-1 bg-gradient-to-br from-white/10 via-transparent to-white/5 rounded-[42px]"
              >
                <div className="aspect-[4/5] rounded-[40px] overflow-hidden border border-white/10 relative group">
                  <img
                    src="https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=1200"
                    alt="Luca Santoro - Founder"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Techy Data Overlay */}
                  <div className="absolute top-8 left-8 space-y-2">
                    <div className="flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/10">
                      <div className="w-1.5 h-1.5 bg-[#c9a86a] rounded-full animate-pulse"></div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#c9a86a]">MASTER BARBER & FOUNDER</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 bg-[#c9a86a] p-10 rounded-3xl hidden md:block shadow-[0_20px_50px_rgba(201,168,106,0.2)] text-black">
                  <span className="text-6xl font-serif italic block mb-2">20+</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Years Experience</span>
                </div>
              </motion.div>

              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-[1px] w-12 bg-[#c9a86a]"></div>
                  <span className="text-[#c9a86a] text-[10px] tracking-[0.5em] uppercase">
                    OUR LEGACY
                  </span>
                </div>
                <h2 className="text-[40px] md:text-[60px] font-serif italic leading-[1.1] mb-8">
                  Luca Santoro <br /> <span className="text-[#c9a86a]">Founder.</span>
                </h2>
                <p className="text-white/50 text-lg font-light leading-relaxed mb-12 border-l border-white/10 pl-6">
                  "Our journey started with a simple belief: every man deserves a space where grooming is an art form, not a chore. Sharp & Co is my commitment to that vision."
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
                  {[
                    { icon: ShieldCheck, title: "Master Barbers", desc: "Hand-picked artisans with global experience." },
                    { icon: Zap, title: "Premium Tools", desc: "The finest Japanese steel and luxury products." },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className="flex gap-4 p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-white/20 transition-colors group"
                    >
                      <div className="w-12 h-12 rounded-full bg-black border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#c9a86a] transition-colors">
                        <item.icon className="w-5 h-5 text-[#c9a86a]" />
                      </div>
                      <div>
                        <h4 className="font-bold uppercase tracking-widest text-xs mb-2">{item.title}</h4>
                        <p className="text-white/40 text-[11px] leading-relaxed font-light">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <Link to="/artisans" className="inline-flex items-center gap-4 group text-[#c9a86a] font-bold text-xs uppercase tracking-[0.4em]">
                  Meet The Collective
                  <div className="w-8 h-8 rounded-full border border-[#c9a86a]/20 flex items-center justify-center group-hover:bg-[#c9a86a] group-hover:text-black transition-all">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Modern Ritual Process */}
        <section className="relative z-10 py-40 px-6 bg-[#060606] overflow-hidden">
          {/* Top Transition */}
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-[#060606] -translate-y-full pointer-events-none"></div>

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-32">
              <span className="text-[#c9a86a] text-[10px] tracking-[0.5em] uppercase mb-4 block">THE GROOMING RITUAL</span>
              <h2 className="text-[50px] md:text-[100px] font-serif italic text-white/5 absolute left-1/2 -translate-x-1/2 top-20 pointer-events-none select-none whitespace-nowrap uppercase hidden sm:block">Modern Ritual</h2>
              <h2 className="text-[40px] md:text-[70px] font-serif italic relative z-10">The Sculpting <span className="text-[#c9a86a]">Phase.</span></h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { num: "01", title: "Consultation", desc: "Digital morphology analysis and vision alignment.", delay: 0 },
                { num: "02", title: "Sculpting", desc: "Precision geometry using hand-forged tools.", delay: 0.1 },
                { num: "03", title: "Purification", desc: "Infrared steam and classic hot towel ritual.", delay: 0.2 },
                { num: "04", title: "Synthesis", desc: "Applying rare elixirs for the final protocol.", delay: 0.3 }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: step.delay }}
                  viewport={{ once: true }}
                  className="relative p-10 border border-white/5 rounded-[40px] bg-white/[0.01] hover:bg-white/[0.03] transition-all group"
                >
                  <div className="text-6xl font-serif italic text-white/5 mb-20 group-hover:text-[#c9a86a]/10 transition-colors uppercase tracking-tight">STEP {step.num}</div>
                  <h3 className="text-2xl font-serif italic mb-4">{step.title}</h3>
                  <p className="text-white/40 font-light text-sm leading-relaxed">{step.desc}</p>
                  <div className="mt-8 h-px w-0 group-hover:w-full bg-[#c9a86a]/30 transition-all duration-700"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Futuristic Feature Grid (Bento) */}
        <section className="relative z-10 py-40 px-6 bg-[#060606]">
          {/* Top Transition */}
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-[#060606] -translate-y-full pointer-events-none"></div>

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-24 flex flex-col items-center">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-1 h-1 bg-[#c9a86a] rounded-full animate-ping"></div>
                <span className="text-[#c9a86a] text-[10px] tracking-[0.5em] uppercase">ARTISAN CAPABILITIES</span>
              </div>
              <h2 className="text-[40px] md:text-[70px] font-serif italic">Technical Excellence</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="md:col-span-2 p-12 bg-white/[0.02] border border-white/5 rounded-[40px] flex flex-col justify-between group hover:border-[#c9a86a]/30 transition-all"
              >
                <div className="flex justify-between items-start mb-20">
                  <div className="text-6xl font-serif italic text-white/10">01</div>
                  <div className="px-4 py-2 border border-[#c9a86a]/20 rounded-full text-[9px] uppercase tracking-widest text-[#c9a86a]">STYLE ANALYSIS</div>
                </div>
                <div>
                  <h3 className="text-3xl font-serif italic mb-4">Morphology Analysis</h3>
                  <p className="text-white/40 font-light leading-relaxed max-w-sm">We analyze bone structure, hair growth patterns, and personal style goals before a single blade touches skin.</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-12 bg-[#c9a86a] rounded-[40px] flex flex-col justify-between group"
              >
                <div className="text-black text-6xl font-serif italic opacity-30">02</div>
                <div>
                  <h3 className="text-3xl font-serif italic text-black mb-4">Cold Press Recovery</h3>
                  <p className="text-black/60 font-light leading-relaxed">Advanced skincare ritual utilizing ice-filtered towels and luxury botanical hydrosols.</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-12 bg-white/[0.02] border border-white/5 rounded-[40px] flex flex-col justify-between group hover:border-[#c9a86a]/30 transition-all"
              >
                <div className="text-6xl font-serif italic text-white/10">03</div>
                <div>
                  <h3 className="text-3xl font-serif italic mb-4">Blade Mastery</h3>
                  <p className="text-white/40 font-light leading-relaxed">Merging 19th-century straight razor rituals with modern ergonomic precision.</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="md:col-span-2 p-1 bg-gradient-to-tr from-[#c9a86a]/20 via-transparent to-transparent rounded-[40px]"
              >
                <div className="h-full p-12 bg-black rounded-[39px] flex flex-col lg:flex-row gap-12 items-center">
                  <div className="lg:w-1/2">
                    <h3 className="text-4xl font-serif italic mb-6">Online Sanctuary</h3>
                    <p className="text-white/40 font-light mb-8">Integrated booking systems that sync with your digital life. No friction, just focus.</p>
                    <Link to="/booking" className="inline-block px-8 py-4 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-[#c9a86a] transition-all">Schedule Appointment</Link>
                  </div>
                  <div className="lg:w-1/2 grid grid-cols-2 gap-4">
                    {["Aura", "Focus", "Depth", "State"].map((label, i) => (
                      <div key={i} className="aspect-square bg-white/5 rounded-2xl flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                          <span className="text-[7px] font-bold text-[#c9a86a] uppercase tracking-[0.2em]">{label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Visual Journal / Gallery */}
        <section className="relative z-10 py-40 px-6 bg-[#060606]">
          {/* Top Transition */}
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-[#060606] -translate-y-full pointer-events-none"></div>

          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-8 mb-24 overflow-hidden">
              <h2 className="text-[60px] md:text-[120px] font-serif italic whitespace-nowrap text-white/5 uppercase">Visual Journal</h2>
              <div className="h-px flex-grow bg-white/5"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=1200", span: "md:col-span-2 md:row-span-2" },
                { img: "https://images.unsplash.com/photo-1587909209111-5097ee578ec3?auto=format&fit=crop&q=80&w=800", span: "" },
                { img: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?auto=format&fit=crop&q=80&w=800", span: "" },
                { img: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=1200", span: "md:col-span-2" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className={`${item.span} aspect-square md:aspect-auto rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 bg-white/5`}
                >
                  <img src={item.img} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110" alt="Gallery item" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Atmospheric Philosophy Banner */}
        <section className="relative z-10 py-60 bg-[#060606] border-y border-white/5 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[1200px] bg-[#c9a86a]/5 blur-[200px] rounded-full pointer-events-none animate-pulse"></div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto px-6 text-center relative z-10"
          >
            <h2 className="text-[40px] md:text-[80px] font-serif italic mb-12 leading-[1] tracking-tighter">
              "We don't just cut hair. We cultivate the <span className="text-[#c9a86a] relative">Presence<div className="absolute bottom-4 left-0 w-full h-px bg-[#c9a86a]/30"></div></span> that defines your journey."
            </h2>
            <div className="flex items-center justify-center gap-16 text-white/20">
              <div className="flex flex-col items-center gap-4">
                <Globe className="w-10 h-10 group-hover:text-[#c9a86a] transition-colors" />
                <span className="text-[8px] uppercase tracking-[0.5em]">Global Standards</span>
              </div>
              <div className="flex flex-col items-center gap-4">
                <Star className="w-10 h-10 text-[#c9a86a]/40" />
                <span className="text-[8px] uppercase tracking-[0.5em]">Awarded Mastery</span>
              </div>
              <div className="flex flex-col items-center gap-4">
                <ShieldCheck className="w-10 h-10" />
                <span className="text-[8px] uppercase tracking-[0.5em]">Trusted Quality</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Testimonials Mosaic */}
        <section className="relative z-10 py-40 px-6 bg-[#060606]">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <Activity className="w-4 h-4 text-[#c9a86a]" />
                  <span className="text-[#c9a86a] text-[10px] tracking-[0.5em] uppercase">CLIENT REVIEWS</span>
                </div>
                <h2 className="text-[50px] md:text-[80px] font-serif italic leading-[1]">What People <span className="text-[#c9a86a]">Say.</span></h2>
              </div>
              <p className="text-white/40 text-xl font-light leading-relaxed border-l border-white/5 pl-8">The true measure of our craft is the confidence our clients carry when they walk out of our doors into the world.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Julian Rossi", quote: "The best experience I've had in 15 years. Luca is a true artist who understands the geometry of style.", role: "CEO, Rossi Design" },
                { name: "Marcus Thorne", quote: "Sharp & Co is a sanctuary. The cold press recovery alone is worth the visit. My skin has never felt better.", role: "Athlete" },
                { name: "David Chen", quote: "I travel 2 hours just for their skin fade. There's a level of precision here that you just don't find elsewhere.", role: "Architect" },
              ].map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-12 border border-white/5 rounded-[40px] bg-white/[0.01] hover:border-[#c9a86a]/20 transition-all flex flex-col justify-between min-h-[450px]"
                >
                  <div className="text-[#c9a86a] mb-12">
                    {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="w-4 h-4 fill-[#c9a86a] inline-block mr-1" />)}
                  </div>
                  <p className="text-2xl font-serif italic leading-relaxed mb-12">"{t.quote}"</p>
                  <div>
                    <h5 className="font-bold uppercase tracking-widest text-xs mb-1">{t.name}</h5>
                    <p className="text-white/20 text-[10px] uppercase font-mono">{t.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specifications Section */}
        <section className="relative z-10 py-40 px-6 bg-[#060606]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-24 items-start">
              <div className="lg:w-1/3">
                <div className="flex items-center gap-4 mb-6">
                  <Cpu className="w-4 h-4 text-[#c9a86a]" />
                  <span className="text-[#c9a86a] text-[10px] tracking-[0.5em] uppercase">MASTER TOOLS</span>
                </div>
                <h2 className="text-[50px] md:text-[70px] font-serif italic leading-[1] mb-12">The Tools of <br /> <span className="text-[#c9a86a]">Precision.</span></h2>
                <p className="text-white/40 text-lg font-light leading-relaxed mb-12">We treat grooming as a high-fidelity discipline. Our hardware is sourced from the world's most elite forge masters, combining centuries of tradition with modern metallurgical advancements.</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 border border-white/5 bg-white/[0.02] rounded-3xl">
                    <div className="text-2xl font-serif italic mb-2">62HRC</div>
                    <div className="text-[9px] uppercase tracking-widest text-[#c9a86a]">Blade Hardness</div>
                  </div>
                  <div className="p-6 border border-white/5 bg-white/[0.02] rounded-3xl">
                    <div className="text-2xl font-serif italic mb-2">0.1mm</div>
                    <div className="text-[9px] uppercase tracking-widest text-[#c9a86a]">Taper Accuracy</div>
                  </div>
                </div>
              </div>

              <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Japanese Cobalt Steel",
                    desc: "Hand-forged shears that maintain a microscopic edge through thousands of cycles.",
                    icon: Scissors
                  },
                  {
                    title: "Ionized Atmosphere",
                    desc: "HEPA-filtered air circulation ensures a sterile, hyper-clean environment for every session.",
                    icon: Wind
                  },
                  {
                    title: "Spectral Analysis",
                    desc: "Utilizing custom light arrays to reveal growth patterns invisible to the naked eye.",
                    icon: Activity
                  },
                  {
                    title: "Thermal Calibration",
                    desc: "Precisely controlled steam temperatures for optimal cuticle relaxation.",
                    icon: Thermometer
                  }
                ].map((spec, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="p-12 border border-white/5 rounded-[40px] bg-white/[0.01] hover:border-[#c9a86a]/30 transition-all group"
                  >
                    <div className="w-16 h-16 rounded-3xl bg-black border border-white/10 flex items-center justify-center mb-10 group-hover:bg-[#c9a86a]/10 transition-colors">
                      <spec.icon className="w-6 h-6 text-[#c9a86a]" />
                    </div>
                    <h3 className="text-2xl font-serif italic mb-4">{spec.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed font-light">{spec.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Services Teaser */}
        <section className="relative z-10 py-40 px-6 bg-[#060606] pb-60">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
              <div className="max-w-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-px bg-[#c9a86a]"></div>
                  <span className="text-[#c9a86a] text-[12px] font-black tracking-[0.4em] uppercase">
                    PREMIUM SERVICES
                  </span>
                </div>
                <h2 className="text-[50px] md:text-[80px] font-serif italic leading-[0.9]">Signature Services</h2>
              </div>
              <Link to="/services" className="bg-white/5 border border-white/10 px-8 py-4 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                View Full Menu
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="group relative aspect-square md:aspect-auto md:h-[600px] rounded-[40px] overflow-hidden border border-white/5">
                <img
                  src="https://images.unsplash.com/photo-1503467913725-8484b65b0715?auto=format&fit=crop&q=80&w=1200"
                  alt="Service 1"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-12 flex flex-col justify-end">
                  <h3 className="text-4xl font-serif mb-4 uppercase tracking-tighter">The Executive</h3>
                  <p className="text-white/60 font-light mb-8 max-w-xs">Our most requested experience. Precision cut followed by a traditional scalp massage.</p>
                  <Link to="/booking" className="w-fit bg-[#c9a86a] text-black px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest">Book $45</Link>
                </div>
              </div>
              <div className="group relative aspect-square md:aspect-auto md:h-[600px] rounded-[40px] overflow-hidden border border-white/5">
                <img
                  src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=1200"
                  alt="Service 2"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-12 flex flex-col justify-end">
                  <h3 className="text-4xl font-serif mb-4 uppercase tracking-tighter">The Sculptor</h3>
                  <p className="text-white/60 font-light mb-8 max-w-xs">Mastery for the modern beard. Geometric precision and luxury hydration.</p>
                  <Link to="/booking" className="w-fit bg-white text-black px-8 py-3 rounded-full font-black text-[10px] uppercase tracking-widest">Book $25</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
