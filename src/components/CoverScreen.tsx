import React from 'react';
import { PageId } from '../types';
import { MonogramAvatar } from './MonogramAvatar';
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
  return (
    <div className="relative w-full max-w-4xl aspect-[3/4] sm:aspect-[4/3] flex items-center justify-center p-2 sm:p-6 my-auto">
      {/* The Book Cover Base with defined borders and rich pink tones */}
      <div
        className="relative w-full h-full max-w-xl md:max-w-2xl bg-[#F8D7E2] rounded-r-2xl rounded-l-sm shadow-tactile-heavy transform -rotate-0.5 hover:rotate-0 transition-transform duration-500 overflow-visible border-2 border-[#D8B5BD]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 50%, rgba(255, 254, 252, 0.4) 0%, rgba(242, 191, 207, 0.6) 100%)',
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
          <button
            onClick={() => {
              playPageFlipSound();
              onNavigate('projects');
            }}
            title="Open Projects (Pink Ribbon)"
            className="w-4 sm:w-5 h-24 sm:h-28 bg-[#F2BFCF] shadow-md origin-top hover:scale-y-110 hover:shadow-lg transition-transform flex items-end justify-center pb-2 cursor-pointer group border-x border-[#D8B5BD]"
          >
            <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#F2BFCF] absolute -bottom-2 group-hover:scale-105" />
          </button>

          {/* Yellow/Cream Ribbon -> Coding & CP */}
          <button
            onClick={() => {
              playPageFlipSound();
              onNavigate('coding');
            }}
            title="Open Coding & CP Notebook (Butter Ribbon)"
            className="w-4 sm:w-5 h-32 sm:h-36 bg-[#F5EBCB] shadow-md origin-top hover:scale-y-110 hover:shadow-lg transition-transform flex items-end justify-center pb-2 cursor-pointer group border-x border-[#D8B5BD]"
          >
            <div className="w-0 h-0 border-l-[10px] border-r-[10px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#F5EBCB] absolute -bottom-2 group-hover:scale-105" />
          </button>
        </div>

        {/* Central Cover Composition */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pl-8 sm:pl-14 pr-6 sm:pr-8">
          {/* Torn Paper Title Card */}
          <div
            onClick={() => {
              playPageFlipSound();
              onOpen();
            }}
            className="relative w-64 sm:w-96 p-6 sm:p-8 bg-[#FFF8F0] vellum torn-edge flex flex-col items-center justify-center shadow-tactile rotate-1 hover:scale-103 hover:rotate-0 transition-all duration-300 cursor-pointer group border border-[#D8B5BD] hover:border-[#B97891]"
          >
            {/* Monogram Seal Top Center */}
            <div className="mb-2 group-hover:scale-110 transition-transform">
              <MonogramAvatar size="md" />
            </div>

            {/* Subtitle kicker */}
            <span className="font-accent-handwritten text-[#B97891] text-base sm:text-lg text-center leading-tight">
              a little archive of things I've built, broken, and learned
            </span>

            {/* Primary Site Title */}
            <h1 className="font-display-lg text-3xl sm:text-5xl text-[#805365] font-bold tracking-tight text-center my-1">
              Ishana's Portfolio
            </h1>

            {/* Academic description */}
            <p className="font-label-sm text-[11px] sm:text-xs text-[#44343B]/80 text-center leading-normal max-w-xs mt-1">
              B.Tech Electronics & Telecommunications Engineering
              <br />
              <span className="text-[#805365] font-medium">MKSSS Cummins College of Engineering for Women, Pune</span>
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
                className="px-2.5 py-1 bg-[#F8D7E2] hover:bg-[#F2BFCF] text-[#805365] rounded-xs text-[10px] font-label-sm border border-[#D8B5BD] uppercase tracking-wider transition-colors cursor-pointer"
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
                className="px-2.5 py-1 bg-[#F5EBCB] hover:bg-[#F8D7E2] text-[#44343B] rounded-xs text-[10px] font-label-sm border border-[#D8B5BD] uppercase tracking-wider transition-colors cursor-pointer"
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
                className="px-2.5 py-1 bg-[#DDE4C5] hover:bg-[#F8D7E2] text-[#44343B] rounded-xs text-[10px] font-label-sm border border-[#D8B5BD] uppercase tracking-wider transition-colors cursor-pointer"
              >
                Experimenting
              </button>
            </div>

            {/* Washi Tape Scraps on Title Card */}
            <div className="absolute -top-2 left-1/4 w-12 h-4 bg-[#F5EBCB] opacity-80 rotate-[-5deg] border border-[#B97891]/40 washi-tape-strip" />
            <div className="absolute -bottom-2 right-1/4 w-16 h-5 bg-[#F2BFCF] opacity-80 rotate-[6deg] border border-[#B97891]/40 washi-tape-strip" />
          </div>

          {/* Actions Bar */}
          <div className="flex items-center gap-3 mt-6 z-20">
            <button
              onClick={() => {
                playPageFlipSound();
                onOpen();
              }}
              className="px-5 py-2.5 bg-[#805365] hover:bg-[#683f50] text-white rounded-sm font-label-sm text-xs tracking-wider uppercase shadow-tactile hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2 border border-[#B97891]"
            >
              <span className="material-symbols-outlined text-base">auto_stories</span>
              <span>Open Journal</span>
            </button>

            <button
              onClick={() => {
                playTactileClick();
                onOpenPageMap();
              }}
              className="px-4 py-2.5 bg-[#FFF8F0] hover:bg-[#F8D7E2] text-[#805365] rounded-sm font-label-sm text-xs tracking-wider uppercase shadow-2xs border border-[#D8B5BD] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">menu_book</span>
              <span>Explore Index</span>
            </button>
          </div>

          {/* Interactive Sticker Easter Egg: "currently figuring things out" */}
          <button
            onClick={() => {
              playTactileClick();
              onNavigate('secret');
            }}
            title="Secret sticker · Click to peek into the secret pocket"
            className="absolute bottom-6 left-14 sm:left-20 px-3 py-1 bg-[#F5EBCB] text-[#44343B] rounded-full border border-dashed border-[#B97891] shadow-2xs font-accent-handwritten text-base rotate-[-6deg] hover:rotate-0 hover:scale-105 transition-all cursor-pointer"
          >
            ★ currently figuring things out ✦
          </button>
        </div>

        {/* Side Tabs mounted on right edge */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full flex flex-col gap-3 z-10 pointer-events-auto pr-6 sm:pr-8">
          <button
            onClick={() => {
              playPageFlipSound();
              onNavigate('about');
            }}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#F8D7E2] text-[#805365] rounded-r-md shadow-tactile border border-l-0 border-[#D8B5BD] font-accent-handwritten rotate-2 hover:translate-x-2 transition-transform origin-left text-sm cursor-pointer font-bold"
          >
            About Me
          </button>
          <button
            onClick={() => {
              playPageFlipSound();
              onNavigate('projects');
            }}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#DDE4C5] text-[#44343B] rounded-r-md shadow-tactile border border-l-0 border-[#D8B5BD] font-accent-handwritten -rotate-1 hover:translate-x-2 transition-transform origin-left text-sm cursor-pointer font-bold"
          >
            Projects
          </button>
          <button
            onClick={() => {
              playPageFlipSound();
              onNavigate('coding');
            }}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#F5EBCB] text-[#44343B] rounded-r-md shadow-tactile border border-l-0 border-[#D8B5BD] font-accent-handwritten rotate-1 hover:translate-x-2 transition-transform origin-left text-sm cursor-pointer font-bold"
          >
            Coding & CP
          </button>
          <button
            onClick={() => {
              playPageFlipSound();
              onNavigate('achievements');
            }}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#F2BFCF] text-[#805365] rounded-r-md shadow-tactile border border-l-0 border-[#D8B5BD] font-accent-handwritten -rotate-2 hover:translate-x-2 transition-transform origin-left text-sm cursor-pointer font-bold"
          >
            Trophy Drawer
          </button>
          <button
            onClick={() => {
              playPageFlipSound();
              onNavigate('experiments');
            }}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#ED9BB8] text-[#44343B] rounded-r-md shadow-tactile border border-l-0 border-[#D8B5BD] font-accent-handwritten rotate-2 hover:translate-x-2 transition-transform origin-left text-sm cursor-pointer font-bold"
          >
            Experiments
          </button>
          <button
            onClick={() => {
              playPageFlipSound();
              onNavigate('contact');
            }}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#F8D7E2] text-[#805365] rounded-r-md shadow-tactile border border-l-0 border-[#D8B5BD] font-accent-handwritten -rotate-1 hover:translate-x-2 transition-transform origin-left text-sm cursor-pointer font-bold"
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};
