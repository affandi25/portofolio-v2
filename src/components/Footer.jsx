import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0D0D0D] text-neutral-400 py-8 sm:py-10 border-t border-neutral-800 text-center text-xs sm:text-sm font-mono">
      <div className="max-w-7xl mx-auto px-6">
        <p>
          © 2026{" "}
          <a
            href="https://muhammadyusufaffandi.com/"
            className="text-white hover:underline transition-all"
          >
            Muhammad Yusuf Affandi™
          </a>
          . All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
