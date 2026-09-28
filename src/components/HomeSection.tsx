import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { SITE_INFO, LEADERSHIP_PROFILES, CORE_VALUES } from "../data/siteData";
import { useTheme } from "../context/ThemeContext";

interface HomeSectionProps {
  setActiveTab: (tab: string) => void;
  onSelectLeader: (id: string) => void;
  onOpenEstimator: () => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({
  setActiveTab,
  onSelectLeader,
  onOpenEstimator,
}) => {
  const { isDark } = useTheme();

  return (
    <div className="space-y-0">
      {/* ── HERO SECTION (Identical to mohalkar-architects-planners-9a3t) ──────────────────────────── */}
      <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Full-bleed background image with subtle scale transition */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] hover:scale-105"
          style={{
            backgroundImage: "url('/images/hugo-sousa-BghGseQbAkA-unsplash.jpg')",
          }}
        />
        {/* Cinematic dark overlay identical to reference site */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(10,10,10,0.76) 0%, rgba(10,10,10,0.58) 50%, rgba(10,10,10,0.76) 100%)",
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 py-28 sm:py-36 text-white space-y-4">
          <p className="font-sans text-[0.78rem] font-medium tracking-[4px] uppercase text-[#c8a96e] mb-3">
            {SITE_INFO.established}
          </p>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl font-light text-white tracking-normal leading-[1.12] mb-4 text-balance">
            &ldquo;Every Space Has a Story <br className="hidden sm:inline" />
            <span className="italic font-normal">We Design Yours</span>&rdquo;
          </h1>

          <p className="font-sans text-xs sm:text-sm md:text-base font-light tracking-[2px] text-white/80 max-w-2xl mx-auto uppercase">
            Modern Architecture &nbsp;|&nbsp; Interior Design &nbsp;|&nbsp; Urban Planning
          </p>

          {/* Action CTAs */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={() => setActiveTab("projects")}
              className="btn-gold cursor-pointer"
            >
              <span>View Projects</span>
            </button>

            <button
              onClick={() => setActiveTab("about")}
              className="btn-hero-outline cursor-pointer"
            >
              About Us
            </button>

            <button
              onClick={onOpenEstimator}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-[2px] rounded-[2px] bg-[#c8a96e]/20 text-[#c8a96e] border border-[#c8a96e]/50 hover:bg-[#c8a96e] hover:text-[#111827] transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Scope Estimator</span>
            </button>
          </div>
        </div>

        {/* Scroll hint chevron */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-[#c8a96e] animate-bounce pointer-events-none text-xl">
          <ChevronRight className="w-6 h-6 rotate-90" />
        </div>
      </section>

      {/* ── HIGH-CONTRAST STATS SECTION (Reference signature dark bar) ────────────────── */}
      <section className="bg-[#111827] text-white py-12 sm:py-16 border-y border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
            {SITE_INFO.stats.map((stat, idx) => (
              <div key={idx} className="text-center py-6 px-4">
                <span className="font-serif text-3xl sm:text-5xl font-bold text-[#c8a96e] block leading-none mb-2">
                  {stat.value}
                </span>
                <p className="font-sans text-[0.75rem] uppercase tracking-[2px] text-white/60 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPANY OVERVIEW SECTION (Crisp white / stone) ──────────────── */}
      <section className={`py-20 sm:py-28 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-[#0c0e12]" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="section-label">Company Overview</span>
                <h2 className={`section-heading ${isDark ? "text-white" : "text-[#111827]"}`}>
                  Designing Spaces <br />
                  <span className="italic font-normal text-[#c8a96e]">That Inspire</span>
                </h2>
              </div>

              <p className={`section-body ${isDark ? "text-neutral-300" : "text-[#555555]"}`}>
                <strong className={isDark ? "text-white font-semibold" : "text-[#111827] font-semibold"}>
                  Mohalkar Architects &amp; Planners
                </strong>{" "}
                is a leading design consultancy specialising in residential, commercial, and urban
                planning. With a passion for purposeful beauty, we deliver innovative, sustainable,
                and tailored solutions to private clients, developers, and local bodies across India.
              </p>

              <p className={`section-body ${isDark ? "text-neutral-400" : "text-[#666666]"}`}>
                From concept to completion, every project reflects our commitment to craftsmanship,
                context, and lasting value. We blend architectural rigor with pragmatic constructability.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setActiveTab("projects")}
                  className="btn-gold cursor-pointer"
                >
                  <span>Explore Our Work</span>
                </button>

                <button
                  onClick={() => setActiveTab("about")}
                  className="text-xs font-semibold uppercase tracking-[2px] text-[#c8a96e] hover:text-[#a8843e] underline underline-offset-4 cursor-pointer"
                >
                  Read Our Story &rarr;
                </button>
              </div>
            </div>

            {/* Image with signature bottom-left gold badge */}
            <div className="lg:col-span-6">
              <div className="relative rounded-[4px] overflow-visible">
                <img
                  src="/images/hugo-sousa-BghGseQbAkA-unsplash.jpg"
                  alt="Mohalkar Architecture"
                  className="w-full h-[360px] sm:h-[460px] object-cover rounded-[4px] shadow-xl block"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/images/project6.jpeg";
                  }}
                />

                {/* Signature Gold Badge */}
                <div className="absolute -bottom-6 -left-4 sm:-bottom-6 sm:-left-6 bg-[#c8a96e] text-[#111827] p-5 sm:p-6 rounded-[4px] text-center shadow-xl border border-[#c8a96e]/30">
                  <span className="font-serif text-3xl sm:text-4xl font-bold block leading-none">
                    2+
                  </span>
                  <span className="font-sans text-[0.7rem] font-bold uppercase tracking-[2px] block mt-1.5 whitespace-nowrap">
                    Years of Excellence
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES SECTION (Alabaster #f7f5f2 background) ──────────────── */}
      <section className={`py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-y ${
        isDark ? "bg-[#101319] border-[#1e232d]" : "bg-[#f7f5f2] border-black/[0.06]"
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label">What Drives Us</span>
            <h2 className={`section-heading ${isDark ? "text-white" : "text-[#111827]"}`}>
              Our Core Values
            </h2>
            <p className={`text-sm ${isDark ? "text-neutral-400" : "text-[#666666]"}`}>
              Every drawing, volume, and material specification is rooted in foundational design ethics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map((val, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-[4px] border gold-card-hover ${
                  isDark
                    ? "bg-[#141822] border-[#252830]"
                    : "bg-white border-black/[0.07] shadow-xs"
                }`}
              >
                <span className="font-mono text-xs text-[#c8a96e] font-bold block mb-3">0{idx + 1}.</span>
                <h3 className={`font-serif text-xl font-bold mb-3 ${isDark ? "text-white" : "text-[#111827]"}`}>
                  {val.title}
                </h3>
                <p className={`text-xs leading-relaxed ${isDark ? "text-neutral-400" : "text-[#666666]"}`}>
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP SECTION (White background) ──────────────────────── */}
      <section className={`py-20 sm:py-28 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-[#0c0e12]" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label">Leadership</span>
            <h2 className={`section-heading ${isDark ? "text-white" : "text-[#111827]"}`}>
              Meet Our Team
            </h2>
            <p className={`text-sm ${isDark ? "text-neutral-400" : "text-[#666666]"}`}>
              Principals guiding architectural design, planning vision, and client partnership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {LEADERSHIP_PROFILES.map((leader) => (
              <div
                key={leader.id}
                onClick={() => onSelectLeader(leader.id)}
                className={`group p-8 rounded-[4px] border transition-all cursor-pointer gold-card-hover ${
                  isDark
                    ? "border-[#252830] bg-[#141822] hover:border-[#c8a96e]"
                    : "border-black/[0.07] bg-white hover:border-[#c8a96e] shadow-sm hover:shadow-xl"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-20 h-20 shrink-0 rounded-[6px] overflow-hidden border p-1 group-hover:border-[#c8a96e] transition-colors ${
                      isDark ? "border-[#252830] bg-[#161a22]" : "border-black/[0.08] bg-[#f7f5f2]"
                    }`}
                  >
                    <img
                      src={leader.photo}
                      alt={leader.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/images/ceo.png";
                      }}
                    />
                  </div>
                  <div>
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#c8a96e]/15 text-[#8c6d32] dark:text-[#c8a96e] rounded mb-1 border border-[#c8a96e]/30">
                      {leader.designation}
                    </span>
                    <h3
                      className={`font-serif text-xl font-bold group-hover:text-[#c8a96e] transition-colors ${
                        isDark ? "text-white" : "text-[#111827]"
                      }`}
                    >
                      {leader.name}
                    </h3>
                    <p className={`text-xs ${isDark ? "text-neutral-400" : "text-[#666666]"}`}>
                      {leader.role.split("·")[1] || leader.role}
                    </p>
                  </div>
                </div>

                <p className={`text-xs leading-relaxed mt-4 ${isDark ? "text-neutral-300" : "text-[#555555]"}`}>
                  {leader.bio}
                </p>

                <div className="pt-4 flex items-center justify-between border-t border-black/[0.06] dark:border-white/[0.08] text-xs text-[#c8a96e] font-semibold uppercase tracking-[1.5px] mt-4">
                  <span>View Full Credentials &amp; Bio</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDIO PARTNERS (Associates section matching reference site) ─────────── */}
      <section className={`py-16 sm:py-20 px-4 sm:px-6 lg:px-8 text-center border-t ${
        isDark ? "bg-[#101319] border-[#1e232d]" : "bg-[#ffffff] border-black/[0.06]"
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <span className="section-label">Collaboration</span>
            <h2 className={`font-serif text-2xl sm:text-3xl font-bold ${isDark ? "text-white" : "text-[#111827]"}`}>
              Our Studio Partners &amp; Associates
            </h2>
            <p className={`text-xs mt-1 max-w-lg mx-auto ${isDark ? "text-neutral-400" : "text-[#666666]"}`}>
              Strategic alliances with structural consultants, MEP specialists, and urban planning institutions.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center max-w-4xl mx-auto">
            {SITE_INFO.partners.map((partner, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-[4px] border flex items-center justify-center h-28 transition-all hover:scale-105 ${
                  isDark
                    ? "border-[#252830] bg-[#141822]/60 hover:border-[#c8a96e]/40"
                    : "border-black/[0.07] bg-[#f7f5f2] hover:bg-white hover:shadow-md"
                }`}
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-14 max-w-[130px] object-contain grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/images/associates1.png";
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ───────────────────────────────── */}
      <section className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-[#0c0e12]" : "bg-[#f7f5f2]"}`}>
        <div className="max-w-5xl mx-auto">
          <div
            className={`rounded-[4px] border p-8 sm:p-14 text-center relative overflow-hidden shadow-xl ${
              isDark
                ? "border-[#c8a96e]/30 bg-gradient-to-r from-[#141720] via-[#1a1f2c] to-[#141720]"
                : "border-[#c8a96e]/40 bg-white shadow-lg"
            }`}
          >
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <span className="section-label">Get in Touch</span>
              <h2 className={`section-heading ${isDark ? "text-white" : "text-[#111827]"}`}>
                Let&rsquo;s Build Something <br />
                <span className="italic font-normal text-[#c8a96e]">Extraordinary</span>
              </h2>
              <p className={`section-body ${isDark ? "text-neutral-300" : "text-[#555555]"}`}>
                Whether you are planning a modern bungalow, commercial hub, or master township, our
                architects are ready to transform your vision into buildable perfection.
              </p>
              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => setActiveTab("enquiry")}
                  className="btn-gold cursor-pointer"
                >
                  Send an Enquiry &rarr;
                </button>
                <a
                  href={`tel:${SITE_INFO.contacts.phonePrimary}`}
                  className={`px-7 py-3 text-xs font-semibold uppercase tracking-[2px] rounded-[2px] transition-colors border ${
                    isDark
                      ? "text-neutral-200 hover:text-white bg-[#161a22] border-[#252830]"
                      : "text-[#111827] hover:text-black bg-[#f7f5f2] border-black/[0.1] shadow-xs"
                  }`}
                >
                  Call: {SITE_INFO.contacts.phonePrimary}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
