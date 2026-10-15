import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import { PAGE_MAP } from '../utils/pageMap';
import { playPageFlipSound, playTactileClick } from '../utils/audio';

interface PageMapModalProps {
  isOpen: boolean;
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onClose: () => void;
}

export const PageMapModal: React.FC<PageMapModalProps> = ({
  isOpen,
  currentPage,
  onNavigate,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-[#1f1b11]/70 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Table of Contents"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full bg-[#FFF8F0] p-6 sm:p-10 rounded-sm shadow-tactile-heavy torn-edge border-2 border-[#D8B5BD] max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close directory"
              className="absolute top-4 right-4 p-1.5 text-[#805365] hover:text-[#44343B] rounded-full hover:bg-[#F8D7E2] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            {/* Washi Tape Header */}
            <div className="w-32 h-6 bg-[#F2BFCF] mx-auto -mt-12 mb-4 rotate-[-1deg] shadow-xs washi-tape-strip border-y border-[#B97891]/50" />

            <div className="text-center mb-6 border-b border-[#D8B5BD] pb-4">
              <span className="font-label-sm text-xs text-[#805365] tracking-widest uppercase block font-bold">
                Portfolio Index · Ishana Datta
              </span>
              <h2 className="font-display-lg text-3xl sm:text-4xl text-[#805365] font-bold tracking-tight mt-1">
                Table of Contents
              </h2>
              <p className="font-accent-handwritten text-lg text-[#B97891] mt-1">
                Explore the project case studies, algorithms, and experiments by Ishana Datta
              </p>
            </div>

            {/* Miniature Spread Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {PAGE_MAP.map((page) => {
                const isCurrent = currentPage === page.id;
                return (
                  <motion.div
                    key={page.id}
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      playPageFlipSound();
                      onNavigate(page.id);
                      onClose();
                    }}
                    className={`p-3.5 rounded-xs border transition-all duration-300 cursor-pointer flex flex-col justify-between relative group shadow-xs hover:shadow-lifted ${
                      isCurrent
                        ? 'bg-[#FFFEFC] border-[#805365] shadow-tactile ring-2 ring-[#805365]/30'
                        : 'bg-[#FFF8F0] border-[#D8B5BD] hover:bg-[#FFFEFC]'
                    }`}
                  >
                    {/* Ribbon Tag */}
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`px-2 py-0.5 rounded-xs text-[10px] font-label-sm uppercase tracking-wider font-semibold border border-[#D8B5BD] ${page.tabColor} ${page.tabTextColor}`}
                      >
                        {page.spreadLabel}
                      </span>
                      {isCurrent && (
                        <span className="text-[10px] font-accent-handwritten text-[#805365] font-bold">
                          ● Active
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-display-lg text-base text-[#805365] font-bold leading-snug group-hover:text-[#44343B] transition-colors">
                        {page.title}
                      </h3>
                      <p className="font-body-md text-[11px] text-[#44343B]/80 mt-1 line-clamp-2 leading-relaxed">
                        {page.subtitle}
                      </p>
                    </div>

                    <div className="mt-3 pt-2 border-t border-[#D8B5BD] flex items-center justify-between text-xs font-accent-handwritten text-[#805365]">
                      <span>Turn to page</span>
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t border-[#D8B5BD] flex justify-between items-center text-xs font-label-sm text-[#805365]">
              <span>Tip: Use keyboard ← → arrow keys to flip spreads</span>
              <button
                onClick={() => {
                  playTactileClick();
                  onClose();
                }}
                className="px-4 py-1.5 bg-[#F8D7E2] hover:bg-[#F2BFCF] rounded-xs text-[#805365] border border-[#D8B5BD] cursor-pointer font-semibold"
              >
                Close Directory
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
