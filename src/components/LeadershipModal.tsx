import React from "react";
import { X, Instagram, Linkedin, Mail, CheckCircle2, Award, Briefcase } from "lucide-react";
import { LeadershipProfile } from "../data/siteData";
import { useTheme } from "../context/ThemeContext";

interface LeadershipModalProps {
  profile?: LeadershipProfile | null;
  member?: LeadershipProfile | any | null;
  leader?: LeadershipProfile | any | null;
  onClose: () => void;
  onOpenEnquiry?: () => void;
}

export const LeadershipModal: React.FC<LeadershipModalProps> = ({
  profile,
  member,
  leader,
  onClose,
  onOpenEnquiry,
}) => {
  const { isDark } = useTheme();
  const activeProfile = profile || member || leader;
  if (!activeProfile) return null;

  const photoSrc =
    activeProfile.photo ||
    activeProfile.image ||
    (activeProfile.id === "ceo" ? "/images/ceo.png" : "/images/cmo.png");
  const fullBioText =
    activeProfile.fullBio ||
    activeProfile.bio ||
    "Principal architect and studio leadership at Mohalkar Architects & Planners.";
  const credentialsList: string[] =
    activeProfile.credentials ||
    activeProfile.qualifications || [
      "B.Arch — Architectural Thesis & Studio Honors",
      "Principal Designer & Lead Urban Consultant",
    ];
  const socials = activeProfile.social || {};

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-2xl max-h-[92vh] overflow-y-auto border rounded-xl shadow-2xl p-5 sm:p-8 transition-colors ${
          isDark
            ? "bg-[#12151c] border-[#252830] text-[#e2e4e8]"
            : "bg-white border-[#dce2ec] text-neutral-900 shadow-2xl"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-lg transition-colors cursor-pointer ${
            isDark
              ? "text-neutral-400 hover:text-white hover:bg-[#1f242e]"
              : "text-neutral-500 hover:text-black hover:bg-[#f1f3f6]"
          }`}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col sm:flex-row gap-6 items-start">
          {/* Avatar frame */}
          <div
            className={`relative w-28 h-28 sm:w-36 sm:h-36 shrink-0 rounded-xl overflow-hidden border p-1 shadow-lg ${
              isDark ? "border-[#c8a96e]/40 bg-[#161a22]" : "border-[#c8a96e]/60 bg-[#f8f9fb]"
            }`}
          >
            <img
              src={photoSrc}
              alt={activeProfile.name}
              className="w-full h-full object-contain rounded-lg"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/images/ceo.png";
              }}
            />
            {activeProfile.designation && (
              <span className="absolute bottom-2 left-2 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-[#c8a96e] text-[#0c0e12] rounded shadow-sm">
                {activeProfile.designation}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 space-y-3">
            <div>
              <h3
                className={`font-serif text-2xl font-bold ${
                  isDark ? "text-white" : "text-neutral-900"
                }`}
              >
                {activeProfile.name}
              </h3>
              <p className="text-xs uppercase tracking-wider text-[#c8a96e] font-semibold mt-0.5">
                {activeProfile.role}
              </p>
            </div>

            <p
              className={`text-xs leading-relaxed ${
                isDark ? "text-neutral-300" : "text-neutral-700"
              }`}
            >
              {fullBioText}
            </p>

            {/* Credentials / Honors */}
            {credentialsList.length > 0 && (
              <div
                className={`pt-2 space-y-1.5 border-t ${
                  isDark ? "border-[#1e232d]" : "border-[#e5e9f0]"
                }`}
              >
                <p
                  className={`text-[11px] uppercase tracking-wider font-semibold flex items-center gap-1.5 ${
                    isDark ? "text-neutral-400" : "text-neutral-500"
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-[#c8a96e]" />
                  Key Focus &amp; Credentials
                </p>
                {credentialsList.map((cred, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 text-xs ${
                      isDark ? "text-neutral-300" : "text-neutral-700"
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c8a96e] shrink-0" />
                    <span>{cred}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Action & Socials */}
            <div
              className={`pt-4 flex flex-wrap items-center justify-between gap-4 border-t ${
                isDark ? "border-[#1e232d]" : "border-[#e5e9f0]"
              }`}
            >
              <div className="flex items-center gap-2">
                {socials.instagram && (
                  <a
                    href={socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg border transition-colors ${
                      isDark
                        ? "border-[#252830] text-neutral-400 hover:text-[#c8a96e] hover:border-[#c8a96e]"
                        : "border-[#d8dde6] text-neutral-600 hover:text-black hover:border-[#c8a96e] bg-white shadow-sm"
                    }`}
                    title="Instagram Profile"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {socials.linkedin && (
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-lg border transition-colors ${
                      isDark
                        ? "border-[#252830] text-neutral-400 hover:text-[#c8a96e] hover:border-[#c8a96e]"
                        : "border-[#d8dde6] text-neutral-600 hover:text-black hover:border-[#c8a96e] bg-white shadow-sm"
                    }`}
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {socials.email && (
                  <a
                    href={`mailto:${socials.email}`}
                    className={`p-2 rounded-lg border transition-colors ${
                      isDark
                        ? "border-[#252830] text-neutral-400 hover:text-[#c8a96e] hover:border-[#c8a96e]"
                        : "border-[#d8dde6] text-neutral-600 hover:text-black hover:border-[#c8a96e] bg-white shadow-sm"
                    }`}
                    title="Send Email"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>

              {onOpenEnquiry && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenEnquiry();
                  }}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0c0e12] bg-[#c8a96e] hover:bg-[#dfc085] rounded-md transition-colors cursor-pointer flex items-center gap-1.5 shadow-md active:scale-95"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>Consult with {(activeProfile.name || "").split(" ")[0]}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
