import React from "react";
import { ArrowRight } from "lucide-react";
import { CORE_VALUES, MILESTONES, LEADERSHIP_PROFILES, SITE_INFO } from "../data/siteData";
import { useTheme } from "../context/ThemeContext";

interface AboutSectionProps {
  setActiveTab?: (tab: string) => void;
  onSelectLeader?: (id: string) => void;
  onNavigate?: (tab: string) => void;
  onOpenLeadershipModal?: (id: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  setActiveTab,
  onSelectLeader,
  onNavigate,
  onOpenLeadershipModal,
}) => {
  const { isDark } = useTheme();
  const handleNavigate = setActiveTab || onNavigate || (() => {});
  const handleSelectLeader = onSelectLeader || onOpenLeadershipModal || (() => {});

  return (
    <div className="space-y-0">
      {/* ── ABOUT PAGE HERO ───────────────────────── */}
      <section
        className={`relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 border-b ${
          isDark ? "bg-[#0c0e12] border-[#1e2229]" : "bg-white border-black/[0.06]"
        }`}
      >
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[2px] text-[#c8a96e] font-semibold mb-4">
            <button
              onClick={() => handleNavigate("home")}
              className="hover:underline cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <span className={isDark ? "text-neutral-400" : "text-[#888888]"}>
              About Us
            </span>
          </div>

          <h1
            className={`font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight ${
              isDark ? "text-white" : "text-[#111827]"
            }`}
          >
            About Our Atelier
          </h1>
          <p
            className={`mt-4 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed ${
              isDark ? "text-neutral-300" : "text-[#555555]"
            }`}
          >
            Bridging spatial artistry and structural precision. Mohalkar Architects &amp; Planners crafts human-centered built environments with lasting context and purpose.
          </p>
        </div>
      </section>

      {/* ── OUR STORY & FOUNDATION ────────────────── */}
      <section className={`py-20 sm:py-28 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-[#101319]" : "bg-[#f7f5f2]"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="section-label">Our Story</span>
                <h2
                  className={`section-heading ${
                    isDark ? "text-white" : "text-[#111827]"
                  }`}
                >
                  Designing Spaces <br />
                  <span className="italic font-normal text-[#c8a96e]">
                    That Inspire
                  </span>
                </h2>
              </div>

              <p
                className={`section-body ${
                  isDark ? "text-neutral-300" : "text-[#555555]"
                }`}
              >
                <strong className={isDark ? "text-white font-semibold" : "text-[#111827] font-semibold"}>
                  Mohalkar Architects &amp; Planners
                </strong>{" "}
                was founded with a singular belief: that good architecture is the intersection of art, science, and human experience. Led by <strong>Ar. Abhishek Mohalkar</strong>, the studio has rapidly grown into a trusted name across Maharashtra and beyond.
              </p>

              <p
                className={`section-body ${
                  isDark ? "text-neutral-400" : "text-[#666666]"
                }`}
              >
                We work across residential, commercial, interior, and urban scales — always beginning with careful listening and ending with spaces that outlast trends. From concept to construction documentation, we stay invested at every step.
              </p>

              <div
                className={`pt-4 grid grid-cols-2 gap-4 border-t ${
                  isDark ? "border-[#1e2229]" : "border-black/[0.08]"
                }`}
              >
                <div>
                  <span
                    className={`font-serif text-2xl font-bold ${
                      isDark ? "text-white" : "text-[#111827]"
                    }`}
                  >
                    Pune · Bhoom
                  </span>
                  <p className="text-[11px] uppercase tracking-wider text-[#c8a96e] font-semibold">
                    Studio Operations
                  </p>
                </div>
                <div>
                  <span
                    className={`font-serif text-2xl font-bold ${
                      isDark ? "text-white" : "text-[#111827]"
                    }`}
                  >
                    Dharashiv
                  </span>
                  <p className="text-[11px] uppercase tracking-wider text-[#c8a96e] font-semibold">
                    Regional Heritage Roots
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-[4px] overflow-visible">
                <img
                  src="/images/hugo-sousa-BghGseQbAkA-unsplash.jpg"
                  alt="Architectural Craftsmanship"
                  className="w-full h-[400px] sm:h-[460px] object-cover rounded-[4px] shadow-xl block"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/images/project6.jpeg";
                  }}
                />
                {/* Gold badge at bottom left */}
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

      {/* ── CORE VALUES ────────────────────────────── */}
      <section className={`py-20 sm:py-24 px-4 sm:px-6 lg:px-8 border-y ${
        isDark ? "bg-[#101319] border-[#1e232d]" : "bg-[#f7f5f2] border-black/[0.06]"
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label">
              What Drives Us
            </span>
            <h2
              className={`section-heading ${
                isDark ? "text-white" : "text-[#111827]"
              }`}
            >
              Our Core Values
            </h2>
            <p
              className={`text-xs sm:text-sm mt-2 ${
                isDark ? "text-neutral-400" : "text-[#666666]"
              }`}
            >
              The ethical pillars that guide our pencils, drawings, and client interactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map((val, idx) => (
              <div
                key={idx}
                className={`p-8 rounded-[8px] border value-card ${
                  isDark
                    ? "border-[#252830] bg-[#12151c] hover:border-[#c8a96e]/40"
                    : "border-[#ebebeb] bg-white hover:border-[#c8a96e] shadow-xs"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-[4px] flex items-center justify-center font-mono text-xs font-bold mb-4 ${
                    isDark
                      ? "bg-[#c8a96e]/10 border border-[#c8a96e]/30 text-[#c8a96e]"
                      : "bg-[#c8a96e]/15 border border-[#c8a96e]/30 text-[#8c6d32]"
                  }`}
                >
                  0{idx + 1}
                </div>
                <h3
                  className={`font-serif text-xl font-bold mb-2 ${
                    isDark ? "text-white" : "text-[#111827]"
                  }`}
                >
                  {val.title}
                </h3>
                <p
                  className={`text-xs leading-relaxed ${
                    isDark ? "text-neutral-400" : "text-[#666666]"
                  }`}
                >
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDIO MILESTONES & JOURNEY (Signature Timeline Bar) ────────────── */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-[#1f2937] text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="section-label">
              Our Journey
            </span>
            <h2 className="section-heading text-white">
              Studio Milestones
            </h2>
            <p className="text-xs sm:text-sm mt-2 text-white/60">
              From architectural vision and academic thesis to scalable pan-India practice.
            </p>
          </div>

          <div className="relative border-l border-white/10 ml-4 sm:ml-32 space-y-12 pl-6 sm:pl-10">
            {MILESTONES.map((mile, idx) => (
              <div key={idx} className="relative group">
                {/* Year indicator */}
                <div className="sm:absolute sm:-left-36 sm:top-0 sm:text-right mb-2 sm:mb-0">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-[2px] border text-[#c8a96e] bg-[#111827] border-[#c8a96e]/40 shadow-xs">
                    {mile.year}
                  </span>
                </div>

                {/* Node dot */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#c8a96e] bg-[#c8a96e] shadow-sm" />

                <div className="p-6 rounded-[6px] border border-white/10 bg-[#374151] border-l-4 border-l-[#c8a96e] space-y-2 shadow-lg">
                  <h3 className="font-serif text-xl font-bold text-white">
                    {mile.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-white/80">
                    {mile.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP PROFILES ────────────────────── */}
      <section className={`py-20 sm:py-24 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-[#0c0e12]" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="section-label">
              Leadership
            </span>
            <h2
              className={`section-heading ${
                isDark ? "text-white" : "text-[#111827]"
              }`}
            >
              Meet Our Team
            </h2>
            <p
              className={`text-xs sm:text-sm mt-2 ${
                isDark ? "text-neutral-400" : "text-[#666666]"
              }`}
            >
              Click any profile to review complete thesis background, experience, and credentials.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {LEADERSHIP_PROFILES.map((leader) => (
              <div
                key={leader.id}
                onClick={() => handleSelectLeader(leader.id)}
                className={`group p-8 rounded-[4px] border transition-all cursor-pointer gold-card-hover ${
                  isDark
                    ? "border-[#252830] bg-[#141822] hover:border-[#c8a96e]"
                    : "border-black/[0.07] bg-white hover:border-[#c8a96e] shadow-xs hover:shadow-xl"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-20 h-20 shrink-0 rounded-[4px] overflow-hidden border p-1 group-hover:border-[#c8a96e] transition-colors ${
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
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#c8a96e]/15 text-[#8c6d32] dark:text-[#c8a96e] rounded-[2px] mb-1 border border-[#c8a96e]/30">
                      {leader.designation}
                    </span>
                    <h3
                      className={`font-serif text-xl font-bold group-hover:text-[#c8a96e] transition-colors ${
                        isDark ? "text-white" : "text-[#111827]"
                      }`}
                    >
                      {leader.name}
                    </h3>
                    <p
                      className={`text-xs ${
                        isDark ? "text-neutral-400" : "text-[#666666]"
                      }`}
                    >
                      {leader.role}
                    </p>
                  </div>
                </div>

                <p
                  className={`text-xs leading-relaxed mt-4 ${
                    isDark ? "text-neutral-300" : "text-[#555555]"
                  }`}
                >
                  {leader.bio}
                </p>

                <div
                  className={`pt-4 flex items-center justify-between border-t text-xs text-[#c8a96e] font-semibold uppercase tracking-[1.5px] mt-4 ${
                    isDark ? "border-[#1e232d]" : "border-black/[0.06]"
                  }`}
                >
                  <span>Inspect Full Bio &amp; Projects</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDIO PARTNERS ────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-10">
          <span className="text-xs uppercase tracking-widest text-[#c8a96e] font-semibold">
            Collaboration
          </span>
          <h2
            className={`font-serif text-2xl sm:text-3xl font-bold mt-1 ${
              isDark ? "text-white" : "text-neutral-900"
            }`}
          >
            Our Studio Partners
          </h2>
          <p
            className={`text-xs mt-1 max-w-lg mx-auto ${
              isDark ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            Multidisciplinary industry partners collaborating across engineering, MEP, and statutory approvals.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center max-w-4xl mx-auto">
          {SITE_INFO.partners.map((partner, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-xl border flex items-center justify-center h-24 transition-colors ${
                isDark
                  ? "border-[#252830] bg-[#12151c]/60 hover:border-[#c8a96e]/40"
                  : "border-[#e2e6ee] bg-white hover:border-[#c8a96e] shadow-sm"
              }`}
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-12 max-w-[120px] object-contain grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/images/associates1.png";
                }}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
