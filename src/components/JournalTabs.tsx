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

  const rotations = ['-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1', '-rotate-1'];

  return (
    <div className="absolute top-12 sm:top-16 -right-12 sm:-right-14 flex flex-col gap-5 sm:gap-6 z-20">
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
            className={`${tab.tabColor} px-2 sm:px-2.5 py-4 sm:py-5 rounded-r-md shadow-tactile border border-l-0 border-[#d2c3c4]/70 hover:translate-x-3 transition-all duration-300 group flex items-center justify-center relative ${rot} origin-left cursor-pointer ${
              isActive
                ? 'translate-x-3 ring-2 ring-[#70585b]/40 shadow-lifted z-30'
                : 'opacity-90 hover:opacity-100'
            }`}
          >
            <span
              className={`font-accent-handwritten text-sm sm:text-base ${tab.tabTextColor} whitespace-nowrap journal-tab group-hover:scale-105 transition-transform tracking-wide select-none font-medium`}
            >
              {tab.title.replace(' & ', ' / ')}
            </span>
            {isActive && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-4 bg-[#70585b] rounded-r-full" />
            )}
          </button>
        );
      })}
    </div>
  );
};
