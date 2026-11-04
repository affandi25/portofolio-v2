import React, { useState, useEffect, useCallback, memo } from "react";
import { Helmet } from "react-helmet-async";
import { ArrowRight, ArrowDownRight, ExternalLink, Sparkles } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Web & IoT Explorer", "Vibe Coding", "Frontend Developer"];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    AOS.init({
      once: true,
      offset: 20,
    });
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  return (
    <>
      <Helmet>
        <title>Muhammad Yusuf Affandi — Frontend Web Developer</title>
        <meta
          name="description"
          content="Website resmi Muhammad Yusuf Affandi, Front-End Web Developer & Informatics Student di Universitas PGRI Semarang."
        />
      </Helmet>

      {/* HERO SECTION (GAZU EDITORIAL COMPOSITION) */}
      <section
        id="Home"
        className="relative w-full min-h-[92vh] sm:min-h-screen bg-[#EAE8E4] pt-24 sm:pt-28 pb-12 flex flex-col justify-between overflow-hidden"
      >
        {/* Editorial Top Info Row */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 z-20">
          <div data-aos="fade-down" data-aos-duration="700">
            <span className="block text-[11px] font-mono tracking-[0.25em] text-neutral-800 uppercase font-semibold">
              INFORMATICS STUDENT
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs tracking-wider text-neutral-600 font-medium uppercase">
                SPECIALIZING IN
              </span>
              <span className="text-xs font-mono font-bold text-black border-b border-black">
                {text}
                <span className="animate-pulse">|</span>
              </span>
            </div>
          </div>

          <div
            data-aos="fade-down"
            data-aos-duration="700"
            data-aos-delay="150"
            className="text-left sm:text-right"
          >
            <span className="block text-[11px] font-mono tracking-[0.25em] text-neutral-800 uppercase font-semibold">
              UNIVERSITAS PGRI SEMARANG
            </span>
            <span className="block text-xs tracking-wider text-neutral-500 uppercase mt-0.5">
              INDONESIA • BATCH 2024
            </span>
          </div>
        </div>

        {/* Center Stage: Giant Wordmark + Walking Person Cutout */}
        <div className="relative w-full flex-1 flex items-center justify-center my-2 sm:my-0 min-h-[460px] sm:min-h-[560px] lg:min-h-[640px]">
          {/* Giant Typographic Backdrop: YUSUF */}
          <div
            className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0 overflow-hidden"
            data-aos="zoom-out"
            data-aos-duration="1000"
          >
            <h1 className="text-[25vw] sm:text-[23vw] font-black tracking-tighter text-[#141414] leading-none uppercase text-center opacity-95">
              YUSUF
            </h1>
          </div>

          {/* User's Walking Photo Cutout (Image 1) */}
          <div
            className="relative z-10 flex flex-col items-center justify-end h-full max-h-[520px] sm:max-h-[620px] lg:max-h-[720px] px-4"
            data-aos="fade-up"
            data-aos-duration="900"
          >
            <div className="relative group">
              <img
                src="/hero-yusuf.png"
                alt="Muhammad Yusuf Affandi"
                className="h-[420px] sm:h-[540px] lg:h-[660px] w-auto object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.15)] transform transition-transform duration-700 group-hover:scale-[1.02]"
              />
              {/* Studio Ground Shadow */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-[70%] h-5 bg-black/25 rounded-[100%] blur-md pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Editorial Bottom Row: Action Buttons & Season Tag */}
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 z-20">
          {/* Left Actions */}
          <div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <a
              href="#Portofolio"
              className="px-8 py-4 bg-[#0D0D0D] text-white hover:bg-neutral-800 transition-colors text-xs font-bold tracking-[0.2em] uppercase text-center flex items-center justify-center gap-2"
            >
              <span>EXPLORE WORKS</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#About"
              className="px-6 py-4 border border-[#0D0D0D] text-black hover:bg-black hover:text-white transition-all text-xs font-bold tracking-[0.2em] uppercase text-center"
            >
              ABOUT ME
            </a>
          </div>

          {/* Right Season Meta */}
          <div
            className="text-left sm:text-right"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
          >
            <span className="block text-[11px] font-mono tracking-[0.25em] text-neutral-800 uppercase font-semibold">
              SELECTED PORTFOLIO
            </span>
            <span className="block text-2xl sm:text-3xl font-black tracking-tight text-black mt-1">
              2026 / 2027
            </span>
          </div>
        </div>
      </section>

      {/* THE 3-COLUMN BLACK ACCENT STRIP (PERSIS SEPERTI GAZU STRIP) */}
      <section className="w-full bg-[#0D0D0D] text-white py-14 sm:py-20 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
            {/* Column 1: Web Development */}
            <div
              className="pt-6 md:pt-0 md:px-6 first:pl-0 flex flex-col justify-between group"
              data-aos="fade-up"
              data-aos-duration="800"
            >
              <div>
                <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
                  PILLAR 01
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-white mt-2 group-hover:text-neutral-300 transition-colors">
                  WEB APPS
                </h3>
                <p className="text-neutral-400 text-sm mt-2 leading-relaxed font-light">
                  Membangun antarmuka modern dengan React, JavaScript, Node.js, dan Tailwind CSS yang responsif serta interaktif.
                </p>
              </div>
              <a
                href="#Portofolio"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white mt-6 group-hover:translate-x-1 transition-transform"
              >
                <span>VIEW PROJECTS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Column 2: IoT & Exploration */}
            <div
              className="pt-6 md:pt-0 md:px-6 flex flex-col justify-between group"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="150"
            >
              <div>
                <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
                  PILLAR 02
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-white mt-2 group-hover:text-neutral-300 transition-colors">
                  IOT EXPLORATION
                </h3>
                <p className="text-neutral-400 text-sm mt-2 leading-relaxed font-light">
                  Mengeksplorasi integrasi perangkat keras cerdas, mikrokontroler, dan sistem telemetri data di sela waktu perkuliahan.
                </p>
              </div>
              <a
                href="#About"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white mt-6 group-hover:translate-x-1 transition-transform"
              >
                <span>READ JOURNEY</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Column 3: Credentials */}
            <div
              className="pt-6 md:pt-0 md:px-6 last:pr-0 flex flex-col justify-between group"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="300"
            >
              <div>
                <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase">
                  PILLAR 03
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-white mt-2 group-hover:text-neutral-300 transition-colors">
                  ACADEMICS & CERTS
                </h3>
                <p className="text-neutral-400 text-sm mt-2 leading-relaxed font-light">
                  Sertifikasi kompetensi resmi dan riwayat pembelajaran terstruktur di Teknik Informatika Universitas PGRI Semarang.
                </p>
              </div>
              <a
                href="#Portofolio"
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white mt-6 group-hover:translate-x-1 transition-transform"
              >
                <span>VIEW CERTIFICATES</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(Home);
