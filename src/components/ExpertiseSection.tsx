import React from 'react';
import { Home, Building2, Trees, Landmark, Factory, Compass, ArrowRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ExpertiseSectionProps {
  onNavigate?: (section: string) => void;
  setActiveTab?: (section: string) => void;
  onFilterCategory?: (category: string) => void;
  onOpenEstimator?: () => void;
}

export const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({
  onNavigate,
  setActiveTab,
  onFilterCategory,
}) => {
  const { isDark } = useTheme();
  const navigate = setActiveTab || onNavigate || (() => {});

  const typologies = [
    {
      id: 'Residential',
      title: 'Residential Architecture',
      icon: Home,
      image: '/images/resi4.jpg',
      description: 'Ultra-luxury private bungalows, weekend farmhouses, monolithic hill villas, and high-rise duplex penthouses with seamless outdoor connections.'
    },
    {
      id: 'Commercial',
      title: 'Commercial Complex Design',
      icon: Building2,
      image: '/images/project1.jpeg',
      description: 'Multi-tenant commercial shopping plazas, corporate suites, boutique retail commercial complexes, and parametric façade engineering.'
    },
    {
      id: 'Urban Planning',
      title: 'Urban Planning & Townships',
      icon: Landmark,
      image: '/images/urban1.jpg',
      description: 'Regional contour layout masterplans, gated residential township subdivisions, eco-resorts, and municipal infrastructure grids.'
    },
    {
      id: 'Interior',
      title: 'Interior Architecture & Design',
      icon: Compass,
      image: '/images/interior18.png',
      description: 'Curated architectural interiors, micro-cement finishes, bespoke walnut millwork, acoustic coordination, and circadian lighting systems.'
    },
    {
      id: 'Landscape',
      title: 'Landscape Architecture & Waterfronts',
      icon: Trees,
      image: '/images/landscape1.jpg',
      description: 'Regenerative ecology parks, riparian riverfront promenades, private botanical gardens, zero-runoff rainwater harvesting bioswales.'
    },
    {
      id: 'Industrial',
      title: 'Industrial Campuses & Warehouses',
      icon: Factory,
      image: '/images/industrial1.jpg',
      description: 'Pre-engineered industrial sheds, manufacturing plants, high-bay warehouses with heavy machinery foundations and MIDC approvals.'
    }
  ];

  const handleCategoryClick = (category: string) => {
    if (onFilterCategory) onFilterCategory(category);
    navigate('projects');
  };

  return (
    <div className={`min-h-screen py-24 sm:py-28 px-4 sm:px-6 lg:px-8 transition-colors ${
      isDark ? 'bg-[#0c0e12]' : 'bg-[#f7f5f2]'
    }`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="section-label">Core Disciplines</span>
          <h1 className={`section-heading ${isDark ? 'text-white' : 'text-[#111827]'}`}>
            Areas of Expertise
          </h1>
          <p className={`text-base leading-relaxed ${isDark ? 'text-neutral-400' : 'text-[#555555]'}`}>
            From meticulous residential bungalows to regional scale township masterplans, our studio delivers unified design, engineering, and statutory clearances.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {typologies.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => handleCategoryClick(item.id)}
                className={`group cursor-pointer rounded-[4px] border p-8 sm:p-10 flex flex-col justify-between gold-card-hover ${
                  isDark
                    ? 'bg-[#141822] border-[#252830]'
                    : 'bg-white border-black/[0.07] shadow-xs hover:shadow-xl'
                }`}
              >
                <div>
                  {/* Circular Icon Wrapper */}
                  <div className="w-14 h-14 rounded-full bg-[#c8a96e]/10 flex items-center justify-center text-[#c8a96e] mb-6 group-hover:bg-[#c8a96e] group-hover:text-[#111827] transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className={`font-serif text-[1.35rem] font-semibold mb-3 group-hover:text-[#c8a96e] transition-colors ${
                    isDark ? 'text-white' : 'text-[#111827]'
                  }`}>
                    {item.title}
                  </h3>

                  <p className={`text-[0.9rem] leading-[1.75] mb-6 ${
                    isDark ? 'text-neutral-400' : 'text-[#666666]'
                  }`}>
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between text-xs uppercase tracking-[1.5px] font-semibold text-[#c8a96e]">
                  <span>Explore Projects</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
