import React, { useEffect, useState, useCallback } from "react";
import { supabase } from "../supabase";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import Certificate from "../components/Certificate";
import { ChevronDown, ChevronUp } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "python.svg", language: "Python" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "git.svg", language: "Git" },
  { icon: "github.svg", language: "GitHub" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "figma.svg", language: "Figma" },
];

export default function Portofolio() {
  const [activeTab, setActiveTab] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const initialItems = isMobile ? 4 : 6;

  const fetchData = useCallback(async () => {
    try {
      const [projectsResponse, certificatesResponse] = await Promise.allSettled([
        supabase.from("projects").select("*").order("id", { ascending: false }),
        supabase.from("certificates").select("*").order("id", { ascending: false }),
      ]);

      if (projectsResponse.status === "fulfilled" && !projectsResponse.value.error) {
        const projectData = projectsResponse.value.data || [];
        setProjects(projectData);
        localStorage.setItem("projects", JSON.stringify(projectData));
      }

      if (certificatesResponse.status === "fulfilled" && !certificatesResponse.value.error) {
        const certificateData = certificatesResponse.value.data || [];
        setCertificates(certificateData);
        localStorage.setItem("certificates", JSON.stringify(certificateData));
      }
    } catch (error) {
      console.error("Error fetching data from Supabase:", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const cachedProjects = localStorage.getItem("projects");
    const cachedCertificates = localStorage.getItem("certificates");

    if (cachedProjects) {
      try {
        const parsed = JSON.parse(cachedProjects);
        setProjects(parsed);
        if (parsed.length > 0) setLoading(false);
      } catch (e) {}
    }
    if (cachedCertificates) {
      try {
        setCertificates(JSON.parse(cachedCertificates));
      } catch (e) {}
    }

    fetchData();
  }, [fetchData]);

  // Trigger AOS refresh when data or active tab changes so newly mounted cards are indexed & displayed
  useEffect(() => {
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 120);
    return () => clearTimeout(timer);
  }, [projects, certificates, activeTab]);

  const displayedProjects = showAllProjects
    ? projects
    : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates
    ? certificates
    : certificates.slice(0, initialItems);

  return (
    <section id="Portofolio" style={{ backgroundColor: "#fbf9f5" }} className="relative z-10 w-full bg-[#fbf9f5] text-[#0D0D0D] py-20 sm:py-28 border-t-2 border-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between border-b border-neutral-300 pb-6 mb-12 gap-6" data-aos="fade-up" data-aos-duration="700">
          <div>
            <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-500 uppercase font-semibold block mb-1">
              02 // CURATED COLLECTION
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-black uppercase mt-1">
              Portfolio Showcase
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-2 font-light max-w-2xl leading-relaxed">
              Explore my journey through projects, certifications, and technical expertise. Each section represents a milestone in my continuous learning path.
            </p>
          </div>

          {/* Minimalist Tab Navigation Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab(0)}
              className={`px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all ${
                activeTab === 0
                  ? "bg-black text-white"
                  : "bg-white text-neutral-700 border border-neutral-300 hover:border-black"
              }`}
            >
              PROJECTS ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab(1)}
              className={`px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all ${
                activeTab === 1
                  ? "bg-black text-white"
                  : "bg-white text-neutral-700 border border-neutral-300 hover:border-black"
              }`}
            >
              CERTIFICATES ({certificates.length})
            </button>
            <button
              onClick={() => setActiveTab(2)}
              className={`px-4 py-2 text-xs font-bold tracking-widest uppercase transition-all ${
                activeTab === 2
                  ? "bg-black text-white"
                  : "bg-white text-neutral-700 border border-neutral-300 hover:border-black"
              }`}
            >
              TECH STACK
            </button>
          </div>
        </div>

        {/* TAB 0: PROJECTS GRID */}
        {activeTab === 0 && (
          <div className="space-y-10">
            {loading && projects.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="w-full bg-white border border-black p-5 animate-pulse space-y-4"
                  >
                    <div className="aspect-[16/10] bg-neutral-200" />
                    <div className="h-4 bg-neutral-200 w-3/4" />
                    <div className="h-3 bg-neutral-200 w-full" />
                    <div className="h-3 bg-neutral-200 w-1/2" />
                  </div>
                ))}
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-16 bg-white border border-black">
                <p className="text-sm font-mono tracking-widest uppercase text-neutral-500">
                  Tidak ada proyek yang ditemukan
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id || index}
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay={(index % 3) * 100}
                  >
                    <CardProject
                      Img={project.img}
                      Title={project.title}
                      Description={project.description}
                      Link={project.link}
                      id={project.id}
                    />
                  </div>
                ))}
              </div>
            )}

            {projects.length > initialItems && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => setShowAllProjects(!showAllProjects)}
                  className="px-8 py-3.5 bg-black text-white hover:bg-neutral-800 transition-colors text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2"
                >
                  <span>{showAllProjects ? "SHOW LESS" : "VIEW ALL PROJECTS"}</span>
                  {showAllProjects ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 1: CERTIFICATES GRID */}
        {activeTab === 1 && (
          <div className="space-y-10">
            {loading && certificates.length === 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((n) => (
                  <div
                    key={n}
                    className="w-full bg-white border border-black p-5 animate-pulse space-y-4"
                  >
                    <div className="aspect-[4/3] bg-neutral-200" />
                  </div>
                ))}
              </div>
            ) : certificates.length === 0 ? (
              <div className="text-center py-16 bg-white border border-black">
                <p className="text-sm font-mono tracking-widest uppercase text-neutral-500">
                  Tidak ada sertifikat yang ditemukan
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedCertificates.map((certificate, index) => (
                  <div
                    key={certificate.id || index}
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay={(index % 3) * 100}
                    className="bg-white p-3 border border-black hover:scale-[1.03] transition-all duration-300"
                  >
                    <Certificate ImgSertif={certificate.img} />
                  </div>
                ))}
              </div>
            )}

            {certificates.length > initialItems && (
              <div className="flex justify-center pt-4">
                <button
                  onClick={() => setShowAllCertificates(!showAllCertificates)}
                  className="px-8 py-3.5 bg-black text-white hover:bg-neutral-800 transition-colors text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2"
                >
                  <span>{showAllCertificates ? "SHOW LESS" : "VIEW ALL CERTIFICATES"}</span>
                  {showAllCertificates ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TECH STACK SHOWCASE */}
        {activeTab === 2 && (
          <div className="bg-white border border-neutral-300 p-8 sm:p-12">
            <div className="max-w-2xl mb-8">
              <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-500 uppercase font-semibold">
                CORE ARSENAL
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-black mt-1">
                TECHNOLOGIES & TOOLS
              </h3>
              <p className="text-sm text-neutral-600 mt-2 font-normal leading-relaxed">
                Teknologi yang saya gunakan secara aktif dalam merancang dan mengembangkan aplikasi web interaktif, performan, dan responsif.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {techStacks.map((stack, index) => (
                <div
                  key={index}
                  data-aos="fade-up"
                  data-aos-duration="600"
                  data-aos-delay={index * 50}
                  className="p-4 bg-[#E1E0DD] border border-black hover:scale-[1.03] flex flex-col items-center justify-center text-center group transition-all duration-300"
                >
                  <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
