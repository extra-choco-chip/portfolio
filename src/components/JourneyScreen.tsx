import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import { JournalTabs } from './JournalTabs';
import { TIMELINE_ENTRIES, ISHANA_PROFILE } from '../data/portfolioData';
import { playStampSound, playTactileClick } from '../utils/audio';

interface JourneyScreenProps {
  onNavigate: (page: PageId) => void;
}

export const JourneyScreen: React.FC<JourneyScreenProps> = ({ onNavigate }) => {
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>('t-2');
  const [stampedList, setStampedList] = useState<string[]>(['t-2']);

  const handleMilestoneClick = (id: string) => {
    playTactileClick();
    setSelectedMilestone(id);
    if (!stampedList.includes(id)) {
      playStampSound();
      setStampedList((prev) => [...prev, id]);
    }
  };

  return (
    <div className="relative w-full max-w-6xl flex flex-col md:flex-row bg-[#FFF8F0] shadow-tactile-heavy rounded-sm torn-edge-soft my-auto border-2 border-[#D8B5BD]">
      {/* Journal Right-edge Tabs */}
      <JournalTabs currentPage="journey" onNavigate={onNavigate} />

      {/* Book Spine Center Shadow & Stitches */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -ml-4 bg-gradient-to-r from-transparent via-[#44343B]/10 to-transparent z-30 pointer-events-none mix-blend-multiply" />
      <div className="hidden md:flex absolute left-1/2 top-[8%] bottom-[8%] -ml-px w-px bg-[#B97891]/40 z-30 flex-col justify-between items-center py-6 pointer-events-none">
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
      </div>

      {/* LEFT PAGE - Timeline of Learning & Contests */}
      <section className="w-full md:w-1/2 min-h-[660px] md:min-h-[740px] p-6 sm:p-10 md:p-12 relative bg-[#FFF8F0] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFFEFC] via-[#FFF8F0] to-[#DDE4C5]/20 rounded-l-sm overflow-hidden z-10 border-b md:border-b-0 md:border-r border-[#D8B5BD] flex flex-col justify-between">
        <div>
          {/* Section Header */}
          <div className="mb-5 pb-2 border-b border-[#D8B5BD]">
            <span className="font-label-sm text-xs text-[#805365] tracking-widest uppercase block font-bold">
              Growth Journal · Living Archive
            </span>
            <h2 className="font-display-lg text-2xl sm:text-3xl text-[#805365] font-bold tracking-tight mt-0.5">
              Milestones & Learning Path
            </h2>
            <p className="font-accent-handwritten text-base text-[#B97891] mt-0.5">
              Confirmed chapters from college, contests, and technical builds
            </p>
          </div>

          {/* Timeline Entries with Staggered Framer Motion */}
          <div className="relative pl-6 space-y-3.5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#D8B5BD] before:border-r before:border-dashed before:border-[#B97891]">
            {TIMELINE_ENTRIES.map((entry, idx) => {
              const isSelected = selectedMilestone === entry.id;
              const isStamped = stampedList.includes(entry.id);

              return (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08, duration: 0.3 }}
                  whileHover={{ scale: 1.015, x: 2 }}
                  onClick={() => handleMilestoneClick(entry.id)}
                  className={`relative p-3.5 bg-[#FFFEFC] rounded-xs border transition-all duration-300 cursor-pointer shadow-2xs hover:shadow-tactile group ${
                    isSelected
                      ? 'border-[#805365] bg-[#FFF8F0] ring-1 ring-[#805365]/30'
                      : 'border-[#D8B5BD] hover:border-[#B97891]'
                  }`}
                >
                  {/* Pin Dot on Timeline Spine with subtle pulse */}
                  <div className="absolute -left-[27px] top-4 w-3.5 h-3.5 rounded-full bg-[#FFF8F0] border-2 border-[#805365] shadow-xs flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#805365]" />
                    {isSelected && (
                      <div className="absolute inset-0 rounded-full bg-[#ED9BB8]/50 animate-ping opacity-60" />
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-label-sm text-[#805365] bg-[#F8D7E2] px-2 py-0.5 rounded-xs border border-[#D8B5BD] font-bold">
                      {entry.period}
                    </span>
                    <span className="text-[10px] font-label-sm text-[#44343B] bg-[#F5EBCB] px-1.5 py-0.5 rounded-xs border border-[#D8B5BD]">
                      {entry.statusTag}
                    </span>
                  </div>

                  <h4 className="font-display-lg text-base text-[#44343B] font-bold group-hover:text-[#805365] transition-colors">
                    {entry.title}
                  </h4>
                  <p className="font-accent-handwritten text-sm text-[#B97891] mb-1">
                    {entry.subtitle}
                  </p>
                  <p className="font-body-md text-xs text-[#44343B] leading-relaxed">
                    {entry.description}
                  </p>

                  {/* Stamp mark */}
                  {isStamped && (
                    <motion.div
                      initial={{ scale: 2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.5 }}
                      className="absolute top-2 right-2 text-[10px] font-mono text-[#805365] rotate-12 pointer-events-none"
                    >
                      [VERIFIED]
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#D8B5BD] flex items-center justify-between text-xs font-label-sm text-[#805365]">
          <span>MKSSS Cummins College of Engineering for Women</span>
          <span className="font-accent-handwritten text-sm text-[#B97891]">
            Pune · B.Tech E&TC
          </span>
        </div>
      </section>

      {/* RIGHT PAGE - Currently in Ishana's Notebook & Real Reflections */}
      <section className="w-full md:w-1/2 min-h-[660px] md:min-h-[740px] p-6 sm:p-10 md:p-12 relative bg-[#FFF8F0] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFFEFC] via-[#FFF8F0] to-[#DDE4C5]/20 rounded-r-sm overflow-hidden z-10 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="mb-5 pb-2 border-b border-[#D8B5BD]">
            <span className="font-label-sm text-xs text-[#805365] tracking-widest uppercase block font-bold">
              Active Desk
            </span>
            <h3 className="font-display-lg text-xl sm:text-2xl text-[#805365] font-bold">
              Currently in My Notebook
            </h3>
            <p className="font-accent-handwritten text-base text-[#B97891] mt-0.5">
              Live snapshot of learning, building, and engineering challenges
            </p>
          </div>

          {/* Grid of 4 Active Notebook Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
            {/* Learning */}
            <motion.div whileHover={{ scale: 1.02 }} className="p-3.5 bg-[#FFFEFC] rounded-xs border border-[#D8B5BD] shadow-2xs rotate-[-0.5deg]">
              <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-dashed border-[#D8B5BD]">
                <span className="text-sm">📖</span>
                <span className="font-label-sm text-[10px] uppercase tracking-wider text-[#805365] font-bold">
                  What I'm Learning:
                </span>
              </div>
              <p className="font-body-md text-xs text-[#44343B] leading-relaxed">
                {ISHANA_PROFILE.currentlyInNotebook.learning}
              </p>
            </motion.div>

            {/* Building */}
            <motion.div whileHover={{ scale: 1.02 }} className="p-3.5 bg-[#FFFEFC] rounded-xs border border-[#D8B5BD] shadow-2xs rotate-[0.5deg]">
              <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-dashed border-[#D8B5BD]">
                <span className="text-sm">⚡</span>
                <span className="font-label-sm text-[10px] uppercase tracking-wider text-[#805365] font-bold">
                  What I'm Building:
                </span>
              </div>
              <p className="font-body-md text-xs text-[#44343B] leading-relaxed">
                {ISHANA_PROFILE.currentlyInNotebook.building}
              </p>
            </motion.div>

            {/* Challenge */}
            <motion.div whileHover={{ scale: 1.02 }} className="p-3.5 bg-[#FFFEFC] rounded-xs border border-[#D8B5BD] shadow-2xs rotate-[0.5deg]">
              <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-dashed border-[#D8B5BD]">
                <span className="text-sm">⚖️</span>
                <span className="font-label-sm text-[10px] uppercase tracking-wider text-[#805365] font-bold">
                  Current Challenge:
                </span>
              </div>
              <p className="font-body-md text-xs text-[#44343B] leading-relaxed">
                {ISHANA_PROFILE.currentlyInNotebook.challenge}
              </p>
            </motion.div>

            {/* Next Explore */}
            <motion.div whileHover={{ scale: 1.02 }} className="p-3.5 bg-[#FFFEFC] rounded-xs border border-[#D8B5BD] shadow-2xs rotate-[-0.5deg]">
              <div className="flex items-center gap-1.5 mb-1.5 pb-1 border-b border-dashed border-[#D8B5BD]">
                <span className="text-sm">🔭</span>
                <span className="font-label-sm text-[10px] uppercase tracking-wider text-[#805365] font-bold">
                  Next to Explore:
                </span>
              </div>
              <p className="font-body-md text-xs text-[#44343B] leading-relaxed">
                {ISHANA_PROFILE.currentlyInNotebook.nextExplore}
              </p>
            </motion.div>
          </div>

          {/* Handwritten Personal Reflection Card with washi tape */}
          <div className="p-4 bg-[#FFFEFC] rounded-xs border-2 border-[#B97891] shadow-tactile relative rotate-[-1deg]">
            <div className="w-20 h-4 bg-[#F2BFCF] absolute -top-2 left-6 washi-tape-strip shadow-2xs border border-[#B97891]/50" />
            <h4 className="font-accent-handwritten text-xl text-[#805365] font-bold mb-1">
              "Code as a Craft"
            </h4>
            <p className="font-body-md text-xs sm:text-sm text-[#44343B] leading-relaxed mb-2">
              For me, competitive programming and frontend engineering are two sides of the same coin: one trains sharp precision and algorithmic rigor, while the other gives shape, empathy, and tactile joy to human users.
            </p>
            <p className="font-accent-handwritten text-base text-[#805365] text-right font-semibold">
              — Ishana Datta
            </p>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="pt-3 border-t border-[#D8B5BD] flex items-center justify-between text-xs font-label-sm text-[#805365]">
          <span>Page 11–12 of Journal</span>
          <button
            onClick={() => onNavigate('contact')}
            className="hover:underline flex items-center gap-1 font-semibold text-[#805365] cursor-pointer"
          >
            <span>Letters & Guestbook</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </section>
    </div>
  );
};
