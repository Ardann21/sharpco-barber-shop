/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { Calendar, Clock, User, Scissors, CheckCircle2, MapPin, Star, Target } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Booking() {
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const barberName = params.get("barber");
    if (barberName) {
      setSelectedBarber(barberName);
    }
  }, [location]);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const barbers = [
    { name: "Luca Santoro", role: "Master Artisan", img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=2670&auto=format&fit=crop" },
    { name: "James Ward", role: "Fade Technician", img: "https://images.unsplash.com/photo-1599566147214-ce487862ea4f?q=80&w=2670&auto=format&fit=crop" },
    { name: "Dimitri Volk", role: "Beard Architect", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2787&auto=format&fit=crop" },
    { name: "Sarah Chen", role: "Creative Director", img: "https://images.unsplash.com/photo-1600481176431-47ad2ab2745d?q=80&w=2670&auto=format&fit=crop" }
  ];

  const resetForm = () => {
    setStep(1);
    setFullName("");
    setPhone("");
    setSelectedService(null);
    setSelectedBarber(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const isStep1Valid = !!(selectedService && selectedBarber && fullName.trim().length >= 3 && phone.trim().replace(/\D/g, '').length >= 7);

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
                Reservation Protocol
              </span>
            </div>
            <h1 className="text-[50px] md:text-[100px] font-serif italic leading-[0.85] mb-8">
              Your Seat <br /> Is <span className="text-[#c9a86a]">Awaiting.</span>
            </h1>
          </div>

          <div className="hidden lg:flex flex-col items-end gap-4 text-right mb-4">
             <div className="text-[10px] font-mono text-white/20 tracking-widest uppercase">scheduling_active: true</div>
             <div className="flex gap-1.5 items-end h-8">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className={`w-1 bg-[#c9a86a]/20 ${i === step * 2 - 1 ? 'h-full bg-[#c9a86a] animate-pulse' : 'h-1/2'}`}></div>
                ))}
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
          <div className="lg:col-span-2 relative">
            {/* Technical Decoration */}
            <div className="absolute -top-10 left-0 text-[10px] font-mono text-white/5 uppercase tracking-[0.4em] select-none pointer-events-none">
               TRANS_ID: L-RSVP-2026
            </div>

            <div className="flex gap-4 mb-20 relative">
               <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-4 h-[1px] bg-[#c9a86a]/20"></div>
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex-1">
                  <div className={`h-1 mb-4 rounded-full transition-colors ${step >= s ? "bg-[#c9a86a]" : "bg-white/10"}`}></div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${step >= s ? "text-white" : "text-white/20"}`}>Step 0{s}</span>
                </div>
              ))}
            </div>

            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="text-4xl font-serif mb-12 italic">Common Details</h3>
                <form className="space-y-12">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black tracking-widest uppercase text-white/30">FullName</label>
                        <input 
                          type="text" 
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-[#c9a86a] transition-all" 
                          placeholder="Enter name (min 3 chars)" 
                        />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black tracking-widest uppercase text-white/30">Contact Number</label>
                        <input 
                          type="text" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-[#c9a86a] transition-all" 
                          placeholder="+1 (555) 000-0000" 
                        />
                         {phone && phone.trim().replace(/\D/g, '').length < 7 && (
                          <p className="text-[8px] text-red-500/50 uppercase tracking-widest">Minimal 7 digits required</p>
                        )}
                      </div>
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-black tracking-widest uppercase text-white/30">Service Selection</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {["Executive Cut", "Beard Sculpture", "Classic Shave", "Skin Fade"].map(s => (
                          <button 
                            key={s} 
                            type="button" 
                            onClick={() => setSelectedService(s)}
                            className={`p-6 border rounded-2xl text-left transition-all group ${selectedService === s ? "border-[#c9a86a] bg-[#c9a86a]/10" : "border-white/10 hover:border-[#c9a86a]/50 hover:bg-[#c9a86a]/5"}`}
                          >
                             <span className={`block text-sm font-bold uppercase tracking-widest ${selectedService === s ? "text-[#c9a86a]" : "group-hover:text-[#c9a86a]"}`}>{s}</span>
                          </button>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-4">
                     <label className="text-[10px] font-black tracking-widest uppercase text-white/30">Barber Selection</label>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {barbers.map(b => (
                          <button 
                            key={b.name} 
                            type="button" 
                            onClick={() => setSelectedBarber(b.name)}
                            className={`p-4 border rounded-2xl text-left transition-all group flex items-center gap-4 ${selectedBarber === b.name ? "border-[#c9a86a] bg-[#c9a86a]/10" : "border-white/10 hover:border-[#c9a86a]/50 hover:bg-[#c9a86a]/5"}`}
                          >
                             <div className="w-12 h-12 rounded-full overflow-hidden grayscale group-hover:grayscale-0 transition-all border border-white/10">
                                <img src={b.img} alt={b.name} className="w-full h-full object-cover" />
                             </div>
                             <div>
                                <span className={`block text-sm font-bold uppercase tracking-widest ${selectedBarber === b.name ? "text-[#c9a86a]" : "group-hover:text-[#c9a86a]"}`}>{b.name}</span>
                                <span className="text-[9px] text-white/40 uppercase tracking-widest">{b.role}</span>
                             </div>
                          </button>
                        ))}
                     </div>
                  </div>
                  <button 
                    onClick={() => {
                      if (isStep1Valid) setStep(2);
                    }} 
                    type="button" 
                    disabled={!isStep1Valid}
                    className={`px-12 py-6 rounded-full font-black text-xs uppercase tracking-widest transition-all ${isStep1Valid ? "bg-white text-black hover:bg-[#c9a86a]" : "bg-white/5 text-white/20 cursor-not-allowed"}`}
                  >
                     Continue to Schedule
                  </button>
                </form>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h3 className="text-4xl font-serif mb-12 italic">Choose Your Time</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                   <div className="space-y-8">
                      <div className="flex items-center gap-4 text-[#c9a86a]">
                         <Calendar className="w-5 h-5" />
                         <span className="font-bold uppercase tracking-widest text-xs">Calendar View</span>
                      </div>
                      <div className="grid grid-cols-7 gap-2">
                         {Array.from({length: 31}).map((_, i) => (
                           <div 
                            key={i} 
                            onClick={() => setSelectedDate(i + 1)}
                            className={`aspect-square flex items-center justify-center border rounded-lg text-xs cursor-pointer transition-all ${selectedDate === i + 1 ? "bg-[#c9a86a] text-black opacity-100 border-[#c9a86a]" : "border-white/5 opacity-40 hover:bg-white/5 hover:opacity-100"}`}
                           >
                            {i+1}
                           </div>
                         ))}
                      </div>
                   </div>
                   <div className="space-y-8">
                      <div className="flex items-center gap-4 text-[#c9a86a]">
                         <Clock className="w-5 h-5" />
                         <span className="font-bold uppercase tracking-widest text-xs">Available Slots</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         {["09:00", "10:30", "13:00", "15:30", "17:00", "18:30"].map(t => (
                           <button 
                            key={t} 
                            onClick={() => setSelectedTime(t)}
                            className={`p-4 border rounded-xl text-center text-xs font-black tracking-widest transition-all ${selectedTime === t ? "border-[#c9a86a] text-[#c9a86a] bg-[#c9a86a]/10" : "border-white/10 hover:border-[#c9a86a] hover:text-[#c9a86a]"}`}
                           >
                            {t}
                           </button>
                         ))}
                      </div>
                   </div>
                </div>
                <div className="flex gap-4 mt-20">
                  <button onClick={() => setStep(1)} className="px-12 py-6 rounded-full font-black text-xs uppercase tracking-widest border border-white/20 hover:bg-white/5 transition-all text-white/40">Back</button>
                  <button 
                    onClick={() => {
                      if (selectedDate && selectedTime) setStep(3);
                    }} 
                    disabled={!selectedDate || !selectedTime}
                    className={`flex-1 px-12 py-6 rounded-full font-black text-xs uppercase tracking-widest transition-all ${selectedDate && selectedTime ? "bg-white text-black hover:bg-[#c9a86a]" : "bg-white/5 text-white/20 cursor-not-allowed"}`}
                  >
                    Confirm Appointment
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                 <div className="w-24 h-24 rounded-full bg-[#c9a86a]/20 flex items-center justify-center mx-auto mb-12">
                    <CheckCircle2 className="w-12 h-12 text-[#c9a86a]" />
                 </div>
                 <h3 className="text-5xl font-serif mb-6 italic">Reservation Confirmed.</h3>
                 <p className="text-white/40 text-lg mb-12 font-light">We've sent a confirmation SMS to your number. <br /> See you at the shop with {selectedBarber?.split(' ')[0]}, {fullName.split(' ')[0]}!</p>
                 <button onClick={resetForm} className="border border-white/10 px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">Done</button>
              </motion.div>
            )}
          </div>

          <aside className="space-y-12 relative">
             <div className="absolute -top-10 right-0 text-[10px] font-mono text-white/5 uppercase tracking-[0.4em] select-none pointer-events-none">
                SUMMARY_REPORT: v1.0
             </div>

             <div className="p-10 bg-white/[0.01] border border-white/5 rounded-3xl relative group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                   <Target className="w-6 h-6 text-[#c9a86a]" />
                </div>
                <h4 className="text-xl font-serif mb-8 italic">Booking Info</h4>
                <div className="space-y-8">
                   {fullName && (
                      <div className="flex gap-4">
                         <User className="w-4 h-4 text-[#c9a86a]" />
                         <div>
                            <p className="text-[10px] uppercase tracking-widest text-[#c9a86a] mb-1">Client</p>
                            <p className="text-xs text-white/80">{fullName}</p>
                         </div>
                      </div>
                   )}
                   {selectedService && (
                      <div className="flex gap-4">
                         <Scissors className="w-4 h-4 text-[#c9a86a]" />
                         <div>
                            <p className="text-[10px] uppercase tracking-widest text-[#c9a86a] mb-1">Service</p>
                            <p className="text-xs text-white/80">{selectedService}</p>
                         </div>
                      </div>
                   )}
                   {selectedBarber && (
                      <div className="flex gap-4">
                         <Star className="w-4 h-4 text-[#c9a86a]" />
                         <div>
                            <p className="text-[10px] uppercase tracking-widest text-[#c9a86a] mb-1">Artisan</p>
                            <p className="text-xs text-white/80">{selectedBarber}</p>
                         </div>
                      </div>
                   )}
                    {selectedDate && (
                      <div className="flex gap-4">
                         <Calendar className="w-4 h-4 text-[#c9a86a]" />
                         <div>
                            <p className="text-[10px] uppercase tracking-widest text-[#c9a86a] mb-1">Date</p>
                            <p className="text-xs text-white/80">April {selectedDate}, 2026</p>
                         </div>
                      </div>
                   )}
                   {selectedTime && (
                      <div className="flex gap-4">
                         <Clock className="w-4 h-4 text-[#c9a86a]" />
                         <div>
                            <p className="text-[10px] uppercase tracking-widest text-[#c9a86a] mb-1">Time</p>
                            <p className="text-xs text-white/80">{selectedTime}</p>
                         </div>
                      </div>
                   )}
                   
                   <div className="pt-6 border-t border-white/5">
                      <div className="flex gap-4 mb-4">
                         <MapPin className="w-4 h-4 text-[#c9a86a]" />
                         <p className="text-[9px] text-white/30 uppercase tracking-[0.2em] leading-relaxed">Sharp & Co Manhattan <br /> 72 Madison Ave, NY</p>
                      </div>
                      <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-[9px] text-white/30 italic">Includes complimentary whiskey or artisan espresso.</p>
                      </div>
                   </div>
                </div>
             </div>

             <div className="p-10 border border-[#c9a86a]/20 rounded-3xl bg-[#c9a86a]/5">
                <p className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-50">Cancellation Policy</p>
                <p className="text-xs text-[#c9a86a] font-light leading-relaxed italic">Appointments can be rescheduled up to 4 hours in advance without any fee.</p>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
