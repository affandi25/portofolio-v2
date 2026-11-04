import React from 'react';

const TechStackIcon = ({ TechStackIcon, Language }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-3 p-4 cursor-pointer transition-transform duration-300 group-hover:-translate-y-1">
      <div className="w-14 h-14 md:w-16 md:h-16 flex items-center justify-center p-2 bg-white border border-neutral-300 shadow-sm">
        <img 
          src={TechStackIcon} 
          alt={`${Language} icon`} 
          className="h-10 w-10 md:h-12 md:w-12 object-contain"
        />
      </div>
      <span className="text-black font-mono font-bold text-xs tracking-wider uppercase">
        {Language}
      </span>
    </div>
  );
};

export default TechStackIcon;
