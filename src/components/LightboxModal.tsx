import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { playTactileClick } from '../utils/audio';

interface LightboxModalProps {
  isOpen: boolean;
  imageUrl: string;
  title: string;
  note?: string;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  imageUrl,
  title,
  note,
  onClose,
}) => {
  const [flipped, setFlipped] = useState(false);

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
          aria-label={title || "Preserved Artifact Inspection"}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-xl w-full bg-[#FFF8F0] p-6 sm:p-8 rounded-sm shadow-tactile-heavy torn-edge border-2 border-[#D8B5BD]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close specimen viewer"
              className="absolute top-3 right-3 p-1.5 text-[#805365] hover:text-[#44343B] rounded-full hover:bg-[#F8D7E2] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            {/* Washi Tape Header */}
            <div className="w-28 h-6 bg-[#F2BFCF] mx-auto -mt-10 mb-4 rotate-[-2deg] shadow-xs washi-tape-strip border-y border-[#B97891]/40" />

            {!flipped ? (
              <div>
                <div className="w-full max-h-[60vh] overflow-hidden bg-[#FFF8F0] rounded-xs shadow-inner flex items-center justify-center mb-4 border border-[#D8B5BD]">
                  <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-auto max-h-[60vh] object-contain rounded-xs"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-[#D8B5BD]">
                  <div>
                    <h3 className="font-display-lg text-xl sm:text-2xl text-[#805365] font-bold">
                      {title}
                    </h3>
                    {note && (
                      <p className="font-accent-handwritten text-lg text-[#B97891] mt-0.5">
                        {note}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      playTactileClick();
                      setFlipped(true);
                    }}
                    className="px-3 py-1.5 bg-[#FFF8F0] hover:bg-[#F8D7E2] text-[#805365] font-label-sm text-xs rounded-sm border border-[#D8B5BD] flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">sync</span>
                    <span>Flip Card</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="min-h-[350px] bg-[#FFFEFC] p-6 rounded-xs border border-[#D8B5BD] flex flex-col justify-between">
                <div>
                  <span className="font-label-sm text-xs text-[#805365] tracking-widest uppercase block mb-3 font-bold">
                    Archival Inscription · Reverse Side
                  </span>
                  <p className="font-accent-handwritten text-2xl text-[#44343B] leading-relaxed mb-4">
                    "{note || 'Archived specimen preserved in Ishana Datta Portfolio & Journal.'}"
                  </p>
                  <div className="space-y-1 font-label-sm text-xs text-[#805365]/80">
                    <p>Curator: Ishana Datta</p>
                    <p>Origin: Pune, India</p>
                    <p>Preservation: Handcrafted digital junk journal</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-[#D8B5BD] flex justify-end">
                  <button
                    onClick={() => {
                      playTactileClick();
                      setFlipped(false);
                    }}
                    className="px-3 py-1.5 bg-[#F8D7E2] text-[#805365] font-label-sm text-xs rounded-sm border border-[#D8B5BD] flex items-center gap-1.5 cursor-pointer hover:bg-[#F2BFCF] shadow-xs"
                  >
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    <span>View Front</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
