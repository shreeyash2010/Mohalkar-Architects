import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Compass,
  Building2,
  Sofa,
  Eye,
  FileCheck2,
  Trees,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  Search,
  ArrowRight,
} from "lucide-react";
import { SERVICES_LIST, FAQ_LIST, ServiceItem } from "../data/siteData";
import { useTheme } from "../context/ThemeContext";

interface ServicesSectionProps {
  setActiveTab: (tab: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ setActiveTab }) => {
  const { isDark } = useTheme();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [faqSearch, setFaqSearch] = useState<string>("");

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case "Compass":
        return <Compass className="w-6 h-6 text-[#c8a96e]" />;
      case "Building2":
        return <Building2 className="w-6 h-6 text-[#c8a96e]" />;
      case "Sofa":
        return <Sofa className="w-6 h-6 text-[#c8a96e]" />;
      case "Eye":
        return <Eye className="w-6 h-6 text-[#c8a96e]" />;
      case "FileCheck2":
        return <FileCheck2 className="w-6 h-6 text-[#c8a96e]" />;
      case "Trees":
        return <Trees className="w-6 h-6 text-[#c8a96e]" />;
      case "ShieldCheck":
      default:
        return <ShieldCheck className="w-6 h-6 text-[#c8a96e]" />;
    }
  };

  const filteredFaqs = FAQ_LIST.filter(
    (faq) =>
      faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="space-y-0">
      {/* ── HERO ───────────────────────────────────── */}
      <section
        className={`relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b ${
          isDark ? "bg-[#0c0e12] border-[#1e2229]" : "bg-white border-black/[0.06]"
        }`}
      >
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[2px] text-[#c8a96e] font-semibold mb-4">
            <button onClick={() => setActiveTab("home")} className="hover:underline cursor-pointer">
              Home
            </button>
            <span>/</span>
            <span className={isDark ? "text-neutral-400" : "text-[#888888]"}>
              Our Services
            </span>
          </div>

          <h1
            className={`font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight ${
              isDark ? "text-white" : "text-[#111827]"
            }`}
          >
            A Service for Every Stage
          </h1>
          <p
            className={`mt-4 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
              isDark ? "text-neutral-300" : "text-[#555555]"
            }`}
          >
            Whether you&rsquo;re just starting to envision a project or ready to break ground, Mohalkar Architects offers design services precisely calibrated for your stage, budget, and ambition.
          </p>
        </div>
      </section>

      {/* ── SERVICES LISTING ───────────────────────── */}
      <section className={`py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b ${
        isDark ? "bg-[#101319] border-[#1e2229]" : "bg-[#f7f5f2] border-black/[0.06]"
      }`}>
        <div className="max-w-7xl mx-auto space-y-8">
          {SERVICES_LIST.map((svc: ServiceItem, idx: number) => (
            <div
              key={svc.id}
              className={`p-8 sm:p-10 rounded-[4px] border transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-start group gold-card-hover ${
                isDark
                  ? "border-[#252830] bg-[#141822] hover:border-[#c8a96e]"
                  : "border-black/[0.07] bg-white hover:border-[#c8a96e] shadow-xs hover:shadow-xl"
              }`}
            >
              <div className="lg:col-span-1 flex items-center justify-between lg:block">
                <span className="font-mono text-2xl font-bold text-[#c8a96e]">
                  0{idx + 1}.
                </span>
                <div className="lg:hidden w-10 h-10 rounded-full bg-[#c8a96e]/10 flex items-center justify-center">
                  {getServiceIcon(svc.iconName)}
                </div>
              </div>

              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="hidden lg:flex w-12 h-12 rounded-full bg-[#c8a96e]/10 items-center justify-center">
                    {getServiceIcon(svc.iconName)}
                  </div>
                  <h3
                    className={`font-serif text-2xl font-bold group-hover:text-[#c8a96e] transition-colors ${
                      isDark ? "text-white" : "text-[#111827]"
                    }`}
                  >
                    {svc.title}
                  </h3>
                </div>
                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? "text-neutral-300" : "text-[#555555]"
                  }`}
                >
                  {svc.fullDesc}
                </p>

                <div
                  className={`border rounded-[4px] p-5 space-y-3 ${
                    isDark
                      ? "bg-[#161a22] border-[#252830]"
                      : "bg-[#f7f5f2] border-black/[0.06]"
                  }`}
                >
                  <p className="text-[11px] uppercase tracking-[2px] text-[#c8a96e] font-semibold">
                    Standard Deliverables
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {svc.deliverables.map((deliv, dIdx) => (
                      <div
                        key={dIdx}
                        className={`flex items-start gap-2 text-xs ${
                          isDark ? "text-neutral-300" : "text-[#555555]"
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c8a96e] shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setActiveTab("enquiry")}
                    className="btn-gold cursor-pointer"
                  >
                    <span>Request Consultation</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-2" />
                  </button>
                  <button
                    onClick={() => setActiveTab("projects")}
                    className="text-xs font-semibold uppercase tracking-[2px] text-[#c8a96e] hover:text-[#a8843e] cursor-pointer"
                  >
                    Explore Portfolio &rarr;
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5">
                {svc.image && (
                  <div
                    className={`relative rounded-[4px] overflow-hidden border shadow-md aspect-16/10 lg:aspect-4/3 w-full ${
                      isDark ? "border-[#252830] bg-[#161a22]" : "border-black/[0.07] bg-[#f7f5f2]"
                    }`}
                  >
                    <img
                      src={svc.image}
                      alt={svc.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/images/project6.jpeg";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-neutral-300">
                      <span className="font-mono text-[#c8a96e] uppercase tracking-wider font-semibold">
                        Discipline 0{idx + 1}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-neutral-300 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                        Mohalkar Atelier
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FREQUENTLY ASKED QUESTIONS ─────────────── */}
      <section className={`py-20 sm:py-24 px-4 sm:px-6 lg:px-8 ${
        isDark ? "bg-[#0c0e12]" : "bg-white"
      }`}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label">
              Questions
            </span>
            <h2
              className={`section-heading ${
                isDark ? "text-white" : "text-[#111827]"
              }`}
            >
              Frequently Asked Questions
            </h2>
            <p
              className={`text-xs sm:text-sm mt-2 ${
                isDark ? "text-neutral-400" : "text-[#666666]"
              }`}
            >
              Clear, transparent answers about our engagement models, fees, and execution workflows.
            </p>

            {/* FAQ Search Bar */}
            <div className="mt-6 max-w-md mx-auto relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search common questions (fees, process, location)..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-[4px] text-xs focus:outline-none transition-colors border ${
                  isDark
                    ? "bg-[#141720] border-[#252830] text-white placeholder-neutral-500 focus:border-[#c8a96e]"
                    : "bg-[#f7f5f2] border-[#ddd] text-[#3a3a3a] placeholder-neutral-500 focus:border-[#c8a96e] focus:bg-white shadow-xs"
                }`}
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-[4px] border overflow-hidden transition-all ${
                    isDark
                      ? "border-[#252830] bg-[#12151c]"
                      : "border-[#ebebeb] bg-white shadow-xs hover:border-[#c8a96e]/50"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <span
                      className={`font-serif text-lg font-bold transition-colors ${
                        isOpen
                          ? "text-[#c8a96e]"
                          : isDark
                          ? "text-white"
                          : "text-[#111827]"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#c8a96e] transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div
                      className={`px-5 pb-5 pt-1 text-xs leading-relaxed border-t ${
                        isDark
                          ? "text-neutral-300 border-[#1e232d]/60"
                          : "text-[#555555] border-[#ebebeb]"
                      }`}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}

            {filteredFaqs.length === 0 && (
              <p className="text-center text-xs text-neutral-500 py-6">
                No matching questions found. Please reach out directly through our contact form.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ── CTA BAND (Signature dark/gold band from reference site) ────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#111827] via-[#1a150b] to-[#111827] text-white border-y border-[#c8a96e]/25">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="section-label">
            Next Steps
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white">
            Ready to get started?
          </h2>
          <p className="text-xs sm:text-sm max-w-xl mx-auto text-white/70">
            Share your project brief and our architectural studio will respond with a tailored proposal within 24 hours.
          </p>
          <div className="pt-4">
            <button
              onClick={() => setActiveTab("enquiry")}
              className="btn-gold cursor-pointer inline-flex items-center gap-2"
            >
              <span>Send an Enquiry</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
