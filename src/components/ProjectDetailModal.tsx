import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../data/portfolioData';
import { playTactileClick } from '../utils/audio';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-[#1f1b11]/70 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full bg-[#FFF8F0] p-6 sm:p-8 rounded-sm shadow-tactile-heavy torn-edge border-2 border-[#D8B5BD] max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close dossier"
              className="absolute top-4 right-4 p-1.5 text-[#805365] hover:text-[#44343B] rounded-full hover:bg-[#F8D7E2] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            {/* Washi Tape Header */}
            <div className="w-32 h-5 bg-[#F2BFCF] mx-auto -mt-10 mb-4 rotate-1 shadow-xs washi-tape-strip border-y border-[#B97891]/50" />

            {/* Header Information */}
            <div className="border-b border-[#D8B5BD] pb-4 mb-4">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className={`text-[10px] font-label-sm px-2.5 py-0.5 rounded-xs border border-[#D8B5BD] uppercase font-bold tracking-wider ${project.badgeColor}`}>
                  {project.category}
                </span>
                <span className="text-[10px] font-label-sm px-2 py-0.5 bg-[#FFF8F0] text-[#805365] border border-[#D8B5BD] font-semibold">
                  Status: {project.status}
                </span>
              </div>

              <h3 className="font-display-lg text-2xl sm:text-3xl text-[#805365] font-bold">
                {project.title}
              </h3>
              <p className="font-accent-handwritten text-lg sm:text-xl text-[#B97891] mt-0.5">
                {project.tagline}
              </p>
            </div>

            {/* Action Links Bar (GitHub & Live Demo) */}
            <div className="flex items-center gap-2.5 mb-4">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-[#805365] hover:bg-[#683f50] text-white rounded-xs text-xs font-label-sm uppercase tracking-wider flex items-center gap-1.5 shadow-xs transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">code</span>
                  <span>Source Code</span>
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-[#F5EBCB] hover:bg-[#F2BFCF] text-[#44343B] rounded-xs text-xs font-label-sm uppercase tracking-wider flex items-center gap-1.5 border border-[#D8B5BD] shadow-xs transition-transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                  <span>Live Demo</span>
                </a>
              )}
              {!project.repoUrl && !project.demoUrl && (
                <span className="text-[11px] font-accent-handwritten text-[#B97891] italic">
                  ✎ Academic / Research artifact archived in student portfolio
                </span>
              )}
            </div>

            {/* Core Dossier Content */}
            <div className="space-y-4 text-xs sm:text-sm font-body-md text-[#44343B] leading-relaxed">
              {/* Problem & Motivation */}
              <div className="bg-[#FFFEFC] p-4 rounded-xs border border-[#D8B5BD]">
                <h4 className="font-display-lg text-sm text-[#805365] font-bold uppercase tracking-wider mb-1">
                  Problem & Motivation
                </h4>
                <p className="mb-2">{project.problemStatement}</p>
                <p className="text-xs text-[#805365] font-medium">
                  <span className="font-bold">Why it matters:</span> {project.importance}
                </p>
              </div>

              {/* Intended Users & Contribution */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#FFF8F0] p-3.5 rounded-xs border border-[#D8B5BD]">
                  <span className="font-label-sm text-[10px] text-[#805365] uppercase tracking-wider font-bold block mb-1">
                    Intended Users:
                  </span>
                  <p className="text-xs text-[#44343B]">{project.intendedUsers}</p>
                </div>
                <div className="bg-[#FFF8F0] p-3.5 rounded-xs border border-[#D8B5BD]">
                  <span className="font-label-sm text-[10px] text-[#805365] uppercase tracking-wider font-bold block mb-1">
                    Ishana's Contribution:
                  </span>
                  <p className="text-xs text-[#44343B]">{project.myContribution}</p>
                </div>
              </div>

              {/* Key Features */}
              <div className="bg-[#FFFEFC] p-4 rounded-xs border border-[#D8B5BD]">
                <h4 className="font-display-lg text-sm text-[#805365] font-bold uppercase tracking-wider mb-2">
                  Key Features & Architectural Ideas
                </h4>
                <ul className="space-y-1.5 text-xs text-[#44343B]">
                  {project.keyFeatures.map((f, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[#805365] font-bold mt-0.5">✦</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <span className="font-label-sm text-[11px] text-[#805365] uppercase tracking-wider font-bold block mb-1.5">
                  Technologies Used / Investigated:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 bg-[#F8D7E2] text-[#805365] font-label-sm text-xs rounded-xs border border-[#D8B5BD]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Lessons Learned */}
              <div className="p-3.5 bg-[#F5EBCB]/60 rounded-xs border border-[#D8B5BD]">
                <span className="font-accent-handwritten text-base text-[#44343B] font-bold block mb-0.5">
                  ✎ Lessons Learned & Future Scope:
                </span>
                <p className="text-xs text-[#44343B] italic leading-normal">
                  "{project.lessonsLearned}"
                </p>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-5 pt-3 border-t border-[#D8B5BD] flex items-center justify-between">
              <span className="text-xs font-accent-handwritten text-[#B97891]">
                {project.paperNote || 'Archived in Ishana Datta Portfolio'}
              </span>
              <button
                onClick={() => {
                  playTactileClick();
                  onClose();
                }}
                className="px-4 py-1.5 bg-[#805365] text-white rounded-xs text-xs font-label-sm uppercase tracking-wider hover:bg-[#683f50] cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
