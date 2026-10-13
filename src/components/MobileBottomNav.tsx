import React from 'react';
import { PageId } from '../types';
import { PAGE_MAP } from '../utils/pageMap';
import { playPageFlipSound, playTactileClick } from '../utils/audio';

interface MobileBottomNavProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenAddMemory: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onNavigate,
  onOpenAddMemory,
}) => {
  const pages: PageId[] = [
    'cover',
    'about',
    'projects',
    'coding',
    'achievements',
    'experiments',
    'journey',
    'contact',
  ];

  const handleFlipPage = () => {
    playPageFlipSound();
    const currIdx = pages.indexOf(currentPage);
    const nextIdx = (currIdx + 1) % pages.length;
    onNavigate(pages[nextIdx]);
  };

  return (
    <>
      {/* Floating Action Button (Mobile Add Scrap) */}
      <button
        onClick={() => {
          playTactileClick();
          onOpenAddMemory();
        }}
        title="Add Scrap"
        className="md:hidden fixed bottom-22 right-4 w-12 h-12 bg-[#805365] text-white rounded-full shadow-tactile flex items-center justify-center z-40 hover:scale-105 active:scale-95 transition-transform rotate-2 cursor-pointer border border-[#D8B5BD]"
      >
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>

      {/* Bottom Bar Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-2 py-2 bg-[#FFF8F0]/95 backdrop-blur-md border-t border-[#D8B5BD] h-16 shadow-[0_-4px_16px_rgba(68,52,59,0.08)]">
        <button
          onClick={handleFlipPage}
          className="flex flex-col items-center justify-center text-[#805365] p-1 opacity-90 hover:opacity-100 cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">auto_stories</span>
          <span className="font-label-sm text-[10px]">Flip</span>
        </button>

        <button
          onClick={() => {
            playPageFlipSound();
            onNavigate('projects');
          }}
          className={`flex flex-col items-center justify-center p-1 rounded-sm cursor-pointer transition-colors ${
            currentPage === 'projects' ? 'text-[#805365] font-bold' : 'text-[#44343B]'
          }`}
        >
          <span className="material-symbols-outlined text-xl">folder_open</span>
          <span className="font-label-sm text-[10px]">Projects</span>
        </button>

        <button
          onClick={() => {
            playPageFlipSound();
            onNavigate('coding');
          }}
          className={`flex flex-col items-center justify-center p-1 rounded-sm cursor-pointer transition-colors ${
            currentPage === 'coding' ? 'text-[#805365] font-bold' : 'text-[#44343B]'
          }`}
        >
          <span className="material-symbols-outlined text-xl">terminal</span>
          <span className="font-label-sm text-[10px]">Codex</span>
        </button>

        <button
          onClick={() => {
            playPageFlipSound();
            onNavigate('contact');
          }}
          className={`flex flex-col items-center justify-center p-1 rounded-sm cursor-pointer transition-colors ${
            currentPage === 'contact' ? 'text-[#805365] font-bold' : 'text-[#44343B]'
          }`}
        >
          <span className="material-symbols-outlined text-xl">mail</span>
          <span className="font-label-sm text-[10px]">Contact</span>
        </button>
      </nav>
    </>
  );
};
