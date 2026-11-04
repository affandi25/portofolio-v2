import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Code2,
  CheckCircle2,
  ChevronRight,
  Layers,
  Layout,
  Globe,
  Package,
  Cpu,
  Code,
} from "lucide-react";
import Swal from "sweetalert2";
import { toSlug } from "../utils/slug";

const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
};

const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];
  return (
    <div className="px-3.5 py-2 bg-white border border-neutral-300 flex items-center gap-2">
      <Icon className="w-3.5 h-3.5 text-neutral-600" />
      <span className="text-xs font-mono font-bold uppercase tracking-wider text-black">
        {tech}
      </span>
    </div>
  );
};

const FeatureItem = ({ feature }) => {
  return (
    <li className="flex items-start gap-3 p-3 bg-white border border-neutral-200">
      <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />
      <span className="text-xs sm:text-sm text-neutral-700 font-medium">
        {feature}
      </span>
    </li>
  );
};

const handleGithubClick = (githubLink) => {
  if (githubLink === "Private") {
    Swal.fire({
      icon: "info",
      title: "Source Code Private",
      text: "Maaf, source code untuk proyek ini bersifat privat.",
      confirmButtonText: "Mengerti",
      confirmButtonColor: "#0D0D0D",
    });
    return false;
  }
  return true;
};

const ProjectDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const selectedProject = storedProjects.find(
      (p) => toSlug(p.title) === slug
    );

    if (selectedProject) {
      const enhancedProject = {
        ...selectedProject,
        Title: selectedProject.title,
        Description: selectedProject.description,
        Img: selectedProject.img,
        Link: selectedProject.link,
        Github: selectedProject.github || "https://github.com/affandi25",
        Features: selectedProject.features || [],
        TechStack: selectedProject.tech_stack || [],
      };
      setProject(enhancedProject);
    }
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F5F4F2] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 mx-auto border-2 border-black border-t-transparent rounded-full animate-spin" />
          <h2 className="text-sm font-mono uppercase tracking-widest text-black">
            LOADING PROJECT SPECIFICATION...
          </h2>
        </div>
      </div>
    );
  }

  const projectUrl = `https://muhammadyusufaffandi.com/project/${toSlug(project.Title)}`;

  return (
    <>
      <Helmet>
        <title>{project.Title} — Muhammad Yusuf Affandi</title>
        <meta
          name="description"
          content={
            project.Description
              ? project.Description.slice(0, 155)
              : `Project ${project.Title} oleh Muhammad Yusuf Affandi — Frontend Web Developer.`
          }
        />
        <link rel="canonical" href={projectUrl} />
      </Helmet>

      <div className="min-h-screen bg-[#F5F4F2] text-[#0D0D0D] py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between border-b border-neutral-300 pb-6 mb-12">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-black text-white hover:bg-neutral-800 transition-colors text-xs font-mono font-bold tracking-widest uppercase flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK TO GALLERY</span>
            </button>
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-widest">
              <span>PROJECTS</span>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-black font-bold truncate max-w-xs">{project.Title}</span>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Info */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-500 uppercase font-semibold">
                  PROJECT SPECIFICATION
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black uppercase mt-1">
                  {project.Title}
                </h1>
              </div>

              <p className="text-base sm:text-lg text-neutral-700 leading-relaxed font-normal">
                {project.Description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                {project.Link && (
                  <a
                    href={project.Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 bg-black text-white hover:bg-neutral-800 transition-colors text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>LAUNCH LIVE DEMO</span>
                  </a>
                )}
                {project.Github && (
                  <a
                    href={project.Github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => !handleGithubClick(project.Github) && e.preventDefault()}
                    className="px-6 py-3.5 border border-black text-black hover:bg-black hover:text-white transition-colors text-xs font-bold tracking-[0.2em] uppercase flex items-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    <span>SOURCE REPO</span>
                  </a>
                )}
              </div>

              {/* Technologies */}
              {project.TechStack && project.TechStack.length > 0 && (
                <div className="pt-6 border-t border-neutral-300">
                  <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-500 uppercase font-semibold block mb-3">
                    STACK ARCHITECTURE
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.TechStack.map((tech, index) => (
                      <TechBadge key={index} tech={tech} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Media & Features */}
            <div className="lg:col-span-6 space-y-8">
              <div className="bg-white p-3 border border-neutral-300 shadow-sm">
                <div className="relative overflow-hidden aspect-[16/10] bg-neutral-100">
                  <img
                    src={project.Img}
                    alt={project.Title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {project.Features && project.Features.length > 0 && (
                <div className="space-y-4">
                  <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-500 uppercase font-semibold block">
                    KEY CAPABILITIES &amp; HIGHLIGHTS
                  </span>
                  <ul className="space-y-2">
                    {project.Features.map((feature, index) => (
                      <FeatureItem key={index} feature={feature} />
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
