/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Navigation } from "./components/Navigation";
import { Footer } from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Artisans from "./pages/Artisans";
import Gallery from "./pages/Gallery";
import Booking from "./pages/Booking";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <main className="relative bg-[#0a0a0a] text-white selection:bg-[#c9a86a] selection:text-black">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/artisans" element={<Artisans />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}

