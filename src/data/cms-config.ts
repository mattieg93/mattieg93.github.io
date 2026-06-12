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
    id: 'mtg-ecorec',
    title: 'MTG EcoRec: Archetype-Aware Commander Deck Engine',
    description: 'A full-stack Commander deck builder that solves a structural problem the incumbents cannot: popularity-based recommenders are self-reinforcing, archetype-blind, and never surface genuinely better but lesser-known cards. EcoRec combines a 7-component deterministic scorer, Voyage AI semantic embeddings + MongoDB Atlas Vector Search across 110,000 cards, a Monte Carlo goldfish simulator that grades the deck it just built, and a full collection management system with decklist import — wrapped in a freemium Stripe + PayPal SaaS.',
    longDescription: `<div class="space-y-8">

      <h2>The Problem Existing Tools Cannot Solve</h2>
      <p>Magic: The Gathering has ~30,000 unique cards in active use and ~50 million Commander players globally. Every existing deck-building tool — EDHREC, Moxfield, Archidekt — answers the same question the same way: <strong>what do other people put in decks with this commander?</strong> They aggregate decklists and surface the most-played cards. That is a pure popularity signal with a compounding structural flaw:</p>
      <ul>
        <li><strong>Self-reinforcing.</strong> Popular cards get recommended → more decks include them → inclusion rate climbs → they get recommended even more. Better but lesser-known cards never surface.</li>
        <li><strong>Archetype-blind.</strong> An aristocrats deck and a token-swarm deck look identical to a popularity ranker if they share staples like Sol Ring. The tools don't understand <em>why</em> a card belongs.</li>
        <li><strong>Cannot discover obscurity.</strong> A card printed two months ago, or a $0.50 card that does the job of a $30 staple, has no inclusion history. Popularity tools cannot recommend it regardless of how good it is.</li>
        <li><strong>Cannot grade what it builds.</strong> Existing tools hand you a list and walk away. They cannot tell you whether the deck will actually cast its spells on curve.</li>
      </ul>
      <p><strong>No existing tool combines semantic understanding of card text, archetype mechanics, vector similarity for obscurity detection, <em>and</em> a full Monte Carlo goldfish simulator that grades the resulting deck. That gap is what MTG EcoRec is built to fill.</strong></p>

      <h2>What EcoRec Does Differently</h2>

      <h3>1. Archetype-First 7-Component Scoring Engine</h3>
      <p>The recommendation engine is a deterministic, fully auditable scorer — not a neural network, not a popularity lookup. Each card receives a score from seven interpretable components: Synergy (30%), Archetype Fit (25%), Base Power (15%), Combo Potential (15%), Mana Curve (10%), Type Balance (5%), and a hard Color Identity filter. The synergy engine extracts 60+ MTG-specific keywords from oracle text using regex, then computes Jaccard similarity between the card's mechanic set and the commander's mechanic profile. Archetype weights encode domain knowledge about which mechanics matter for 40+ named playstyles.</p>

      <h3>2. Vectorized Obscurity Detection</h3>
      <p>The obscurity scoring layer is the product moat. Voyage AI <code>voyage-4-lite</code> generates 1024-dimensional text embeddings of all 110,000+ MTG cards. MongoDB Atlas <code>$vectorSearch</code> performs ANN cosine similarity at query time against per-commander averaged profiles built from EDHREC top decklists. Cards in the top 200 by vector similarity with &lt;20% EDHREC inclusion and cost ≤ their popular equivalent receive a 1.5–2.0× score multiplier and a "Hidden Gem" badge. <strong>This combination — archetype-aware scoring + semantic vector search + obscurity detection — cannot be replicated by adding a filter to a popularity table.</strong></p>

      <h3>3. Budget-Aware Architecture</h3>
      <p>Budget is enforced end-to-end, not as a post-hoc filter. Three-tier price resolution (live Scryfall cache → embedded prices → sentinel 999.0), per-card cap of budget/50 pre-filters the pool, and a post-assembly swap pass guarantees no over-budget cards survive. A $50 budget yields a coherent 99-card deck — not a premium deck with 10 cards swapped out.</p>

      <h3>4. Monte Carlo Goldfish Simulator</h3>
      <p>After a deck is built, the user can run it through a full solitaire simulator that plays N games (default 500, calibrated empirically) and produces a graded report across six categories: Mana Health, Tempo, Throughput, Early Game, Board Development, and Graveyard Recursion. Grading is bracket-aware — a casual bracket-2 deck is graded against more forgiving curves than an optimized bracket-4 cEDH deck. <strong>This is the closest thing the EDH ecosystem has to a "compile and run" step for a deck.</strong></p>

      <h2>Wave 6: Production Hardening &amp; Simulation Calibration</h2>
      <p>After deploying to Railway, settled RSS was 823 MB against a 512 MB target. The root cause was glibc arena fragmentation: glibc defaults to one malloc arena per CPU thread, and Railway's container reports 22+ threads. Setting <code>MALLOC_ARENA_MAX=2</code> reduced RSS to 558 MB — a 32% reduction, confirmed on Railway via <code>/admin/_memory</code>. Additional observability was added: <code>tracemalloc</code> gated behind <code>ENABLE_TRACEMALLOC=1</code>, and <code>/admin/_memory</code> extended with RSS, peak RSS, and thread tracking.</p>
      <p>Simulation game count was calibrated empirically using a 6-deck panel run at N ∈ {50, 100, 200, 300, 500, 1000} with 5 deterministic seeds per N. Three of six decks converged by N=50–200; three were genuine boundary decks unstable at any N. <strong>Conclusion: N=500 is the optimal default</strong> — 46% faster than N=1000 with equivalent information for solidly-in-band decks. Tier-aware caps were added (Premium: 750, Pro: 1000) and the <code>_job_store</code> was hardened with a 50-entry hard cap and oldest-first eviction.</p>

      <h2>Collection Management System</h2>
      <p>A full personal card inventory system built as the foundation for Phase 2 (building decks from owned cards) and Phase 3 (preference-weighting in recommendations). Features include a virtualized infinite-scroll grid with <code>IntersectionObserver</code>, per-card normal/foil quantity tracking with auto-delete at zero, a slide-in detail panel with deck cross-references, chip-based color/type/CMC filters with per-color active glow, bulk edit mode with multi-select tiles and indeterminate select-all, and decklist import from Archidekt and Moxfield.</p>

      <h2>Import System</h2>
      <p>A four-source decklist import pipeline: Archidekt JSON API with section routing, Archidekt .txt, Moxfield .txt, and manual paste. The flow follows a four-step sequence: Parse → Resolve (Scryfall ID match, then case-insensitive name fallback) → Preview (three-step modal) → Confirm (bulk-collect cards and save as My Deck). Basic land quantity expansion, DFC land detection via <code>card_faces</code> fallback, and commander field normalization were delivered in the import fixes sprint.</p>

      <h2>System Architecture</h2>
      <p>The data pipeline ingests Scryfall bulk JSON (~110k cards), enriches with detected mechanics and archetype flags, generates 1024-dim Voyage embeddings, builds per-commander averaged profiles, and precomputes 500 cards × 32 color identities = 16,000 cached scores for sub-100ms recommendation cold-starts. The Flask application exposes ~73 routes across recommendation, deck management, collection, card browse, commerce, and admin surfaces. The goldfish simulator is a self-contained pure-Python engine with frozen dataclasses for deterministic state, running ~500 games/second.</p>

      <h2>Technical Stack</h2>
      <ul>
        <li><strong>Backend:</strong> Flask 3.1 + Python 3.12; <code>pymongo</code> against MongoDB Atlas or Azure Cosmos DB — no vendor lock-in</li>
        <li><strong>Embeddings:</strong> Voyage AI <code>voyage-4-lite</code> (1024-dim); resumable pipeline</li>
        <li><strong>Vector search:</strong> MongoDB Atlas <code>$vectorSearch</code> with graceful degradation if unavailable</li>
        <li><strong>Scoring:</strong> Deterministic 7-component rules engine — no ML, fully auditable</li>
        <li><strong>Simulator:</strong> Pure Python Monte Carlo goldfish engine; ~500 games/sec</li>
        <li><strong>Combos:</strong> Commander Spellbook API (3,000+ infinite combos)</li>
        <li><strong>Auth:</strong> Flask sessions + PBKDF2-SHA256 (100k iterations, 64-char salt)</li>
        <li><strong>Payments:</strong> Stripe + PayPal (subscription + one-time shop)</li>
        <li><strong>Email:</strong> Resend (verification, password reset, order/shipping)</li>
        <li><strong>Monitoring:</strong> Sentry SDK with graceful fallback</li>
        <li><strong>Hosting:</strong> Railway.com (Gunicorn, devcontainer-mirrored env)</li>
      </ul>

      <h2>Product Architecture — Freemium SaaS</h2>
      <ul>
        <li><strong>Free</strong> — 3 deck generations/day, 5 saved decks, goldfish simulation upsell only</li>
        <li><strong>Premium ($5/mo)</strong> — 100 decks/month, unlimited saved decks, 10 sims/month</li>
        <li><strong>Pro ($20/mo)</strong> — unlimited generations, unlimited saves, 50 sims/month, collection management</li>
      </ul>
      <p>Stripe Checkout + Customer Portal, PayPal subscription billing, webhook handlers for every lifecycle event, and Resend email notifications. A physical-product shop (deck boxes, DragonShield sleeves) sits on the same Stripe infrastructure with full order lifecycle tracking. A complete <code>/admin/*</code> portal provides dashboards for revenue, orders, users, products, and subscription auditing across both billing providers.</p>

      <h2>Defensive Engineering Patterns</h2>
      <ul>
        <li><strong>Graceful degradation</strong> — any missing external dependency (Voyage AI, Atlas vector index, Sentry) silently falls back</li>
        <li><strong>Identity-keyed TTL cache</strong> — card pool queries cached by color identity; bounded to 32 buckets</li>
        <li><strong>Frozen dataclasses</strong> — <code>SimCard</code> is <code>frozen=True, slots=True</code> to prevent state leak between games</li>
        <li><strong>MDFC enrichment</strong> — 21,852 cards re-enriched with <code>produced_mana</code> + <code>card_faces</code> from Scryfall</li>
        <li><strong>Two-pass deficit-weighted basics</strong> — guarantees ≥1 basic per color, remainder weighted by color deficit</li>
        <li><strong>Sentinel pricing</strong> — unpriced Reserved List cards get 999.0 so they fail budget filters</li>
        <li><strong>Pre-filter floors</strong> — non-basic Lands get a keyword score floor to survive pool trim</li>
      </ul>

      <h2>Operational Tooling</h2>
      <ul>
        <li><strong>scripts/refresh_cards.py</strong> — full 3-phase Scryfall sync: download → stream-upsert + enrichment → Voyage AI embeddings</li>
        <li><strong>scripts/create_user.py</strong> — provisions accounts directly in MongoDB, bypassing email verification; generates memorable leet-speak passwords</li>
        <li><strong>tools/diagnose_deck.py</strong> — comprehensive deck diagnostic CLI with land breakdown, dead-card detection, and optional goldfish run</li>
        <li><strong>tools/calibrate_sim_games.py</strong> — empirical simulation game-count calibration</li>
      </ul>

      <h2>Why This Project Matters</h2>
      <p>EcoRec is the most complete demonstration I have of the intersection I work at every day: <strong>business strategy meets data engineering meets applied AI</strong>.</p>
      <ul>
        <li><strong>Strategy:</strong> identified a real, structural gap in a 50M-player market that incumbents cannot close without rebuilding their data foundations</li>
        <li><strong>Data engineering:</strong> 110k-card embedding pipeline, Atlas Vector Search index, precomputed score cache, three-tier price resolution, MDFC enrichment</li>
        <li><strong>Applied AI:</strong> semantic vector search + deterministic scoring layered together — interpretable enough to debug, smart enough to surface non-obvious recommendations</li>
        <li><strong>Production system:</strong> ~73 Flask routes, full auth, full payments, full admin portal, full shop — not a demo</li>
        <li><strong>Solo full-stack build:</strong> data pipeline, ML/vector infrastructure, recommendation engine, simulator, collection management, import system, web UI, payments, e-commerce, admin, ops tooling — all owned end-to-end</li>
      </ul>
    </div>`,
    category: 'personal',
    technologies: [
      'Python', 'Flask', 'MongoDB Atlas', 'Atlas Vector Search', 'Voyage AI Embeddings',
      'Azure Cosmos DB', 'Stripe', 'PayPal', 'Resend', 'Sentry',
      'Commander Spellbook API', 'Scryfall API', 'Railway', 'PBKDF2-SHA256'
    ],
    image: '/assets/images/mtg-ecorec-visualizations.png',
    demoUrl: 'https://mtgecorec.com',
    githubUrl: 'https://github.com/mattieg93/mtgecorec',
    impact: {
      metric: 'Cards Indexed',
      value: '110,000+'
    },
    tags: [
      'Python', 'Flask', 'MongoDB Atlas', 'Vector Search', 'Embeddings', 'Voyage AI',
      'Monte Carlo Simulation', 'Recommendation Systems', 'Freemium SaaS', 'Stripe',
      'Full-Stack', 'AI', 'Collection Management', 'Live Demo'
    ],
    featured: true,
    date: '2026-06-12'
  },
  {
    id: 'shep-ollama-manager',
    title: 'Shep: Ollama Model Manager',
    description: 'A modern macOS GUI for managing local Ollama AI models - discover, install, monitor, and configure models without touching the terminal. Built with React, FastAPI, and Tailwind CSS.',
longDescription: `<div class="space-y-8">

      <h2>The Problem</h2>
      <p>Local AI model management with Ollama has no GUI. Managing models requires knowing daemon commands, VRAM constraints, environment variable syntax, and model identifiers &mdash; terminal-only workflows that create real friction for developers and make Ollama inaccessible to anyone who has not already memorised the CLI flags. Shep is the management layer that should have shipped with Ollama.</p>

      <h2>What Shep Does</h2>
      <ul>
        <li><strong>Model Dashboard</strong> &mdash; real-time list of installed models with size, VRAM requirements, and run status.</li>
        <li><strong>Model Discovery</strong> &mdash; curated library of 12+ popular models with live streaming download progress and user-initiated cancellation.</li>
        <li><strong>Daemon Control</strong> &mdash; start and stop the Ollama daemon directly from the GUI with health-status indicators.</li>
        <li><strong>Settings</strong> &mdash; configure custom model storage paths, keep-alive timeouts, and reset to defaults. Persists changes to <code>~/.zshrc</code> via regex substitution.</li>
        <li><strong>Single-command launch</strong> &mdash; <code>./launch.sh</code> detects virtual environments, installs frontend and backend dependencies, polls for API readiness, and opens the app. Zero manual steps after clone.</li>
      </ul>

      <h2>Architecture</h2>
      <p>React 18 frontend communicates with a FastAPI backend that wraps the Ollama daemon API. HTTP streaming delivers real-time download progress without polling or WebSocket overhead. Daemon management uses macOS <code>launchctl</code> with a subprocess fallback for environments where launchctl is unavailable.</p>

      <h2>Engineering Notes</h2>
      <ul>
        <li>Fixed false &ldquo;download cancelled&rdquo; messages by tracking an explicit <code>isCancelled</code> flag that distinguishes user cancellation from natural stream completion &mdash; the streaming API sends the same event for both.</li>
        <li>Resolved a settings-reset bug caused by JavaScript falsy coercion silently converting empty strings to <code>undefined</code> during a spread operation.</li>
        <li>Backend readiness polling in the launch script prevents the frontend from starting before the API is responsive &mdash; no race conditions on first boot.</li>
      </ul>

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
    title: 'Coursera Study Assistant: Private On-Device AI Study Partner',
    description: 'A fully local, zero-cost AI study partner for Coursera learners. A React + FastAPI application that automatically captures lecture notes, answers multi-select quiz questions with per-option reasoning via Apple Silicon MLX inference, and feeds a RAG knowledge base — all without sending a byte to a third-party server.',
    longDescription: `<div class="space-y-8">

      <h2>The Problem With Passive Online Learning</h2>
      <p>Coursera gives you access to world-class university courses, but it cannot make you understand them. Videos play, transcripts scroll, and by exam time the material has evaporated. Students juggle multiple courses simultaneously, each with its own vocabulary and notation, and there is no professor on call at 2 a.m. when a concept stops making sense. Multi-select quiz questions are particularly unforgiving — the correct answer isn't just the right option, it's the right set of options, and confusing "select all that apply" with "pick one" costs full credit.</p>
      <p>The Coursera Study Assistant closes that gap. It is a <strong>fully local, zero-cost AI study partner</strong> that automates the mechanical work of learning — capturing notes, retrieving context, explaining options — so the student's cognitive budget goes toward understanding rather than logistics.</p>

      <h2>What It Does — The Four-Step Study Loop</h2>
      <ul>
        <li><strong>Capture</strong> — the Coursera Agent navigates a module on your behalf, pulls every transcript and reading, summarises it with a local LLM, and writes structured notes into a Google Doc you own. You walk away with a searchable reference document after every study session without typing a word.</li>
        <li><strong>Understand</strong> — the Study Assistant uses Retrieval-Augmented Generation against those exact notes. When you ask "why does backpropagation use the chain rule?" the system retrieves the most relevant lecture segments and grounds its answer in course-specific language, not generic internet text.</li>
        <li><strong>Drill</strong> — paste or screenshot any quiz question. A vision LLM extracts the structured question data directly from the image. The RAG engine answers each option individually with a <code>CORRECT / INCORRECT</code> verdict and reasoning. When the AI is wrong, correct it in plain English; that feedback is stored and improves future answers.</li>
        <li><strong>Repeat</strong> — everything runs on Apple Silicon via MLX. No API keys, no per-token cost, no data sent to a third-party server. A student on a plane can still study.</li>
      </ul>

      <h2>V2.0: Full Architectural Rewrite</h2>
      <p>The original system was a Streamlit app backed by Ollama. It worked, but both choices imposed ceilings: Streamlit's component model made real-time streaming awkward, and Ollama required a separate always-running daemon. V2.0 replaces both.</p>
      <ul>
        <li><strong>Frontend:</strong> React 19 + TypeScript SPA built with Vite. Tailwind CSS for styling, wouter for lightweight routing, Zustand for persistent global state (model selection, dark mode, active doc), TanStack Query for server state and background refetch. Three pages — Study, Agent, Knowledge Base — with a sidebar that stays coherent across navigation.</li>
        <li><strong>Backend:</strong> FastAPI + Uvicorn replaces Streamlit. Async from the ground up. HTTP endpoints for chat, extraction, and knowledge-base management; WebSocket endpoints for real-time agent streaming; SSE for per-question quiz-answer streaming.</li>
        <li><strong>Inference:</strong> Ollama replaced by <strong>MLX</strong> (<code>mlx-lm</code> for text, <code>mlx-vlm</code> for vision). Models are lazy-loaded on first call and cached in-process — no external daemon, no startup overhead after warm-up. Default model: IBM Granite 3.3 8B, 4-bit quantised.</li>
        <li><strong>Per-course isolation:</strong> Each Google Doc gets its own <code>study_db_{doc_id}.pkl</code> vector index. Switching courses in the sidebar reloads the correct index in-memory — there is no bleed between a machine-learning course and a data-structures course.</li>
      </ul>

      <h2>Quiz Extraction Pipeline — Vision-First, Not OCR</h2>
      <p>The original system used Apple Vision Framework for OCR, then parsed the resulting text with regex. V2.0 replaces this with a multimodal LLM pipeline that understands the screenshot semantically, not character-by-character.</p>
      <ul>
        <li>Screenshot bytes → <code>chat_vision(_VISION_PROMPT, img)</code> → raw JSON with structured question objects</li>
        <li><code>_parse_vision_raw()</code> strips markdown fences, repairs invalid backslash escapes, unwraps dict-wrapped arrays</li>
        <li><code>_normalise_questions()</code> removes Coursera checkbox/radio glyphs (<code>□ ■ ○ ●</code>), fixes LaTeX artefacts, upgrades <code>"single"</code> → <code>"multi"</code> when the stem contains "select all that apply" or "which two/three"</li>
        <li>Retry pass: any question with fewer than 2 options extracted triggers a second vision call with the first response as context; results are merged where the retry produced more options</li>
        <li>Remaining questions below threshold get an <code>extraction_warning</code> displayed as an amber alert in the UI</li>
      </ul>
      <p><strong>Multi-select support covers A–Z</strong> (not just A–D). The RAG prompt format was redesigned to emit per-option <code>CORRECT/INCORRECT</code> verdicts with explicit over-selection and under-selection guards, and the answer comparison uses set equality with normalisation so "A, D" and "D and A" are equivalent.</p>

      <h2>RAG Study Engine</h2>
      <p>The knowledge base is a lightweight NumPy + pickle vector store — no ChromaDB dependency, no Pydantic version conflicts. <code>all-MiniLM-L6-v2</code> sentence-transformer embeddings are loaded lazily on first query.</p>
      <p>For each quiz question, the retriever builds one query per option (up to 8) plus one for the question stem — up to 10 combined results, deduplicated. The prompt injects the retrieved lecture text, the full option list, an <code>expected_count</code> hint if the stem states it ("select all 3"), and explicit warnings against under-selection. Each correction the student provides is stored as a special document keyed to the original question text and reingested into the index — accuracy compounds over a course.</p>

      <h2>Coursera Agent — WebSocket Streaming</h2>
      <p>The agent uses Playwright connected to a running Chromium instance via CDP (port 9222). The student logs into Coursera once manually; the agent reuses that session from a dedicated profile, so no credentials are ever passed to the code.</p>
      <p>In V2.0, the agent subprocess stdout is piped over a WebSocket (<code>/ws/agent/{job_id}</code>) instead of being read line-by-line in a Streamlit callback. The WebSocket handler uses <code>asyncio.create_subprocess_exec</code> (non-blocking) and parses structured emoji-tagged progress lines into typed JSON events:</p>
      <ul>
        <li><code>{"type": "item", "itemType": "VIDEO", "current": 3, "total": 12}</code></li>
        <li><code>{"type": "stage", "stageNum": 2, "label": "model summarising..."}</code></li>
        <li><code>{"type": "alldone"}</code></li>
      </ul>
      <p>The React frontend accumulates these events into per-lecture progress bars that update in real time. The textbook-aware notes path detects when a lecture maps to a known textbook chapter and switches to a parametric generation mode — the LLM draws on its trained knowledge of the book rather than summarising a transcript.</p>

      <h2>SSE Quiz Answer Streaming</h2>
      <p>A full quiz of 10 questions previously waited for all answers to complete before rendering anything. V2.0 uses Server-Sent Events via FastAPI's <code>StreamingResponse</code>: each question is answered, and its result frame emitted, as soon as the LLM finishes it. The frontend renders each answer card as it arrives. Long quizzes give immediate feedback instead of a loading spinner.</p>

      <h2>Technical Stack</h2>
      <ul>
        <li><strong>Frontend:</strong> React 19, TypeScript, Vite, Tailwind CSS v4, wouter, Zustand, TanStack Query v5, lucide-react</li>
        <li><strong>Backend:</strong> FastAPI, Uvicorn, Python 3.11+</li>
        <li><strong>LLM inference:</strong> <code>mlx-lm</code> (text) + <code>mlx-vlm</code> (vision) — Apple Silicon native, in-process model cache</li>
        <li><strong>Default model:</strong> <code>mlx-community/granite-3.3-8b-instruct-4bit</code></li>
        <li><strong>Embeddings:</strong> sentence-transformers <code>all-MiniLM-L6-v2</code> (384-dim cosine similarity)</li>
        <li><strong>Web automation:</strong> Playwright + Chromium CDP</li>
        <li><strong>Notes output:</strong> Google Docs API v1 (service account, no user OAuth flow)</li>
        <li><strong>PDF ingestion:</strong> PyMuPDF (<code>fitz</code>) for text extraction and chunking</li>
      </ul>

      <h2>Why This Project Belongs in This Portfolio</h2>
      <p>V1 was a Streamlit script. V2 is a production-grade full-stack application. The V2.0 rewrite required designing a real API contract between frontend and backend, replacing a synchronous UI framework with an async server that supports three different real-time patterns (HTTP streaming, SSE, WebSocket) on different data paths, and migrating LLM inference off an external daemon onto in-process native hardware acceleration. The domain is education, but the engineering problems are the same ones that appear in any data product: latency, streaming, state isolation, and graceful degradation when an inference call fails.</p>
    </div>`,
    category: 'personal',
    technologies: [
      'React 19', 'TypeScript', 'Vite', 'FastAPI', 'Python',
      'MLX', 'mlx-lm', 'mlx-vlm', 'Apple Silicon',
      'Sentence Transformers', 'RAG', 'Playwright',
      'Google Docs API', 'TanStack Query', 'Zustand', 'Tailwind CSS', 'PyMuPDF'
    ],
    image: '/assets/images/study-system.png',
    githubUrl: 'https://github.com/mattieg93/coursera-study-assistant',
    impact: {
      metric: 'Infrastructure cost — runs entirely on-device',
      value: '$0'
    },
    tags: ['AI', 'Python', 'React', 'FastAPI', 'MLX', 'RAG', 'Vision LLM', 'Apple Silicon', 'Local LLM', 'Education Technology', 'WebSocket', 'SSE'],
    featured: true,
    date: '2026-05-29'
  },
  {
    id: 'queer-data-network',
    title: 'Queer Data Network: Community Platform',
    description: 'Full-stack community platform for LGBTQ+ professionals in data and tech. Built from concept to production with React, Azure Functions, and MongoDB — featuring authentication, role-based moderation, A/B-tested policy rollouts, LangChain/RAG-powered resource discovery, and privacy-first analytics.',

longDescription: `<div class="space-y-8">

      <h2>Why This Platform Exists</h2>
      <p>LGBTQ+ professionals in data and tech navigate challenges that general professional communities don&rsquo;t address: working with datasets that erase or misrepresent queer identities, operating in cultures that aren&rsquo;t always inclusive, and lacking peer networks who understand both the technical work and the lived experience. Queer Data Network is a purpose-built community platform that treats those needs as first-class product requirements &mdash; not afterthoughts.</p>

      <h2>From Concept to Production in One Month</h2>
      <p>The scope was deliberately full: authentication, role-based permissions, a resource library, community board, content moderation, privacy-first analytics, and a working CI/CD pipeline. The one-month constraint forced architectural clarity. Every decision was made to maximise surface area shipped rather than infrastructure elegance.</p>

      <h2>Technical Architecture</h2>
      <ul>
        <li><strong>Frontend:</strong> React 18.2 SPA with React Router &mdash; component-driven, stateful, accessible.</li>
        <li><strong>Backend:</strong> Azure Functions (Python) &mdash; serverless, event-driven, scales to zero between bursts.</li>
        <li><strong>Database:</strong> MongoDB via Azure Cosmos DB (MongoDB API) &mdash; flexible document model for community content.</li>
        <li><strong>Auth:</strong> Custom stateless JWT system &mdash; access + refresh tokens, server-side verification on all protected routes, user IDs extracted from JWT payload (no session store, no OAuth dependency).</li>
        <li><strong>CI/CD:</strong> GitHub Actions deploys to Azure Static Web Apps on every push to <code>main</code>.</li>
      </ul>

      <h2>Community Features</h2>
      <ul>
        <li>Resource library with Quill.js rich-text editor and DOMPurify sanitization (XSS prevention without sacrificing formatted content)</li>
        <li>Community board: discussions, events, announcements, nested commenting, reactions</li>
        <li>Role-based permissions enforced at the API layer: member / moderator / admin</li>
        <li>Moderation tools: hide/unhide content, user reporting, admin panel for pending reports</li>
        <li>Terms acceptance flow gates access to community content</li>
        <li>18+ custom REST endpoints across auth, content, analytics, and moderation surfaces</li>
      </ul>

      <h2>Experimentation &amp; AI Features</h2>
      <ul>
        <li><strong>A/B testing and frequentist hypothesis testing</strong> evaluate moderation policy changes and feature rollouts &mdash; decisions about community rules are treated as experiments with measurable outcomes, not instinct calls.</li>
        <li><strong>LangChain/RAG</strong> powers conversational resource discovery &mdash; members can ask questions in natural language and get answers grounded in the curated resource library rather than returning a generic search list.</li>
      </ul>

      <h2>Privacy-First Analytics</h2>
      <p>The pageview tracker was built from scratch. It buffers up to 10 events client-side and flushes every 30 seconds or when full &mdash; reducing API calls ~90% compared to per-page tracking. Session-based deduplication (5-minute window) prevents double-counts without storing personally identifiable data. All analytics records expire after 90 days automatically.</p>
      <p><strong>No third-party tracking scripts. No ad pixels. No external analytics services.</strong> Users own their data.</p>

      <h2>Image Gallery</h2>

      <!--QDN_IMAGE_GALLERY-->

      <h2>Design Philosophy</h2>
      <p>Every technical decision had a community-safety analogue. Custom auth gives full control over rate limiting and account lockout without handing credentials to a third party. DOMPurify protects members from malicious content without disabling rich formatting. Privacy-first analytics let the platform understand growth without surveilling members. Serverless infrastructure keeps costs under $10/month while maintaining the ability to absorb traffic spikes during events or press coverage.</p>

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
longDescription: `<div class="space-y-8">

      <h2>The Question</h2>
      <p>Government shutdowns are usually quantified in terms of federal employee furloughs and direct spending pauses. The harder question is: what do they cost the systems those employees operate? Shutdown Skies is a data science investigation into how U.S. government shutdowns cascade through the aviation system, using causal inference and ensemble time-series forecasting to quantify impact and predict recovery.</p>

      <h2>Scope and Data</h2>
      <p>Five major shutdowns from 1995 to 2019, over 2 million flight records across 15 major airports, Bureau of Transportation Statistics operations data, FAA staffing records, and economic indicators. The 2018&ndash;2019 shutdown &mdash; 35 days, the longest in U.S. history &mdash; is the primary case study.</p>

      <h2>Methods</h2>
      <ul>
        <li><strong>Causal inference:</strong> difference-in-differences and synthetic control methods isolate shutdown effects from seasonal patterns and macroeconomic noise &mdash; answering &ldquo;what would have happened without the shutdown&rdquo; rather than just &ldquo;what happened.&rdquo;</li>
        <li><strong>Time-series ensemble:</strong> Prophet, ARIMA, and LSTM combined to model baseline delay rates and forecast recovery timelines with confidence intervals. The ensemble outperforms any single method at the two-week prediction horizon.</li>
        <li><strong>Feature engineering:</strong> lag variables, rolling statistics, day-of-week seasonality, and shutdown-duration interaction terms.</li>
        <li><strong>Monte Carlo simulation:</strong> uncertainty quantification and scenario analysis across different shutdown durations and recovery profiles.</li>
        <li><strong>Economic quantification:</strong> passenger time-cost modeling, airline operations disruption, and downstream multiplier effects.</li>
      </ul>

      <h2>Key Findings</h2>
      <ul>
        <li>Flight delay rates increase 45&ndash;85% during shutdowns, with security and air traffic control delays spiking highest due to staffing shortages.</li>
        <li>Each day of shutdown costs the aviation system an additional $127M beyond normal delay costs &mdash; and the cost compounds non-linearly with duration.</li>
        <li>Average recovery time is <strong>2.3&times; the shutdown duration</strong>. Hub airports take significantly longer to return to baseline than regional airports.</li>
        <li>The 2018&ndash;2019 shutdown produced over $11B in total economic impact across the aviation ecosystem.</li>
        <li>The ensemble model achieves 85% accuracy predicting recovery timelines, enabling proactive contingency planning.</li>
      </ul>

      <h2>Deliverable</h2>
      <p>An interactive Streamlit dashboard providing real-time impact visualization and a prediction tool: enter a shutdown duration, receive a modelled delay rate trajectory and recovery timeline with confidence bounds. Published on GitHub; live demo available.</p>

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
    id: 'musical-weather',
    title: 'Musical Weather',
    description: 'Intelligent weather-music recommendation system that analyzes regional weather history, forecasts, and seasonality to generate personalized playlists featuring local artists.',
longDescription: `<div class="space-y-8">

      <h2>The Premise</h2>
      <p>Weather shapes mood. Mood shapes music preference. If you can model the relationship between meteorological conditions and listening behaviour, you can build a recommendation engine that surfaces the right music for the right day &mdash; and uses that weather signal to prioritise underplayed local artists over the same recycled top-40 playlist.</p>

      <h2>How It Works</h2>
      <ul>
        <li><strong>Historical weather baseline:</strong> For a given location, decades of weather data build a statistical profile of what &ldquo;normal&rdquo; looks like on any given day. Today&rsquo;s forecast is expressed as a T-score deviation from that baseline &mdash; not just &ldquo;rainy&rdquo; but &ldquo;2.1 standard deviations colder and wetter than typical for mid-October.&rdquo;</li>
        <li><strong>Mood mapping:</strong> The deviation score feeds a sentiment-to-audio-features model that maps meteorological conditions to musical characteristics (tempo, valence, energy, acousticness), backed by analysis of listening patterns correlated with weather psychology research.</li>
        <li><strong>Local artist discovery:</strong> The recommendation engine systematically deprioritises mainstream popularity signals to surface regional and emerging artists whose catalogue matches the mood-weather profile. The goal is discovery, not replay.</li>
        <li><strong>Seasonal adjustment:</strong> Cultural listening patterns shift across seasons independently of weather. The model accounts for both axes &mdash; the weather deviation <em>and</em> the time of year.</li>
      </ul>

      <h2>Technical Stack</h2>
      <ul>
        <li><strong>Application:</strong> Flask web app with production cloud deployment</li>
        <li><strong>APIs:</strong> Spotify (audio features, artist data, playlist creation), Last.fm (listening history and regional charts), OpenWeatherMap (current + historical weather)</li>
        <li><strong>Statistical modeling:</strong> Python + Pandas for weather baseline construction, T-score normalisation, and sentiment-weather correlation analysis</li>
        <li><strong>NLP:</strong> Lyric sentiment analysis correlated with weather-mood profiles</li>
      </ul>

      <h2>Dual Repository Structure</h2>
      <p>The project lives across two repositories: the production Flask application with API integrations and deployment infrastructure, and a separate Jupyter notebook repository with the full statistical methodology, model validation, and correlation analysis that proves the weather-music signal. The notebooks document the data science; the app ships it.</p>

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
    longDescription: `<div class="space-y-8">

      <h2>The Question</h2>
      <p>The U.S. House apportions seats by population. But population and economic output are not the same thing. Does a state&rsquo;s share of national GDP have any predictive relationship with its congressional delegation &mdash; and if not, what does the gap look like across party lines?</p>

      <h2>Method</h2>
      <p>State-level GDP, population, and congressional representation data assembled and analyzed in R. Linear regression tests whether economic output predicts seat share after controlling for population. Residuals identify states that are over- or under-represented relative to their economic contribution. <strong>ggplot2</strong> visualizations break results out by party affiliation to surface whether partisan patterns are detectable in the representation gap.</p>

      <h2>Findings</h2>
      <p>GDP correlates with population more strongly than with representation &mdash; by constitutional design. The more interesting signal is in the residuals: high-GDP, low-population states are systematically underrepresented on economic terms, while several low-GDP, high-population states benefit from constitutional seat minimums. Published on Medium; 1,200+ reads.</p>

    </div>`,
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
    longDescription: `<div class="space-y-8">

      <h2>The Method</h2>
      <p>RFM segmentation scores every customer on three axes: <strong>Recency</strong> (how recently they purchased), <strong>Frequency</strong> (how often), and <strong>Monetary value</strong> (how much they spent). The resulting segments &mdash; Champions, At-Risk, Lost, New Customers &mdash; tell a marketing team exactly who to invest in and how.</p>

      <h2>Implementation</h2>
      <p>Python + Pandas for data preparation and RFM score calculation. Customers are quantile-ranked on each dimension and assigned segment labels from composite scores. Matplotlib and Seaborn visualize segment distribution, purchasing behavior clusters, and the revenue concentration curve (the top 20% of customers typically generate 60&ndash;80% of revenue).</p>

      <h2>Business Impact</h2>
      <p>The segmentation directly informed re-engagement campaign targeting. Separating &ldquo;At-Risk High-Value&rdquo; customers (high monetary, declining recency) from genuinely churned customers enabled precision targeting &mdash; winning back the customers worth winning back, and not wasting spend on lost causes. Measured campaign ROI improvement: <strong>+45%</strong>.</p>

    </div>`,
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
    longDescription: `<div class="space-y-8">

      <h2>The Problem</h2>
      <p>Brand teams cannot manually read thousands of social media mentions per day. They need a system that classifies tone automatically, flags urgent negative sentiment, and produces a queryable record of how public perception shifts over time.</p>

      <h2>Implementation</h2>
      <p>A Python pipeline connects to the Twitter API to stream brand mentions in real-time. Each tweet passes through a two-stage NLP classifier: <strong>TextBlob</strong> provides fast polarity scoring; a fine-tuned <strong>NLTK</strong> Naive Bayes model handles edge cases where polarity alone is ambiguous (sarcasm, mixed sentiment). A Flask backend stores classified mentions and serves a dashboard showing sentiment trends over time.</p>

      <h2>Performance</h2>
      <p>87% classification accuracy on a held-out test set of labeled brand mentions. The model performs best on clearly positive or negative text; accuracy on neutral and ambiguous tweets is lower, which the dashboard surfaces explicitly rather than hiding. Negative-sentiment spikes trigger alerts &mdash; the use case that matters most for real-time brand management.</p>

    </div>`,
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
    longDescription: `<div class="space-y-8">

      <h2>The Gap</h2>
      <p>Apache Spark documentation assumes a working cluster. Setting up a local Spark environment on an Ubuntu VM &mdash; for development, testing, or learning &mdash; involves a non-obvious sequence of Java version pinning, environment variable configuration, memory tuning, and PySpark integration steps that aren&rsquo;t documented in one place. This guide fills that gap.</p>

      <h2>What the Guide Covers</h2>
      <ul>
        <li>Ubuntu VM provisioning and base dependency installation</li>
        <li>Java version selection and <code>JAVA_HOME</code> configuration (Spark version compatibility matters)</li>
        <li>Spark download, extraction, and <code>SPARK_HOME</code> / <code>PATH</code> setup</li>
        <li>PySpark integration with a virtual environment &mdash; avoiding the common <code>PYTHONPATH not set</code> failure</li>
        <li>Memory and executor configuration for single-node development workloads</li>
        <li>Spark UI access from the host machine through the VM&rsquo;s network interface</li>
        <li>Troubleshooting: the five most common setup failures and their fixes</li>
      </ul>

      <h2>Reception</h2>
      <p>Published on Medium. <strong>2,500+ views</strong> &mdash; one of the more-read practical Spark setup guides in the data engineering community, linked from several data engineering learning paths.</p>

    </div>`,
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
    longDescription: `<div class="space-y-8">

      <h2>The Problem With Statistics Textbooks</h2>
      <p>Statistics textbooks prove theorems. Python documentation describes function signatures. Neither bridges the gap: given a concept you understand mathematically, how do you implement it correctly in code? Over the Table (OTT) is a Python API designed to answer that question &mdash; wrapping classical statistical tests and proofs in an interface that surfaces the reasoning, not just the result.</p>

      <h2>Design Goals</h2>
      <ul>
        <li><strong>Transparency:</strong> every function explains what it is computing and why, not just what number it returns</li>
        <li><strong>Correctness:</strong> implementations verified against textbook derivations and reference implementations</li>
        <li><strong>Accessibility:</strong> designed for practitioners who learned statistics in courses but implement it in code</li>
      </ul>

      <h2>Coverage</h2>
      <p>Descriptive statistics, hypothesis testing (t-tests, chi-square, ANOVA), probability distributions, regression diagnostics, and correlation measures. Each module includes worked examples drawn from the statistical proofs that motivate the test &mdash; connecting the math students learned to the code they need to write.</p>

      <h2>Reception</h2>
      <p><strong>45+ GitHub stars.</strong> Published tutorial on Medium documenting the design philosophy and use cases, referenced in several data analytics learning curricula.</p>

    </div>`,
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
