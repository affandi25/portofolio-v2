import React, { useState, useEffect } from "react";
import { User, Mail, MessageSquare, Send, ArrowUpRight } from "lucide-react";
import Komentar from "../components/Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({
      once: true,
      offset: 20,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const iframe = document.getElementById("hidden-iframe");
    iframe.onload = () => {
      Swal.fire({
        title: "Terkirim!",
        text: "Pesan Anda telah berhasil dikirim ke Yusuf.",
        icon: "success",
        confirmButtonColor: "#0D0D0D",
        timer: 2500,
        timerProgressBar: true,
      });
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
      iframe.onload = null;
    };

    e.target.submit();
  };

  return (
    <section id="Contact" className="w-full bg-[#EAE8E4] text-[#0D0D0D] py-20 sm:py-28 border-t border-neutral-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-300 pb-6 mb-16 gap-4" data-aos="fade-up" data-aos-duration="700">
          <div>
            <span className="text-[11px] font-mono tracking-[0.25em] text-neutral-500 uppercase font-semibold block mb-1">
              03 // GET IN TOUCH
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-black uppercase mt-1">
              Hubungi Saya
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-2 font-light">
              Punya pertanyaan? Kirimi saya pesan, dan saya akan segera membalasnya.
            </p>
          </div>
          <span className="text-xs font-mono tracking-widest text-neutral-500 uppercase">
            RESPONSE TIME &lt; 24 HOURS
          </span>
        </div>

        {/* 2-Column Layout: Contact Form on Left, Guestbook Comments on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Message Form */}
          <div
            className="lg:col-span-5 bg-white border border-neutral-300 p-8 sm:p-10"
            data-aos="fade-up"
            data-aos-duration="700"
          >
            <div className="mb-8">
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">DIRECT DISPATCH</span>
              <h3 className="text-2xl font-black tracking-tight text-black mt-1">SEND A MESSAGE</h3>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                Punya pertanyaan atau tawaran kolaborasi? Kirimkan pesan melalui form ini.
              </p>
            </div>

            <iframe name="hidden-iframe" id="hidden-iframe" style={{ display: "none" }} title="hidden"></iframe>
            <form
              onSubmit={handleSubmit}
              action="https://formsubmit.co/m.yusufaffandi76@gmail.com"
              method="POST"
              target="hidden-iframe"
              className="space-y-5"
            >
              <input type="hidden" name="_subject" value="Pesan Baru dari Website Portfolio Muhammad Yusuf Affandi" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value="https://portofolio-aqro.vercel.app" />

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-black font-semibold mb-1.5">
                  YOUR NAME <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full py-3 pl-10 pr-4 bg-[#EAE8E4] border border-neutral-300 text-black text-sm placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-black font-semibold mb-1.5">
                  EMAIL ADDRESS <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full py-3 pl-10 pr-4 bg-[#EAE8E4] border border-neutral-300 text-black text-sm placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-black font-semibold mb-1.5">
                  MESSAGE <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-400" />
                  <textarea
                    name="message"
                    placeholder="Tuliskan pesan atau ide kolaborasi..."
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    rows={4}
                    className="w-full py-3 pl-10 pr-4 bg-[#EAE8E4] border border-neutral-300 text-black text-sm placeholder-neutral-400 focus:outline-none focus:border-black transition-colors resize-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-black text-white hover:bg-neutral-800 transition-colors text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "TRANSMITTING..." : "SEND MESSAGE"}</span>
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-neutral-200 text-center">
              <span className="text-[11px] font-mono text-neutral-500 uppercase block mb-1">DIRECT INBOX</span>
              <a
                href="mailto:m.yusufaffandi76@gmail.com"
                className="text-xs font-mono font-bold text-black underline tracking-wider"
              >
                m.yusufaffandi76@gmail.com
              </a>
            </div>
          </div>

          {/* Right Column: Live Guestbook & Comments */}
          <div
            className="lg:col-span-7 bg-white border border-neutral-300 p-8 sm:p-10"
            data-aos="fade-up"
            data-aos-duration="700"
            data-aos-delay="150"
          >
            <div className="mb-6 pb-4 border-b border-neutral-200 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">COMMUNITY</span>
                <h3 className="text-2xl font-black tracking-tight text-black mt-0.5">GUESTBOOK</h3>
              </div>
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                SUPABASE LIVE
              </span>
            </div>

            <Komentar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
