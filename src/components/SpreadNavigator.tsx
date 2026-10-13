import React from 'react';
import { PageId } from '../types';
import { getPageMetadata, getAdjacentPages } from '../utils/pageMap';
import { playPageFlipSound, playTactileClick } from '../utils/audio';

interface SpreadNavigatorProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenPageMap: () => void;
}

export const SpreadNavigator: React.FC<SpreadNavigatorProps> = ({
  currentPage,
  onNavigate,
  onOpenPageMap,
}) => {
  const current = getPageMetadata(currentPage);
  const { prev, next } = getAdjacentPages(currentPage);

  return (
    <div className="w-full max-w-6xl mt-4 px-2 sm:px-4 flex items-center justify-between z-20">
      {/* Previous Spread Button */}
      <button
        onClick={() => {
          if (prev) {
            playPageFlipSound();
            onNavigate(prev.id);
          }
        }}
        disabled={!prev}
        className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-md font-label-sm text-xs transition-all cursor-pointer ${
          prev
            ? 'bg-[#ffffff]/90 hover:bg-[#fadadd] text-[#70585b] shadow-xs border border-[#d2c3c4] hover:-translate-x-0.5'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <span className="material-symbols-outlined text-base">arrow_back</span>
        <span className="hidden sm:inline font-accent-handwritten text-sm">
          {prev?.title}
        </span>
        <span className="sm:hidden font-accent-handwritten text-sm">Prev</span>
      </button>

      {/* Center Table of Contents / Page Map Trigger */}
      <button
        onClick={() => {
          playTactileClick();
          onOpenPageMap();
        }}
        className="px-4 py-2 bg-[#ffffff]/90 hover:bg-[#f6eddb] rounded-full shadow-xs border border-[#d2c3c4] flex items-center gap-2 text-xs font-label-sm text-[#70585b] hover:shadow-sm transition-all hover:scale-102 cursor-pointer group"
      >
        <span className="material-symbols-outlined text-base text-[#60603e] group-hover:rotate-12 transition-transform">
          menu_book
        </span>
        <span className="font-semibold text-[#1f1b11]">{current.spreadLabel}:</span>
        <span className="font-accent-handwritten text-sm text-[#70585b]">{current.title}</span>
        <span className="hidden md:inline text-[11px] text-[#807475] italic ml-1">
          (Click for Page Map)
        </span>
      </button>

      {/* Next Spread Button */}
      <button
        onClick={() => {
          if (next) {
            playPageFlipSound();
            onNavigate(next.id);
          }
        }}
        disabled={!next}
        className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-md font-label-sm text-xs transition-all cursor-pointer ${
          next
            ? 'bg-[#ffffff]/90 hover:bg-[#fadadd] text-[#70585b] shadow-xs border border-[#d2c3c4] hover:translate-x-0.5'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <span className="hidden sm:inline font-accent-handwritten text-sm">
          {next?.title}
        </span>
        <span className="sm:hidden font-accent-handwritten text-sm">Next</span>
        <span className="material-symbols-outlined text-base">arrow_forward</span>
      </button>
    </div>
  );
};
