import React from "react";
import { ArrowUp, Github, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="w-full bg-[#0D0D0D] text-white py-16 sm:py-20 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col justify-between space-y-12">
        {/* Top Wordmark & Scroll to top */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-neutral-800 pb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter uppercase text-white">
              MUHAMMAD YUSUF AFFANDI
            </h2>
            <p className="text-xs font-mono text-neutral-400 mt-1 uppercase tracking-widest">
              INFORMATICS STUDENT • UNIVERSITAS PGRI SEMARANG
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="px-5 py-3 border border-neutral-700 hover:border-white text-xs font-mono uppercase tracking-widest text-neutral-300 hover:text-white transition-colors flex items-center gap-2"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Links & Socials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-xs">
          <div>
            <span className="font-mono text-neutral-500 uppercase tracking-widest block mb-3">NAVIGATION</span>
            <ul className="space-y-2 font-medium">
              <li><a href="#Home" className="text-neutral-400 hover:text-white transition-colors">HOME</a></li>
              <li><a href="#About" className="text-neutral-400 hover:text-white transition-colors">ABOUT ME</a></li>
              <li><a href="#Portofolio" className="text-neutral-400 hover:text-white transition-colors">SELECTED WORKS</a></li>
              <li><a href="#Contact" className="text-neutral-400 hover:text-white transition-colors">CONTACT</a></li>
            </ul>
          </div>

          <div>
            <span className="font-mono text-neutral-500 uppercase tracking-widest block mb-3">CONNECT</span>
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="https://github.com/affandi25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" /> GITHUB
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/muhammad-yusuf-affandi-bb898b310?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Linkedin className="w-3.5 h-3.5" /> LINKEDIN
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/__ffndiii__/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Instagram className="w-3.5 h-3.5" /> INSTAGRAM
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-mono text-neutral-500 uppercase tracking-widest block mb-3">RESOURCES</span>
            <ul className="space-y-2 font-medium">
              <li>
                <a
                  href="https://drive.google.com/file/d/13GlZ0PtFPCKs4qERz_W5Dkb8biGq7Si8/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors"
                >
                  CURRICULUM VITAE (CV)
                </a>
              </li>
              <li>
                <a href="#Portofolio" className="text-neutral-400 hover:text-white transition-colors">
                  CERTIFICATES & HONORS
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="font-mono text-neutral-500 uppercase tracking-widest block mb-3">STATUS</span>
            <p className="text-neutral-400 leading-relaxed font-light">
              Available for freelance contracts, internships & web collaborations.
            </p>
            <span className="inline-flex items-center gap-2 mt-3 text-emerald-400 text-xs font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              ALL SYSTEMS OPERATIONAL
            </span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-neutral-500 gap-4">
          <span>© {currentYear} MUHAMMAD YUSUF AFFANDI. ALL RIGHTS RESERVED.</span>
          <span>CRAFTED WITH PRECISION • 2026/2027 EDITION</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
