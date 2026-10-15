import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrapItem } from '../types';
import { playStampSound, playTactileClick } from '../utils/audio';

interface AddMemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddScrap: (scrap: ScrapItem) => void;
}

export const AddMemoryModal: React.FC<AddMemoryModalProps> = ({
  isOpen,
  onClose,
  onAddScrap,
}) => {
  const [type, setType] = useState<'polaroid' | 'note' | 'botanical'>('note');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    playStampSound();
    onAddScrap({
      id: Date.now().toString(),
      type,
      title: title.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      content: content.trim(),
      rotation: Math.floor(Math.random() * 8) - 4,
    });

    setTitle('');
    setContent('');
    onClose();
  };

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
          aria-label="Pin a Scrap to Spread"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-md w-full bg-[#FFF8F0] p-6 sm:p-8 rounded-sm shadow-tactile-heavy torn-edge border-2 border-[#D8B5BD]"
          >
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 p-1 text-[#805365] hover:text-[#44343B] rounded-full hover:bg-[#F8D7E2] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            <div className="w-24 h-5 bg-[#F5EBCB] mx-auto -mt-10 mb-4 rotate-1 shadow-xs washi-tape-strip border-y border-[#B97891]/50" />

            <div className="text-center mb-5">
              <span className="font-label-sm text-xs text-[#805365] tracking-widest uppercase block font-bold">
                Interactive Scrapbook
              </span>
              <h3 className="font-display-lg text-2xl text-[#805365] font-bold mt-0.5">
                Pin a Scrap to Spread
              </h3>
              <p className="font-accent-handwritten text-base text-[#B97891]">
                Add a personal reminder, code idea, or reflection
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Scrap Type selector */}
              <div>
                <label className="block text-xs font-label-sm uppercase tracking-wider text-[#805365] font-bold mb-1.5">
                  Scrap Style:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      playTactileClick();
                      setType('note');
                    }}
                    className={`py-1.5 px-2 rounded-xs text-xs font-accent-handwritten text-sm border transition-all cursor-pointer ${
                      type === 'note'
                        ? 'bg-[#F5EBCB] text-[#44343B] border-[#805365] font-bold shadow-xs'
                        : 'bg-[#FFFEFC] text-[#44343B] border-[#D8B5BD]'
                    }`}
                  >
                    📝 Vellum Note
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playTactileClick();
                      setType('polaroid');
                    }}
                    className={`py-1.5 px-2 rounded-xs text-xs font-accent-handwritten text-sm border transition-all cursor-pointer ${
                      type === 'polaroid'
                        ? 'bg-[#F2BFCF] text-[#805365] border-[#805365] font-bold shadow-xs'
                        : 'bg-[#FFFEFC] text-[#44343B] border-[#D8B5BD]'
                    }`}
                  >
                    📌 Card Memo
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playTactileClick();
                      setType('botanical');
                    }}
                    className={`py-1.5 px-2 rounded-xs text-xs font-accent-handwritten text-sm border transition-all cursor-pointer ${
                      type === 'botanical'
                        ? 'bg-[#DDE4C5] text-[#44343B] border-[#805365] font-bold shadow-xs'
                        : 'bg-[#FFFEFC] text-[#44343B] border-[#D8B5BD]'
                    }`}
                  >
                    🌸 Herbarium Tag
                  </button>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-label-sm uppercase tracking-wider text-[#805365] font-bold mb-1">
                  Title or Label:
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Graph BFS Traversal Insight"
                  className="w-full bg-[#FFFEFC] border border-[#D8B5BD] rounded-xs p-2 text-xs font-body-md text-[#44343B] focus:border-[#805365] focus:outline-hidden"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-xs font-label-sm uppercase tracking-wider text-[#805365] font-bold mb-1">
                  Note Content:
                </label>
                <textarea
                  rows={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write a quick thought, test case reminder, or link..."
                  className="w-full bg-[#FFFEFC] border border-[#D8B5BD] rounded-xs p-2 text-xs font-body-md text-[#44343B] focus:border-[#805365] focus:outline-hidden resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#805365] hover:bg-[#683f50] text-[#FFFEFC] font-label-sm text-xs tracking-wider uppercase rounded-xs shadow-tactile transition-transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">push_pin</span>
                  <span>Pin to Spread</span>
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
