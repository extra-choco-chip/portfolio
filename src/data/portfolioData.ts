export interface Project {
  id: string;
  title: string;
  category: 'Software' | 'AI / Fairness' | 'Web' | 'Academic' | 'Prototype';
  tagline: string;
  problemStatement: string;
  intendedUsers: string;
  importance: string;
  myContribution: string;
  techStack: string[];
  keyFeatures: string[];
  status: 'Concept' | 'Prototype' | 'In Progress' | 'Live Project';
  lessonsLearned: string;
  demoUrl?: string;
  repoUrl?: string;
  paperNote?: string;
  badgeColor: string;
}

export interface ProblemSolveEntry {
  id: string;
  title: string;
  platform: string;
  topic: string;
  difficulty?: string;
  problemUrl?: string;
  keyInsight: string;
  complexity: { time: string; space: string };
  codeSnippet: string;
  language: 'cpp' | 'python' | 'c';
  takeaway: string;
}

export interface TimelineEntry {
  id: string;
  period: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'College' | 'Competition' | 'Project' | 'Learning';
  statusTag: string;
}

export const ISHANA_PROFILE = {
  name: 'Ishana Datta',
  title: "Ishana's Portfolio",
  email: 'dattaishana@gmail.com',
  college: 'MKSSS Cummins College of Engineering for Women, Pune',
  degree: 'B.Tech in Electronics and Telecommunications Engineering',
  tagline: 'Engineering student by day, curious problem-solver by default, and collector of side quests at all times.',
  bio: "I am an engineering student at Cummins College of Engineering for Women, Pune, pursuing my B.Tech in Electronics and Telecommunications. My core passion lies at the intersection of competitive programming, algorithms, and thoughtful frontend development. I love building things with code—from algorithm problem-solving notebooks to playful, interactive web experiences like this digital journal.",
  socials: {
    github: 'https://github.com/ishanadatta',
    linkedin: 'https://linkedin.com/in/ishana-datta',
    codeforces: 'https://codeforces.com/profile/ishana_datta',
    codechef: 'https://www.codechef.com/users/ishana_datta',
    leetcode: 'https://leetcode.com/ishanadatta',
  },
  resumeUrl: '#resume-download',
  skills: {
    languages: [
      { name: 'C++', level: 'Primary language for CP & problem solving', tag: 'Building with' },
      { name: 'C', level: 'Fundamental systems & hardware concepts', tag: 'Comfortable with fundamentals' },
      { name: 'Python', level: 'Scripting, algorithms & prototyping', tag: 'Practising' },
    ],
    tools: [
      { name: 'Git & GitHub', level: 'Version control, branches & repositories', tag: 'Daily driver' },
      { name: 'VS Code', level: 'Primary development environment', tag: 'Daily driver' },
      { name: 'Linux / Terminal', level: 'Command line scripting & build flows', tag: 'Practising' },
    ],
    interests: [
      'Competitive Programming & Algorithms',
      'Data Structures & Problem Solving',
      'Frontend Development & UI/UX Design',
      'Creative Technology & Interactive Web',
      'AI Fairness & Transparent Decision Systems',
    ],
  },
  confirmedAchievements: [
    {
      id: 'algorithmia-2nd',
      title: 'Second Place — Algorithmia Contest',
      event: 'Algorithmia (College ICPC-style competitive programming contest)',
      organization: 'MKSSS Cummins College of Engineering for Women',
      description:
        'Secured 2nd place in Algorithmia, a competitive programming contest conducted in ICPC format, tackling algorithmic problems spanning dynamic programming, graphs, and number theory under strict time limits.',
      verified: true,
      tag: 'Competition Winner',
    },
  ],
  currentlyInNotebook: {
    learning: 'Graph algorithms (Dijkstra, BFS/DFS tree traversals) & advanced C++ STL techniques',
    building: 'Interactive scrapbook portfolio components & RayCtify fairness metrics research',
    challenge: 'Balancing E&TC core coursework with daily competitive programming practice',
    nextExplore: 'Web Audio API synthesizers & interactive canvas physics',
  },
};

