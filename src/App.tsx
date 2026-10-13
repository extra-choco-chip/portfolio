import React, { useState, useEffect } from 'react';
import { PageId, ScrapItem, GuestbookEntry } from './types';
import { Project } from './data/portfolioData';
import { TopNav } from './components/TopNav';
import { Sidebar } from './components/Sidebar';
import { CoverScreen } from './components/CoverScreen';
import { AboutScreen } from './components/AboutScreen';
import { ProjectsScreen } from './components/ProjectsScreen';
import { CodingScreen } from './components/CodingScreen';
import { AchievementsScreen } from './components/AchievementsScreen';
import { ExperimentsScreen } from './components/ExperimentsScreen';
import { JourneyScreen } from './components/JourneyScreen';
import { ContactScreen } from './components/ContactScreen';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { SecretPocketModal } from './components/SecretPocketModal';
import { LightboxModal } from './components/LightboxModal';
import { AddMemoryModal } from './components/AddMemoryModal';
import { PageMapModal } from './components/PageMapModal';
import { SpreadNavigator } from './components/SpreadNavigator';
import { MobileBottomNav } from './components/MobileBottomNav';
import { playPageFlipSound, playTactileClick } from './utils/audio';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('cover');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isPageMapOpen, setIsPageMapOpen] = useState(false);
  const [candlelightMode, setCandlelightMode] = useState(false);

  // Selected project for detailed dossier modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Secret sticker / easter egg pocket modal
  const [isSecretOpen, setIsSecretOpen] = useState(false);

  // Lightbox Modal state
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    imageUrl: string;
    title: string;
    note?: string;
  }>({
    isOpen: false,
    imageUrl: '',
    title: '',
  });

  // Add Memory Modal state
  const [isAddMemoryOpen, setIsAddMemoryOpen] = useState(false);
  const [userScraps, setUserScraps] = useState<ScrapItem[]>([]);

  // Genuine visitor guestbook entries (starts empty per user instructions)
  const [guestbookEntries, setGuestbookEntries] = useState<GuestbookEntry[]>([]);

  // Page Flip Navigation Handler
  const handleNavigate = (targetPage: PageId) => {
    if (targetPage === 'secret') {
      setIsSecretOpen(true);
      return;
    }

    if (targetPage === currentPage) return;
    setIsFlipping(true);
    playPageFlipSound();

    setTimeout(() => {
      setCurrentPage(targetPage);
      setIsFlipping(false);
    }, 280);
  };

  const handleOpenLightbox = (imageUrl: string, title: string, note?: string) => {
    setLightbox({
      isOpen: true,
      imageUrl,
      title,
      note,
    });
  };

  const handleAddScrap = (scrap: ScrapItem) => {
    setUserScraps((prev) => [scrap, ...prev]);
  };

  const handleAddGuestbookEntry = (entry: Omit<GuestbookEntry, 'id' | 'date'>) => {
    const newEntry: GuestbookEntry = {
      ...entry,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
    };
    setGuestbookEntries((prev) => [newEntry, ...prev]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightbox((prev) => ({ ...prev, isOpen: false }));
        setSelectedProject(null);
        setIsSecretOpen(false);
        setIsAddMemoryOpen(false);
        setIsPageMapOpen(false);
        return;
      }

      const pages: PageId[] = [
        'cover',
        'about',
        'projects',
        'coding',
        'achievements',
        'experiments',
        'journey',
        'contact',
      ];
      const currentIndex = pages.indexOf(currentPage);

      if (e.key === 'ArrowRight' && currentIndex < pages.length - 1) {
        handleNavigate(pages[currentIndex + 1]);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        handleNavigate(pages[currentIndex - 1]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  return (
    <div
      className={`min-h-screen text-[#1f1b11] font-body-md flex flex-col relative selection:bg-[#fadadd] selection:text-[#765e61] overflow-x-hidden transition-colors duration-700 ${
        candlelightMode ? 'bg-[#f4ebd8]' : 'bg-[#fff8f0]'
      }`}
    >
      {/* Candlelight Ambient Glow Overlay */}
      {candlelightMode && (
        <div className="fixed inset-0 pointer-events-none bg-gradient-to-t from-amber-600/10 via-amber-400/5 to-transparent z-30 mix-blend-multiply" />
      )}

      {/* Top Navigation Bar */}
      <TopNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => {
          playTactileClick();
          setSidebarOpen(!sidebarOpen);
        }}
        onOpenAddMemory={() => setIsAddMemoryOpen(true)}
        onOpenPageMap={() => setIsPageMapOpen(true)}
        candlelightMode={candlelightMode}
        onToggleCandlelight={() => setCandlelightMode(!candlelightMode)}
      />

      {/* Slide-out Sidebar Drawer */}
      <Sidebar
        isOpen={sidebarOpen}
        currentPage={currentPage}
        onNavigate={(page) => {
          handleNavigate(page);
          if (window.innerWidth < 768) {
            setSidebarOpen(false);
          }
        }}
        onClose={() => setSidebarOpen(false)}
        onOpenAddMemory={() => setIsAddMemoryOpen(true)}
      />

      {/* Main Content Area */}
      <main
        className={`flex-grow flex flex-col items-center justify-center p-3 sm:p-6 md:p-12 pb-28 md:pb-16 relative transition-all duration-500 ${
          sidebarOpen ? 'md:ml-72' : ''
        }`}
      >
        {/* Soft Background Warm Shadow & Ambient Desk Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#f6eddb]/30 to-[#e2d9c8]/40 pointer-events-none" />

        {/* User-pinned Scraps Banner if present */}
        {userScraps.length > 0 && currentPage !== 'cover' && (
          <div className="w-full max-w-6xl mb-4 flex flex-wrap gap-3 items-center px-4 z-20">
            <span className="text-xs font-accent-handwritten text-[#805365] italic">
              Pinned to spread:
            </span>
            {userScraps.map((s) => (
              <div
                key={s.id}
                onClick={() => {
                  if (s.imageUrl) handleOpenLightbox(s.imageUrl, s.title, s.content);
                }}
                className="bg-[#ffffff] px-2.5 py-1 rounded-xs shadow-xs border border-[#D8B5BD] flex items-center gap-1.5 text-xs font-accent-handwritten text-[#44343B] hover:scale-105 transition-transform cursor-pointer"
                style={{ transform: `rotate(${s.rotation || 0}deg)` }}
              >
                <span className="text-[10px]">📌</span>
                <span className="font-semibold">{s.title}</span>
                {s.content && (
                  <span className="text-[#805365]/70 truncate max-w-[140px]">· {s.content}</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Page Container with 3D Flip Transition */}
        <div
          className={`w-full flex items-center justify-center transition-all duration-300 transform ${
            isFlipping ? 'opacity-30 scale-98 rotate-y-6' : 'opacity-100 scale-100 rotate-y-0'
          }`}
        >
          {currentPage === 'cover' && (
            <CoverScreen
              onOpen={() => handleNavigate('about')}
              onNavigate={handleNavigate}
              onOpenPageMap={() => setIsPageMapOpen(true)}
            />
          )}

          {currentPage === 'about' && (
            <AboutScreen
              onNavigate={handleNavigate}
              onOpenLightbox={handleOpenLightbox}
            />
          )}

          {currentPage === 'projects' && (
            <ProjectsScreen
              onNavigate={handleNavigate}
              onOpenProjectDetail={(project) => setSelectedProject(project)}
            />
          )}

          {currentPage === 'coding' && (
            <CodingScreen onNavigate={handleNavigate} />
          )}

          {currentPage === 'achievements' && (
            <AchievementsScreen onNavigate={handleNavigate} />
          )}

          {currentPage === 'experiments' && (
            <ExperimentsScreen onNavigate={handleNavigate} />
          )}

          {currentPage === 'journey' && (
            <JourneyScreen onNavigate={handleNavigate} />
          )}

          {currentPage === 'contact' && (
            <ContactScreen
              onNavigate={handleNavigate}
              entries={guestbookEntries}
              onAddEntry={handleAddGuestbookEntry}
            />
          )}
        </div>

        {/* Spread Navigation Bar (Prev / Next & Page Map) */}
        <SpreadNavigator
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenPageMap={() => setIsPageMapOpen(true)}
        />
      </main>

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Secret Pocket Modal */}
      <SecretPocketModal
        isOpen={isSecretOpen}
        onClose={() => setIsSecretOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Page Map & Table of Contents Modal */}
      <PageMapModal
        isOpen={isPageMapOpen}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onClose={() => setIsPageMapOpen(false)}
      />

      {/* Lightbox Inspection Modal */}
      <LightboxModal
        isOpen={lightbox.isOpen}
        imageUrl={lightbox.imageUrl}
        title={lightbox.title}
        note={lightbox.note}
        onClose={() => setLightbox((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Add Memory Modal */}
      <AddMemoryModal
        isOpen={isAddMemoryOpen}
        onClose={() => setIsAddMemoryOpen(false)}
        onAddScrap={handleAddScrap}
      />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenAddMemory={() => setIsAddMemoryOpen(true)}
      />
    </div>
  );
}
