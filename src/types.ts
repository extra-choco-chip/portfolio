export type PageId =
  | 'cover'
  | 'about'
  | 'projects'
  | 'coding'
  | 'achievements'
  | 'experiments'
  | 'journey'
  | 'contact'
  | 'secret';

export interface PageMetadata {
  id: PageId;
  title: string;
  subtitle: string;
  spreadNumber: number;
  spreadLabel: string;
  tabColor: string;
  tabTextColor: string;
  icon: string;
}

export interface ScrapItem {
  id: string;
  type: 'polaroid' | 'note' | 'botanical' | 'stamp';
  title: string;
  date?: string;
  content?: string;
  imageUrl?: string;
  rotation?: number;
  position?: { x: number; y: number };
}

export interface GuestbookEntry {
  id: string;
  name: string;
  location: string;
  date: string;
  message: string;
  topic?: string;
  stampType: 'lavender' | 'butterfly' | 'rose';
  sealColor: string;
}
