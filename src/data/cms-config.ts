// Simple CMS configuration for easy content management
// This file allows you to update projects, blog posts, and other content
// without touching the component code

import projectOverridesData from './projects-overrides.json';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: 'professional' | 'academic' | 'personal';
  technologies: string[];
  image: string;
  demoUrl?: string;
  githubUrl?: string;
  impact?: {
    metric: string;
    value: string;
  };
  tags: string[];
  featured: boolean;
  date: string;
  /** When true the project is hidden from all public views but stays in source */
  hidden?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  featured: boolean;
  readTime: string;
  image?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  platform: 'linkedin' | 'github' | 'twitter' | 'email' | 'instagram';
}

// PROJECTS DATA
// To add a new project use the Admin portal — it writes to projects-overrides.json
// and triggers an automatic rebuild via GitHub Actions.
// For projects with complex HTML longDescriptions, edit this file directly.
const baseProjects: Project[] = [
  {
    id: 'shep-ollama-manager',
    title: 'Shep: Ollama Model Manager',
    description: 'A modern macOS GUI for managing local Ollama AI models - discover, install, monitor, and configure models without touching the terminal. Built with React, FastAPI, and Tailwind CSS.',
    longDescription: `<div class="space-y-6">
      <h2 class="text-2xl font-bold text-white mb-4">Shep: Making Local AI Accessible</h2>

      <div class="bg-gradient-to-r from-purple-500/20 to-emerald-500/20 rounded-lg p-6 border border-purple-500/30 mb-8 text-center">
        <p class="text-lg text-purple-200 font-medium mb-2">Filling a Critical Gap in the AI Developer Ecosystem</p>
        <p class="text-gray-400">No GUI existed for Ollama model management - only terminal-based workflows. Shep changes that.</p>
      </div>

      <h3 class="text-xl font-semibold text-white">The Problem</h3>
      <p class="text-gray-300">Local AI model management with Ollama requires understanding daemon management, model installation commands, VRAM constraints, and environment variable configuration. This creates high friction for developers experimenting with local LLMs and makes Ollama inaccessible to non-technical users entirely.</p>

      <h3 class="text-xl font-semibold text-white">Key Features</h3>
      <ul class="list-disc list-inside text-gray-300 space-y-2">
        <li><strong>Model Dashboard</strong> - Real-time list of installed models with size, VRAM requirements, and status</li>
        <li><strong>Model Discovery</strong> - Curated library of 12+ popular models with search, real-time streaming download progress, and cancellation</li>
        <li><strong>Daemon Control</strong> - Start/stop Ollama daemon directly from the GUI with status indicators</li>
        <li><strong>Settings Panel</strong> - Custom model storage paths, keep-alive timeout configuration, reset to defaults</li>
        <li><strong>Professional UX</strong> - Custom Shep branding with light/dark mode, color-coded status indicators, loading states, and actionable error messages</li>
      </ul>

      <h3 class="text-xl font-semibold text-white">Technical Architecture</h3>
      <p class="text-gray-300">React 18 frontend communicates with a FastAPI backend that wraps the Ollama daemon API. HTTP streaming delivers real-time download progress without polling or WebSocket overhead. Daemon management uses macOS launchctl with subprocess fallback. Settings persist via direct ~/.zshrc editing with regex.</p>

      <h3 class="text-xl font-semibold text-white">Challenges Solved</h3>
      <ul class="list-disc list-inside text-gray-300 space-y-2">
        <li>Fixed false "download cancelled" messages by tracking an explicit isCancelled flag to distinguish user cancellation from natural stream completion</li>
        <li>Resolved settings reset bug caused by JavaScript falsy coercion converting empty strings to undefined</li>
        <li>Built robust backend readiness polling to prevent frontend startup before the API is ready</li>
      </ul>

      <h3 class="text-xl font-semibold text-white">One-Command Setup</h3>
      <p class="text-gray-300">Automated launch script detects virtual environments across multiple common locations, installs dependencies for both frontend and backend, polls for backend readiness, and starts the full stack with a single <code>./launch.sh</code> command.</p>
    </div>`,
    category: 'personal',
    technologies: ['React', 'FastAPI', 'Python', 'Tailwind CSS', 'Vite', 'Ollama'],
    image: '/assets/images/ollama_manager.png',
    githubUrl: 'https://github.com/mattieg93/mattieg93.github.io/tree/main/quick_tools/ollama_manager',
    impact: {
      metric: 'Developer Experience',
      value: 'Zero-terminal AI model management'
    },
    tags: ['AI', 'React', 'FastAPI', 'Python', 'Developer Tools', 'Ollama', 'GUI'],
    featured: true,
    date: '2026-02-28'
  },
  {
    id: 'ai-study-assistant',
    title: 'Coursera Study Assistant: A Free AI Tutor for Online Learners',
    description: 'A unified Streamlit application that merges two independent systems — a quiz-answering study tool and a Coursera automation agent — into one holistic learning platform. Screenshot a quiz for instant AI answers, paste a lecture URL for auto-generated notes, and expand your knowledge base on the fly. Runs entirely locally with zero API costs.',
    longDescription: `<div class="space-y-6">
      <h2 class="text-2xl font-bold text-white mb-4">Making Technical Learning Accessible — For Free</h2>

      <div class="bg-gradient-to-r from-purple-500/20 to-teal-500/20 rounded-lg p-6 border border-purple-500/30 mb-8 text-center">
        <p class="text-lg text-purple-200 font-medium mb-4">Two Disconnected Tools → One Holistic Study Platform</p>
        <div class="grid md:grid-cols-4 gap-4">
          <div class="bg-gray-800/50 rounded-lg p-4">
            <div class="text-2xl font-bold text-teal-400 mb-2">60%</div>
            <div class="text-sm text-gray-300">Study time saved per session</div>
          </div>
          <div class="bg-gray-800/50 rounded-lg p-4">
            <div class="text-2xl font-bold text-purple-400 mb-2">100%</div>
            <div class="text-sm text-gray-300">OCR accuracy via Apple Vision</div>
          </div>
          <div class="bg-gray-800/50 rounded-lg p-4">
            <div class="text-2xl font-bold text-emerald-400 mb-2">$0</div>
            <div class="text-sm text-gray-300">Infrastructure cost — fully local</div>
          </div>
          <div class="bg-gray-800/50 rounded-lg p-4">
            <div class="text-2xl font-bold text-purple-400 mb-2">3 Tabs</div>
            <div class="text-sm text-gray-300">Unified Streamlit interface</div>
          </div>
        </div>
      </div>

      <h3 class="text-xl font-bold text-white mb-4">The Mission</h3>

      <p class="mb-6">Online courses move fast. Technical jargon piles up. There's no pause button for confusion and no tutor on call at midnight. This project exists to change that — a <strong class="text-white">free, private, AI-powered tutor</strong> that runs entirely on your machine. No API costs, no subscriptions, no data leaving your laptop. Just a tool that watches lectures for you, takes structured notes, answers your questions from your own course materials, and gets smarter every time you correct it.</p>

      <h3 class="text-xl font-bold text-white mb-4">From Two Systems to One</h3>

      <p class="mb-4 text-gray-300">This didn't start as one application. It began as two completely independent tools:</p>

      <div class="grid md:grid-cols-2 gap-6 my-6">
        <div class="bg-gradient-to-br from-purple-500/20 to-teal-500/20 rounded-lg p-6 border border-purple-500/30">
          <h4 class="text-lg font-semibold text-purple-300 mb-3">System 1: Study Tool (CLI)</h4>
          <ul class="space-y-2 text-gray-300 text-sm">
            <li>• Screenshot a quiz → OCR → AI answers via RAG</li>
            <li>• Correct wrong answers in natural language</li>
            <li>• Vector database of course notes</li>
            <li>• <strong class="text-gray-200">Problem:</strong> required manual note import</li>
          </ul>
        </div>
        <div class="bg-gradient-to-br from-emerald-600/20 to-purple-500/20 rounded-lg p-6 border border-emerald-600/30">
          <h4 class="text-lg font-semibold text-emerald-300 mb-3">System 2: Coursera Agent (Terminal)</h4>
          <ul class="space-y-2 text-gray-300 text-sm">
            <li>• Playwright automates Coursera lecture navigation</li>
            <li>• Extracts transcripts, summarises via Ollama</li>
            <li>• Writes formatted notes to Google Docs</li>
            <li>• <strong class="text-gray-200">Problem:</strong> notes stopped at Google Docs</li>
          </ul>
        </div>
      </div>

      <p class="mb-6 text-gray-300">A note-taker that couldn't study. A study tool that couldn't take notes. The unification merged both into a <strong class="text-white">single Streamlit application</strong> with a shared backend bridge, closing the loop: agent writes notes → one-click sync pulls them into the vector database → study assistant answers from them.</p>

      <h3 class="text-xl font-bold text-white mb-4">What It Does Now — 3-Tab Interface</h3>

      <div class="space-y-4 mb-6">
        <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <h4 class="font-semibold text-purple-400 mb-2">Tab 1: Study Assistant</h4>
          <p class="text-gray-300 text-sm">RAG-powered chat interface. Upload or paste a quiz screenshot → Apple Vision OCR extracts questions → AI answers from your own notes in 3–5 seconds. Tell it "Question 2 was wrong, answer is C" in plain English — it saves the correction to the knowledge base and gets smarter. Collapsible explanations show the reasoning behind each answer.</p>
        </div>
        <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <h4 class="font-semibold text-teal-400 mb-2">Tab 2: Coursera Agent</h4>
          <p class="text-gray-300 text-sm">URL queue with "All videos" and "Readings" toggles. Add one or more Coursera lecture URLs, hit Process, and watch per-lecture progress bars advance through transcript capture → Ollama summarisation → Google Doc write. A "View Notes" link opens your doc in a new tab. After processing, a one-click "Sync notes to study database" prompt bridges agent output directly into the Study Assistant's knowledge base.</p>
        </div>
        <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <h4 class="font-semibold text-emerald-400 mb-2">Tab 3: Expand Knowledge Base</h4>
          <p class="text-gray-300 text-sm">Dropdown selector: "Paste content" or "Upload document" with a single shared Title field. Add supplementary material — textbook excerpts, external articles, personal notes — and it's immediately searchable by the Study Assistant. Everything goes into the same vector database.</p>
        </div>
        <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <h4 class="font-semibold text-purple-400 mb-2">Sidebar</h4>
          <p class="text-gray-300 text-sm">View Notes link (opens Google Doc), Sync from Google Doc button, Clear Chat History, and all agent settings (Doc ID, Ollama model, credentials status, setup prerequisites) — everything in one place without cluttering the main workspace.</p>
        </div>
      </div>

      <h3 class="text-xl font-bold text-white mb-4">Technical Architecture</h3>

      <div class="space-y-4 mb-6">
        <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <h4 class="font-semibold text-purple-400 mb-2">Computer Vision Pipeline</h4>
          <p class="text-gray-300 text-sm">Apple Vision Framework (VNRecognizeTextRequest) achieves 100% extraction accuracy on quiz screenshots — university-grade OCR without any training data. Custom preprocessing applies contrast enhancement, sharpening, denoising, and auto-inversion for dark backgrounds. EasyOCR provides cross-platform fallback. Multi-format parser handles A/B/C/D letters, bullet points (•, -, *, ·), and numbered lists.</p>
        </div>
        <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <h4 class="font-semibold text-purple-400 mb-2">RAG-Powered Q&A</h4>
          <p class="text-gray-300 text-sm">Pickle-based vector store with sentence-transformer (all-MiniLM-L6-v2) embeddings. Cosine similarity search with source diversity prevents single-source hallucination. Deduplication by title hash on add. Query augmentation adds context hints before retrieval. Local Ollama inference generates answers — no API calls, full privacy.</p>
        </div>
        <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <h4 class="font-semibold text-teal-400 mb-2">Conversational Correction Loop</h4>
          <p class="text-gray-300 text-sm">NLP intent recognition detects correction phrases ("Q2 was wrong, answer is C") with 90%+ accuracy across 20+ natural language variations. Each correction is stored with full question context and reingested into the vector store — compounding accuracy gains over time.</p>
        </div>
        <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <h4 class="font-semibold text-emerald-400 mb-2">Coursera Automation Agent</h4>
          <p class="text-gray-300 text-sm">Playwright + CDP on localhost:9222 extracts video transcripts with exponential-backoff retry logic. Ollama (granite3.2:8b) generates structured notes with engineered "FIRST LINE" prompt guaranteeing consistent title formatting. Google Docs API writes headings, bullets, and emphasis. Real-time subprocess streaming (python -u + PYTHONUNBUFFERED=1 + bufsize=1) delivers line-by-line progress to the Streamlit UI.</p>
        </div>
        <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <h4 class="font-semibold text-purple-400 mb-2">Backend Bridge (Unification Layer)</h4>
          <p class="text-gray-300 text-sm">backend.py bridges two previously independent systems: adds study_system and coursera_agent to sys.path, re-exports the study system API, launches the agent as a subprocess with streamed output, and loads python-dotenv configuration. CSA_UI_MODE env var auto-confirms all interactive prompts so the subprocess never hangs. One import, one entry point, full integration.</p>
        </div>
      </div>

      <div class="bg-gradient-to-r from-purple-500/20 to-emerald-600/20 rounded-lg p-6 border border-purple-500/30 my-8">
        <h3 class="text-lg font-semibold text-purple-300 mb-4">Challenges Solved Along the Way</h3>
        <div class="grid md:grid-cols-2 gap-4">
          <ul class="space-y-2 text-gray-300 text-sm">
            <li class="flex items-start gap-3">
              <span class="w-2 h-2 bg-purple-400 rounded-full mt-1.5 shrink-0"></span>
              <span><strong class="text-white">Subprocess EOFError:</strong> Agent input() calls hung in non-interactive mode. Added CSA_UI_MODE to auto-confirm all prompts.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-2 h-2 bg-teal-400 rounded-full mt-1.5 shrink-0"></span>
              <span><strong class="text-white">Credentials false positive:</strong> Frontend checked wrong path for credentials.json. Aligned to same Path(__file__).parent resolution as agent.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-2 h-2 bg-emerald-400 rounded-full mt-1.5 shrink-0"></span>
              <span><strong class="text-white">Google Doc iframe blocked:</strong> Sign-in wall killed embedded view. Replaced with link button that opens in authenticated browser tab.</span>
            </li>
          </ul>
          <ul class="space-y-2 text-gray-300 text-sm">
            <li class="flex items-start gap-3">
              <span class="w-2 h-2 bg-purple-400 rounded-full mt-1.5 shrink-0"></span>
              <span><strong class="text-white">Buffered stdout:</strong> Agent output arrived in chunks. Triple fix: python -u + PYTHONUNBUFFERED=1 + bufsize=1 for real-time streaming.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-2 h-2 bg-purple-500 rounded-full mt-1.5 shrink-0"></span>
              <span><strong class="text-white">EasyOCR at 85%:</strong> Replaced with Apple Vision Framework — 100% accuracy, zero training data required.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="w-2 h-2 bg-teal-400 rounded-full mt-1.5 shrink-0"></span>
              <span><strong class="text-white">Inconsistent LLM titles:</strong> Engineered "FIRST LINE" prompt + URL-slug fallback for 100% consistent note formatting.</span>
            </li>
          </ul>
        </div>
      </div>

      <h3 class="text-xl font-bold text-white mb-4">Sprint-by-Sprint Evolution</h3>

      <div class="space-y-3 mb-6">
        <div class="flex gap-4 items-start">
          <span class="text-purple-400 font-bold text-sm shrink-0 mt-0.5">Sprint 1</span>
          <p class="text-gray-300 text-sm"><strong class="text-white">Answer Display:</strong> Rebuilt UI to show clean question headings, highlighted answers, and explanations — eliminating debug noise from initial prototype.</p>
        </div>
        <div class="flex gap-4 items-start">
          <span class="text-teal-400 font-bold text-sm shrink-0 mt-0.5">Sprint 2</span>
          <p class="text-gray-300 text-sm"><strong class="text-white">Apple Vision Integration:</strong> EasyOCR was at 85% accuracy. Integrated Apple's native Vision framework — jumped to 100%, eliminating parsing failures entirely.</p>
        </div>
        <div class="flex gap-4 items-start">
          <span class="text-emerald-400 font-bold text-sm shrink-0 mt-0.5">Sprint 3</span>
          <p class="text-gray-300 text-sm"><strong class="text-white">Bullet-Point Format Support:</strong> Parser failed on non-A/B/C/D quizzes. Added multi-bullet regex detection — went from 0/5 to 5/5 questions parsed on a bullet-format quiz.</p>
        </div>
        <div class="flex gap-4 items-start">
          <span class="text-purple-400 font-bold text-sm shrink-0 mt-0.5">Sprint 4</span>
          <p class="text-gray-300 text-sm"><strong class="text-white">Coursera Note Consistency:</strong> LLM titles were inconsistent. Engineered "FIRST LINE" prompt instruction + validation fallback — 100% consistent formatting across all generated notes.</p>
        </div>
        <div class="flex gap-4 items-start">
          <span class="text-purple-400 font-bold text-sm shrink-0 mt-0.5">Sprint 5</span>
          <p class="text-gray-300 text-sm"><strong class="text-white">Correction Feedback Loop:</strong> No way to improve wrong answers. Implemented NLP correction parser — users now improve the system through natural conversation.</p>
        </div>
        <div class="flex gap-4 items-start">
          <span class="text-teal-400 font-bold text-sm shrink-0 mt-0.5">Sprint 6</span>
          <p class="text-gray-300 text-sm"><strong class="text-white">Unified Streamlit UI:</strong> Merged two independent systems into one 3-tab application. Built backend bridge, .env config system, sidebar settings panel, per-lecture progress bars, Expand Knowledge Base tab, post-run sync prompt, and Plus Jakarta Sans typography. Two disconnected CLI tools became one holistic study platform.</p>
        </div>
      </div>

      <p class="mb-6">This project reflects a working philosophy: identify the real problem, pick tools that solve it efficiently, use every resource available (including AI) to compress timelines, and iterate until the system actually does what it's supposed to do. The assistant is live and in daily use — a free tutor that makes a measurable difference for anyone struggling with the pace of technical online courses.</p>

      <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
        <p class="text-gray-300 text-sm text-center mb-3">The unified project is open source:</p>
        <div class="flex flex-wrap justify-center gap-4">
          <a href="https://github.com/mattieg93/coursera-study-assistant" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors" style="color: white;">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            Coursera Study Assistant
          </a>
        </div>
      </div>
    </div>`,
    category: 'personal',
    technologies: ['Python', 'Streamlit', 'Apple Vision Framework', 'EasyOCR', 'OpenCV', 'Ollama', 'Sentence Transformers', 'RAG', 'Playwright', 'Google Docs API', 'OAuth 2.0', 'python-dotenv', 'NumPy', 'Pillow', 'Asyncio'],
    image: '/assets/images/study-system.png',
    githubUrl: 'https://github.com/mattieg93/coursera-study-assistant',
    impact: {
      metric: 'Study Time Saved',
      value: '60%'
    },
    tags: ['AI', 'Python', 'Computer Vision', 'RAG', 'NLP', 'Automation', 'Education Technology', 'AI-Assisted Development', 'Local LLM', 'Streamlit', 'Ollama', 'Free Tutor'],
    featured: true,
    date: '2026-03-10'
  },
  {
    id: 'queer-data-network',
    title: 'Queer Data Network: Community Platform',
    description: 'Full-stack community platform for LGBTQ+ professionals in data and tech. Built from concept to production with React, Azure Functions, and MongoDB - featuring authentication, moderation tools, and privacy-first analytics.',
    longDescription: `<div class="space-y-6">
      <h2 class="text-2xl font-bold text-white mb-4">Building Community Infrastructure for LGBTQ+ Data Professionals</h2>
      
      <div class="bg-gradient-to-r from-purple-500/20 to-orange-500/20 rounded-lg p-6 border border-purple-500/30 mb-8 text-center">
        <p class="text-lg text-purple-200 font-medium mb-4">Live Community Platform</p>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="bg-gray-800/50 rounded-lg p-4">
            <div class="text-2xl font-bold text-purple-400 mb-2">1 Month</div>
            <div class="text-sm text-gray-300">Concept to production</div>
          </div>
          <div class="bg-gray-800/50 rounded-lg p-4">
            <div class="text-2xl font-bold text-orange-500 mb-2">18+ Endpoints</div>
            <div class="text-sm text-gray-300">Custom REST API</div>
          </div>
          <div class="bg-gray-800/50 rounded-lg p-4">
            <div class="text-2xl font-bold text-purple-500 mb-2">Privacy-First</div>
            <div class="text-sm text-gray-300">No third-party tracking</div>
          </div>
        </div>
      </div>
      
      <p class="mb-6">Queer Data Network is a community platform I designed and built for LGBTQ+ people working with data and technology. The site provides a space to share resources, discuss ethical data practices, organize events, and connect with others who understand both the technical and identity-specific challenges in this field.</p>
      
      <h3 class="text-xl font-bold text-white mb-4">The Problem I Solved</h3>
      
      <p class="mb-6">LGBTQ+ professionals in data and tech often face unique challenges: working with datasets that erase or misrepresent queer identities, navigating workplace cultures that aren't always inclusive, and lacking peer networks who understand both the technical work <em>and</em> the lived experience. I wanted to create a space that addressed these needs while prioritizing community safety and user privacy.</p>
      
      <div class="grid md:grid-cols-2 gap-6 my-8">
        <div class="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg p-6 border border-purple-500/30">
          <h3 class="text-xl font-semibold text-purple-300 mb-3">Technical Architecture</h3>
          <ul class="space-y-2 text-gray-300 text-sm">
            <li>• React 18.2 SPA with React Router</li>
            <li>• Azure Functions (Python) serverless backend</li>
            <li>• MongoDB via Azure Cosmos DB</li>
            <li>• Custom JWT authentication & RBAC</li>
            <li>• GitHub Actions CI/CD pipeline</li>
          </ul>
        </div>
        <div class="bg-gradient-to-br from-emerald-600/20 to-purple-500/20 rounded-lg p-6 border border-emerald-600/30">
          <h3 class="text-xl font-semibold text-emerald-300 mb-3">Community Features</h3>
          <ul class="space-y-2 text-gray-300 text-sm">
            <li>• Resource library with rich text editing</li>
            <li>• Community board (discussions, events)</li>
            <li>• Moderation tools & content reporting</li>
            <li>• Role-based permissions system</li>
            <li>• Anonymous analytics with 90-day retention</li>
          </ul>
        </div>
      </div>
      
      <h3 class="text-xl font-bold text-white mb-4">Key Technical Challenges</h3>
      
      <div class="space-y-4 mb-6">
        <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <h4 class="font-semibold text-purple-400 mb-2">Secure Authentication</h4>
          <p class="text-gray-300 text-sm">Implemented stateless JWT system with access and refresh tokens. All protected routes verify tokens server-side and extract user IDs from JWT to prevent spoofing—giving full control over security without OAuth dependencies.</p>
        </div>
        <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <h4 class="font-semibold text-purple-400 mb-2">Performance Optimization</h4>
          <p class="text-gray-300 text-sm">Built batched pageview tracker buffering up to 10 events client-side, flushing every 30 seconds or when full. Reduced API calls by ~90% while maintaining accurate analytics.</p>
        </div>
        <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <h4 class="font-semibold text-orange-500 mb-2">Content Security</h4>
          <p class="text-gray-300 text-sm">Integrated Quill.js for rich text editing with DOMPurify sanitization to prevent XSS attacks while allowing formatted content. Added comprehensive moderation tools with hide/unhide and role-based permissions.</p>
        </div>
        <div class="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <h4 class="font-semibold text-emerald-400 mb-2">Privacy-First Analytics</h4>
          <p class="text-gray-300 text-sm">Designed analytics for authenticated and anonymous users without tracking personal data. Session-based deduplication with 5-minute window and automatic 90-day expiration ensures privacy compliance.</p>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-6 border border-blue-500/30 my-8">
        <h3 class="text-lg font-semibold text-purple-300 mb-4">Full Feature Set</h3>
        <div class="grid md:grid-cols-2 gap-4">
          <ul class="space-y-2 text-gray-300 text-sm">
            <li class="flex items-center gap-3">
              <span class="w-2 h-2 bg-purple-400 rounded-full"></span>
              User registration & profile management
            </li>
            <li class="flex items-center gap-3">
              <span class="w-2 h-2 bg-emerald-600 rounded-full"></span>
              Resource library with CRUD operations
            </li>
            <li class="flex items-center gap-3">
              <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
              Community board (discussions, events, announcements)
            </li>
            <li class="flex items-center gap-3">
              <span class="w-2 h-2 bg-orange-500 rounded-full"></span>
              Reaction system & nested commenting
            </li>
          </ul>
          <ul class="space-y-2 text-gray-300 text-sm">
            <li class="flex items-center gap-3">
              <span class="w-2 h-2 bg-purple-400 rounded-full"></span>
              Admin moderation panel
            </li>
            <li class="flex items-center gap-3">
              <span class="w-2 h-2 bg-emerald-600 rounded-full"></span>
              User reporting & content safety tools
            </li>
            <li class="flex items-center gap-3">
              <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
              Terms acceptance flow
            </li>
            <li class="flex items-center gap-3">
              <span class="w-2 h-2 bg-emerald-400 rounded-full"></span>
              Analytics dashboard with engagement metrics
            </li>
          </ul>
        </div>
      </div>
      
      <h3 class="text-xl font-bold text-white mb-4">Design Philosophy</h3>
      
      <p class="mb-4">Building QDN required thinking holistically about product development—not just writing code, but understanding community needs, implementing safety mechanisms, and creating sustainable infrastructure. Key decisions:</p>
      
      <ul class="space-y-2 mb-6 text-gray-300">
        <li class="flex items-start gap-3">
          <span class="text-purple-500 mt-1">•</span>
          <span><strong>No third-party tracking or ads:</strong> Users own their data with transparent collection practices</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-orange-500 mt-1">•</span>
          <span><strong>Custom authentication:</strong> Full control over user experience without external dependencies</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-purple-500 mt-1">•</span>
          <span><strong>Serverless architecture:</strong> Sub-$10/month costs while maintaining scalability</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="text-emerald-400 mt-1">•</span>
          <span><strong>Privacy-first analytics:</strong> Anonymous tracking with automatic deletion</span>
        </li>
      </ul>
      
      <h3 class="text-xl font-bold text-white mb-4">Interactive Image Gallery</h3>
      
      <!--QDN_IMAGE_GALLERY-->
      
      <p class="mb-6">This project pushed me to architect a complete product from concept to production, implementing secure authentication patterns, building moderation infrastructure, and creating sustainable systems that can scale. The platform is live and accepting members—focused on growing the community while continuing to iterate on features.</p>
      
      <div class="text-center">
        <a href="https://queerdatanetwork.com" target="_blank" class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-orange-500 hover:from-purple-600 hover:to-orange-600 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105">
          Visit Queer Data Network
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
        </a>
      </div>
    </div>`,
    category: 'personal',
    technologies: ['React', 'Azure Functions', 'Python', 'MongoDB', 'Azure Cosmos DB', 'JWT Authentication', 'REST API', 'Azure Static Web Apps', 'GitHub Actions', 'Quill.js', 'DOMPurify', 'bcrypt'],
    image: '/assets/images/qdn_home.png',
    githubUrl: 'https://github.com/mattieg93/qdn_core',
    demoUrl: 'https://queerdatanetwork.com',
    impact: {
      metric: 'Timeline',
      value: '1 Month'
    },
    tags: ['Full-Stack Development', 'Community Platform', 'Python', 'React', 'Azure', 'MongoDB', 'Serverless', 'Authentication', 'LGBTQ+', 'Social Impact'],
    featured: true,
    date: '2026-01-07'
  },
  {
    id: 'shutdown-skies',
    title: 'Shutdown Skies: Aviation Impact Analysis',
    description: 'Advanced data science project analyzing government shutdown impacts on aviation operations using causal inference, time series forecasting, and economic modeling.',
    longDescription: `<div class="space-y-6">
      <h2 class="text-2xl font-bold text-white mb-4">Government Shutdowns vs Aviation Operations: A Data Science Investigation</h2>
      
      <div class="bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-lg p-6 border border-orange-500/30 mb-8 text-center">
        <p class="text-lg text-red-200 font-medium mb-4">🛫 Quantifying Hidden Costs of Political Decisions</p>
        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-gray-800/50 rounded-lg p-4">
            <div class="text-2xl font-bold text-orange-500 mb-2">$11+ Billion</div>
            <div class="text-sm text-gray-300">Economic impact of 2018-2019 shutdown</div>
          </div>
          <div class="bg-gray-800/50 rounded-lg p-4">
            <div class="text-2xl font-bold text-purple-500 mb-2">35 Days</div>
            <div class="text-sm text-gray-300">Longest government shutdown analyzed</div>
          </div>
        </div>
      </div>
      
      <p class="mb-6">What happens when political gridlock meets critical infrastructure? Shutdown Skies represents the first comprehensive data science analysis of how U.S. government shutdowns cascade through the aviation system, combining cutting-edge machine learning with causal inference to quantify impacts and predict recovery timelines.</p>
      
      <div class="grid md:grid-cols-3 gap-6 my-8">
        <div class="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <div class="text-2xl mb-3">📊</div>
          <h3 class="text-lg font-semibold text-orange-500 mb-2">Causal Impact Analysis</h3>
          <p class="text-gray-300 text-sm">Advanced statistical methods including difference-in-differences and synthetic controls to isolate shutdown effects from seasonal patterns.</p>
        </div>
        <div class="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <div class="text-2xl mb-3">🤖</div>
          <h3 class="text-lg font-semibold text-purple-500 mb-2">Predictive Modeling</h3>
          <p class="text-gray-300 text-sm">Machine learning ensemble combining Prophet, XGBoost, and LSTM networks to forecast recovery timelines with confidence intervals.</p>
        </div>
        <div class="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <div class="text-2xl mb-3">💰</div>
          <h3 class="text-lg font-semibold text-emerald-400 mb-2">Economic Quantification</h3>
          <p class="text-gray-300 text-sm">Comprehensive cost modeling including passenger time losses, airline operations, and ripple effects across the economy.</p>
        </div>
      </div>
      
      <h3 class="text-xl font-bold text-white mb-4">The Hidden Cost of Political Gridlock</h3>
      
      <p class="mb-6">Government shutdowns don't just affect federal employees—they create cascading disruptions across critical infrastructure. This project reveals how political decisions translate into measurable economic impacts through the aviation system. Using data from the Bureau of Transportation Statistics, FAA operations data, and economic indicators, we built the first predictive framework for understanding shutdown consequences.</p>
      
      <p class="mb-6">The analysis covers five major shutdowns from 1995-2019, examining over 2 million flight records across 15 major airports. Our models detect statistically significant increases in delay rates, quantify economic losses in real-time, and predict recovery patterns with 85% accuracy.</p>
      
      <div class="bg-gradient-to-r from-purple-500/20 to-orange-500/20 rounded-lg p-6 border border-purple-500/30 my-8">
        <h3 class="text-lg font-semibold text-purple-300 mb-4">Advanced Techniques Showcased</h3>
        <ul class="space-y-2 text-gray-300">
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 bg-purple-400 rounded-full"></span>
            Causal inference with difference-in-differences and synthetic control methods
          </li>
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 bg-orange-500 rounded-full"></span>
            Time series modeling with Prophet, ARIMA, and LSTM ensemble approaches
          </li>
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 bg-purple-500 rounded-full"></span>
            Advanced feature engineering with lag variables and rolling statistics
          </li>
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 bg-emerald-400 rounded-full"></span>
            Monte Carlo simulation for uncertainty quantification and scenario analysis
          </li>
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 bg-purple-400 rounded-full"></span>
            Interactive dashboard with real-time impact visualization and prediction tools
          </li>
        </ul>
      </div>
      
      <h3 class="text-xl font-bold text-white mb-4">Key Discoveries</h3>
      
      <div class="grid md:grid-cols-2 gap-6 my-6">
        <div class="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
          <h4 class="font-semibold text-orange-500 mb-2">📈 Impact Magnitude</h4>
          <p class="text-gray-300 text-sm">Flight delay rates increase by 45-85% during shutdowns, with security and air traffic control delays showing the highest spikes due to staffing shortages.</p>
        </div>
        <div class="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
          <h4 class="font-semibold text-purple-300 mb-2">⏱️ Recovery Patterns</h4>
          <p class="text-gray-300 text-sm">Average recovery time is 2.3x the shutdown duration, with hub airports taking significantly longer to return to baseline operations.</p>
        </div>
        <div class="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
          <h4 class="font-semibold text-emerald-300 mb-2">💸 Economic Scale</h4>
          <p class="text-gray-300 text-sm">Each shutdown day costs the aviation system an additional $127M beyond normal delay costs, compounding exponentially with duration.</p>
        </div>
        <div class="bg-gray-800/30 rounded-lg p-4 border border-gray-700/50">
          <h4 class="font-semibold text-purple-300 mb-2">🎯 Predictive Power</h4>
          <p class="text-gray-300 text-sm">Models achieve 85% accuracy in predicting recovery timelines, enabling proactive planning for airlines and airports during future shutdowns.</p>
        </div>
      </div>
      
      <p class="mb-6">This project demonstrates how advanced data science can illuminate the real-world consequences of policy decisions, providing stakeholders with quantitative tools for risk assessment and contingency planning. The methodology is reusable for analyzing other infrastructure disruptions and policy impacts.</p>
      
      <div class="text-center">
        <a href="https://shutdownskies.streamlit.app/" target="_blank" class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105">
          🚀 Explore Live Dashboard
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
        </a>
      </div>
    </div>`,
    category: 'personal',
    technologies: ['Python', 'Causal Inference', 'Time Series Analysis', 'Machine Learning', 'Prophet', 'XGBoost', 'Statistical Modeling', 'Economic Analysis', 'Interactive Dashboards', 'Policy Analysis'],
    image: '/assets/images/shutdown-skies.png',
    githubUrl: 'https://github.com/mattieg93/shutdown-skies',
    demoUrl: 'https://shutdownskies.streamlit.app/',
    impact: {
      metric: 'Economic Impact Quantified',
      value: '$11B+'
    },
    tags: ['Python', 'Causal Inference', 'Data Science', 'Government Policy', 'Aviation Analytics', 'Economic Modeling', 'Time Series', 'Machine Learning', 'Streamlit'],
    featured: false,
    date: '2024-11-14'
  },
  {
    id: 'mtg-ecorec',
    title: 'MTG EcoRec: AI-Powered Commander Deck Builder',
    description: 'Modern web application combining AI-powered Commander deck building with comprehensive MTG data analytics. Features Perplexity AI integration, real-time card analysis, and intelligent deck recommendations.',
    longDescription: `<div class="space-y-6">
      <h2 class="text-2xl font-bold text-white mb-4">AI-Powered Commander Deck Builder & MTG Analytics</h2>
      
      <div class="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-lg p-6 border border-emerald-500/30 mb-8 text-center">
        <p class="text-lg text-emerald-200 font-medium mb-4">🚀 Live Application - Azure Hosted</p>
        <a href="https://mtgecorec-b9fkfngtawggfpbw.westus3-01.azurewebsites.net/" target="_blank" class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-purple-600 hover:from-emerald-700 hover:to-purple-700 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105">
          🎯 Launch MTG EcoRec
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
        </a>
      </div>
      
      <p class="mb-6">A sophisticated web application designed for competitive players, data analysts, and MTG enthusiasts who want intelligent card recommendations backed by real-time analysis. Combines the power of AI with comprehensive data analytics to elevate your Commander game.</p>
      
      <div class="grid md:grid-cols-2 gap-6 my-8">
        <div class="bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg p-6 border border-purple-500/30">
          <div class="text-3xl mb-3">🤖</div>
          <h3 class="text-xl font-semibold text-purple-300 mb-3">AI Commander Deck Builder</h3>
          <ul class="space-y-2 text-gray-300 text-sm">
            <li>• Complete deck building interface with side-by-side layout</li>
            <li>• Perplexity AI integration for intelligent card suggestions</li>
            <li>• Visual card previews with automatic fallback handling</li>
            <li>• Smart export to Scryfall with manabase suggestions</li>
            <li>• Synergy detection and power level optimization</li>
          </ul>
        </div>
        <div class="bg-gradient-to-br from-emerald-500/20 to-blue-500/20 rounded-lg p-6 border border-emerald-500/30">
          <div class="text-3xl mb-3">�</div>
          <h3 class="text-xl font-semibold text-emerald-300 mb-3">Advanced Analytics</h3>
          <ul class="space-y-2 text-gray-300 text-sm">
            <li>• Paginated browser for 35,000+ MTG cards</li>
            <li>• Real-time data visualizations with Chart.js</li>
            <li>• Color, type, and set analysis</li>
            <li>• Interactive narrative with dynamic insights</li>
            <li>• Multi-filter search with live results</li>
          </ul>
        </div>
      </div>
      
      <h3 class="text-xl font-bold text-white mb-4">Technical Architecture</h3>
      
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <div class="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <h4 class="font-semibold text-purple-500 mb-3">Backend Infrastructure</h4>
          <ul class="space-y-1 text-gray-300 text-sm">
            <li>• Python Flask with async capabilities</li>
            <li>• Azure Cosmos DB (MongoDB API) - 35K+ cards</li>
            <li>• Perplexity AI for card recommendations</li>
            <li>• Scryfall API integration with real-time updates</li>
            <li>• Secure authentication with session management</li>
          </ul>
        </div>
        <div class="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <h4 class="font-semibold text-purple-400 mb-3">Frontend Experience</h4>
          <ul class="space-y-1 text-gray-300 text-sm">
            <li>• Bootstrap 5 with custom dark theme</li>
            <li>• Vanilla JavaScript with modular architecture</li>
            <li>• Chart.js for dynamic visualizations</li>
            <li>• Progressive enhancement & async loading</li>
            <li>• Mobile-first responsive design</li>
          </ul>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg p-6 border border-blue-500/30 my-8">
        <h3 class="text-lg font-semibold text-blue-300 mb-4">✅ Fully Implemented Features</h3>
        <div class="grid md:grid-cols-2 gap-4">
          <ul class="space-y-2 text-gray-300 text-sm">
            <li class="flex items-center gap-3">
              <span class="w-2 h-2 bg-green-400 rounded-full"></span>
              Complete Commander Deck Builder with AI recommendations
            </li>
            <li class="flex items-center gap-3">
              <span class="w-2 h-2 bg-green-400 rounded-full"></span>
              Visual card display with smart fallback handling
            </li>
            <li class="flex items-center gap-3">
              <span class="w-2 h-2 bg-green-400 rounded-full"></span>
              Export integration with Scryfall deck builder
            </li>
            <li class="flex items-center gap-3">
              <span class="w-2 h-2 bg-green-400 rounded-full"></span>
              Authentication system with secure sessions
            </li>
            <li class="flex items-center gap-3">
              <span class="w-2 h-2 bg-green-400 rounded-full"></span>
              Advanced card browser with filtering
            </li>
          </ul>
          <ul class="space-y-2 text-gray-300 text-sm">
            <li class="flex items-center gap-3">
              <span class="w-2 h-2 bg-green-400 rounded-full"></span>
              Interactive data visualizations with Chart.js
            </li>
            <li class="flex items-center gap-3">
              <span class="w-2 h-2 bg-green-400 rounded-full"></span>
              Responsive design with mobile optimization
            </li>
            <li class="flex items-center gap-3">
              <span class="w-2 h-2 bg-green-400 rounded-full"></span>
              Azure deployment with Infrastructure as Code
            </li>
            <li class="flex items-center gap-3">
              <span class="w-2 h-2 bg-green-400 rounded-full"></span>
              Progressive loading with optimized performance
            </li>
            <li class="flex items-center gap-3">
              <span class="w-2 h-2 bg-green-400 rounded-full"></span>
              Perplexity AI integration for strategic insights
            </li>
          </ul>
        </div>
      </div>
      
      <div class="bg-gradient-to-r from-orange-600/20 to-red-600/20 rounded-lg p-6 border border-orange-500/30 my-8">
        <h3 class="text-lg font-semibold text-orange-300 mb-4">🚧 Future Roadmap</h3>
        <div class="grid md:grid-cols-2 gap-4">
          <ul class="space-y-2 text-gray-300 text-sm">
            <li>• Advanced deck management (save/load/share)</li>
            <li>• Price tracking with TCG Player integration</li>
            <li>• Meta analysis and competitive insights</li>
          </ul>
          <ul class="space-y-2 text-gray-300 text-sm">
            <li>• Deck testing and goldfish simulation</li>
            <li>• Machine learning meta predictions</li>
            <li>• Community features and deck sharing</li>
          </ul>
        </div>
      </div>
      
      <p class="mb-6">From casual deck building to competitive analysis, MTG EcoRec provides the tools and insights needed to optimize gameplay. The application showcases modern full-stack development with AI integration, scalable cloud architecture, and sophisticated data analytics.</p>
      
      <div class="text-center">
        <div class="flex flex-wrap justify-center gap-4">
          <a href="https://mtgecorec-b9fkfngtawggfpbw.westus3-01.azurewebsites.net/" target="_blank" class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105">
            🚀 Launch Application
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
          <a href="https://github.com/mattieg93/mtgecorec" target="_blank" class="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105" style="color: white;">
            📚 View Source Code
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        </div>
      </div>
    </div>`,
    category: 'personal',
    technologies: ['Python Flask', 'Azure Cosmos DB', 'Perplexity AI', 'Bootstrap 5', 'Chart.js', 'Scryfall API', 'Azure App Service', 'Authentication Systems', 'Progressive Web Apps', 'Infrastructure as Code'],
    image: '/assets/images/mtg-ecorec-visualizations.png',
    demoUrl: 'https://mtgecorec-b9fkfngtawggfpbw.westus3-01.azurewebsites.net/',
    githubUrl: 'https://github.com/mattieg93/mtgecorec',
    impact: {
      metric: 'Cards Analyzed',
      value: '110,000+'
    },
    tags: ['Python', 'AI', 'Azure', 'Full-Stack Development', 'API Integration', 'Data Science', 'Market Analysis', 'Gaming Economy', 'Live Demo'],
    featured: true,
    date: '2025-10-15'
  },
  {
    id: 'musical-weather',
    title: 'Musical Weather',
    description: 'Intelligent weather-music recommendation system that analyzes regional weather history, forecasts, and seasonality to generate personalized playlists featuring local artists.',
    longDescription: `<div class="space-y-6">
      <h2 class="text-2xl font-bold text-white mb-4">Where Weather Meets Music: A Data-Driven Discovery Engine</h2>
      
      <div class="bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-lg p-6 border border-blue-500/30 mb-8 text-center">
        <p class="text-lg text-blue-200 font-medium mb-4">🎵 Experience Music Through Weather Patterns</p>
        <div class="grid md:grid-cols-2 gap-4">
          <a href="https://github.com/mattieg93/Musical-Weather" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 text-sm">
            🚀 Explore Application
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
          <a href="https://github.com/mattieg93/Musical-Weather-Notebooks" target="_blank" class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 text-sm">
            📊 Analysis & Models
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
            </svg>
          </a>
        </div>
      </div>
      
      <p class="mb-6">What if your playlist could perfectly capture today's weather mood? Musical Weather transforms meteorological data into musical discovery, creating the world's first intelligent weather-music recommendation system. By analyzing decades of regional weather patterns and mapping them against seasonal music trends, it delivers eerily accurate soundtracks for your day.</p>
      
      <div class="grid md:grid-cols-3 gap-6 my-8">
        <div class="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <div class="text-2xl mb-3">🌡️</div>
          <h3 class="text-lg font-semibold text-purple-500 mb-2">Historical Weather Intelligence</h3>
          <p class="text-gray-300 text-sm">Deep analysis of regional weather patterns to understand how today's forecast compares to decades of historical data.</p>
        </div>
        <div class="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <div class="text-2xl mb-3">🎯</div>
          <h3 class="text-lg font-semibold text-purple-400 mb-2">Predictive Modeling</h3>
          <p class="text-gray-300 text-sm">Statistical models score weather events and map them to music sentiment, creating scientifically-backed playlist recommendations.</p>
        </div>
        <div class="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <div class="text-2xl mb-3">🎵</div>
          <h3 class="text-lg font-semibold text-emerald-400 mb-2">Local Artist Discovery</h3>
          <p class="text-gray-300 text-sm">Algorithmically highlights emerging and local artists while considering seasonal patterns and mood-weather correlations.</p>
        </div>
      </div>
      
      <h3 class="text-xl font-bold text-white mb-4">The Science Behind the Sound</h3>
      
      <p class="mb-6">Musical Weather begins with comprehensive historical weather analysis for any given region, building a statistical baseline of what "normal" weather looks like for each day of the year. When you check today's forecast, the system calculates exactly how unusual or typical today's conditions are compared to historical patterns.</p>
      
      <p class="mb-6">This weather deviation score becomes the key to musical discovery. Using advanced sentiment analysis and machine learning models, the system maps weather patterns to musical characteristics—understanding that a surprisingly warm autumn day calls for different music than a typical rainy Tuesday. The magic happens in the intersection: seasonal music trends, regional artist preferences, and real-time weather psychology.</p>
      
      <div class="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-6 border border-purple-500/30 my-8">
        <h3 class="text-lg font-semibold text-purple-300 mb-4">Technical Innovation Highlights</h3>
        <ul class="space-y-2 text-gray-300">
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 bg-purple-400 rounded-full"></span>
            Statistical weather modeling with T-score analysis for forecast deviation detection
          </li>
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
            Multi-API integration (Spotify, Last.fm, OpenWeatherMap) with robust data pipeline
          </li>
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 bg-emerald-400 rounded-full"></span>
            Advanced sentiment analysis of music lyrics correlated with weather psychology
          </li>
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 bg-purple-400 rounded-full"></span>
            Geographic music discovery engine prioritizing local and emerging artists
          </li>
          <li class="flex items-center gap-3">
            <span class="w-2 h-2 bg-blue-400 rounded-full"></span>
            Seasonal variation algorithms accounting for cultural music listening patterns
          </li>
        </ul>
      </div>
      
      <p class="mb-6">The system's intelligence shines in its ability to reach beyond popular artists, systematically discovering local talent and lesser-known gems that match the current weather-mood profile. By analyzing multiple deviations from mainstream popularity, it introduces users to their next favorite artist while maintaining the perfect atmospheric soundtrack.</p>
      
      <div class="bg-gradient-to-r from-blue-600/20 to-emerald-600/20 rounded-lg p-6 border border-blue-500/30 my-8">
        <h3 class="text-lg font-semibold text-blue-300 mb-4">Dual Repository Architecture</h3>
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <h4 class="font-semibold text-blue-200 mb-2">🚀 Production Application</h4>
            <p class="text-gray-300 text-sm mb-3">Full-stack Flask web application with cloud deployment, real-time API integration, and production-ready infrastructure.</p>
            <a href="https://github.com/mattieg93/Musical-Weather" target="_blank" class="text-purple-500 hover:text-purple-400 text-sm">View Application Repository →</a>
          </div>
          <div>
            <h4 class="font-semibold text-emerald-200 mb-2">📊 Research & Analysis</h4>
            <p class="text-gray-300 text-sm mb-3">Jupyter notebooks proving model effectiveness, statistical analysis, and comprehensive data science methodology validation.</p>
            <a href="https://github.com/mattieg93/Musical-Weather-Notebooks" target="_blank" class="text-emerald-400 hover:text-emerald-300 text-sm">View Analysis Repository →</a>
          </div>
        </div>
      </div>
      
      <p class="mb-6">Musical Weather represents the convergence of meteorology, music psychology, and data science—proving that with the right algorithms, even the weather can become your personal DJ. Whether it's discovering Seattle grunge on a characteristically drizzly day or finding the perfect indie folk for an unexpectedly sunny winter afternoon, this system makes every weather pattern a gateway to musical discovery.</p>
    </div>`,
    category: 'personal',
    technologies: ['Python', 'Flask', 'API Integration', 'Machine Learning', 'Statistical Analysis', 'Sentiment Analysis', 'Data Visualization', 'Cloud Deployment', 'Web Scraping'],
    image: '/assets/images/api_start.png',
    githubUrl: 'https://github.com/mattieg93/Musical-Weather',
    impact: {
      metric: 'Data Sources Integrated',
      value: '6+ APIs'
    },
    tags: ['Python', 'Flask', 'Machine Learning', 'API Integration', 'Weather Analysis', 'Music Discovery', 'Data Science', 'Statistical Modeling'],
    featured: true,
    date: '2024-08-20'
  },
  {
    id: 'gdp-analysis',
    title: 'GDP vs Congressional Representation',
    description: 'Does a state\'s contribution differ that much from their representative population?',
    longDescription: 'Statistical analysis examining the relationship between state GDP contributions and congressional representation. Used R for data analysis and visualization to explore whether economic contribution aligns with political representation in the US system.',
    category: 'academic',
    technologies: ['R', 'Statistical Analysis', 'Data Visualization', 'ggplot2'],
    image: '/assets/images/gdp_analysis_act_v_pred_r_v_d.png',
    githubUrl: 'https://github.com/mattieg93/gdp-representation-analysis',
    demoUrl: 'https://grahammr93.medium.com/can-us-state-gdp-determine-congressional-representation-e3cda57285f3?sk=35e77d96c3a28c7f1a084875e48a2f19',
    impact: {
      metric: 'Medium Views',
      value: '1,200+'
    },
    tags: ['Statistical Analysis', 'Government Data', 'R', 'Political Science'],
    featured: false,
    date: '2023-09-15'
  },
  {
    id: 'rfm-analysis',
    title: 'RFM Customer Segmentation',
    description: 'Customer segmentation analysis using RFM methodology for targeted marketing',
    longDescription: 'Implemented RFM (Recency, Frequency, Monetary) analysis to segment customers and improve marketing strategies. The analysis identified high-value customer segments and provided actionable insights for personalized marketing campaigns.',
    category: 'academic',
    technologies: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Customer Analytics'],
    image: '/assets/images/rfm-graph.png',
    githubUrl: 'https://github.com/mattieg93/rfm-analysis',
    impact: {
      metric: 'Marketing ROI',
      value: '+45%'
    },
    tags: ['Python', 'Data Science', 'Customer Analytics', 'Marketing', 'Segmentation', 'Business Intelligence'],
    featured: false,
    date: '2023-08-10'
  },
  {
    id: 'sentiment-analysis',
    title: 'Social Media Sentiment Analysis',
    description: 'Natural language processing for brand sentiment monitoring',
    longDescription: 'Built a sentiment analysis system to monitor brand mentions across social media platforms. Used natural language processing techniques to classify sentiment and provide real-time insights for brand management and customer service teams.',
    category: 'academic',
    technologies: ['Python', 'NLTK', 'TextBlob', 'Twitter API', 'Flask'],
    image: '/assets/images/sentiment.png',
    githubUrl: 'https://github.com/mattieg93/sentiment-analysis',
    impact: {
      metric: 'Accuracy',
      value: '87%'
    },
    tags: ['Python', 'NLP', 'Sentiment Analysis', 'Social Media', 'Machine Learning'],
    featured: false,
    date: '2023-06-20'
  },
  {
    id: 'apache-spark-setup',
    title: 'Apache Spark on Ubuntu VM Setup',
    description: 'Comprehensive guide for setting up Apache Spark development environment',
    longDescription: 'Created a detailed tutorial and implementation guide for setting up Apache Spark on Ubuntu virtual machines. Covers installation, configuration, performance optimization, and troubleshooting for big data processing workflows.',
    category: 'personal',
    technologies: ['Apache Spark', 'Ubuntu', 'Big Data', 'DevOps', 'Scala'],
    image: '/assets/images/spark_vm.png',
    demoUrl: 'https://grahammr93.medium.com/closing-the-gap-setting-up-an-ubuntu-vm-for-apache-spark-5b64dcfd6923?sk=af5a47561a4847e9cf12664ca556d3ab',
    impact: {
      metric: 'Tutorial Views',
      value: '2,500+'
    },
    tags: ['Big Data', 'Apache Spark', 'Ubuntu', 'DevOps', 'Tutorial'],
    featured: false,
    date: '2024-02-10'
  },
  {
    id: 'ott-statistics-api',
    title: 'OTT: Statistics Made Accessible',
    description: 'Python API making traditional statistical concepts more accessible for practitioners',
    longDescription: 'Developed an innovative API that bridges the gap between traditional statistical textbooks and modern Python implementation. Makes complex statistical proofs and concepts more approachable for data science practitioners.',
    category: 'personal',
    technologies: ['Python', 'API Development', 'Statistics', 'Documentation'],
    image: '/assets/images/api_start.png',
    demoUrl: 'https://grahammr93.medium.com/making-traditional-data-analytics-more-accessible-in-python-aa765ec85eb?sk=517e9c61e57729516d4a3a939d4cc8e8',
    githubUrl: 'https://github.com/mattieg93/ott-statistics',
    impact: {
      metric: 'GitHub Stars',
      value: '45+'
    },
    tags: ['API Development', 'Statistics', 'Python', 'Education', 'Open Source'],
    featured: false,
    date: '2024-01-25'
  }
];