export const PROJECTS_DATA: Project[] = [
  {
    id: 'rayctify',
    title: 'RayCtify',
    category: 'AI / Fairness',
    tagline: 'AI fairness and bias-remediation project concept for loan approval transparency.',
    problemStatement:
      'Automated machine learning models used in financial lending can inadvertently replicate historical biases, leading to disparate approval rates across demographic subgroups without clear explanation.',
    intendedUsers:
      'Credit risk analysts, compliance reviewers, and loan applicants seeking transparent reasons behind lending decisions.',
    importance:
      'Ensuring automated algorithms do not penalize historically marginalized groups while maintaining robust predictive risk models.',
    myContribution:
      'Conceptualized the system workflow, explored fairness metrics (Demographic Parity, Equalized Odds), and drafted mitigation approaches using counterfactual testing.',
    techStack: ['Python', 'Pandas', 'Scikit-Learn', 'Fairness Metrics (Concepts)'],
    keyFeatures: [
      'Disparate impact ratio and equal opportunity audit workflow',
      'Counterfactual testing exploring minimum feature tweaks for fair outcomes',
      'Applicant-facing explanation summary for credit decisions',
      'Interactive audit dashboard concept for risk teams',
    ],
    status: 'Concept',
    lessonsLearned:
      'Fairness in machine learning is not just mathematical optimization; different fairness definitions often conflict, requiring thoughtful societal and domain-specific trade-offs.',
    paperNote: 'Project Specimen No. 01 · Proposed for academic research',
    badgeColor: 'bg-[#F2BFCF] text-[#805365]',
  },
  {
    id: 'digital-journal',
    title: 'The Digital Journal Portfolio',
    category: 'Web',
    tagline: 'Tactile, skeuomorphic portfolio built as a living scrapbook with paper physics.',
    problemStatement:
      'Traditional tech portfolios often look like identical flat cards, lacking warmth, personality, and genuine craft.',
    intendedUsers:
      'Peers, recruiters, and fellow engineers exploring creative frontend interfaces.',
    importance:
      'Proves that engineering precision can be paired with whimsy, tactile aesthetics, and playful frontend interactions.',
    myContribution:
      'Designed and engineered the complete application using React, TypeScript, Tailwind CSS, Web Audio API synthesis for page rustles, and responsive book layouts.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Web Audio API', 'Lucide React'],
    keyFeatures: [
      'Authentic open-book layout with physical page-turn transitions',
      'Synthesized Web Audio paper-rustle and wax-stamp sounds (no external audio files)',
      'Organized scrapbook ephemera: washi tape, bookmarks, and specimen cards',
      'Accessible Table of Contents overlay & keyboard arrow navigation',
    ],
    status: 'Live Project',
    lessonsLearned:
      'Building responsive 3D skeuomorphism requires careful math for mobile fallbacks so that touch screens feel just as natural as wide monitors.',
    paperNote: 'Project Specimen No. 02 · Built with love and pink ink',
    badgeColor: 'bg-[#F8D7E2] text-[#805365]',
  },
  {
    id: 'smart-canteen',
    title: 'Smart Canteen Prototype',
    category: 'Prototype',
    tagline: 'Campus food ordering concept to cut break-time queues and track inventory.',
    problemStatement:
      'College canteens experience massive congestion during short 15-minute breaks, leading to delayed orders, food waste, and manual cash delays.',
    intendedUsers:
      'Cummins College students, faculty members, and canteen kitchen staff.',
    importance:
      'Improves daily campus life efficiency through digital tokens and predictive queue notifications.',
    myContribution:
      'Designed the order dispatch prototype, token queueing logic, and menu status workflow.',
    techStack: ['C++', 'Python', 'Prototyping Frameworks'],
    keyFeatures: [
      'Digital token queue system prioritizing rush orders',
      'Real-time item availability toggle for kitchen operators',
      'Quick pickup notification to prevent crowding at counters',
    ],
    status: 'Prototype',
    lessonsLearned:
      'Real-world operational bottlenecks are often human-centered rather than algorithmic; simple queuing rules save more time than complicated models.',
    paperNote: 'Project Specimen No. 03 · College Campus Initiative',
    badgeColor: 'bg-[#F5EBCB] text-[#44343B]',
  },
  {
    id: 'senior-junior-platform',
    title: 'Senior–Junior Community Platform',
    category: 'Software',
    tagline: 'Collaborative campus hub for mentorship, notes exchange, and project guidance.',
    problemStatement:
      'Valuable academic resources, past exam insights, and project advice are scattered across chat groups and lost each semester.',
    intendedUsers:
      'Junior and senior engineering students seeking structured mentorship and resource sharing.',
    importance:
      'Fosters continuity and peer support within engineering departments.',
    myContribution:
      'Outlined the peer-to-peer query matching flow, branch-specific tag taxonomy, and verified senior badge concept.',
    techStack: ['Python', 'SQL', 'Web Architecture (Concept)'],
    keyFeatures: [
      'Subject-tagged resource archive organized by semester and branch',
      'Peer mentorship request threads with anonymized inquiry options',
      'Project collaboration bulletin for hackathon teammates',
    ],
    status: 'Concept',
    lessonsLearned:
      'Incentivizing senior participation is the primary hurdle; structured question formats make answering fast and rewarding.',
    paperNote: 'Project Specimen No. 04 · Campus Community Concept',
    badgeColor: 'bg-[#DDE4C5] text-[#44343B]',
  },
];

