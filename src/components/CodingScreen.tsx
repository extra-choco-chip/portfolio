import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PageId } from '../types';
import { JournalTabs } from './JournalTabs';
import {
  ISHANA_PROFILE,
  PROBLEM_SOLVING_ENTRIES,
} from '../data/portfolioData';
import { highlightCppCode } from '../utils/syntaxHighlight';
import { playTactileClick } from '../utils/audio';

interface CodingScreenProps {
  onNavigate: (page: PageId) => void;
}

const DEFAULT_ROADMAP = [
  { task: 'Tree & Graph Traversals (BFS / DFS / Topo Sort)', done: true },
  { task: 'Binary Search over Monotonic Predicates', done: true },
  { task: 'Dynamic Programming (1D & 2D Memoization patterns)', done: true },
  { task: 'Disjoint Set Union (DSU) & Minimum Spanning Tree', done: false },
  { task: 'Segment Tree & Range Query Data Structures', done: false },
  { task: 'Trie structures & String hashing', done: false },
];

export const CodingScreen: React.FC<CodingScreenProps> = ({ onNavigate }) => {
  const [selectedEntry, setSelectedEntry] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);

  // LocalStorage persistence for coding roadmap
  const [roadmap, setRoadmap] = useState(() => {
    try {
      const saved = localStorage.getItem('ishana_journal_roadmap');
      return saved ? JSON.parse(saved) : DEFAULT_ROADMAP;
    } catch {
      return DEFAULT_ROADMAP;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ishana_journal_roadmap', JSON.stringify(roadmap));
    } catch {
      // storage unavailable
    }
  }, [roadmap]);

  const activeProblem = PROBLEM_SOLVING_ENTRIES[selectedEntry];

  const handleCopyCode = () => {
    if (!activeProblem) return;
    navigator.clipboard.writeText(activeProblem.codeSnippet);
    setCopiedCode(true);
    playTactileClick();
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const toggleRoadmap = (idx: number) => {
    playTactileClick();
    setRoadmap((prev: typeof DEFAULT_ROADMAP) =>
      prev.map((item, i) => (i === idx ? { ...item, done: !item.done } : item))
    );
  };

  const skillProficiency = [
    { name: 'C++ / STL', level: 90, tag: 'Daily driver in CP' },
    { name: 'Algorithms & Graphs', level: 85, tag: 'ICPC style problems' },
    { name: 'Data Structures', level: 85, tag: 'Trees, DP, Greedy' },
    { name: 'Frontend / React', level: 80, tag: 'Tailwind, TS, Motion' },
  ];

  return (
    <div className="relative w-full max-w-6xl flex flex-col md:flex-row bg-[#FFF8F0] shadow-tactile-heavy rounded-sm torn-edge-soft my-auto border-2 border-[#D8B5BD]">
      {/* Journal Right-edge Tabs */}
      <JournalTabs currentPage="coding" onNavigate={onNavigate} />

      {/* Book Spine Center Shadow & Stitches */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-8 -ml-4 bg-gradient-to-r from-transparent via-[#44343B]/10 to-transparent z-30 pointer-events-none mix-blend-multiply" />
      <div className="hidden md:flex absolute left-1/2 top-[8%] bottom-[8%] -ml-px w-px bg-[#B97891]/40 z-30 flex-col justify-between items-center py-6 pointer-events-none">
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
        <div className="w-3 h-0.5 bg-[#805365]/60 rotate-12 shadow-2xs" />
      </div>

      {/* LEFT PAGE - Languages, Skills Visualization & Real CP Profiles */}
      <section className="w-full md:w-1/2 min-h-[660px] md:min-h-[740px] p-6 sm:p-10 md:p-12 relative bg-[#FFF8F0] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFFEFC] via-[#FFF8F0] to-[#F5EBCB]/30 rounded-l-sm overflow-hidden z-10 border-b md:border-b-0 md:border-r border-[#D8B5BD] flex flex-col justify-between">
        {/* Pink Margin Line simulating notebook rule */}
        <div className="absolute top-0 bottom-0 left-6 w-0.5 bg-[#F2BFCF] opacity-70 pointer-events-none" />

        <div className="pl-4">
          {/* Header */}
          <div className="mb-4 pb-2 border-b border-[#D8B5BD]">
            <span className="font-label-sm text-xs text-[#805365] tracking-widest uppercase block font-bold">
              The Codex · Technical Notebook
            </span>
            <h2 className="font-display-lg text-2xl sm:text-3xl text-[#805365] font-bold tracking-tight mt-0.5">
              Languages & Algorithmic Stack
            </h2>
            <p className="font-accent-handwritten text-base text-[#B97891] mt-0.5">
              C++, graph logic, and competitive programming
            </p>
          </div>

          {/* Interactive Skills Progress Constellation */}
          <div className="mb-4 bg-[#FFFEFC] p-3.5 rounded-xs border border-[#D8B5BD] shadow-2xs">
            <span className="font-label-sm text-[11px] text-[#805365] uppercase tracking-wider font-bold block mb-2">
              Proficiency Constellation:
            </span>
            <div className="space-y-2">
              {skillProficiency.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center text-xs mb-0.5">
                    <span className="font-display-lg font-bold text-[#44343B]">{skill.name}</span>
                    <span className="text-[10px] font-accent-handwritten text-[#805365]">{skill.tag}</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#F8D7E2]/50 rounded-full overflow-hidden border border-[#D8B5BD]/50">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-[#ED9BB8] to-[#805365] rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Languages Shelf */}
          <div className="mb-4">
            <span className="font-label-sm text-[11px] text-[#805365] uppercase tracking-wider font-bold block mb-1.5">
              Core Languages:
            </span>
            <div className="space-y-1.5">
              {ISHANA_PROFILE.skills.languages.map((lang) => (
                <div
                  key={lang.name}
                  className="p-2 bg-[#FFFEFC] border border-[#D8B5BD] rounded-xs flex items-center justify-between shadow-2xs hover:border-[#805365] transition-colors"
                >
                  <div>
                    <span className="font-display-lg font-bold text-xs text-[#44343B]">
                      {lang.name}
                    </span>
                    <p className="text-[10px] text-[#805365]/80 font-body-md">
                      {lang.level}
                    </p>
                  </div>
                  <span className="text-[9px] font-label-sm bg-[#F8D7E2] text-[#805365] px-2 py-0.5 rounded-xs border border-[#D8B5BD] font-semibold">
                    {lang.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Real Competitive Programming Profiles (Clickable external links) */}
          <div className="p-3 bg-[#F8D7E2]/40 rounded-xs border border-[#D8B5BD]">
            <span className="font-label-sm text-[10px] text-[#805365] uppercase tracking-wider font-bold block mb-1.5">
              Verified Profiles & Handles:
            </span>
            <div className="flex flex-wrap gap-1.5 text-xs font-label-sm">
              <a
                href={ISHANA_PROFILE.socials.codeforces}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-white hover:bg-[#F2BFCF] text-[#44343B] rounded-xs border border-[#D8B5BD] flex items-center gap-1 shadow-2xs hover:-translate-y-0.5 transition-transform"
              >
                <span>🏆 Codeforces</span>
                <span className="text-[10px] text-[#805365]">↗</span>
              </a>
              <a
                href={ISHANA_PROFILE.socials.codechef}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-white hover:bg-[#F2BFCF] text-[#44343B] rounded-xs border border-[#D8B5BD] flex items-center gap-1 shadow-2xs hover:-translate-y-0.5 transition-transform"
              >
                <span>⭐ CodeChef</span>
                <span className="text-[10px] text-[#805365]">↗</span>
              </a>
              <a
                href={ISHANA_PROFILE.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-white hover:bg-[#F2BFCF] text-[#44343B] rounded-xs border border-[#D8B5BD] flex items-center gap-1 shadow-2xs hover:-translate-y-0.5 transition-transform"
              >
                <span>💻 LeetCode</span>
                <span className="text-[10px] text-[#805365]">↗</span>
              </a>
              <a
                href={ISHANA_PROFILE.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 bg-white hover:bg-[#F2BFCF] text-[#44343B] rounded-xs border border-[#D8B5BD] flex items-center gap-1 shadow-2xs hover:-translate-y-0.5 transition-transform"
              >
                <span>🐙 GitHub</span>
                <span className="text-[10px] text-[#805365]">↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer milestone */}
        <div className="pl-4 pt-3 border-t border-[#D8B5BD] flex items-center justify-between text-xs font-label-sm text-[#805365]">
          <span>Algorithmia 2nd Place · Cummins College</span>
          <span className="font-accent-handwritten text-sm text-[#B97891]">
            ICPC Contest Standing
          </span>
        </div>
      </section>

      {/* RIGHT PAGE - Problem-Solving Notebook & Code Viewer */}
      <section className="w-full md:w-1/2 min-h-[660px] md:min-h-[740px] p-6 sm:p-10 md:p-12 relative bg-[#FFF8F0] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFFEFC] via-[#FFF8F0] to-[#F5EBCB]/30 rounded-r-sm overflow-hidden z-10 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#D8B5BD]">
            <div>
              <span className="font-label-sm text-xs text-[#805365] tracking-widest uppercase block font-bold">
                Problem-Solving Notebook
              </span>
              <h3 className="font-display-lg text-xl text-[#805365] font-bold">
                Code Snippets & Key Insights
              </h3>
            </div>

            {/* Problem Selector Tabs */}
            <div className="flex gap-1.5">
              {PROBLEM_SOLVING_ENTRIES.map((entry, idx) => (
                <button
                  key={entry.id}
                  onClick={() => {
                    playTactileClick();
                    setSelectedEntry(idx);
                  }}
                  className={`px-2.5 py-1 rounded-xs text-xs font-label-sm border transition-colors cursor-pointer ${
                    selectedEntry === idx
                      ? 'bg-[#805365] text-white border-[#805365] font-bold shadow-xs'
                      : 'bg-white text-[#44343B] border-[#D8B5BD] hover:bg-[#F8D7E2]'
                  }`}
                >
                  #{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Active Problem Card with Animated Transition */}
          <AnimatePresence mode="wait">
            {activeProblem && (
              <motion.div
                key={activeProblem.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-[#FFFEFC] p-4 rounded-xs border border-[#D8B5BD] shadow-xs mb-4"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-label-sm uppercase tracking-wider text-[#805365] font-bold">
                    {activeProblem.topic} · {activeProblem.difficulty}
                  </span>
                  <span className="text-[10px] font-label-sm text-[#B97891] bg-[#F8D7E2] px-2 py-0.5 rounded-xs border border-[#D8B5BD]">
                    {activeProblem.platform}
                  </span>
                </div>

                <h4 className="font-display-lg text-base sm:text-lg text-[#44343B] font-bold mb-1">
                  {activeProblem.title}
                </h4>

                <p className="text-xs font-body-md text-[#44343B] leading-relaxed mb-2 bg-[#FFF8F0] p-2 rounded-xs border border-[#D8B5BD]/60">
                  <span className="font-bold text-[#805365]">Key Insight: </span>
                  {activeProblem.keyInsight}
                </p>

                {/* Code Snippet Container with Syntax Highlighting */}
                <div className="relative bg-[#382b31] text-[#fff8f0] rounded-xs p-3 font-mono text-[11px] leading-relaxed overflow-x-auto border border-[#805365] max-h-56">
                  <button
                    onClick={handleCopyCode}
                    className="absolute top-2 right-2 px-2 py-0.5 bg-[#805365] hover:bg-[#683f50] text-white rounded-2xs text-[10px] font-label-sm transition-colors cursor-pointer shadow-xs"
                  >
                    {copiedCode ? 'Copied ✓' : 'Copy C++'}
                  </button>
                  <pre>{highlightCppCode(activeProblem.codeSnippet)}</pre>
                </div>

                {/* Complexity Analysis */}
                <div className="mt-2.5 flex items-center justify-between text-[11px] font-label-sm text-[#805365] pt-1.5 border-t border-dashed border-[#D8B5BD]">
                  <span>Time: {activeProblem.complexity.time}</span>
                  <span>Space: {activeProblem.complexity.space}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive Learning Roadmap Checklist (Persisted in LocalStorage) */}
          <div className="p-3.5 bg-[#F5EBCB]/50 rounded-xs border border-[#D8B5BD]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-label-sm text-[10px] text-[#44343B] uppercase tracking-wider font-bold block">
                Algorithmic Learning Checklist:
              </span>
              <span className="text-[10px] font-accent-handwritten text-[#805365]">
                {roadmap.filter((r: { done: boolean }) => r.done).length}/{roadmap.length} completed
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {roadmap.map((item: { task: string; done: boolean }, idx: number) => (
                <button
                  key={idx}
                  onClick={() => toggleRoadmap(idx)}
                  className="flex items-center gap-1.5 text-left text-xs font-accent-handwritten text-[#44343B] hover:text-[#805365] cursor-pointer"
                >
                  <span
                    className={`w-3.5 h-3.5 rounded-2xs border flex items-center justify-center text-[9px] transition-colors ${
                      item.done
                        ? 'bg-[#805365] border-[#805365] text-white font-bold'
                        : 'border-[#B97891] bg-white'
                    }`}
                  >
                    {item.done ? '✓' : ''}
                  </span>
                  <span className={item.done ? 'line-through text-[#805365]/70' : ''}>
                    {item.task}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-4 pt-3 border-t border-[#D8B5BD] flex items-center justify-between text-xs font-label-sm text-[#805365]">
          <span>Notebook updated continuously</span>
          <button
            onClick={() => onNavigate('achievements')}
            className="hover:underline flex items-center gap-1 font-semibold text-[#805365] cursor-pointer"
          >
            <span>The Trophy Drawer</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </section>
    </div>
  );
};