// ─── Merge runtime overrides from Admin portal ───────────────────────────────
// projects-overrides.json is written by the admin UI via GitHub API.
// • overrides.projects  – new or edited projects (takes precedence over baseProjects)
// • overrides.hidden    – IDs to exclude from all public views
//
// The merge order: admin-added/edited first, then base (so admin edits win on ID collision).
const _ov   = projectOverridesData as { hidden: string[]; projects: Project[] };
const _ovIds = new Set(_ov.projects.map((p: Project) => p.id));
const _hiddenIds = new Set(_ov.hidden);

export const projects: Project[] = [
  ..._ov.projects,
  ...baseProjects.filter((p: Project) => !_ovIds.has(p.id)),
].map((p: Project) => ({
  ...p,
  hidden: _hiddenIds.has(p.id) ? true : p.hidden,
}));

/** The original hand-coded projects (no overrides applied). Used by the Admin portal. */
export { baseProjects };

// BLOG POSTS DATA
// To add a new blog post, copy an existing post object and modify the values
export const blogPosts: BlogPost[] = [
  {
    id: 'intro-to-data-science',
    title: 'Getting Started with Data Science: A Beginner\'s Guide',
    excerpt: 'Essential steps and resources for aspiring data scientists looking to break into the field.',
    content: `# Getting Started with Data Science

Data science is one of the most exciting and rapidly growing fields in technology today. Whether you're a complete beginner or looking to transition from another field, this guide will help you understand what it takes to become a data scientist.

## What is Data Science?

Data science is an interdisciplinary field that combines statistics, programming, and domain expertise to extract insights from data. It involves collecting, cleaning, analyzing, and interpreting large amounts of data to help organizations make informed decisions.

## Essential Skills for Data Scientists

### 1. Programming Languages
- **Python**: The most popular language for data science
- **R**: Great for statistical analysis and visualization
- **SQL**: Essential for database management and queries

### 2. Statistical Knowledge
- Descriptive and inferential statistics
- Probability theory
- Hypothesis testing
- Regression analysis

### 3. Data Visualization
- Creating meaningful charts and graphs
- Tools like Matplotlib, Seaborn, Tableau
- Storytelling with data

## Getting Started Steps

1. **Learn the Fundamentals**: Start with statistics and programming basics
2. **Practice with Real Data**: Work on projects using public datasets
3. **Build a Portfolio**: Showcase your work on GitHub and personal websites
4. **Network**: Connect with other data professionals
5. **Keep Learning**: The field evolves rapidly, so continuous learning is key

Data science is a rewarding field that offers the opportunity to solve real-world problems with data. Start with the basics, practice regularly, and don't be afraid to tackle challenging projects!`,
    author: 'Mattie Graham',
    date: '2024-01-15',
    tags: ['Data Science', 'Career', 'Beginner Guide'],
    featured: true,
    readTime: '8 min'
  },
  {
    id: 'python-data-analysis',
    title: 'Python Libraries Every Data Analyst Should Know',
    excerpt: 'A comprehensive overview of essential Python libraries for data analysis and visualization.',
    content: `# Python Libraries Every Data Analyst Should Know

Python has become the go-to language for data analysis, and for good reason. Its rich ecosystem of libraries makes it incredibly powerful for working with data. Here's a guide to the most essential libraries every data analyst should master.

## Data Manipulation Libraries

### Pandas
The backbone of data analysis in Python. Pandas provides data structures and functions needed to work with structured data.

\`\`\`python
import pandas as pd
df = pd.read_csv('data.csv')
df.head()
\`\`\`

### NumPy
Fundamental package for scientific computing with Python. It provides support for arrays, mathematical functions, and linear algebra operations.

## Visualization Libraries

### Matplotlib
The foundational plotting library in Python. While it requires more code for basic plots, it offers complete control over every aspect of your visualizations.

### Seaborn
Built on top of Matplotlib, Seaborn provides a high-level interface for creating attractive statistical visualizations.

### Plotly
Great for creating interactive visualizations that can be embedded in web applications.

## Machine Learning Libraries

### Scikit-learn
The most popular machine learning library in Python, offering simple and efficient tools for data mining and analysis.

### TensorFlow/PyTorch
For deep learning applications, these libraries provide the tools needed to build and train neural networks.

## Getting Started

1. Start with Pandas and NumPy for data manipulation
2. Learn Matplotlib for basic plotting
3. Move to Seaborn for statistical visualizations
4. Explore Scikit-learn for machine learning

Each of these libraries has excellent documentation and a large community, making them great choices for data analysis projects.`,
    author: 'Mattie Graham',
    date: '2024-02-20',
    tags: ['Python', 'Data Analysis', 'Libraries', 'Tutorial'],
    featured: false,
    readTime: '12 min'
  },
  {
    id: 'real-estate-analytics',
    title: 'Analytics in Commercial Real Estate: A Data-Driven Approach',
    excerpt: 'How data analytics is transforming commercial real estate decision-making and investment strategies.',
    content: `# Analytics in Commercial Real Estate: A Data-Driven Approach

The commercial real estate industry has traditionally relied on intuition and experience for decision-making. However, the integration of data analytics is revolutionizing how we approach investment, management, and strategic planning in CRE.

## The Power of Data in CRE

### Market Analysis
- Demographic trends and population growth
- Economic indicators and employment data
- Supply and demand dynamics
- Comparable property analysis

### Portfolio Optimization
- Risk assessment across different markets
- Performance benchmarking
- Space utilization analytics
- Cost optimization opportunities

## Key Analytics Applications

### 1. Predictive Modeling
Using historical data to forecast future market conditions, rental rates, and property values.

### 2. Location Scoring
Developing standardized metrics to evaluate and compare different locations based on multiple factors.

### 3. Portfolio Dashboard
Creating real-time visibility into portfolio performance with key metrics and alerts.

## Tools and Technologies

- **Python/R**: For statistical analysis and modeling
- **SQL**: For data extraction and manipulation  
- **Tableau/Power BI**: For visualization and reporting
- **GIS Software**: For spatial analysis and mapping

## The Future of CRE Analytics

As more data becomes available and tools become more sophisticated, we can expect to see:
- More accurate predictive models
- Real-time market intelligence
- Automated decision-making systems
- Enhanced risk management

The integration of analytics in commercial real estate is not just a trend—it's becoming essential for competitive advantage in today's market.`,
    author: 'Mattie Graham',
    date: '2024-03-05',
    tags: ['Real Estate', 'Analytics', 'Commercial', 'Data Science'],
    featured: true,
    readTime: '10 min'
  }
];