export const PROBLEM_SOLVING_ENTRIES: ProblemSolveEntry[] = [
  {
    id: 'ps-01',
    title: 'Number of Islands / Connected Components',
    platform: 'CSES / LeetCode',
    topic: 'Graph Theory (DFS / BFS)',
    difficulty: 'Medium',
    keyInsight:
      'Treat the grid as an implicit graph. When encountering land (\'1\'), initiate DFS/BFS to visit and mark all 4-directionally adjacent land as visited (\'0\' in-place) to avoid extra visited matrix memory.',
    complexity: { time: 'O(M × N)', space: 'O(M × N) recursion stack' },
    language: 'cpp',
    codeSnippet: `// Clean BFS/DFS Flood Fill pattern
void dfs(vector<vector<char>>& grid, int r, int c) {
    if (r < 0 || r >= grid.size() || c < 0 || c >= grid[0].size() || grid[r][c] != '1')
        return;
    grid[r][c] = '0'; // sink the island
    dfs(grid, r + 1, c);
    dfs(grid, r - 1, c);
    dfs(grid, r, c + 1);
    dfs(grid, r, c - 1);
}

int numIslands(vector<vector<char>>& grid) {
    int count = 0;
    for (int i = 0; i < grid.size(); ++i) {
        for (int j = 0; j < grid[0].size(); ++j) {
            if (grid[i][j] == '1') {
                count++;
                dfs(grid, i, j);
            }
        }
    }
    return count;
}`,
    takeaway: 'In-place grid marking prevents auxiliary O(M*N) memory overhead in memory-tight competition constraints.',
  },
  {
    id: 'ps-02',
    title: 'Binary Search on Monotonic Answer Range',
    platform: 'Codeforces / ICPC Style',
    topic: 'Binary Search / Predicate Logic',
    difficulty: 'Medium-Hard',
    keyInsight:
      'Whenever the question asks for "minimum maximum" or "maximum minimum", check if the condition check(mid) is monotonic. If check(x) is true for all x >= ans, binary search over the answer space directly.',
    complexity: { time: 'O(N log(Range))', space: 'O(1)' },
    language: 'cpp',
    codeSnippet: `// Monotonic predicate binary search template
long long low = min_possible, high = max_possible, ans = high;
while (low <= high) {
    long long mid = low + (high - low) / 2;
    if (isValid(mid)) {
        ans = mid;         // try for a smaller valid value
        high = mid - 1;
    } else {
        low = mid + 1;
    }
}`,
    takeaway: 'Always be vigilant of integer overflow when computing mid = low + (high - low) / 2.',
  },
];

