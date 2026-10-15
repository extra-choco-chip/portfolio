import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import { JournalTabs } from './JournalTabs';
import { PolaroidPortraitFrame } from './PolaroidPortraitFrame';
import { ISHANA_PROFILE, CONVERSATION_STARTERS } from '../data/portfolioData';
import { ASSET_IMAGES } from '../assets/images';
import { playTactileClick } from '../utils/audio';

interface AboutScreenProps {
  onNavigate: (page: PageId) => void;
  onOpenLightbox: (imageUrl: string, title: string, note?: string) => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onNavigate, onOpenLightbox }) => {
  const [selectedStarter, setSelectedStarter] = useState<number | null>(0);
  const [quoteHovered, setQuoteHovered] = useState(false);

  return (
    <div className="relative w-full max-w-6xl flex flex-col md:flex-row bg-[#FFF8F0] shadow-tactile-heavy rounded-sm torn-edge-soft my-auto border-2 border-[#D8B5BD]">
      {/* Journal Right-edge Tabs */}
      <JournalTabs currentPage="about" onNavigate={onNavigate} />

      {/* Book Spine Center Shadow & Stitches */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -ml-4 bg-gradient-to-r from-transparent via-[#44343B]/10 to-transparent z-30 pointer-events-none mix-blend-multiply" />
      <div className="hidden md:flex absolute left-1/2 top-[8%] bottom-[8%] -ml-px w-px bg-[#B97891]/40 z-30 flex-col justify-between items-center py-6 pointer-events-none">
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
      </div>

      {/* LEFT PAGE - The Portrait & Personal Artifacts */}
      <section className="w-full md:w-1/2 min-h-[660px] md:min-h-[740px] p-6 sm:p-10 md:p-12 relative bg-[#FFF8F0] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFFEFC] via-[#FFF8F0] to-[#F8D7E2]/30 rounded-l-sm overflow-hidden z-10 border-b md:border-b-0 md:border-r border-[#D8B5BD]">
        {/* Background Decorative Scraps */}
        <div className="absolute top-8 left-8 w-28 h-28 bg-[#F5EBCB]/40 rotate-[-12deg] torn-edge border border-[#D8B5BD]/60 z-0 mix-blend-multiply" />
        <div className="absolute bottom-12 left-6 text-[#B97891]/25 font-accent-handwritten text-5xl md:text-6xl rotate-[-5deg] z-0 select-none">
          cummins '27
        </div>

        {/* Polaroid Frame for Ishana */}
        <PolaroidPortraitFrame />

        {/* Preserved Botanical Atelier Specimen Scrap (Asset Image Integration) */}
        <motion.div
          whileHover={{ scale: 1.05, rotate: -2 }}
          onClick={() => {
            onOpenLightbox(
              ASSET_IMAGES.botanicalAtelier,
              'Botanical Atelier & Study Corner',
              'Preserved studio specimen: dried blooms, vintage ink pots, and algorithms notebook.'
            );
          }}
          className="absolute top-[42%] left-3 sm:left-6 w-36 sm:w-44 p-2 bg-[#FFF8F0] shadow-tactile rotate-[-8deg] z-20 cursor-pointer border border-[#B97891] rounded-xs group"
        >
          <div className="w-full h-24 overflow-hidden rounded-xs border border-[#D8B5BD] bg-[#F8D7E2]/30 mb-1.5">
            <img
              src={ASSET_IMAGES.botanicalAtelier}
              alt="Botanical Atelier"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="font-accent-handwritten text-xs text-[#805365] font-bold">
              ✦ atelier specimen
            </span>
            <span className="text-[10px] font-label-sm text-[#B97891]">Inspect ↗</span>
          </div>
        </motion.div>

        {/* Pinned Vellum Note */}
        <motion.div
          onMouseEnter={() => setQuoteHovered(true)}
          onMouseLeave={() => setQuoteHovered(false)}
          animate={quoteHovered ? { scale: 1.06, rotate: 4 } : { scale: 1, rotate: 10 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="absolute top-[60%] right-2 sm:right-6 md:right-8 w-44 sm:w-52 p-4 bg-[#FFFEFC]/95 backdrop-blur-md shadow-tactile torn-edge z-20 border border-[#B97891]"
        >
          {/* Push Pin */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#ED9BB8] shadow-xs z-30 flex items-center justify-center border border-[#805365]">
            <div className="w-1 h-1 rounded-full bg-white/90 -translate-x-0.5 -translate-y-0.5" />
          </div>
          <p className="font-accent-handwritten text-lg leading-snug mt-2 text-[#805365] italic">
            "Finding beauty in the unfinished edges, where code breaks, algorithms click, and paper frays."
          </p>
        </motion.div>

        {/* Field Guide to Ishana (Specimen Card) */}
        <div className="absolute bottom-6 right-4 sm:right-8 w-48 sm:w-56 p-3.5 bg-[#FFF8F0] shadow-tactile rotate-[-6deg] z-10 border border-[#B97891] rounded-xs">
          <div className="flex items-center gap-1.5 mb-2 pb-1 border-b border-dashed border-[#D8B5BD]">
            <span className="material-symbols-outlined text-sm text-[#805365]">psychology</span>
            <span className="font-label-sm text-[10px] text-[#805365] uppercase tracking-wider font-bold">
              Field Guide to Ishana:
            </span>
          </div>
          <div className="space-y-1 text-xs font-accent-handwritten text-[#44343B]">
            <p>🌸 <span className="font-bold">Loves:</span> Clean C++ code & graph logic</p>
            <p>⚡ <span className="font-bold">Building:</span> RayCtify fairness metrics</p>
            <p>☕ <span className="font-bold">Fuel:</span> Warm tea & competitive problem sets</p>
          </div>
        </div>
      </section>

      {/* RIGHT PAGE - Personal Introduction & Conversation Starters */}
      <section className="w-full md:w-1/2 min-h-[660px] md:min-h-[740px] p-6 sm:p-10 md:p-12 relative bg-[#FFF8F0] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFFEFC] via-[#FFF8F0] to-[#F8D7E2]/30 rounded-r-sm overflow-hidden z-10 flex flex-col justify-between">
        <div>
          {/* Top Sticky Note */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: 0 }}
            onClick={playTactileClick}
            className="absolute top-10 left-6 sm:left-10 px-4 py-2 bg-[#F8D7E2] shadow-tactile rotate-[-4deg] z-20 border border-[#B97891] rounded-xs cursor-pointer"
          >
            <p className="font-accent-handwritten text-[#805365] text-xl font-bold leading-tight">
              Hello, Wanderer ✦
            </p>
          </motion.div>

          {/* Doodled Flower Top Right */}
          <div className="absolute top-6 right-6 text-[#ED9BB8]/40 rotate-[15deg] pointer-events-none select-none">
            <span className="material-symbols-outlined text-[80px]" style={{ fontVariationSettings: `'wght' 100` }}>
              local_florist
            </span>
          </div>

          {/* Intro Card */}
          <div className="mt-20 sm:mt-24 p-5 sm:p-6 bg-[#FFFEFC] rounded-sm border border-[#D8B5BD] shadow-xs relative">
            <h3 className="font-display-lg text-2xl sm:text-3xl text-[#805365] font-bold tracking-tight mb-2">
              A Note About Me
            </h3>
            <p className="font-body-md text-sm sm:text-base text-[#44343B] leading-relaxed mb-3">
              I am <span className="font-bold text-[#805365]">Ishana Datta</span>, currently pursuing my B.Tech in Electronics and Telecommunications Engineering at{' '}
              <span className="font-medium text-[#805365]">MKSSS Cummins College of Engineering for Women, Pune</span>.
            </p>
            <p className="font-body-md text-sm sm:text-base text-[#44343B] leading-relaxed mb-3">
              My engineering journey is driven by hands-on curiosity. I spend my days working through algorithmic puzzles, competing in ICPC-style programming contests (securing 2nd place in Algorithmia), and building projects that bridge rigorous data thinking with joyful frontend craft.
            </p>
            <p className="font-accent-handwritten text-base text-[#805365]">
              — Welcome to my digital journal! Take your time leafing through the pages.
            </p>
            <div className="flex justify-end mt-1">
              <span className="font-cursive-calligraphy text-2xl text-[#805365] tracking-wide">
                Ishana Datta
              </span>
            </div>

            {/* Social Links & Resume Row */}
            <div className="mt-4 pt-3 border-t border-dashed border-[#D8B5BD] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <a
                  href={ISHANA_PROFILE.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-[#F8D7E2] hover:bg-[#F2BFCF] text-[#805365] text-xs font-label-sm rounded-xs border border-[#D8B5BD] flex items-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">code</span>
                  <span>GitHub</span>
                </a>
                <a
                  href={ISHANA_PROFILE.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 bg-[#F5EBCB] hover:bg-[#F8D7E2] text-[#44343B] text-xs font-label-sm rounded-xs border border-[#D8B5BD] flex items-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">hub</span>
                  <span>LinkedIn</span>
                </a>
              </div>

              {/* Download / Request Resume Wax-Seal Button */}
              <a
                href={`mailto:${ISHANA_PROFILE.email}?subject=Resume%20Request%20-%20Ishana%20Datta`}
                className="px-3 py-1 bg-[#805365] hover:bg-[#683f50] text-white rounded-xs text-xs font-label-sm uppercase tracking-wider flex items-center gap-1.5 shadow-xs transition-transform hover:-translate-y-0.5"
              >
                <span className="material-symbols-outlined text-sm">description</span>
                <span>Get Resume</span>
              </a>
            </div>
          </div>

          {/* Interactive Conversation Starters */}
          <div className="mt-5 p-4 bg-[#F8D7E2]/50 border border-[#D8B5BD] rounded-xs">
            <div className="flex items-center justify-between mb-2 pb-1 border-b border-[#D8B5BD]">
              <span className="font-label-sm text-[10px] text-[#805365] uppercase tracking-wider font-bold">
                Choose a Conversation Starter:
              </span>
              <span className="text-[10px] font-accent-handwritten text-[#B97891]">Click to reveal note</span>
            </div>

            <div className="grid grid-cols-2 gap-1.5 mb-3">
              {CONVERSATION_STARTERS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    playTactileClick();
                    setSelectedStarter(selectedStarter === idx ? null : idx);
                  }}
                  className={`px-2.5 py-1.5 rounded-xs text-[11px] font-label-sm text-left transition-all cursor-pointer border ${
                    selectedStarter === idx
                      ? 'bg-[#805365] text-white border-[#805365] font-semibold shadow-xs'
                      : 'bg-[#FFFEFC] text-[#44343B] border-[#D8B5BD] hover:bg-[#F2BFCF]'
                  }`}
                >
                  {item.question}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {selectedStarter !== null && (
                <motion.div
                  key={selectedStarter}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="p-3 bg-[#FFFEFC] rounded-xs border border-[#B97891] text-xs font-accent-handwritten text-base text-[#44343B] leading-snug shadow-2xs"
                >
                  <span className="font-bold text-[#805365]">Ishana: </span>
                  {CONVERSATION_STARTERS[selectedStarter].answer}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Details */}
        <div className="mt-4 pt-3 border-t border-[#D8B5BD] flex items-center justify-between text-xs font-label-sm text-[#805365]">
          <span>MKSSS Cummins College of Engineering for Women, Pune</span>
          <button
            onClick={() => onNavigate('projects')}
            className="hover:underline flex items-center gap-1 font-semibold text-[#805365] cursor-pointer"
          >
            <span>See Project Herbarium</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </section>
    </div>
  );
};