// SOCIAL LINKS DATA
// To update your social media links, modify the URLs below
export const socialLinks: SocialLink[] = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/mattie-graham/',
    platform: 'linkedin'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/mattieg93',
    platform: 'github'
  },
  {
    name: 'Email',
    url: 'mailto:eight-amens76@icloud.com',
    platform: 'email'
  },
  // Add more social links by copying the structure above
  // Available platforms: 'linkedin', 'github', 'twitter', 'email', 'instagram'
];

// PERSONAL INFO DATA
// Update your personal information here
export const personalInfo = {
  name: 'Mattie Graham',
  title: 'AI & Analytics Engineer',
  email: 'eight-amens76@icloud.com',
  location: 'United States',
  bio: `I build AI-powered data systems - from RAG pipelines and computer vision to full-stack analytics platforms. 
        I turn messy data and manual processes into automated, production-ready tools that deliver measurable outcomes.
        Available for Upwork projects in AI engineering, data pipelines, analytics tooling, and full-stack ML applications.`,
  skills: [
    'Python', 'SQL', 'Azure', 'RAG / Vector Search', 'LLM Integration',
    'Machine Learning', 'Computer Vision', 'React', 'TypeScript',
    'Data Pipelines', 'Statistical Analysis', 'API Development'
  ],
  availability: 'Available for Upwork projects - AI engineering, data pipelines, analytics tooling'
};

// FEATURED CONTENT CONFIGURATION
// Control what content appears in featured sections
export const featuredConfig = {
  maxFeaturedProjects: 2,
  maxFeaturedBlogPosts: 2,
  showProjectImpactMetrics: true,
  showBlogReadTime: true
};