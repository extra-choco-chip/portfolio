import { PageId, PageMetadata } from '../types';

export const PAGE_MAP: PageMetadata[] = [
  {
    id: 'cover',
    title: 'Journal Cover',
    subtitle: "Ishana's Portfolio · B.Tech E&TC Student & Programmer",
    spreadNumber: 0,
    spreadLabel: 'Cover',
    tabColor: 'bg-[#F2BFCF]',
    tabTextColor: 'text-[#805365]',
    icon: 'book',
  },
  {
    id: 'about',
    title: 'About Me',
    subtitle: 'The Owner’s Notes · Education, Interests & Field Guide',
    spreadNumber: 1,
    spreadLabel: 'Spread 01–02',
    tabColor: 'bg-[#F8D7E2]',
    tabTextColor: 'text-[#805365]',
    icon: 'person',
  },
  {
    id: 'projects',
    title: 'Project Herbarium',
    subtitle: 'Curated Case Studies · RayCtify, Prototypes & Software',
    spreadNumber: 2,
    spreadLabel: 'Spread 03–04',
    tabColor: 'bg-[#DDE4C5]',
    tabTextColor: 'text-[#44343B]',
    icon: 'folder_open',
  },
  {
    id: 'coding',
    title: 'The Codex: Coding & CP',
    subtitle: 'Competitive Programming, Algorithms, C++ & Debug Diary',
    spreadNumber: 3,
    spreadLabel: 'Spread 05–06',
    tabColor: 'bg-[#F5EBCB]',
    tabTextColor: 'text-[#44343B]',
    icon: 'terminal',
  },
  {
    id: 'achievements',
    title: 'The Trophy Drawer',
    subtitle: 'Algorithmia 2nd Place & College Milestones',
    spreadNumber: 4,
    spreadLabel: 'Spread 07–08',
    tabColor: 'bg-[#F2BFCF]',
    tabTextColor: 'text-[#805365]',
    icon: 'emoji_events',
  },
  {
    id: 'experiments',
    title: 'The Experimental Desk',
    subtitle: 'Playful Corner · Idea Jar, Moodboard & Fortunes',
    spreadNumber: 5,
    spreadLabel: 'Spread 09–10',
    tabColor: 'bg-[#ED9BB8]',
    tabTextColor: 'text-[#44343B]',
    icon: 'auto_fix_high',
  },
  {
    id: 'journey',
    title: 'Growth Journal',
    subtitle: 'Timeline of Learning, Projects & Current Notebook',
    spreadNumber: 6,
    spreadLabel: 'Spread 11–12',
    tabColor: 'bg-[#DDE4C5]',
    tabTextColor: 'text-[#44343B]',
    icon: 'history_edu',
  },
  {
    id: 'contact',
    title: 'Letters & Guestbook',
    subtitle: 'Send a Note to Ishana & Read Visitor Letters',
    spreadNumber: 7,
    spreadLabel: 'Spread 13–14',
    tabColor: 'bg-[#F8D7E2]',
    tabTextColor: 'text-[#805365]',
    icon: 'mail',
  },
];

export function getPageMetadata(pageId: PageId): PageMetadata {
  return PAGE_MAP.find((p) => p.id === pageId) || PAGE_MAP[0];
}

export function getAdjacentPages(currentPage: PageId): {
  prev: PageMetadata | null;
  next: PageMetadata | null;
} {
  const index = PAGE_MAP.findIndex((p) => p.id === currentPage);
  return {
    prev: index > 0 ? PAGE_MAP[index - 1] : null,
    next: index < PAGE_MAP.length - 1 ? PAGE_MAP[index + 1] : null,
  };
}
