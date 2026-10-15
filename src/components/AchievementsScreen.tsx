import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import { JournalTabs } from './JournalTabs';
import { DEBUGGING_STORIES } from '../data/portfolioData';
import { playStampSound } from '../utils/audio';

interface AchievementsScreenProps {
  onNavigate: (page: PageId) => void;
}

export const AchievementsScreen: React.FC<AchievementsScreenProps> = ({ onNavigate }) => {
  const [stampedCard, setStampedCard] = useState<string | null>('algorithmia');

  const handleCardClick = (id: string) => {
    playStampSound();
    setStampedCard(stampedCard === id ? null : id);
  };

  return (
    <div className="relative w-full max-w-6xl flex flex-col md:flex-row bg-[#FFF8F0] shadow-tactile-heavy rounded-sm torn-edge-soft my-auto border-2 border-[#D8B5BD]">
      {/* Journal Right-edge Tabs */}
      <JournalTabs currentPage="achievements" onNavigate={onNavigate} />

      {/* Book Spine Center Shadow & Stitches */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -ml-4 bg-gradient-to-r from-transparent via-[#44343B]/10 to-transparent z-30 pointer-events-none mix-blend-multiply" />
      <div className="hidden md:flex absolute left-1/2 top-[8%] bottom-[8%] -ml-px w-px bg-[#B97891]/40 z-30 flex-col justify-between items-center py-6 pointer-events-none">
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
      </div>

      {/* LEFT PAGE - The Trophy Drawer: Confirmed Honors */}
      <section className="w-full md:w-1/2 min-h-[660px] md:min-h-[740px] p-6 sm:p-10 md:p-12 relative bg-[#FFF8F0] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFFEFC] via-[#FFF8F0] to-[#F8D7E2]/30 rounded-l-sm overflow-hidden z-10 border-b md:border-b-0 md:border-r border-[#D8B5BD] flex flex-col justify-between">
        <div>
          {/* Section Header */}
          <div className="mb-6 pb-2 border-b border-[#D8B5BD]">
            <span className="font-label-sm text-xs text-[#805365] tracking-widest uppercase block font-bold">
              The Trophy Drawer · Collected Keepsakes
            </span>
            <h2 className="font-display-lg text-2xl sm:text-3xl text-[#805365] font-bold tracking-tight mt-0.5">
              Contest Honors & Milestones
            </h2>
            <p className="font-accent-handwritten text-base text-[#B97891] mt-0.5">
              Verified achievements from competitive programming & college events
            </p>
          </div>

          {/* Confirmed Major Achievement Card: Algorithmia */}
          <motion.div
            whileHover={{ scale: 1.015, rotate: 0 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleCardClick('algorithmia')}
            className="p-5 bg-[#FFFEFC] border-2 border-[#B97891] rounded-xs shadow-tactile relative rotate-[-1deg] transition-all cursor-pointer group mb-5"
          >
            {/* Top Ribbon Badge */}
            <div className="absolute -top-3.5 right-6 px-3 py-0.5 bg-[#F2BFCF] text-[#805365] font-label-sm text-[11px] font-bold uppercase tracking-wider rounded-xs border border-[#805365] shadow-xs">
              2nd Place Winner 🏆
            </div>

            <span className="text-[10px] font-label-sm uppercase tracking-widest text-[#805365] block mb-1">
              MKSSS Cummins College of Engineering for Women
            </span>

            <h3 className="font-display-lg text-xl sm:text-2xl text-[#805365] font-bold mb-1">
              Algorithmia Contest
            </h3>
            <p className="font-accent-handwritten text-base text-[#B97891] mb-2.5">
              College ICPC-style Competitive Programming Contest
            </p>

            <p className="font-body-md text-xs sm:text-sm text-[#44343B] leading-relaxed mb-3">
              Secured second place competing against peers in solving challenging algorithmic
              problems in C++ under strict time limits, demonstrating fast problem analysis, edge-case
              identification, and algorithmic optimization.
            </p>

            <div className="pt-2 border-t border-dashed border-[#D8B5BD] flex items-center justify-between text-xs font-label-sm text-[#805365]">
              <span className="font-semibold">Verified Contest Standing</span>
              <span className="font-accent-handwritten text-sm text-[#B97891]">Click for wax seal</span>
            </div>

            {/* Framer Motion Stamp Overlay Slam Effect */}
            <AnimatePresence>
              {stampedCard === 'algorithmia' && (
                <motion.div
                  initial={{ scale: 3, opacity: 0, rotate: -35 }}
                  animate={{ scale: 1, opacity: 1, rotate: -12 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  className="absolute bottom-3 right-4 pointer-events-none"
                >
                  <div className="w-20 h-20 rounded-full border-2 border-[#805365] border-dashed flex flex-col items-center justify-center bg-[#F8D7E2]/85 text-[#805365] shadow-md backdrop-blur-2xs">
                    <span className="text-[8px] font-label-sm font-bold tracking-widest uppercase">
                      VERIFIED
                    </span>
                    <span className="text-sm font-bold font-display-lg leading-none my-0.5">2ND</span>
                    <span className="text-[7px] font-label-sm tracking-wider">ALGORITHMIA</span>
                    <span className="text-[9px]">★</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Academic Growth Keepsake */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="p-4 bg-[#FFFEFC] border border-[#D8B5BD] rounded-xs shadow-2xs rotate-[0.5deg]"
          >
            <span className="font-label-sm text-[10px] text-[#805365] uppercase tracking-wider font-bold block mb-1">
              Academic Milestone
            </span>
            <h4 className="font-display-lg text-base text-[#44343B] font-bold">
              B.Tech E&TC Curriculum & Core Foundations
            </h4>
            <p className="font-body-md text-xs text-[#44343B] leading-relaxed mt-1">
              Strong performance in foundational coursework covering Digital Electronics, C Programming, Signal Processing, and Data Structures at Cummins College.
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#D8B5BD] flex items-center justify-between text-xs font-label-sm text-[#805365]">
          <span>Archival Keepsake Shelf</span>
          <span className="font-accent-handwritten text-sm text-[#B97891]">
            "Real victories are earned problem by problem"
          </span>
        </div>
      </section>

      {/* RIGHT PAGE - Debugging Diary & Tiny Victories */}
      <section className="w-full md:w-1/2 min-h-[660px] md:min-h-[740px] p-6 sm:p-10 md:p-12 relative bg-[#FFF8F0] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFFEFC] via-[#FFF8F0] to-[#F8D7E2]/30 rounded-r-sm overflow-hidden z-10 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="mb-5 pb-2 border-b border-[#D8B5BD]">
            <span className="font-label-sm text-xs text-[#805365] tracking-widest uppercase block font-bold">
              Debugging Diary
            </span>
            <h3 className="font-display-lg text-xl sm:text-2xl text-[#805365] font-bold">
              Things That Broke Before They Worked
            </h3>
            <p className="font-accent-handwritten text-base text-[#B97891] mt-0.5">
              Honest lessons from real code debugging sessions
            </p>
          </div>

          {/* Stories */}
          <div className="space-y-3.5 mb-5">
            {DEBUGGING_STORIES.map((story, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.015, x: 2 }}
                className="p-3.5 bg-[#FFFEFC] rounded-xs border border-[#D8B5BD] shadow-2xs hover:border-[#B97891] transition-colors"
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[#805365] font-bold text-xs">#{i + 1}</span>
                  <h4 className="font-display-lg text-sm text-[#44343B] font-bold">
                    {story.title}
                  </h4>
                </div>
                <p className="text-xs text-[#805365] font-accent-handwritten text-base leading-tight mb-1">
                  <span className="font-bold">What broke: </span>{story.whatBroke}
                </p>
                <p className="text-xs font-body-md text-[#44343B] leading-relaxed bg-[#FFF8F0] p-2 rounded-2xs border border-[#D8B5BD]/50">
                  <span className="font-bold text-[#805365]">The fix: </span>{story.theFix}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Tiny Victories Shelf */}
          <div className="p-3 bg-[#F5EBCB]/50 rounded-xs border border-[#D8B5BD]">
            <span className="font-label-sm text-[10px] text-[#44343B] uppercase tracking-wider font-bold block mb-1">
              Tiny Victories We Celebrate:
            </span>
            <ul className="text-xs font-accent-handwritten text-base text-[#44343B] space-y-0.5">
              <li>✦ Passing all hidden test cases on the first submission</li>
              <li>✦ Finding the off-by-one bug without printing variables</li>
              <li>✦ Refactoring an O(N²) loop down to O(N log N) with binary search</li>
            </ul>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="pt-3 border-t border-[#D8B5BD] flex items-center justify-between text-xs font-label-sm text-[#805365]">
          <span>Verified without exaggeration</span>
          <button
            onClick={() => onNavigate('experiments')}
            className="hover:underline flex items-center gap-1 font-semibold text-[#805365] cursor-pointer"
          >
            <span>The Experimental Desk</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </section>
    </div>
  );
};
