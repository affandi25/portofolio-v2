import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Github, Linkedin } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");

  const navItems = [
    { href: "#Home", label: "HOME" },
    { href: "#About", label: "ABOUT" },
    { href: "#Portofolio", label: "PORTFOLIO" },
    { href: "#Contact", label: "CONTACT" },
  ];

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const scrollY = window.scrollY;
      const isScrolled = scrollY > 20;
      setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev));

      const sections = navItems
        .map((item) => {
          const section = document.querySelector(item.href);
          if (section) {
            return {
              id: item.href.replace("#", ""),
              offset: section.offsetTop - 300,
              height: section.offsetHeight,
            };
          }
          return null;
        })
        .filter(Boolean);

      const active = sections.find(
        (section) =>
          scrollY >= section.offset &&
          scrollY < section.offset + section.height
      );

      if (active) {
        setActiveSection((prev) => (prev !== active.id ? active.id : prev));
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollState();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const section = document.querySelector(href);
    if (section) {
      const top = section.offsetTop - 70;
      window.scrollTo({
        top: top,
        behavior: "smooth",
      });
    }
    setIsOpen(false);
  };

  return (
    <header className="fixed w-full top-0 z-50 transition-all duration-300">
      {/* Top Editorial Micro Bar */}
      <div className="hidden md:flex justify-between items-center px-6 sm:px-12 py-1.5 bg-[#0D0D0D] text-[#E1E0DD] text-[10px] font-mono tracking-widest uppercase">
        <span>MUHAMMAD YUSUF AFFANDI — INFORMATICS UPGRIS</span>
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            AVAILABLE FOR PROJECTS
          </span>
          <span>SEMARANG, ID (UTC+7)</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 border-b ${
          scrolled
            ? "bg-[#E1E0DD]/90 backdrop-blur-md border-neutral-300/80 shadow-sm"
            : "bg-[#E1E0DD] border-neutral-300/60"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 h-16 flex items-center justify-between">
          {/* Left: Nav Items */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className={`text-[12px] font-semibold tracking-[0.2em] transition-colors relative py-1 ${
                    isActive
                      ? "text-black font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-black"
                      : "text-neutral-600 hover:text-black"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Center: Brand Wordmark (GAZU style) */}
          <a
            href="#Home"
            onClick={(e) => scrollToSection(e, "#Home")}
            className="text-2xl sm:text-3xl font-black tracking-tighter text-black uppercase select-none hover:opacity-80 transition-opacity"
          >
          Portofolio          
            </a>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center space-x-5 text-xs font-medium tracking-wider">
            <a
              href="https://github.com/affandi25"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 hover:text-black flex items-center gap-1 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GITHUB</span>
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-yusuf-affandi-bb898b310?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-700 hover:text-black flex items-center gap-1 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>LINKEDIN</span>
            </a>
            <a
              href="https://drive.google.com/file/d/13GlZ0PtFPCKs4qERz_W5Dkb8biGq7Si8/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 bg-black text-white rounded-none hover:bg-neutral-800 transition-colors flex items-center gap-1 text-[11px] font-semibold tracking-widest uppercase"
            >
              <span>RESUME</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-black hover:opacity-70 transition-opacity"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[65px] bg-[#E1E0DD] z-40 px-8 py-10 flex flex-col justify-between border-t border-neutral-300">
          <div className="space-y-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.href)}
                className="block text-2xl font-bold tracking-tight text-neutral-900 hover:text-neutral-500 py-2 border-b border-neutral-300/50"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-neutral-300 space-y-4">
            <div className="flex gap-4">
              <a
                href="https://github.com/affandi25"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold tracking-wider text-black flex items-center gap-2"
              >
                <Github className="w-4 h-4" /> GITHUB
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-yusuf-affandi-bb898b310"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold tracking-wider text-black flex items-center gap-2"
              >
                <Linkedin className="w-4 h-4" /> LINKEDIN
              </a>
            </div>
            <a
              href="https://drive.google.com/file/d/13GlZ0PtFPCKs4qERz_W5Dkb8biGq7Si8/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-3 text-center bg-black text-white font-semibold text-xs tracking-widest uppercase"
            >
              DOWNLOAD RESUME
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
