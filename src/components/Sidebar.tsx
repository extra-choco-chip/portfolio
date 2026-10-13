import React from 'react';
import { PageId } from '../types';
import { PAGE_MAP } from '../utils/pageMap';
import { MonogramAvatar } from './MonogramAvatar';
import { playPageFlipSound, playTactileClick } from '../utils/audio';

interface SidebarProps {
  isOpen: boolean;
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onClose: () => void;
  onOpenAddMemory: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  currentPage,
  onNavigate,
  onClose,
  onOpenAddMemory,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 z-40 md:hidden backdrop-blur-2xs transition-opacity"
        />
      )}

      {/* Side Navigation Bar */}
      <aside
        className={`fixed left-0 top-0 h-screen z-50 flex flex-col pt-7 pb-8 bg-[#FFF8F0] border-r-2 border-[#D8B5BD] shadow-tactile-heavy w-72 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          title="Close Navigation Drawer"
          className="absolute top-4 right-4 p-1.5 text-[#805365] hover:text-[#44343B] rounded-full hover:bg-[#F8D7E2] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Profile Card Header */}
        <div
          className="px-6 mb-6 text-center cursor-pointer group"
          onClick={() => {
            onNavigate('cover');
            onClose();
          }}
        >
          <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
            <MonogramAvatar size="xl" />
          </div>
          <h2 className="font-display-lg text-2xl text-[#805365] mb-0.5 font-bold tracking-tight">
            Ishana Datta
          </h2>
          <p className="font-accent-handwritten text-lg text-[#B97891] leading-tight">
            B.Tech E&TC · Cummins College, Pune
          </p>
          <p className="text-[11px] font-label-sm text-[#44343B]/70 mt-1 uppercase tracking-wider">
            Programming · CP · Creative Web
          </p>
        </div>

        {/* Outlined Divider */}
        <div className="mx-6 border-b border-dashed border-[#D8B5BD] mb-4" />

        {/* Navigation Items List */}
        <nav className="flex-1 overflow-y-auto px-4 space-y-1.5">
          {PAGE_MAP.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playPageFlipSound();
                  onNavigate(item.id);
                  if (window.innerWidth < 768) onClose();
                }}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-sm font-label-sm text-xs tracking-wide transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#F2BFCF] text-[#805365] border-[#805365] shadow-xs font-bold rotate-[-0.5deg]'
                    : 'text-[#44343B] hover:text-[#805365] hover:bg-[#F8D7E2] border-transparent'
                }`}
              >
                <span
                  className="material-symbols-outlined text-xl"
                  style={{ fontVariationSettings: `'FILL' ${isActive ? 1 : 0}` }}
                >
                  {item.icon}
                </span>
                <div className="flex flex-col text-left">
                  <span className="leading-tight">{item.title}</span>
                  <span className="text-[9px] text-[#805365]/60 font-accent-handwritten">
                    {item.spreadLabel}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Bottom CTA Button */}
        <div className="px-6 pt-4 border-t border-[#D8B5BD]">
          <button
            onClick={() => {
              playTactileClick();
              onOpenAddMemory();
            }}
            className="w-full py-2.5 bg-[#805365] hover:bg-[#683f50] text-[#FFFEFC] rounded-sm font-label-sm text-xs tracking-wider uppercase shadow-tactile hover:-translate-y-0.5 active:translate-y-0 transition-transform flex items-center justify-center gap-2 cursor-pointer border border-[#B97891]"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>Add a Scrap to Journal</span>
          </button>
        </div>
      </aside>
    </>
  );
};
