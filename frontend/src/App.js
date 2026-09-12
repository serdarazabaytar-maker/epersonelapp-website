import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Lenis from "lenis";
import "@/App.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import EpPage from "@/pages/EpPage";
import EpappPage from "@/pages/EpappPage";
import EpkuryePage from "@/pages/EpkuryePage";
import EpfoodPage from "@/pages/EpfoodPage";
import ReferanslarPage from "@/pages/ReferanslarPage";
import HakkimizdaPage from "@/pages/HakkimizdaPage";
import IletisimPage from "@/pages/IletisimPage";
import { LegalPage } from "@/pages/LegalPages";

const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          if (window.__lenis) window.__lenis.scrollTo(el, { offset: -90 });
          else el.scrollIntoView({ behavior: "smooth" });
        }
      }, 120);
      return () => clearTimeout(t);
    }
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
};

function App() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const lenis = new Lenis({ lerp: 0.1, anchors: true });
    window.__lenis = lenis;
    let raf;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <BrowserRouter>
      <ScrollManager />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ep" element={<EpPage />} />
          <Route path="/epapp" element={<EpappPage />} />
          <Route path="/epkurye" element={<EpkuryePage />} />
          <Route path="/epfood" element={<EpfoodPage />} />
          <Route path="/referanslar" element={<ReferanslarPage />} />
          <Route path="/hakkimizda" element={<HakkimizdaPage />} />
          <Route path="/iletisim" element={<IletisimPage />} />
          <Route path="/kvkk" element={<LegalPage kind="kvkk" />} />
          <Route path="/gizlilik-politikasi" element={<LegalPage kind="gizlilik" />} />
          <Route path="/cerez-politikasi" element={<LegalPage kind="cerez" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
