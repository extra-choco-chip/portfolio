import React from 'react';
import { PageId } from '../types';
import { playTactileClick } from '../utils/audio';

interface SecretPocketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
}

export const SecretPocketModal: React.FC<SecretPocketModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#1f1b11]/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-lg w-full bg-[#FFF8F0] p-6 sm:p-8 rounded-sm shadow-tactile-heavy torn-edge border-2 border-[#D8B5BD] text-[#44343B]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-[#805365] hover:text-[#44343B] rounded-full hover:bg-[#F8D7E2] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        <div className="w-28 h-5 bg-[#F5EBCB] mx-auto -mt-10 mb-4 rotate-[-1deg] shadow-xs washi-tape-strip border-y border-[#B97891]/50" />

        <div className="text-center mb-4">
          <span className="font-label-sm text-[10px] text-[#805365] uppercase tracking-widest font-bold block">
            Hidden Envelope In The Journal Spine
          </span>
          <h3 className="font-display-lg text-2xl text-[#805365] font-bold mt-1">
            "Currently Figuring Things Out"
          </h3>
          <p className="font-accent-handwritten text-base text-[#B97891]">
            A private note on what it really feels like to be an engineering student
          </p>
        </div>

        <div className="space-y-3 font-body-md text-xs sm:text-sm text-[#44343B] leading-relaxed bg-[#FFFEFC] p-4 rounded-xs border border-[#D8B5BD]">
          <p>
            If you clicked this sticker, you found the quietest pocket of my journal.
          </p>
          <p>
            People often think competitive programmers or engineering students have their whole trajectory mapped out in clean asymptotic curves. In reality, most days involve getting stuck on test case 47, wondering why a pointer isn't behaving, or balancing signal processing lab reports with algorithmic problem sets.
          </p>
          <p>
            This portfolio is my way of saying: <span className="text-[#805365] font-bold">you can care deeply about technical excellence and still love soft pink ink, pressed flowers, and handcrafted interfaces.</span>
          </p>
        </div>

        <div className="mt-5 pt-3 border-t border-[#D8B5BD] flex items-center justify-between">
          <span className="font-accent-handwritten text-base text-[#805365]">
            — Ishana, Pune
          </span>
          <button
            onClick={() => {
              playTactileClick();
              onClose();
              onNavigate('projects');
            }}
            className="px-4 py-1.5 bg-[#805365] text-white rounded-xs text-xs font-label-sm uppercase tracking-wider hover:bg-[#683f50] cursor-pointer"
          >
            Explore Projects
          </button>
        </div>
      </div>
    </div>
  );
};
