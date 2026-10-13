import React, { useState } from 'react';
import { PageId } from '../types';
import { JournalTabs } from './JournalTabs';
import { playTactileClick, playStampSound } from '../utils/audio';

interface ExperimentsScreenProps {
  onNavigate: (page: PageId) => void;
}

export const ExperimentsScreen: React.FC<ExperimentsScreenProps> = ({ onNavigate }) => {
  // Idea Jar State
  const creativePrompts = [
    'Build a micro-app that sonifies Dijkstra’s algorithm using gentle harp notes.',
    'Design an interactive credit risk fairness auditor for non-technical users.',
    'Create a digital tea-timer that visually brews leaves on canvas as time elapses.',
    'Write a C++ CLI tool that parses commit messages into poetic haikus.',
    'Design a physical computing interface where a rotary encoder flips digital journal pages.',
    'Build a peer study group matcher using stable matching algorithms.',
  ];
  const [currentPromptIdx, setCurrentPromptIdx] = useState(0);

  // Tiny Fortune Archive State
  const fortunes = [
    'The bug you are chasing is just one print statement away from confessing.',
    'Your code will compile cleanly, and your test cases will turn emerald green.',
    'Slow craft always wins over hurried noise. Take a deep breath and refactor.',
    'Every difficult problem is just three smaller, simpler problems wearing a trench coat.',
    'A quiet mind writes the cleanest recursion.',
  ];
  const [currentFortuneIdx, setCurrentFortuneIdx] = useState<number | null>(null);

  // Moodboard Shuffle State
  const palettes = [
    { name: 'Ballet & Cocoa', colors: ['#F8D7E2', '#F2BFCF', '#ED9BB8', '#805365', '#44343B'] },
    { name: 'Vintage Herbarium', colors: ['#FFF8F0', '#DDE4C5', '#F5EBCB', '#B97891', '#44343B'] },
    { name: 'Midnight Terminal', colors: ['#44343B', '#805365', '#F8D7E2', '#FFF8F0', '#ED9BB8'] },
  ];
  const [paletteIdx, setPaletteIdx] = useState(0);

  // Sticker Mess State
  const [isMessy, setIsMessy] = useState(false);

  const handleDrawIdea = () => {
    playTactileClick();
    setCurrentPromptIdx((prev) => (prev + 1) % creativePrompts.length);
  };

  const handleOpenFortune = () => {
    playStampSound();
    setCurrentFortuneIdx(Math.floor(Math.random() * fortunes.length));
  };

  const handleShuffleMoodboard = () => {
    playTactileClick();
    setPaletteIdx((prev) => (prev + 1) % palettes.length);
  };

  const toggleMess = () => {
    playTactileClick();
    setIsMessy(!isMessy);
  };

  return (
    <div className="relative w-full max-w-6xl flex flex-col md:flex-row bg-[#FFF8F0] shadow-tactile-heavy rounded-sm torn-edge-soft my-auto border-2 border-[#D8B5BD]">
      {/* Journal Right-edge Tabs */}
      <JournalTabs currentPage="experiments" onNavigate={onNavigate} />

      {/* Book Spine Center Shadow & Stitches */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -ml-4 bg-gradient-to-r from-transparent via-[#44343B]/10 to-transparent z-30 pointer-events-none mix-blend-multiply" />
      <div className="hidden md:flex absolute left-1/2 top-[8%] bottom-[8%] -ml-px w-px bg-[#B97891]/40 z-30 flex-col justify-between items-center py-6 pointer-events-none">
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
      </div>

      {/* Optional Messy Stickers Overlay */}
      {isMessy && (
        <div className="absolute inset-0 pointer-events-none z-30">
          <div className="absolute top-12 left-16 text-2xl rotate-12">🌸</div>
          <div className="absolute bottom-20 left-1/4 text-2xl -rotate-12">✨</div>
          <div className="absolute top-1/3 right-20 text-3xl rotate-45">🎀</div>
          <div className="absolute bottom-16 right-1/3 text-2xl -rotate-6">🪻</div>
          <div className="absolute top-20 right-1/2 text-2xl rotate-[-20deg]">☕</div>
        </div>
      )}

      {/* LEFT PAGE - The Idea Jar & Moodboard Shuffle */}
      <section className="w-full md:w-1/2 min-h-[660px] md:min-h-[740px] p-6 sm:p-10 md:p-12 relative bg-[#FFF8F0] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFFEFC] via-[#FFF8F0] to-[#ED9BB8]/20 rounded-l-sm overflow-hidden z-10 border-b md:border-b-0 md:border-r border-[#D8B5BD] flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="mb-5 pb-2 border-b border-[#D8B5BD]">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-xs text-[#805365] tracking-widest uppercase block font-bold">
                The Experimental Desk · Playful Corner
              </span>
              <button
                onClick={toggleMess}
                className="text-[10px] font-accent-handwritten text-[#805365] bg-[#F8D7E2] px-2 py-0.5 rounded-xs border border-[#D8B5BD] cursor-pointer hover:bg-[#F2BFCF]"
              >
                {isMessy ? '🧹 Clean Desk' : '🎀 Make a Mess'}
              </button>
            </div>
            <h2 className="font-display-lg text-2xl sm:text-3xl text-[#805365] font-bold tracking-tight mt-0.5">
              Interactive Micro-Toys
            </h2>
            <p className="font-accent-handwritten text-base text-[#B97891] mt-0.5">
              Curious digital play, prompts & creative coding experiments
            </p>
          </div>

          {/* Toy 1: The Idea Jar */}
          <div className="p-4 bg-[#FFFEFC] rounded-xs border-2 border-[#B97891] shadow-tactile mb-5 rotate-[-1deg]">
            <div className="flex items-center justify-between mb-2 pb-1 border-b border-dashed border-[#D8B5BD]">
              <span className="font-label-sm text-[10px] text-[#805365] uppercase tracking-wider font-bold">
                ✦ Interaction 01: The Idea Jar
              </span>
              <button
                onClick={handleDrawIdea}
                className="px-2.5 py-1 bg-[#F8D7E2] hover:bg-[#ED9BB8] text-[#805365] font-accent-handwritten text-xs rounded-xs border border-[#D8B5BD] shadow-2xs cursor-pointer flex items-center gap-1 font-bold"
              >
                <span>Draw Prompt</span>
                <span className="material-symbols-outlined text-xs">autorenew</span>
              </button>
            </div>

            <p className="font-accent-handwritten text-xl text-[#44343B] leading-snug my-2 min-h-[50px] flex items-center">
              "{creativePrompts[currentPromptIdx]}"
            </p>

            <span className="text-[10px] font-label-sm text-[#805365]/70 text-right block">
              Prompt #{currentPromptIdx + 1} of {creativePrompts.length}
            </span>
          </div>

          {/* Toy 2: Moodboard Shuffle */}
          <div className="p-4 bg-[#FFFEFC] rounded-xs border border-[#D8B5BD] shadow-xs rotate-[0.5deg]">
            <div className="flex items-center justify-between mb-2 pb-1 border-b border-dashed border-[#D8B5BD]">
              <span className="font-label-sm text-[10px] text-[#805365] uppercase tracking-wider font-bold">
                ✦ Interaction 02: Moodboard Shuffle
              </span>
              <button
                onClick={handleShuffleMoodboard}
                className="px-2.5 py-1 bg-[#F5EBCB] hover:bg-[#F8D7E2] text-[#44343B] font-accent-handwritten text-xs rounded-xs border border-[#D8B5BD] shadow-2xs cursor-pointer flex items-center gap-1"
              >
                <span>Shuffle Palette</span>
                <span className="material-symbols-outlined text-xs">shuffle</span>
              </button>
            </div>

            <span className="font-accent-handwritten text-base text-[#805365] block mb-2 font-bold">
              Palette: {palettes[paletteIdx].name}
            </span>

            <div className="flex gap-2 h-10 rounded-xs overflow-hidden border border-[#D8B5BD] p-1 bg-[#FFF8F0]">
              {palettes[paletteIdx].colors.map((c, i) => (
                <div
                  key={i}
                  style={{ backgroundColor: c }}
                  className="flex-1 rounded-2xs border border-black/10 shadow-inner flex items-end justify-center pb-0.5"
                  title={c}
                >
                  <span className="text-[8px] font-mono text-black/60 bg-white/70 px-0.5 rounded-2xs">
                    {c}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#D8B5BD] flex items-center justify-between text-xs font-label-sm text-[#805365]">
          <span>Every experiment is locally interactive</span>
          <span className="font-accent-handwritten text-sm text-[#B97891]">
            No server calls needed
          </span>
        </div>
      </section>

      {/* RIGHT PAGE - Tiny Fortune Archive & Creative Notes */}
      <section className="w-full md:w-1/2 min-h-[660px] md:min-h-[740px] p-6 sm:p-10 md:p-12 relative bg-[#FFF8F0] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFFEFC] via-[#FFF8F0] to-[#ED9BB8]/20 rounded-r-sm overflow-hidden z-10 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="mb-5 pb-2 border-b border-[#D8B5BD]">
            <span className="font-label-sm text-xs text-[#805365] tracking-widest uppercase block font-bold">
              ✦ Interaction 03
            </span>
            <h3 className="font-display-lg text-xl sm:text-2xl text-[#805365] font-bold">
              Tiny Fortune Archive
            </h3>
            <p className="font-accent-handwritten text-base text-[#B97891] mt-0.5">
              Click the sealed envelope to reveal a gentle developer note
            </p>
          </div>

          {/* Interactive Envelope */}
          <div
            onClick={handleOpenFortune}
            className="p-5 bg-[#FFFEFC] rounded-xs border-2 border-[#D8B5BD] hover:border-[#805365] shadow-tactile text-center cursor-pointer group mb-5 transition-all"
          >
            <div className="w-14 h-14 mx-auto mb-2 rounded-full bg-[#F8D7E2] border border-[#B97891] flex items-center justify-center text-[#805365] group-hover:scale-110 transition-transform shadow-xs">
              <span className="material-symbols-outlined text-3xl">mail</span>
            </div>

            <h4 className="font-display-lg text-lg text-[#805365] font-bold mb-1">
              {currentFortuneIdx !== null ? 'Your Developer Fortune:' : 'Open the Archival Seal'}
            </h4>

            {currentFortuneIdx !== null ? (
              <p className="font-accent-handwritten text-xl text-[#44343B] my-3 p-3 bg-[#FFF8F0] rounded-xs border border-dashed border-[#B97891] animate-fade-in leading-snug">
                "{fortunes[currentFortuneIdx]}"
              </p>
            ) : (
              <p className="font-accent-handwritten text-base text-[#B97891] my-2">
                Click to break the wax seal and draw your note
              </p>
            )}

            <span className="text-[10px] font-label-sm uppercase tracking-wider text-[#805365] bg-[#F8D7E2] px-2.5 py-1 rounded-xs inline-block">
              {currentFortuneIdx !== null ? 'Draw Another Fortune' : 'Break Wax Seal'}
            </span>
          </div>

          {/* Creative Technology Note */}
          <div className="p-4 bg-[#FFF8F0] rounded-xs border border-[#D8B5BD] shadow-2xs">
            <span className="font-label-sm text-[10px] text-[#805365] uppercase tracking-wider font-bold block mb-1">
              Why an Experimental Desk?
            </span>
            <p className="font-body-md text-xs sm:text-sm text-[#44343B] leading-relaxed">
              Engineering is not only about passing test cases; it is also about having the playfulness to build things just to see what happens. These micro-interactions show how code can make people smile.
            </p>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="pt-3 border-t border-[#D8B5BD] flex items-center justify-between text-xs font-label-sm text-[#805365]">
          <span>Filed under Creative Technology</span>
          <button
            onClick={() => onNavigate('journey')}
            className="hover:underline flex items-center gap-1 font-semibold text-[#805365] cursor-pointer"
          >
            <span>Growth Journal & Timeline</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </section>
    </div>
  );
};
