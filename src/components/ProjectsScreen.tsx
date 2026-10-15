import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import { Project, PROJECTS_DATA } from '../data/portfolioData';
import { JournalTabs } from './JournalTabs';
import { ASSET_IMAGES } from '../assets/images';
import { playTactileClick, playPageFlipSound } from '../utils/audio';

interface ProjectsScreenProps {
  onNavigate: (page: PageId) => void;
  onOpenProjectDetail: (project: Project) => void;
}

export const ProjectsScreen: React.FC<ProjectsScreenProps> = ({
  onNavigate,
  onOpenProjectDetail,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'AI / Fairness', 'Web', 'Prototype', 'Software'];

  const filteredProjects =
    activeFilter === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeFilter);

  const handleRandomSpecimen = () => {
    playTactileClick();
    const random = PROJECTS_DATA[Math.floor(Math.random() * PROJECTS_DATA.length)];
    onOpenProjectDetail(random);
  };

  return (
    <div className="relative w-full max-w-6xl flex flex-col md:flex-row bg-[#FFF8F0] shadow-tactile-heavy rounded-sm torn-edge-soft my-auto border-2 border-[#D8B5BD]">
      {/* Journal Right-edge Tabs */}
      <JournalTabs currentPage="projects" onNavigate={onNavigate} />

      {/* Book Spine Center Shadow & Stitches */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -ml-4 bg-gradient-to-r from-transparent via-[#44343B]/10 to-transparent z-30 pointer-events-none mix-blend-multiply" />
      <div className="hidden md:flex absolute left-1/2 top-[8%] bottom-[8%] -ml-px w-px bg-[#B97891]/40 z-30 flex-col justify-between items-center py-6 pointer-events-none">
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
      </div>

      {/* LEFT PAGE - Featured Specimen: RayCtify & Pressed Fern Archive */}
      <section className="w-full md:w-1/2 min-h-[660px] md:min-h-[740px] p-6 sm:p-10 md:p-12 relative bg-[#FFF8F0] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFFEFC] via-[#FFF8F0] to-[#F8D7E2]/30 rounded-l-sm overflow-hidden z-10 border-b md:border-b-0 md:border-r border-[#D8B5BD] flex flex-col justify-between">
        <div>
          {/* Section Heading */}
          <div className="mb-4 pb-2 border-b border-[#D8B5BD]">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-xs text-[#805365] tracking-widest uppercase block font-bold">
                The Project Herbarium · Specimen Archive
              </span>
              <button
                onClick={handleRandomSpecimen}
                className="text-[11px] font-accent-handwritten text-[#805365] hover:text-[#44343B] bg-[#F8D7E2] px-2.5 py-0.5 rounded-xs border border-[#D8B5BD] flex items-center gap-1 cursor-pointer transition-colors font-bold"
                title="Open a random project specimen"
              >
                <span>✦ Random Specimen</span>
              </button>
            </div>
            <h2 className="font-display-lg text-2xl sm:text-3xl text-[#805365] font-bold tracking-tight mt-1">
              Collected Works & Prototypes
            </h2>
          </div>

          {/* Filter Tabs with Motion Layout */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                layout
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  playTactileClick();
                  setActiveFilter(cat);
                }}
                className={`px-2.5 py-1 rounded-xs text-xs font-label-sm border transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-[#805365] text-white border-[#805365] shadow-xs font-bold'
                    : 'bg-[#FFFEFC] text-[#44343B] border-[#D8B5BD] hover:bg-[#F8D7E2]'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Prominent Featured Specimen: RayCtify */}
          {PROJECTS_DATA[0] && (
            <motion.div
              whileHover={{ scale: 1.015, rotate: 0 }}
              onClick={() => onOpenProjectDetail(PROJECTS_DATA[0])}
              className="bg-[#FFFEFC] p-5 rounded-xs border-2 border-[#B97891] shadow-tactile relative rotate-[-1deg] transition-all cursor-pointer group"
            >
              {/* Tape scrap at top */}
              <div className="absolute -top-3 left-8 w-24 h-5 bg-[#F2BFCF] border border-[#B97891]/60 washi-tape-strip shadow-2xs rotate-2" />

              <div className="flex items-center justify-between mb-2">
                <span className="font-label-sm text-[10px] text-[#805365] bg-[#F8D7E2] px-2 py-0.5 rounded-xs border border-[#D8B5BD] font-bold uppercase tracking-wider">
                  Featured Specimen
                </span>
                <span className="text-[10px] font-label-sm bg-[#F5EBCB] text-[#44343B] px-2 py-0.5 rounded-xs border border-[#D8B5BD]">
                  Status: {PROJECTS_DATA[0].status}
                </span>
              </div>

              <h3 className="font-display-lg text-2xl text-[#805365] font-bold group-hover:text-[#44343B] transition-colors">
                {PROJECTS_DATA[0].title}
              </h3>
              <p className="font-accent-handwritten text-base text-[#B97891] mt-0.5">
                {PROJECTS_DATA[0].tagline}
              </p>

              <p className="font-body-md text-xs sm:text-sm text-[#44343B] leading-relaxed mt-2.5 mb-3 line-clamp-3">
                {PROJECTS_DATA[0].problemStatement}
              </p>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {PROJECTS_DATA[0].techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-label-sm px-2 py-0.5 bg-[#FFF8F0] border border-[#D8B5BD] text-[#44343B] rounded-2xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-dashed border-[#D8B5BD] flex items-center justify-between text-xs font-accent-handwritten text-[#805365]">
                <span>Click to open full dossier ➔</span>
                <span className="text-[11px] font-label-sm uppercase tracking-wider text-[#805365]/70">
                  Fairness & Transparency
                </span>
              </div>
            </motion.div>
          )}

          {/* Botanical Pressed Fern Specimen Scrap */}
          <div className="mt-4 p-2.5 bg-[#FFFEFC] rounded-xs border border-[#D8B5BD] shadow-2xs flex items-center gap-3 rotate-[0.5deg]">
            <div className="w-16 h-16 rounded-xs overflow-hidden border border-[#D8B5BD] bg-[#DDE4C5]/40 shrink-0">
              <img
                src={ASSET_IMAGES.pressedFern}
                alt="Pressed Fern Specimen"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-label-sm text-[10px] text-[#805365] uppercase font-bold tracking-wider block">
                Herbarium Archive #04
              </span>
              <p className="font-accent-handwritten text-sm text-[#44343B] leading-tight mt-0.5">
                "Code preserved like botanical specimens: every branch purposeful, every leaf an algorithm."
              </p>
            </div>
          </div>
        </div>

        {/* Botanical Herbarium Plate / Archival Note */}
        <div className="mt-4 pt-3 border-t border-[#D8B5BD] flex items-center justify-between text-xs font-label-sm text-[#805365]">
          <span>Archived under Cummins Engineering Portfolio</span>
          <span className="font-accent-handwritten text-sm text-[#B97891]">
            "Every project is a seed planted in curiosity"
          </span>
        </div>
      </section>

      {/* RIGHT PAGE - Grid of Project Specimens */}
      <section className="w-full md:w-1/2 min-h-[660px] md:min-h-[740px] p-6 sm:p-10 md:p-12 relative bg-[#FFF8F0] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFFEFC] via-[#FFF8F0] to-[#F8D7E2]/30 rounded-r-sm overflow-hidden z-10 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#D8B5BD]">
            <h3 className="font-display-lg text-xl text-[#805365] font-bold">
              Archival Entries ({filteredProjects.length})
            </h3>
            <span className="text-xs font-label-sm text-[#805365]">
              Filter: {activeFilter}
            </span>
          </div>

          {/* List / Cards of remaining projects */}
          <div className="space-y-4 max-h-[530px] overflow-y-auto pr-2">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25, delay: idx * 0.04 }}
                  whileHover={{ scale: 1.015, y: -2 }}
                  onClick={() => onOpenProjectDetail(project)}
                  className={`p-4 bg-[#FFFEFC] rounded-xs border border-[#D8B5BD] hover:border-[#805365] shadow-xs hover:shadow-tactile transition-all duration-300 cursor-pointer relative group ${
                    idx % 2 === 0 ? 'rotate-[-0.5deg]' : 'rotate-[0.5deg]'
                  }`}
                >
                  {/* Paper clip or tape corner */}
                  <div className="absolute top-2 right-2 w-3 h-3 rounded-full border border-[#D8B5BD] bg-[#F8D7E2] group-hover:scale-125 transition-transform" />

                  <div className="flex items-center justify-between mb-1.5">
                    <span className={`text-[10px] font-label-sm px-2 py-0.5 rounded-xs border border-[#D8B5BD] font-medium ${project.badgeColor}`}>
                      {project.category}
                    </span>
                    <span className="text-[10px] font-label-sm text-[#805365] font-semibold">
                      {project.status}
                    </span>
                  </div>

                  <h4 className="font-display-lg text-lg text-[#805365] font-bold group-hover:text-[#44343B] transition-colors">
                    {project.title}
                  </h4>
                  <p className="font-accent-handwritten text-sm text-[#B97891] mb-1">
                    {project.tagline}
                  </p>

                  <p className="font-body-md text-xs text-[#44343B] leading-relaxed line-clamp-2 mb-2.5">
                    {project.problemStatement}
                  </p>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex flex-wrap gap-1">
                      {project.techStack.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[9px] font-label-sm px-1.5 py-0.5 bg-[#FFF8F0] border border-[#D8B5BD] text-[#44343B] rounded-2xs"
                        >
                          {t}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="text-[9px] font-label-sm text-[#805365] px-1 py-0.5">
                          +{project.techStack.length - 3} more
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-accent-handwritten text-[#805365] group-hover:translate-x-1 transition-transform">
                      View details ↗
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Navigation link */}
        <div className="mt-4 pt-3 border-t border-[#D8B5BD] flex items-center justify-between text-xs font-label-sm text-[#805365]">
          <span>Click any card to read implementation details</span>
          <button
            onClick={() => onNavigate('coding')}
            className="hover:underline flex items-center gap-1 font-semibold text-[#805365] cursor-pointer"
          >
            <span>The Codex: Coding & CP</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </section>
    </div>
  );
};
