import React from "react";
import { ArrowUp, Instagram, Linkedin, Mail, Phone, MapPin, MessageCircle, Lock } from "lucide-react";
import { SITE_INFO } from "../data/siteData";
import { useTheme } from "../context/ThemeContext";

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { isDark } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative pt-16 pb-32 sm:pb-36 lg:pb-14 transition-colors border-t border-white/[0.08] z-10 bg-[#1f2937] text-white/70"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 pb-12 sm:pb-16 border-b border-white/[0.08]">
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo2.png"
                alt="Mohalkar Logo"
                className="w-11 h-11 object-contain border border-[#c8a96e]/40 rounded-[4px] p-0.5 bg-black/40 shadow-sm"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/images/logo.jpg";
                }}
              />
              <div>
                <span className="font-serif text-2xl font-bold tracking-[3px] text-[#c8a96e]">
                  MOHALKAR
                </span>
                <span className="block text-[9px] tracking-[3px] text-white/50 font-semibold uppercase mt-0.5">
                  ARCHITECTS &amp; PLANNERS
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-[13px] leading-relaxed max-w-sm text-white/60">
              Designing modern, inspiring spaces for a better tomorrow. Excellence in every line,
              purpose in every volume, and enduring value across residential, commercial, and
              urban sectors.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <a
                href={SITE_INFO.contacts.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 text-white/70 flex items-center justify-center hover:text-[#c8a96e] hover:border-[#c8a96e] hover:-translate-y-0.5 transition-all"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SITE_INFO.contacts.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 text-white/70 flex items-center justify-center hover:text-[#c8a96e] hover:border-[#c8a96e] hover:-translate-y-0.5 transition-all"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${SITE_INFO.contacts.emailPrimary}`}
                className="w-9 h-9 rounded-full border border-white/20 text-white/70 flex items-center justify-center hover:text-[#c8a96e] hover:border-[#c8a96e] hover:-translate-y-0.5 transition-all"
                aria-label="Email Studio"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={SITE_INFO.contacts.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/20 text-white/70 flex items-center justify-center hover:text-[#25d366] hover:border-[#25d366] hover:-translate-y-0.5 transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#c8a96e] font-semibold">
              Navigation
            </p>
            <ul className="space-y-1 sm:space-y-1.5 text-xs sm:text-[13px]">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("home")}
                  className="w-full text-left py-1.5 px-1 -mx-1 rounded transition-all cursor-pointer touch-manipulation flex items-center text-white/70 hover:text-[#c8a96e]"
                >
                  Home Overview
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("about")}
                  className="w-full text-left py-1.5 px-1 -mx-1 rounded transition-all cursor-pointer touch-manipulation flex items-center text-white/70 hover:text-[#c8a96e]"
                >
                  About the Studio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("expertise")}
                  className="w-full text-left py-1.5 px-1 -mx-1 rounded transition-all cursor-pointer touch-manipulation flex items-center text-white/70 hover:text-[#c8a96e]"
                >
                  Practice Expertise
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("services")}
                  className="w-full text-left py-1.5 px-1 -mx-1 rounded transition-all cursor-pointer touch-manipulation flex items-center text-white/70 hover:text-[#c8a96e]"
                >
                  Scope of Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("projects")}
                  className="w-full text-left py-1.5 px-1 -mx-1 rounded transition-all cursor-pointer touch-manipulation flex items-center text-white/70 hover:text-[#c8a96e]"
                >
                  Project Portfolio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("enquiry")}
                  className="w-full text-left py-1.5 px-1 -mx-1 rounded transition-all cursor-pointer touch-manipulation flex items-center text-white/70 hover:text-[#c8a96e]"
                >
                  Start Project Enquiry
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Design Disciplines */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#c8a96e] font-semibold">
              Disciplines
            </p>
            <ul className="space-y-1 sm:space-y-1.5 text-xs sm:text-[13px]">
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("expertise")}
                  className="w-full text-left py-1.5 px-1 -mx-1 rounded transition-all cursor-pointer touch-manipulation flex items-center text-white/70 hover:text-[#c8a96e]"
                >
                  Residential Architecture
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("expertise")}
                  className="w-full text-left py-1.5 px-1 -mx-1 rounded transition-all cursor-pointer touch-manipulation flex items-center text-white/70 hover:text-[#c8a96e]"
                >
                  Commercial &amp; Shopping Complex Design
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("expertise")}
                  className="w-full text-left py-1.5 px-1 -mx-1 rounded transition-all cursor-pointer touch-manipulation flex items-center text-white/70 hover:text-[#c8a96e]"
                >
                  Interior Architecture &amp; Joinery
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("expertise")}
                  className="w-full text-left py-1.5 px-1 -mx-1 rounded transition-all cursor-pointer touch-manipulation flex items-center text-white/70 hover:text-[#c8a96e]"
                >
                  Urban Planning &amp; Precincts
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("expertise")}
                  className="w-full text-left py-1.5 px-1 -mx-1 rounded transition-all cursor-pointer touch-manipulation flex items-center text-white/70 hover:text-[#c8a96e]"
                >
                  Landscape &amp; Public Parks
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigateTo("services")}
                  className="w-full text-left py-1.5 px-1 -mx-1 rounded transition-all cursor-pointer touch-manipulation flex items-center text-white/70 hover:text-[#c8a96e]"
                >
                  Statutory Municipal Sanctions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Studio Contacts */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs uppercase tracking-widest text-[#c8a96e] font-semibold">
              Contact &amp; Studios
            </p>
            <div className="space-y-3 text-xs sm:text-[13px] text-white/70">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#c8a96e] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <a
                    href={`tel:${SITE_INFO.contacts.phonePrimary}`}
                    className="block py-0.5 touch-manipulation hover:text-[#c8a96e] text-white font-medium"
                  >
                    {SITE_INFO.contacts.phonePrimary}
                  </a>
                  <a
                    href={`tel:${SITE_INFO.contacts.phoneSecondary}`}
                    className="block py-0.5 touch-manipulation hover:text-[#c8a96e] text-white/80"
                  >
                    {SITE_INFO.contacts.phoneSecondary}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#c8a96e] shrink-0 mt-0.5" />
                <a
                  href={`mailto:${SITE_INFO.contacts.emailPrimary}`}
                  className="hover:text-[#c8a96e] break-all py-0.5 touch-manipulation text-white/80"
                >
                  {SITE_INFO.contacts.emailPrimary}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#c8a96e] shrink-0 mt-0.5" />
                <span className="leading-relaxed text-white/70">{SITE_INFO.contacts.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="text-center md:text-left leading-relaxed">
            &copy; 2026 <strong className="text-white">Abhishek Mohalkar</strong> · Mohalkar Architects &amp; Planners. All rights reserved.
          </div>

          <div className="flex items-center gap-3 sm:gap-5 flex-wrap justify-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs">
              Designed by{" "}
              <span className="text-[#c8a96e] font-medium tracking-wide">
                Mali Studio&apos;s
              </span>
            </span>

            <span className={isDark ? "text-neutral-800 hidden sm:inline" : "text-neutral-300 hidden sm:inline"}>
              |
            </span>

            {/* Studio Control - discreet, non-highlighted, comfortable touch target */}
            <button
              type="button"
              onClick={() => navigateTo("admin")}
              className={`inline-flex items-center gap-1.5 py-2 px-2.5 rounded transition-colors cursor-pointer touch-manipulation ${
                isDark
                  ? "text-neutral-500 hover:text-neutral-300 active:text-white"
                  : "text-neutral-500 hover:text-neutral-800 active:text-black"
              }`}
              title="Mohalkar Studio Executive Console"
            >
              <Lock className="w-3 h-3 opacity-70" />
              <span>Studio Control</span>
            </button>

            <span className={isDark ? "text-neutral-800 hidden sm:inline" : "text-neutral-300 hidden sm:inline"}>
              |
            </span>

            <button
              type="button"
              onClick={scrollToTop}
              className={`inline-flex items-center gap-1 py-2 px-2.5 rounded transition-colors cursor-pointer touch-manipulation ${
                isDark ? "text-neutral-400 hover:text-[#c8a96e]" : "text-neutral-600 hover:text-neutral-900"
              }`}
              title="Return to top of page"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
