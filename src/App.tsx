import React, { useState, useEffect } from "react";
import { MessageCircle, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomeSection } from "./components/HomeSection";
import { AboutSection } from "./components/AboutSection";
import { ExpertiseSection } from "./components/ExpertiseSection";
import { ServicesSection } from "./components/ServicesSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { EnquirySection } from "./components/EnquirySection";
import { AdminDashboard } from "./components/AdminDashboard";
import { ProjectModal } from "./components/ProjectModal";
import { LeadershipModal } from "./components/LeadershipModal";
import { CostEstimatorModal } from "./components/CostEstimatorModal";
import { MobileBottomBar } from "./components/MobileBottomBar";
import { ProjectItem } from "./data/projectsData";
import { getPublishedProjects, recordPageView } from "./utils/projectStorage";
import { LEADERSHIP_PROFILES, SITE_INFO } from "./data/siteData";
import { MetaTagManager } from "./components/MetaTagManager";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function AppContent() {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname.replace(/^\/|\/$/g, "").toLowerCase();
      const hash = window.location.hash.replace("#", "").toLowerCase();
      const candidate = path || hash;
      if (
        [
          "home",
          "about",
          "expertise",
          "services",
          "projects",
          "enquiry",
          "contact",
          "admin",
        ].includes(candidate)
      ) {
        return candidate === "contact" ? "enquiry" : candidate;
      }
    }
    return "home";
  });
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedLeaderId, setSelectedLeaderId] = useState<string | null>(null);
  const [estimatorOpen, setEstimatorOpen] = useState<boolean>(false);
  const [appliedEstimate, setAppliedEstimate] = useState<{
    type: string;
    area: number;
    tier: string;
    estimatedWeeks: string;
  } | null>(null);
  const [whatsappBubbleOpen, setWhatsappBubbleOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reactive published projects list
  const [publishedProjects, setPublishedProjects] = useState<ProjectItem[]>(() =>
    getPublishedProjects()
  );

  useEffect(() => {
    const handleUpdate = () => setPublishedProjects(getPublishedProjects());
    window.addEventListener("mohalkar:projects-updated", handleUpdate);
    return () => window.removeEventListener("mohalkar:projects-updated", handleUpdate);
  }, []);

  // Record real live page view telemetry
  useEffect(() => {
    if (activeTab !== "admin") {
      recordPageView();
    }
  }, [activeTab]);

  // Sync URL changes (both browser forward/back popstate and legacy hashchange)
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname.replace(/^\/|\/$/g, "").toLowerCase();
      const hash = window.location.hash.replace("#", "").toLowerCase();
      const candidate = path || hash;
      if (
        [
          "home",
          "about",
          "expertise",
          "services",
          "projects",
          "enquiry",
          "contact",
          "admin",
        ].includes(candidate)
      ) {
        setActiveTab(candidate === "contact" ? "enquiry" : candidate);
      } else if (!candidate) {
        setActiveTab("home");
      }
    };

    window.addEventListener("popstate", handleUrlChange);
    window.addEventListener("hashchange", handleUrlChange);
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener("hashchange", handleUrlChange);
    };
  }, []);

  // Keyboard shortcut for studio admin: Ctrl + Shift + A (or Cmd + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        handleTabChange("admin");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const targetUrl = tab === "home" ? "/" : `/${tab}`;
    if (typeof window !== "undefined" && window.location.pathname !== targetUrl) {
      window.history.pushState(null, "", targetUrl);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const selectedLeader =
    LEADERSHIP_PROFILES.find((p) => p.id === selectedLeaderId) || null;

  // If in admin mode, display the executive studio console
  if (activeTab === "admin") {
    return (
      <div className={isDark ? "dark" : "light"}>
        <MetaTagManager activeTab="admin" />
        <AdminDashboard
          onExit={() => handleTabChange("home")}
          onNavigateToProjects={() => handleTabChange("projects")}
        />
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-200 selection:bg-[#c8a96e] ${
        isDark
          ? "bg-[#0c0e12] text-[#e2e4e8] selection:text-[#0c0e12]"
          : "bg-[#f7f5f2] text-[#3a3a3a] selection:text-[#111827]"
      }`}
    >
      {/* Dynamic SEO Meta Tag Manager */}
      <MetaTagManager
        activeTab={activeTab}
        selectedProject={selectedProject}
        selectedLeader={selectedLeader}
      />

      {/* Persistent 3-Zone Navbar with Light/Dark Mode Toggler */}
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Main View Router */}
      <main className="flex-1 pb-24 sm:pb-28 lg:pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {activeTab === "home" && (
              <HomeSection
                setActiveTab={handleTabChange}
                onSelectLeader={setSelectedLeaderId}
                onOpenEstimator={() => setEstimatorOpen(true)}
              />
            )}

            {activeTab === "about" && (
              <AboutSection
                setActiveTab={handleTabChange}
                onSelectLeader={setSelectedLeaderId}
              />
            )}

            {activeTab === "expertise" && (
              <ExpertiseSection
                setActiveTab={handleTabChange}
                onOpenEstimator={() => setEstimatorOpen(true)}
              />
            )}

            {activeTab === "services" && (
              <ServicesSection setActiveTab={handleTabChange} />
            )}

            {activeTab === "projects" && (
              <ProjectsSection
                setActiveTab={handleTabChange}
                onSelectProject={setSelectedProject}
                projects={publishedProjects}
              />
            )}

            {activeTab === "enquiry" && (
              <EnquirySection initialEstimate={appliedEstimate} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Footer with discreet Admin Portal trigger */}
      <Footer setActiveTab={handleTabChange} />

      {/* Mobile & Tablet Bottom Navigation Dock */}
      <MobileBottomBar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Project Lightbox & High-Res Blueprint Inspector Modal */}
      <ProjectModal
        project={selectedProject}
        allProjects={publishedProjects}
        onClose={() => setSelectedProject(null)}
        onSelectProject={setSelectedProject}
      />

      {/* Leadership Profile Modal */}
      <LeadershipModal
        profile={selectedLeader}
        member={selectedLeader}
        leader={selectedLeader}
        onClose={() => setSelectedLeaderId(null)}
        onOpenEnquiry={() => {
          setSelectedLeaderId(null);
          handleTabChange("enquiry");
        }}
      />

      {/* Interactive Scope & Cost Estimator Modal */}
      <CostEstimatorModal
        isOpen={estimatorOpen}
        onClose={() => setEstimatorOpen(false)}
        onApplyEstimate={(details) => {
          setAppliedEstimate(details);
          handleTabChange("enquiry");
        }}
      />

      {/* ── FLOATING WHATSAPP BUTTON (Reference site left placement) ── */}
      <div className="fixed bottom-20 left-4 sm:bottom-6 sm:left-6 z-40 flex flex-col items-start">
        {whatsappBubbleOpen && (
          <div
            className={`mb-3 w-68 sm:w-72 rounded-xl p-4 text-xs space-y-3 shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200 border ${
              isDark
                ? "bg-[#141720] border-[#252830] text-neutral-300"
                : "bg-white border-[#ebebeb] text-[#3a3a3a] shadow-xl"
            }`}
          >
            <div
              className={`flex items-center justify-between pb-2 border-b ${
                isDark ? "border-[#252830]" : "border-[#ebebeb]"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className={`font-semibold ${isDark ? "text-white" : "text-[#111827]"}`}>
                  Mohalkar Studio Direct
                </span>
              </div>
              <button
                onClick={() => setWhatsappBubbleOpen(false)}
                className={`cursor-pointer ${
                  isDark ? "text-neutral-400 hover:text-white" : "text-[#888888] hover:text-[#111827]"
                }`}
                aria-label="Close message"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className={`leading-relaxed text-[11px] ${isDark ? "text-neutral-300" : "text-[#555555]"}`}>
              Chat directly with Founder &amp; Principal Architect Abhishek Mohalkar regarding your upcoming project.
            </p>
            <a
              href={SITE_INFO.contacts.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 bg-[#25d366] hover:bg-[#128C7E] text-white font-semibold uppercase tracking-wider rounded-[2px] flex items-center justify-center gap-1.5 transition-colors text-[10px] shadow-sm"
            >
              <span>Open WhatsApp Chat</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        <button
          onClick={() => setWhatsappBubbleOpen(!whatsappBubbleOpen)}
          className="whatsapp-float w-14 h-14 rounded-full bg-[#25d366] hover:bg-[#128C7E] text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-white/20"
          title="Direct WhatsApp with Principal Architect"
          aria-label="WhatsApp with Principal Architect"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
        </button>
      </div>

      {/* ── SCROLL TO TOP BUTTON (Reference site right placement) ── */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-20 right-4 sm:bottom-8 sm:right-8 z-40 w-11 h-11 rounded-full bg-[#c8a96e] hover:bg-[#a8843e] text-[#111827] hover:text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-[#c8a96e]/40"
          title="Scroll to Top"
          aria-label="Scroll to Top"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Vercel Web Analytics */}
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
