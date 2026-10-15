import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PageId } from '../types';
import { MonogramAvatar } from './MonogramAvatar';
import { ThreeJournalBook } from './ThreeJournalBook';
import { playPageFlipSound, playTactileClick } from '../utils/audio';

interface CoverScreenProps {
  onOpen: () => void;
  onNavigate: (page: PageId) => void;
  onOpenPageMap: () => void;
}

export const CoverScreen: React.FC<CoverScreenProps> = ({
  onOpen,
  onNavigate,
  onOpenPageMap,
}) => {
  const [viewMode, setViewMode] = useState<'3d-book' | 'classic'>('3d-book');

  return (
    <div className="relative w-full max-w-4xl aspect-[3/4] sm:aspect-[4/3] flex items-center justify-center p-2 sm:p-6 my-auto">
      {/* View Mode Toggle (3D Book vs Classic Journal) */}
      <div className="absolute top-0 left-4 sm:left-8 z-30 flex items-center gap-1.5 bg-[#FFF8F0]/95 px-3 py-1.5 rounded-full border border-[#D8B5BD] shadow-2xs">
        <span className="text-[10px] font-label-sm uppercase tracking-wider text-[#805365] font-bold">
          Cover Mode:
        </span>
        <button
          onClick={() => {
            playTactileClick();
            setViewMode('3d-book');
          }}
          className={`px-2.5 py-0.5 rounded-full text-xs font-label-sm transition-colors cursor-pointer flex items-center gap-1 ${
            viewMode === '3d-book'
              ? 'bg-[#805365] text-white font-bold shadow-2xs'
              : 'text-[#44343B] hover:text-[#805365]'
          }`}
        >
          <span>3D Book</span>
          <span className="text-[9px] bg-[#ED9BB8] text-white px-1 rounded-2xs font-mono">3D</span>
        </button>
        <button
          onClick={() => {
            playTactileClick();
            setViewMode('classic');
          }}
          className={`px-2.5 py-0.5 rounded-full text-xs font-label-sm transition-colors cursor-pointer ${
            viewMode === 'classic'
              ? 'bg-[#F2BFCF] text-[#805365] font-bold shadow-2xs'
              : 'text-[#44343B] hover:text-[#805365]'
          }`}
        >
          Scrapbook
        </button>
      </div>

      {viewMode === '3d-book' ? (
        /* 3D Three.js Interactive Journal Book */
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.35 }}
          className="relative w-full flex flex-col items-center justify-center py-4"
        >
          <div className="text-center mb-1">
            <span className="font-cursive-calligraphy text-2xl sm:text-3xl text-[#B97891] block">
              The Handcrafted Archive of
            </span>
            <h1 className="font-display-book text-3xl sm:text-5xl text-[#805365] font-bold tracking-tight">
              Ishana Datta
            </h1>
            <p className="font-accent-handwritten text-xs sm:text-sm text-[#44343B]/80 mt-0.5">
              B.Tech E&TC · MKSSS Cummins College of Engineering for Women, Pune
            </p>
          </div>

          <ThreeJournalBook onOpen={onOpen} />

          {/* Quick Category Buttons in 3D Mode */}
          <div className="flex gap-2 mt-2 pt-2 border-t border-dashed border-[#D8B5BD] w-full max-w-sm justify-center z-20">
            <button
              type="button"
              onClick={() => {
                playPageFlipSound();
                onNavigate('projects');
              }}
              className="px-2.5 py-1 bg-[#F8D7E2] hover:bg-[#F2BFCF] text-[#805365] rounded-xs text-[10px] font-label-sm border border-[#D8B5BD] uppercase tracking-wider transition-colors cursor-pointer font-bold"
            >
              Projects
            </button>
            <button
              type="button"
              onClick={() => {
                playPageFlipSound();
                onNavigate('coding');
              }}
              className="px-2.5 py-1 bg-[#F5EBCB] hover:bg-[#F8D7E2] text-[#44343B] rounded-xs text-[10px] font-label-sm border border-[#D8B5BD] uppercase tracking-wider transition-colors cursor-pointer font-bold"
            >
              Coding & CP
            </button>
            <button
              type="button"
              onClick={() => {
                playPageFlipSound();
                onNavigate('achievements');
              }}
              className="px-2.5 py-1 bg-[#DDE4C5] hover:bg-[#F8D7E2] text-[#44343B] rounded-xs text-[10px] font-label-sm border border-[#D8B5BD] uppercase tracking-wider transition-colors cursor-pointer font-bold"
            >
              Trophy Drawer
            </button>
            <button
              type="button"
              onClick={() => {
                playPageFlipSound();
                onNavigate('experiments');
              }}
              className="px-2.5 py-1 bg-[#ED9BB8] hover:bg-[#F8D7E2] text-[#44343B] rounded-xs text-[10px] font-label-sm border border-[#D8B5BD] uppercase tracking-wider transition-colors cursor-pointer font-bold"
            >
              Experiments
            </button>
          </div>
        </motion.div>
      ) : (
        /* The Classic Vintage Pink Book Cover Base */
        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: -0.5 }}
          whileHover={{ rotate: 0, scale: 1.01 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="relative w-full h-full max-w-xl md:max-w-2xl bg-[#F8D7E2] rounded-r-2xl rounded-l-sm shadow-tactile-heavy overflow-visible border-2 border-[#D8B5BD] z-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 50% 50%, rgba(255, 254, 252, 0.45) 0%, rgba(242, 191, 207, 0.65) 100%)',
          }}
        >
          {/* Book Spine (Left Edge) with deep rose and delicate lace overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-[#805365] rounded-l-sm shadow-[inset_-3px_0_7px_rgba(0,0,0,0.25)] z-20 flex flex-col justify-between py-8 border-r border-[#44343B]/20">
            <div
              className="absolute left-0 top-0 w-5 h-full lace-texture opacity-75 -translate-x-2 drop-shadow-md pointer-events-none"
              style={{
                maskImage: 'linear-gradient(to right, transparent, black)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black)',
              }}
            />
          </div>

          {/* Top Hanging Bookmarks Ribbons */}
          <div className="absolute top-0 right-1/4 -translate-y-10 sm:-translate-y-12 flex gap-5 z-20 pointer-events-auto">
            {/* Pink Ribbon -> Projects */}
            <motion.button
              whileHover={{ y: 8, scaleY: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playPageFlipSound();
                onNavigate('projects');
              }}
              title="Open Projects (Pink Ribbon)"
              className="w-4 sm:w-5 h-24 sm:h-28 bg-[#F2BFCF] shadow-md origin-top hover:shadow-lg transition-shadow flex items-end justify-center pb-2 cursor-pointer group border-x border-[#D8B5BD]"
            >
              <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#F2BFCF] absolute -bottom-2 group-hover:scale-105" />
            </motion.button>

            {/* Yellow/Cream Ribbon -> Coding & CP */}
            <motion.button
              whileHover={{ y: 8, scaleY: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playPageFlipSound();
                onNavigate('coding');
              }}
              title="Open Coding & CP Notebook (Butter Ribbon)"
              className="w-4 sm:w-5 h-32 sm:h-36 bg-[#F5EBCB] shadow-md origin-top hover:shadow-lg transition-shadow flex items-end justify-center pb-2 cursor-pointer group border-x border-[#D8B5BD]"
            >
              <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#F5EBCB] absolute -bottom-2 group-hover:scale-105" />
            </motion.button>
          </div>

          {/* Central Cover Composition */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pl-8 sm:pl-14 pr-6 sm:pr-8">
            {/* Torn Paper Title Card with Staggered Entrance */}
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.45 }}
              onClick={() => {
                playPageFlipSound();
                onOpen();
              }}
              className="relative w-64 sm:w-96 p-6 sm:p-8 bg-[#FFF8F0] vellum torn-edge flex flex-col items-center justify-center shadow-tactile rotate-1 hover:scale-103 hover:rotate-0 transition-all duration-300 cursor-pointer group border border-[#D8B5BD] hover:border-[#B97891]"
            >
              {/* Monogram Seal Top Center with Ripple Glow Effect */}
              <div className="mb-2 relative group-hover:scale-110 transition-transform">
                <div className="absolute inset-0 rounded-full bg-[#ED9BB8]/40 animate-ping opacity-25 pointer-events-none" />
                <MonogramAvatar size="md" />
              </div>

              {/* Subtitle kicker in authentic handwritten cursive */}
              <span className="font-accent-handwritten text-[#B97891] text-base sm:text-lg text-center leading-tight">
                a little archive of things I've built, broken, and learned
              </span>

              {/* Primary Site Title in Classical Bookplate Serif */}
              <h1 className="font-display-book text-3xl sm:text-5xl text-[#805365] font-bold tracking-tight text-center my-1 drop-shadow-2xs">
                Ishana's Portfolio
              </h1>

              {/* Academic description */}
              <p className="font-label-sm text-[11px] sm:text-xs text-[#44343B]/80 text-center leading-normal max-w-xs mt-1">
                B.Tech Electronics & Telecommunications Engineering
                <br />
                <span className="text-[#805365] font-semibold">MKSSS Cummins College of Engineering for Women, Pune</span>
              </p>

              {/* 3 Archival Category Labels */}
              <div className="flex gap-2 mt-4 pt-3 border-t border-dashed border-[#D8B5BD] w-full justify-center">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playPageFlipSound();
                    onNavigate('projects');
                  }}
                  className="px-2.5 py-1 bg-[#F8D7E2] hover:bg-[#F2BFCF] text-[#805365] rounded-xs text-[10px] font-label-sm border border-[#D8B5BD] uppercase tracking-wider transition-colors cursor-pointer font-bold"
                >
                  Building
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playPageFlipSound();
                    onNavigate('coding');
                  }}
                  className="px-2.5 py-1 bg-[#F5EBCB] hover:bg-[#F8D7E2] text-[#44343B] rounded-xs text-[10px] font-label-sm border border-[#D8B5BD] uppercase tracking-wider transition-colors cursor-pointer font-bold"
                >
                  Learning
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    playPageFlipSound();
                    onNavigate('experiments');
                  }}
                  className="px-2.5 py-1 bg-[#DDE4C5] hover:bg-[#F8D7E2] text-[#44343B] rounded-xs text-[10px] font-label-sm border border-[#D8B5BD] uppercase tracking-wider transition-colors cursor-pointer font-bold"
                >
                  Experimenting
                </button>
              </div>

              {/* Washi Tape Scraps on Title Card */}
              <div className="absolute -top-2 left-1/4 w-12 h-4 bg-[#F5EBCB] opacity-80 rotate-[-5deg] border border-[#B97891]/40 washi-tape-strip" />
              <div className="absolute -bottom-2 right-1/4 w-16 h-5 bg-[#F2BFCF] opacity-80 rotate-[6deg] border border-[#B97891]/40 washi-tape-strip" />
            </motion.div>

            {/* Actions Bar */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              className="flex items-center gap-3 mt-6 z-20"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  playPageFlipSound();
                  onOpen();
                }}
                className="px-5 py-2.5 bg-[#805365] hover:bg-[#683f50] text-white rounded-sm font-label-sm text-xs tracking-wider uppercase shadow-tactile transition-all cursor-pointer flex items-center gap-2 border border-[#B97891] font-bold"
              >
                <span className="material-symbols-outlined text-base">auto_stories</span>
                <span>Open Journal</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  playTactileClick();
                  onOpenPageMap();
                }}
                className="px-4 py-2.5 bg-[#FFF8F0] hover:bg-[#F8D7E2] text-[#805365] rounded-sm font-label-sm text-xs tracking-wider uppercase shadow-2xs border border-[#D8B5BD] transition-all cursor-pointer flex items-center gap-1.5 font-semibold"
              >
                <span className="material-symbols-outlined text-base">menu_book</span>
                <span>Explore Index</span>
              </motion.button>
            </motion.div>

            {/* Interactive Sticker Easter Egg: "currently figuring things out" */}
            <motion.button
              whileHover={{ scale: 1.08, rotate: 0 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playTactileClick();
                onNavigate('secret');
              }}
              title="Secret sticker · Click to peek into the secret pocket"
              className="absolute bottom-6 left-14 sm:left-20 px-3 py-1 bg-[#F5EBCB] text-[#44343B] rounded-full border border-dashed border-[#B97891] shadow-2xs font-accent-handwritten text-sm rotate-[-6deg] transition-transform cursor-pointer"
            >
              ★ currently figuring things out ✦
            </motion.button>
          </div>

          {/* Side Tabs mounted on right edge */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full flex flex-col gap-3 z-10 pointer-events-auto pr-6 sm:pr-8">
            <motion.button
              whileHover={{ x: 8 }}
              onClick={() => {
                playPageFlipSound();
                onNavigate('about');
              }}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#F8D7E2] text-[#805365] rounded-r-md shadow-tactile border border-l-0 border-[#D8B5BD] font-accent-handwritten rotate-2 origin-left text-xs cursor-pointer font-bold"
            >
              About Me
            </motion.button>
            <motion.button
              whileHover={{ x: 8 }}
              onClick={() => {
                playPageFlipSound();
                onNavigate('projects');
              }}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#DDE4C5] text-[#44343B] rounded-r-md shadow-tactile border border-l-0 border-[#D8B5BD] font-accent-handwritten -rotate-1 origin-left text-xs cursor-pointer font-bold"
            >
              Projects
            </motion.button>
            <motion.button
              whileHover={{ x: 8 }}
              onClick={() => {
                playPageFlipSound();
                onNavigate('coding');
              }}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#F5EBCB] text-[#44343B] rounded-r-md shadow-tactile border border-l-0 border-[#D8B5BD] font-accent-handwritten rotate-1 origin-left text-xs cursor-pointer font-bold"
            >
              Coding & CP
            </motion.button>
            <motion.button
              whileHover={{ x: 8 }}
              onClick={() => {
                playPageFlipSound();
                onNavigate('achievements');
              }}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#F2BFCF] text-[#805365] rounded-r-md shadow-tactile border border-l-0 border-[#D8B5BD] font-accent-handwritten -rotate-2 origin-left text-xs cursor-pointer font-bold"
            >
              Trophy Drawer
            </motion.button>
            <motion.button
              whileHover={{ x: 8 }}
              onClick={() => {
                playPageFlipSound();
                onNavigate('experiments');
              }}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#ED9BB8] text-[#44343B] rounded-r-md shadow-tactile border border-l-0 border-[#D8B5BD] font-accent-handwritten rotate-2 origin-left text-xs cursor-pointer font-bold"
            >
              Experiments
            </motion.button>
            <motion.button
              whileHover={{ x: 8 }}
              onClick={() => {
                playPageFlipSound();
                onNavigate('contact');
              }}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#F8D7E2] text-[#805365] rounded-r-md shadow-tactile border border-l-0 border-[#D8B5BD] font-accent-handwritten -rotate-1 origin-left text-xs cursor-pointer font-bold"
            >
              Contact
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
