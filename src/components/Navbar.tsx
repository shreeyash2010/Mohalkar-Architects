import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Phone, MessageCircle } from "lucide-react";
import { SITE_INFO } from "../data/siteData";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "../context/ThemeContext";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { isDark } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "expertise", label: "Expertise" },
    { id: "services", label: "Services" },
    { id: "projects", label: "Projects" },
    { id: "enquiry", label: "Contact" },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isHeroTransparent = activeTab === "home" && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
          isHeroTransparent
            ? "bg-gradient-to-b from-black/75 via-black/40 to-transparent py-4 sm:py-5"
            : scrolled
            ? isDark
              ? "bg-[#0c0e12]/92 backdrop-blur-md py-3.5 shadow-2xl"
              : "bg-[#ffffff]/96 backdrop-blur-md py-3.5 shadow-sm"
            : isDark
            ? "bg-gradient-to-b from-[#0c0e12]/90 to-transparent py-4"
            : "bg-[#ffffff]/96 backdrop-blur-md py-4 shadow-xs"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Strictly 3-Zone Top Bar Contract */}
          <div className="flex items-center justify-between">
            {/* Zone 1: Single element brand mark */}
            <button
              onClick={() => handleNavClick("home")}
              className="group flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c8a96e] cursor-pointer"
              aria-label="Mohalkar Architects & Planners"
            >
              <div
                className={`relative w-11 h-11 rounded-[4px] border overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105 ${
                  isHeroTransparent
                    ? "border-[#c8a96e]/40 bg-black/40 backdrop-blur-xs"
                    : isDark
                    ? "border-[#c8a96e]/30 bg-[#161a22]"
                    : "border-[#c8a96e]/40 bg-white shadow-xs"
                }`}
              >
                <img
                  src="/images/logo2.png"
                  alt="Mohalkar Logo"
                  className="w-full h-full object-contain p-1"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/images/logo.jpg";
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-serif text-xl sm:text-2xl font-bold tracking-[3px] group-hover:text-[#c8a96e] transition-colors leading-none ${
                    isHeroTransparent || isDark ? "text-white" : "text-[#111827]"
                  }`}
                >
                  MOHALKAR
                </span>
                <span className="text-[9px] tracking-[3px] text-[#c8a96e] font-semibold uppercase mt-1">
                  ARCHITECTS &amp; PLANNERS
                </span>
              </div>
            </button>

            {/* Zone 2: Clean unboxed text navigation links (desktop only) */}
            <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-[1.5px]">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`relative py-1 transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c8a96e] cursor-pointer ${
                      isActive
                        ? "text-[#c8a96e] font-bold"
                        : isHeroTransparent
                        ? "text-white/85 hover:text-[#c8a96e]"
                        : isDark
                        ? "text-[#9da3ae] hover:text-white"
                        : "text-[#3a3a3a] hover:text-[#c8a96e]"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c8a96e] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Theme toggler, primary action button & direct WhatsApp */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Global Theme Toggle */}
              <ThemeToggle />

              <a
                href={SITE_INFO.contacts.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#25d366] bg-[#25d366]/10 border border-[#25d366]/20 rounded-md hover:bg-[#25d366]/20 transition-colors whitespace-nowrap"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <button
                onClick={() => handleNavClick("enquiry")}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-[2px] text-[#111827] bg-[#c8a96e] hover:bg-[#a8843e] hover:text-white rounded-[2px] transition-all shadow-sm hover:shadow-[#c8a96e]/20 whitespace-nowrap cursor-pointer active:scale-95"
              >
                <span>Enquire Now</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile & Tablet Controls (Shown on screens < 1024px) */}
            <div className="flex lg:hidden items-center gap-2 sm:gap-3">
              {/* Theme Toggler for Mobile Top Bar */}
              <ThemeToggle />

              <a
                href={SITE_INFO.contacts.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-[#25d366] bg-[#25d366]/10 border border-[#25d366]/20 rounded-md hover:bg-[#25d366]/20 transition-colors"
                title="Chat on WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat</span>
              </a>
              <button
                onClick={() => handleNavClick("enquiry")}
                className="px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold uppercase tracking-wider text-[#0c0e12] bg-[#c8a96e] hover:bg-[#dfc085] rounded-md cursor-pointer transition-colors active:scale-95"
              >
                Enquire
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 rounded-md focus:outline-none cursor-pointer transition-colors ${
                  isDark
                    ? "text-[#9da3ae] hover:text-white bg-[#141720] border border-[#252830]"
                    : "text-neutral-700 hover:text-black bg-[#f1f3f7] border border-[#d8dde6]"
                }`}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#c8a96e]" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Drawer (Full Screen / Slide-over) */}
      {mobileMenuOpen && (
        <div
          className={`fixed inset-0 z-40 pt-24 px-6 pb-8 flex flex-col justify-between lg:hidden overflow-y-auto backdrop-blur-2xl transition-colors ${
            isDark ? "bg-[#0c0e12]/98 text-white" : "bg-[#ffffff]/98 text-neutral-900"
          }`}
        >
          <div className="space-y-4 max-w-md mx-auto w-full">
            <div
              className={`flex items-center justify-between pb-3 border-b ${
                isDark ? "border-[#252830]" : "border-[#e5e9f0]"
              }`}
            >
              <p className="text-[11px] uppercase tracking-widest text-[#c8a96e] font-semibold">
                Studio Directory
              </p>
              <span className={`text-[10px] font-mono ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>
                PUNE · BHOOM · DHARASHIV
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full text-left p-3 rounded-lg text-lg font-serif transition-all flex items-center justify-between cursor-pointer ${
                    activeTab === link.id
                      ? "bg-[#c8a96e]/15 text-[#c8a96e] font-bold border border-[#c8a96e]/40"
                      : isDark
                      ? "text-neutral-200 hover:text-white hover:bg-[#141720] border border-transparent"
                      : "text-neutral-700 hover:text-neutral-900 hover:bg-[#f3f4f8] border border-transparent"
                  }`}
                >
                  <span>{link.label}</span>
                  {activeTab === link.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#c8a96e]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div
            className={`pt-6 border-t space-y-3 max-w-md mx-auto w-full ${
              isDark ? "border-[#252830]" : "border-[#e5e9f0]"
            }`}
          >
            {/* Light / Dark Mode Toggle in Mobile Drawer */}
            <div
              className={`flex items-center justify-between p-3 rounded-xl border ${
                isDark ? "bg-[#141720] border-[#252830]" : "bg-[#f4f6fa] border-[#e2e6ee]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider">
                  Interface Theme
                </span>
                <span className="text-[10px] text-[#c8a96e] font-mono">
                  {isDark ? "Dark Mode" : "Light Mode"}
                </span>
              </div>
              <ThemeToggle showLabel />
            </div>

            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs ${
                isDark ? "text-neutral-400" : "text-neutral-600"
              }`}
            >
              <div
                className={`flex items-center gap-2 p-2 rounded ${
                  isDark ? "bg-[#141720]" : "bg-[#f4f6fa]"
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-[#c8a96e] shrink-0" />
                <a
                  href={`tel:${SITE_INFO.contacts.phonePrimary}`}
                  className={`truncate ${isDark ? "hover:text-white" : "hover:text-black"}`}
                >
                  {SITE_INFO.contacts.phonePrimary}
                </a>
              </div>
              <div
                className={`flex items-center gap-2 p-2 rounded ${
                  isDark ? "bg-[#141720]" : "bg-[#f4f6fa]"
                }`}
              >
                <span className="text-[10px] uppercase font-mono text-[#c8a96e]">Hours:</span>
                <span className="truncate">9:30 AM – 7:30 PM</span>
              </div>
            </div>
            <a
              href={SITE_INFO.contacts.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold uppercase tracking-wider text-black bg-[#25d366] hover:bg-[#20ba59] rounded-md transition-colors shadow-lg active:scale-95 touch-manipulation"
            >
              <MessageCircle className="w-4 h-4" />
              Direct WhatsApp with Abhishek Mohalkar
            </a>

            <div className="pt-2 text-center">
              <span className={`text-[10px] ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>
                Designed by <span className="text-[#c8a96e] font-medium">Mali Studio&apos;s</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
