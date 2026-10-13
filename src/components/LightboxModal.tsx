import React, { useState } from 'react';
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

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#1f1b11]/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-xl w-full bg-[#ffffff] p-6 sm:p-8 rounded-sm shadow-tactile-heavy torn-edge border border-[#d2c3c4]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 text-[#807475] hover:text-[#1f1b11] rounded-full hover:bg-[#ebe2d0] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {/* Washi Tape Header */}
        <div className="w-28 h-6 bg-[#fadadd]/90 mx-auto -mt-10 mb-4 rotate-[-2deg] shadow-xs washi-tape-strip border-y border-[#d2c3c4]/40" />

        {!flipped ? (
          <div>
            <div className="w-full max-h-[60vh] overflow-hidden bg-[#ebe2d0] rounded-xs shadow-inner flex items-center justify-center mb-4">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-auto max-h-[60vh] object-contain mix-blend-multiply"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-[#d2c3c4]/40">
              <div>
                <h3 className="font-display-lg text-xl sm:text-2xl text-[#70585b] font-normal">
                  {title}
                </h3>
                {note && (
                  <p className="font-accent-handwritten text-lg text-[#60603e] mt-0.5">
                    {note}
                  </p>
                )}
              </div>
              <button
                onClick={() => {
                  playTactileClick();
                  setFlipped(true);
                }}
                className="px-3 py-1.5 bg-[#f6eddb] hover:bg-[#ebe2d0] text-[#70585b] font-label-sm text-xs rounded-sm border border-[#d2c3c4] flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">sync</span>
                <span>Flip Back</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="min-h-[350px] bg-[#fcf3e1] p-6 rounded-xs border border-[#e2d9c8] flex flex-col justify-between">
            <div>
              <span className="font-label-sm text-xs text-[#807475] tracking-widest uppercase block mb-3">
                Archival Inscription · Reverse Side
              </span>
              <p className="font-accent-handwritten text-2xl text-[#1f1b11] leading-relaxed mb-4">
                "{note || 'Archived specimen preserved in Creatrix Journal Volume 2024.'}"
              </p>
              <div className="space-y-1 font-label-sm text-xs text-[#807475]">
                <p>Curator: Ishana</p>
                <p>Location: Atelier Archives</p>
                <p>Condition: Naturally preserved under cold-press vellum</p>
              </div>
            </div>
            <div className="pt-4 border-t border-[#d2c3c4]/40 flex justify-end">
              <button
                onClick={() => {
                  playTactileClick();
                  setFlipped(false);
                }}
                className="px-3 py-1.5 bg-[#fadadd] text-[#765e61] font-label-sm text-xs rounded-sm border border-[#d2c3c4] flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">arrow_back</span>
                <span>View Front</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
