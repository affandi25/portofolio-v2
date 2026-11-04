import React, { useEffect, useState, memo, useMemo } from "react";
import { FileText, ArrowUpRight, GraduationCap, Code2, Award, Cpu, Sparkles, CheckCircle2 } from "lucide-react";
import { supabase } from "../supabase";

const AboutPage = () => {
  const [totalProjects, setTotalProjects] = useState(() => {
    return JSON.parse(localStorage.getItem("projects") || "[]").length;
  });
  const [totalCertificates, setTotalCertificates] = useState(() => {
    return JSON.parse(localStorage.getItem("certificates") || "[]").length;
  });

  // Perhitungan semester otomatis (masuk 17 September 2024, 1 semester = 6 bulan)
  const currentSemester = useMemo(() => {
    const startDate = new Date("2024-09-17");
    const today = new Date();
    const diffInMonths =
      (today.getFullYear() - startDate.getFullYear()) * 12 +
      (today.getMonth() - startDate.getMonth()) -
      (today.getDate() < startDate.getDate() ? 1 : 0);
    return Math.max(1, Math.floor(diffInMonths / 6) + 1);
  }, []);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [pRes, cRes] = await Promise.allSettled([
          supabase.from("projects").select("id", { count: "exact" }),
          supabase.from("certificates").select("id", { count: "exact" }),
        ]);

        if (pRes.status === "fulfilled" && !pRes.value.error) {
          const count = pRes.value.count ?? pRes.value.data?.length ?? 0;
          setTotalProjects(count);
        }
        if (cRes.status === "fulfilled" && !cRes.value.error) {
          const count = cRes.value.count ?? cRes.value.data?.length ?? 0;
          setTotalCertificates(count);
        }
      } catch (err) {
        console.error("Error fetching stats:", err);
      }
    };
    fetchCounts();
  }, []);

  return (
    <section id="About" className="w-full bg-[#C6C5C3] text-[#0D0D0D] py-20 sm:py-28 border-t border-neutral-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-300 pb-6 mb-16 gap-4" data-aos="fade-up" data-aos-duration="700">
          <div>
            <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-500 uppercase font-semibold block mb-1">
              01 // BIOGRAPHY
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-black uppercase mt-1">
              About Me
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-2 font-light">
              Transforming ideas into digital experiences
            </p>
          </div>
          <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
            SEMARANG, CENTRAL JAVA • ID
          </span>
        </div>

        {/* 2-Column Editorial Grid: Bio & Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Bio Narrative */}
          <div className="lg:col-span-7 space-y-6" data-aos="fade-right" data-aos-duration="800">
            <div>
             
              <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-black mt-1">
                Muhammad Yusuf Affandi
              </h3>
              <p className="text-sm font-mono text-neutral-600 mt-1 uppercase tracking-wider">
                Informatics Student • Universitas PGRI Semarang
              </p>
            </div>

            <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-normal text-justify sm:text-left">
              Saya adalah mahasiswa Teknik Informatika dari Universitas PGRI SEMARANG yang sedang berproses mendalami dunia web development dan pengembangan IoT. Berbekal rasa ingin tahu yang tinggi, saya memanfaatkan bantuan AI sebagai sarana kolaborasi dalam mengeksplorasi dan membangun berbagai proyek digital.
            </p>

            {/* Editorial Quote Box */}
            <div className="p-6 bg-white border border-black rounded-none shadow-sm relative transition-all duration-300 hover:scale-[1.01] hover:shadow-md">
              <div className="text-[10px] font-mono tracking-[0.2em] text-neutral-400 uppercase mb-2">
                CORE PHILOSOPHY
              </div>
              <blockquote className="text-base sm:text-lg font-semibold text-black italic leading-snug">
"Leveraging AI as a professional tool, not a replacement."
              </blockquote>
            </div>

            {/* Actions: Download CV */}
            <div className="pt-4 flex flex-wrap gap-4">
              <a
                href="/cv.pdf"
                download="CV_Muhammad_Yusuf_Affandi.pdf"
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-black text-white hover:bg-neutral-800 transition-colors text-xs font-bold tracking-[0.2em] uppercase"
              >
                <FileText className="w-4 h-4" />
                <span>DOWNLOAD CV</span>
              </a>
              <a
                href="#Contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white text-black border border-black hover:bg-neutral-100 transition-colors text-xs font-bold tracking-[0.2em] uppercase"
              >
                <span>GET IN TOUCH</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: Profile Image in Minimalist Studio Frame */}
          <div className="lg:col-span-5 flex justify-center" data-aos="fade-left" data-aos-duration="800">
            <div className="relative w-full max-w-md bg-white p-3 border border-black shadow-md transition-all duration-300 hover:scale-[1.02]">
              <div className="relative overflow-hidden aspect-[4/5] bg-neutral-100">
                <img
                  src="/profilku.jpeg"
                  alt="Muhammad Yusuf Affandi"
                  className="w-full h-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="p-4 bg-white border-t border-neutral-200 mt-2 flex justify-between items-center text-xs font-mono">
                <span className="text-black font-bold uppercase">M. YUSUF AFFANDI</span>
                <span className="text-neutral-500 uppercase">STUDIO PORTRAIT</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Metric Cards (Real Supabase & Dynamic Calculation) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-12 border-t border-neutral-300">
          {/* Metric 1 */}
          <div
            className="p-6 bg-white border border-black flex flex-col justify-between group hover:scale-[1.03] hover:shadow-xl transition-all duration-300"
            data-aos="fade-up"
            data-aos-duration="700"
          >
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase">METRIC 01</span>
              <Code2 className="w-5 h-5 text-neutral-600" />
            </div>
            <div className="my-6">
              <span className="text-5xl font-black tracking-tight text-black">{totalProjects}</span>
              <h4 className="text-sm font-bold uppercase tracking-wider text-black mt-1">TOTAL PROJECTS</h4>
              <p className="text-xs text-neutral-500 mt-1">Innovative web apps & prototypes</p>
            </div>
            <div className="pt-3 border-t border-neutral-100 text-[11px] font-mono text-neutral-400 uppercase">
              DELIVERED & DOCUMENTED
            </div>
          </div>

          {/* Metric 2 */}
          <div
            className="p-6 bg-white border border-black flex flex-col justify-between group hover:scale-[1.03] hover:shadow-xl transition-all duration-300"
            data-aos="fade-up"
            data-aos-duration="700"
            data-aos-delay="150"
          >
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase">METRIC 02</span>
              <Award className="w-5 h-5 text-neutral-600" />
            </div>
            <div className="my-6">
              <span className="text-5xl font-black tracking-tight text-black">{totalCertificates}</span>
              <h4 className="text-sm font-bold uppercase tracking-wider text-black mt-1">CERTIFICATES</h4>
              <p className="text-xs text-neutral-500 mt-1">Validated courses & tech credentials</p>
            </div>
            <div className="pt-3 border-t border-neutral-100 text-[11px] font-mono text-neutral-400 uppercase">
              VERIFIED CREDENTIALS
            </div>
          </div>

          {/* Metric 3 */}
          <div
            className="p-6 bg-white border border-black flex flex-col justify-between group hover:scale-[1.03] hover:shadow-xl transition-all duration-300"
            data-aos="fade-up"
            data-aos-duration="700"
            data-aos-delay="300"
          >
            <div className="flex justify-between items-start">
              <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-400 uppercase">METRIC 03</span>
              <GraduationCap className="w-5 h-5 text-neutral-600" />
            </div>
            <div className="my-6">
              <span className="text-5xl font-black tracking-tight text-black">SEM. {currentSemester}</span>
              <h4 className="text-sm font-bold uppercase tracking-wider text-black mt-1">INFORMATICS ENG.</h4>
              <p className="text-xs text-neutral-500 mt-1">Active student at Universitas PGRI Semarang</p>
            </div>
            <div className="pt-3 border-t border-neutral-100 text-[11px] font-mono text-neutral-400 uppercase">
              STARTED SEPT 17, 2024
            </div>
          </div>
        </div>

        {/* 4 HALLMARKS STRIP (PERSIS SEPERTI "FAST DELIVERY / EASY RETURNS" PADA GAZU) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-12 border-t border-neutral-300">
          <div className="flex items-start gap-3.5">
            <Code2 className="w-6 h-6 text-black flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold tracking-wider uppercase text-black">MODERN STACK</h5>
              <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">React, JavaScript, Node.js & Tailwind</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Cpu className="w-6 h-6 text-black flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold tracking-wider uppercase text-black">IOT EXPLORATION</h5>
              <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">Hardware & sensor telemetry</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Sparkles className="w-6 h-6 text-black flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold tracking-wider uppercase text-black">AI AS TOOL</h5>
              <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">High velocity pair-programming</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <CheckCircle2 className="w-6 h-6 text-black flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="text-xs font-bold tracking-wider uppercase text-black">QUALITY ASSURED</h5>
              <p className="text-[11px] text-neutral-500 mt-0.5 leading-snug">Clean code & responsive UI</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(AboutPage);