export const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    id: 't-1',
    period: '2023 — Present',
    title: 'B.Tech in Electronics & Telecommunications',
    subtitle: 'MKSSS Cummins College of Engineering for Women, Pune',
    description:
      'Pursuing my degree with a focus on signal processing, digital systems, and embedded computing, while self-studying algorithms and software engineering.',
    category: 'College',
    statusTag: 'Current Studies',
  },
  {
    id: 't-2',
    period: 'Contest Season',
    title: '2nd Place in Algorithmia ICPC Contest',
    subtitle: 'Competitive Programming Milestone',
    description:
      'Competed in a rigorous college-level ICPC-style contest; solved algorithmic challenges in C++ covering number theory, array manipulations, and graph models under tight time constraints.',
    category: 'Competition',
    statusTag: '2nd Place Winner',
  },
  {
    id: 't-3',
    period: 'Research & Ideation',
    title: 'RayCtify AI Fairness Concept',
    subtitle: 'Ethical Tech & Algorithmic Accountability',
    description:
      'Formulated the RayCtify concept examining fairness trade-offs in automated lending scores, investigating counterfactual fairness and disparate impact metrics.',
    category: 'Project',
    statusTag: 'Research Concept',
  },
  {
    id: 't-4',
    period: 'Creative Web Journey',
    title: 'The Digital Junk Journal Portfolio',
    subtitle: 'Personal Portfolio & Interactive Scrapbook',
    description:
      'Engineered a complete handmade scrapbook portfolio celebrating tactile design, pink vintage aesthetics, and real algorithmic project case studies.',
    category: 'Project',
    statusTag: 'Live & Evolving',
  },
];

export const DEBUGGING_STORIES = [
  {
    title: 'The Curse of 1-Indexed Graph Input',
    whatBroke: 'Segmentation fault when accessing adjacency list adj[u].',
    theFix: 'Graph problem inputs were 1-indexed (1 to N) while the vector was initialized with size N instead of N + 1. Always size graphs to N + 1 for 1-indexed nodes!',
  },
  {
    title: 'Floating-Point Precision in Geometry',
    whatBroke: 'A test case failed with WA on test 34 due to double vs long double rounding.',
    theFix: 'Switched calculations from float to long double and replaced exact equality checks (a == b) with epsilon threshold comparison: fabs(a - b) < 1e-9.',
  },
  {
    title: 'Stack Overflow on Deep Grid DFS',
    whatBroke: 'Runtime error on 1000x1000 matrices due to recursion limit.',
    theFix: 'Converted recursive DFS to iterative BFS with std::queue to prevent stack exhaustion on large inputs.',
  },
];

export const CONVERSATION_STARTERS = [
  {
    question: 'What problem would you love to solve?',
    answer:
      'Making algorithms and automated systems more transparent and auditable for everyday people, starting with fairness metrics in lending and automated grading.',
  },
  {
    question: 'What are you practicing right now?',
    answer:
      'Deepening my command over C++ STL, practicing graph traversals and dynamic programming problems, and exploring tactile frontend micro-interactions.',
  },
  {
    question: 'What is a project you are unexpectedly proud of?',
    answer:
      'This digital junk journal portfolio! It took meticulous work to turn physical scrapbook metaphors into clean, performant React & Tailwind code.',
  },
  {
    question: 'What would you build with an unlimited weekend?',
    answer:
      'A real-time collaborative algorithm visualizer with sound effects where two people can race solving a graph traversal puzzle.',
  },
];
