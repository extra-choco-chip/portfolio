import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import { PAGE_MAP } from '../utils/pageMap';
import { MonogramAvatar } from './MonogramAvatar';
import { playPageFlipSound, playTactileClick, toggleSound, isSoundEnabled } from '../utils/audio';

interface TopNavProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onOpenAddMemory: () => void;
  onOpenPageMap: () => void;
  candlelightMode: boolean;
  onToggleCandlelight: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentPage,
  onNavigate,
  sidebarOpen,
  onToggleSidebar,
  onOpenAddMemory,
  onOpenPageMap,
  candlelightMode,
  onToggleCandlelight,
}) => {
  const [bookmarkMenuOpen, setBookmarkMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [sparkleActive, setSparkleActive] = useState(false);

  const bookmarkRef = useRef<HTMLDivElement>(null);

  // Close bookmark menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (bookmarkRef.current && !bookmarkRef.current.contains(event.target as Node)) {
        setBookmarkMenuOpen(false);
      }
    };

    if (bookmarkMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [bookmarkMenuOpen]);

  const handleSoundToggle = () => {
    const updated = toggleSound();
    setSoundOn(updated);
  };

  const handleSparkleClick = () => {
    playTactileClick();
    setSparkleActive(true);
    setTimeout(() => setSparkleActive(false), 2400);
  };

  return (
    <header className="sticky top-0 z-40 w-full px-4 md:px-8 py-2.5 bg-[#FFF8F0]/95 backdrop-blur-md border-b border-[#D8B5BD] flex items-center justify-between transition-all shadow-2xs">
      {/* Brand & Identity Zone */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          aria-label={sidebarOpen ? 'Close Navigation Drawer' : 'Open Navigation Drawer'}
          title={sidebarOpen ? 'Close Menu Drawer' : 'Open Navigation Drawer'}
          className="p-1.5 rounded-md text-[#805365] hover:bg-[#F8D7E2] border border-transparent hover:border-[#D8B5BD] transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl">
            {sidebarOpen ? 'dock_to_right' : 'menu'}
          </span>
          <span className="hidden sm:inline text-xs font-label-sm tracking-wider uppercase text-[#805365]">
            {sidebarOpen ? 'Close' : 'Menu'}
          </span>
        </button>

        <div
          onClick={() => {
            playPageFlipSound();
            onNavigate('cover');
          }}
          className="flex items-center gap-3 cursor-pointer group"
          role="button"
          tabIndex={0}
          aria-label="Navigate to Cover"
          onKeyDown={(e) => {
            if (e.key === 'Enter') onNavigate('cover');
          }}
        >
          <MonogramAvatar size="sm" className="group-hover:rotate-6 transition-transform" />
          <div className="flex flex-col">
            <h1 className="font-display-lg text-lg md:text-xl text-[#805365] leading-tight font-semibold tracking-tight">
              Ishana Datta
            </h1>
            <span className="text-[11px] font-accent-handwritten text-[#B97891] -mt-0.5 hidden sm:inline">
              Portfolio & Developer Journal · B.Tech E&TC
            </span>
          </div>
        </div>
      </div>

      {/* Global Navigation Tools & Utilities */}
      <div className="flex items-center gap-2 sm:gap-3.5">
        {/* Soft Day / Night Ambiance Toggle */}
        <button
          onClick={() => {
            playTactileClick();
            onToggleCandlelight();
          }}
          aria-label={candlelightMode ? 'Switch to Studio Daylight' : 'Switch to Warm Candlelight Ambiance'}
          title={candlelightMode ? 'Switch to Studio Daylight' : 'Switch to Warm Candlelight Ambiance'}
          className={`p-1.5 rounded-full border transition-all cursor-pointer ${
            candlelightMode
              ? 'bg-[#F5EBCB] text-[#44343B] border-[#B97891] shadow-xs'
              : 'text-[#805365] hover:bg-[#F8D7E2] border-transparent'
          }`}
        >
          <span className="material-symbols-outlined text-xl">
            {candlelightMode ? 'light_mode' : 'bedtime'}
          </span>
        </button>

        {/* Paper Rustle Sound Toggle */}
        <button
          onClick={handleSoundToggle}
          aria-label={soundOn ? 'Mute tactile sounds' : 'Enable tactile sounds'}
          title={soundOn ? 'Mute tactile sounds' : 'Enable tactile sounds'}
          className="p-1.5 text-[#805365] hover:bg-[#F8D7E2] rounded-full transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">
            {soundOn ? 'volume_up' : 'volume_off'}
          </span>
        </button>

        {/* Surprise Easter Egg / Sparkle Button */}
        <div className="relative">
          <button
            onClick={handleSparkleClick}
            aria-label="Botanical inspiration sparkle"
            title="A Little Sparkle"
            className="p-1.5 text-[#805365] hover:text-[#B97891] hover:rotate-12 transition-transform cursor-pointer relative"
          >
            <span className="material-symbols-outlined text-2xl">local_florist</span>
            {sparkleActive && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#ED9BB8] animate-ping" />
            )}
          </button>
          <AnimatePresence>
            {sparkleActive && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                className="absolute top-10 right-0 w-56 p-2.5 bg-[#FFF8F0] border border-[#B97891] shadow-lifted rounded-xs text-xs font-accent-handwritten text-[#805365] z-50 pointer-events-none"
              >
                🌸 "Keep building, keep breaking, keep learning!" — Ishana
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Table of Contents Overlay Trigger */}
        <button
          onClick={() => {
            playTactileClick();
            onOpenPageMap();
          }}
          aria-label="Open Table of Contents"
          title="Open Table of Contents (Index)"
          className="px-2.5 py-1.5 bg-[#F8D7E2] hover:bg-[#F2BFCF] text-[#805365] rounded-sm border border-[#D8B5BD] flex items-center gap-1.5 text-xs font-label-sm shadow-2xs transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">menu_book</span>
          <span className="hidden md:inline font-semibold">Index</span>
        </button>

        {/* Ribbon Bookmark Quick Jump Dropdown */}
        <div className="relative" ref={bookmarkRef}>
          <button
            onClick={() => {
              playTactileClick();
              setBookmarkMenuOpen(!bookmarkMenuOpen);
            }}
            aria-expanded={bookmarkMenuOpen}
            aria-label="Bookmark Quick Jump Menu"
            title="Bookmark Jump Menu"
            className="p-1.5 text-[#805365] hover:bg-[#F8D7E2] rounded-full transition-colors cursor-pointer flex items-center"
          >
            <span className="material-symbols-outlined text-2xl">bookmark</span>
          </button>

          <AnimatePresence>
            {bookmarkMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 top-11 w-64 bg-[#FFF8F0] border border-[#B97891] shadow-tactile-heavy rounded-xs p-2.5 z-50 text-xs"
              >
                <div className="px-3 py-1.5 border-b border-[#D8B5BD] font-display-lg text-[#805365] text-sm flex justify-between items-center">
                  <span>Journal Spreads</span>
                  <span className="text-[10px] font-label-sm text-[#B97891]">8 Chapters</span>
                </div>
                <div className="py-1 max-h-72 overflow-y-auto">
                  {PAGE_MAP.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        playPageFlipSound();
                        onNavigate(p.id);
                        setBookmarkMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xs flex items-center justify-between transition-colors cursor-pointer mb-0.5 ${
                        currentPage === p.id
                          ? 'bg-[#F2BFCF] text-[#805365] font-semibold border-l-2 border-[#805365]'
                          : 'text-[#44343B] hover:bg-[#F8D7E2]'
                      }`}
                    >
                      <span className="font-accent-handwritten text-sm">{p.title}</span>
                      <span className="text-[10px] font-label-sm text-[#805365]/70">{p.spreadLabel}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Add a Scrap Action */}
        <button
          onClick={onOpenAddMemory}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#F2BFCF] hover:bg-[#ED9BB8] text-[#805365] font-accent-handwritten text-sm rounded-md shadow-2xs border border-[#B97891] hover:-translate-y-0.5 transition-all cursor-pointer font-bold"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>Add Scrap</span>
        </button>
      </div>
    </header>
  );
};
