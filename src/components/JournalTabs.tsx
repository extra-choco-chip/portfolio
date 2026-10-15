import React from 'react';
import { PageId } from '../types';
import { PAGE_MAP } from '../utils/pageMap';
import { playPageFlipSound } from '../utils/audio';

interface JournalTabsProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

export const JournalTabs: React.FC<JournalTabsProps> = ({
  currentPage,
  onNavigate,
}) => {
  // We exclude 'cover' from the protruding side tabs of open book spreads, or we show it as a special bookmark tab
  const tabs = PAGE_MAP.filter((p) => p.id !== 'cover');

  const rotations = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1', '-rotate-1'];

  return (
    <nav
      aria-label="Journal sticky-note tabs"
      className="absolute top-10 sm:top-14 -right-7 sm:-right-8 flex flex-col gap-3 sm:gap-4 z-20"
    >
      {tabs.map((tab, idx) => {
        const isActive = currentPage === tab.id;
        const rot = rotations[idx % rotations.length];
        return (
          <button
            key={tab.id}
            onClick={() => {
              playPageFlipSound();
              onNavigate(tab.id);
            }}
            title={`${tab.title} (${tab.spreadLabel})`}
            className={`sticky-note-tab sticky-note-attached ${tab.tabColor} px-2.5 sm:px-3 py-3.5 sm:py-4.5 rounded-r-sm shadow-tactile border border-l-0 border-[#b97891]/45 hover:translate-x-3 transition-all duration-300 group flex items-center justify-center relative ${rot} origin-left cursor-pointer ${
              isActive
                ? 'translate-x-4 ring-2 ring-[#805365]/35 shadow-lifted z-30'
                : 'opacity-90 hover:opacity-100'
            }`}
          >
            <span className="absolute left-1.5 right-1.5 top-1.5 border-t border-dashed border-[#805365]/25 pointer-events-none" />
            <span className="sticky-note-fold absolute top-0 right-0 w-3 h-3 pointer-events-none" />
            <span
              className={`sticky-note-label font-accent-handwritten text-[13px] sm:text-sm ${tab.tabTextColor} whitespace-nowrap journal-tab group-hover:scale-105 transition-transform tracking-wide select-none font-bold leading-none`}
            >
              {tab.title.replace(' & ', ' / ')}
            </span>
            {isActive && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-4 bg-[#70585b] rounded-r-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
};
