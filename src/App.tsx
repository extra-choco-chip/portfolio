import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
import { BotanicalPetalsCanvas } from './components/BotanicalPetalsCanvas';
import { playPageFlipSound, playTactileClick } from './utils/audio';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('cover');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isPageMapOpen, setIsPageMapOpen] = useState(false);
  const [candlelightMode, setCandlelightMode] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoading(false), 550);
    return () => clearTimeout(timer);
  }, []);

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

  // User scraps with LocalStorage persistence
  const [userScraps, setUserScraps] = useState<ScrapItem[]>(() => {
    try {
      const saved = localStorage.getItem('ishana_journal_scraps');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Genuine visitor guestbook entries with LocalStorage persistence
  const [guestbookEntries, setGuestbookEntries] = useState<GuestbookEntry[]>(() => {
    try {
      const saved = localStorage.getItem('ishana_journal_guestbook');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ishana_journal_scraps', JSON.stringify(userScraps));
    } catch {
      // storage unavailable
    }
  }, [userScraps]);

  useEffect(() => {
    try {
      localStorage.setItem('ishana_journal_guestbook', JSON.stringify(guestbookEntries));
    } catch {
      // storage unavailable
    }
  }, [guestbookEntries]);

  // Page Flip Navigation Handler
  const handleNavigate = (targetPage: PageId) => {
    if (targetPage === 'secret') {
      setIsSecretOpen(true);
      return;
    }

    if (targetPage === currentPage) return;
    setIsFlipping(true);
    playPageFlipSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });

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
      {/* Branded Journal Loading Screen */}
      <AnimatePresence>
        {initialLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-[#FFF8F0] flex flex-col items-center justify-center pointer-events-none"
            aria-live="polite"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.05, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#F8D7E2] to-[#ED9BB8] border-2 border-[#805365] flex items-center justify-center shadow-tactile mb-3">
                <span className="font-display-lg text-2xl font-bold text-[#805365]">ID</span>
              </div>
              <h2 className="font-display-lg text-xl text-[#805365] font-bold">Ishana's Portfolio</h2>
              <span className="font-accent-handwritten text-base text-[#B97891] mt-0.5">
                Opening the journal...
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Skip to Main Content Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 bg-[#805365] text-white px-4 py-2 rounded-sm shadow-md font-label-sm border border-[#F2BFCF]"
      >
        Skip to main content
      </a>

      {/* Interactive 3D Three.js Botanical Petals & Gold Dust Canvas */}
      <BotanicalPetalsCanvas candlelightMode={candlelightMode} />

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

        {/* Page Container with Smooth Framer Motion Transition */}
        <div id="main-content" className="w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 12, rotateY: -8, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, rotateY: 8, scale: 0.985 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex items-center justify-center journal-page-turn"
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
            </motion.div>
          </AnimatePresence>
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
