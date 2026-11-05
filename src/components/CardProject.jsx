import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import { toSlug } from "../utils/slug";

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      e.preventDefault();
      alert("Live demo link is not available");
    }
  };

  const handleDetails = (e) => {
    if (!id) {
      e.preventDefault();
      alert("Project details are not available");
    }
  };

  return (
    <div className="group relative w-full bg-white border border-black hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
      {/* Top Image Container */}
      <div className="relative overflow-hidden aspect-[16/10] bg-neutral-100 border-b border-black">
        <img
          src={Img}
          alt={Title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase block mb-1">
            WEB / APPLICATION
          </span>
          <h3 className="text-lg font-bold tracking-tight text-black group-hover:text-neutral-700 transition-colors line-clamp-1">
            {Title}
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed line-clamp-2 mt-1.5 font-normal">
            {Description}
          </p>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
          {ProjectLink ? (
            <a
              href={ProjectLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleLiveDemo}
              className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase text-black hover:opacity-60 transition-opacity"
            >
              <span>LIVE DEMO</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <span className="text-[11px] font-mono text-neutral-400 uppercase">
              NO DEMO LINK
            </span>
          )}

          {id ? (
            <Link
              to={`/project/${toSlug(Title)}`}
              onClick={handleDetails}
              className="inline-flex items-center gap-1 px-3 py-1.5 bg-black text-white text-[11px] font-bold tracking-widest uppercase hover:bg-neutral-800 transition-colors"
            >
              <span>DETAILS</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          ) : (
            <span className="text-[11px] font-mono text-neutral-400 uppercase">
              NO DETAILS
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardProject;
