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
    description: 'Commander has 50 million players and a broken recommender problem: every tool surfaces the same popular cards because popularity compounds itself. EcoRec breaks that loop with a 7-component deterministic scorer, Voyage AI semantic embeddings + MongoDB Atlas Vector Search across 110,000 cards, a Monte Carlo simulator that grades the deck it just built, and a full collection management system — wrapped in a freemium Stripe + PayPal SaaS.',
    longDescription: `<div class="space-y-8">

      <h2>The Problem Existing Tools Cannot Solve</h2>
      <p>Magic: The Gathering's Commander format has ~30,000 unique cards in active rotation and ~50 million players globally. The deck-building problem is not card selection — it's signal quality. Every major tool (EDHREC, Moxfield, Archidekt) answers the same question the same way: <strong>what do other people put in decks with this commander?</strong> They aggregate community decklists and surface the most-played cards. That is a pure popularity signal, and popularity compounds.</p>
      <ul>
        <li><strong>Self-reinforcing.</strong> Popular cards get recommended → more decks include them → inclusion rate climbs → they get recommended even more. Cards that are cheaper, more synergistic, or simply newer never break through.</li>
        <li><strong>Archetype-blind.</strong> An aristocrats deck and a token-swarm deck look identical to a popularity ranker if they share staples like Sol Ring. The tools don't understand <em>why</em> a card belongs.</li>
        <li><strong>Cannot discover obscurity.</strong> A $0.50 card that does the job of a $30 staple has no inclusion history. Popularity tools cannot recommend it regardless of how good it is.</li>
        <li><strong>Cannot grade what it builds.</strong> Existing tools hand you a list and walk away. They cannot tell you whether the deck will actually cast its spells on curve.</li>
      </ul>
      <p><strong>No existing tool combines semantic understanding of card text, archetype mechanics, vector similarity for obscurity detection, <em>and</em> a full Monte Carlo goldfish simulator that grades the resulting deck. That gap is what MTG EcoRec is built to fill.</strong></p>

      <h2>What EcoRec Does Differently</h2>

      <h3>1. Archetype-First 7-Component Scoring Engine</h3>
      <p>The scorer is deterministic and fully auditable — not a neural network, not a popularity lookup. Every recommendation can be explained in plain English. Each card receives a composite score from seven interpretable components: Synergy (30%), Archetype Fit (25%), Base Power (15%), Combo Potential (15%), Mana Curve (10%), Type Balance (5%), and a hard Color Identity filter. The synergy engine extracts 60+ MTG-specific keywords from oracle text via regex, then computes Jaccard similarity between the card's mechanic set and the commander's mechanic profile. Archetype weights encode domain knowledge about which mechanics matter for 40+ named playstyles (stax, reanimator, combo, voltron, and more).</p>

      <h3>2. Vectorized Obscurity Detection — The Product Moat</h3>
      <p>Popularity-beating requires knowing which cards are semantically similar to the popular ones but underexposed. <code>voyage-4-lite</code> generates 1024-dimensional text embeddings of all 110,000+ MTG cards. MongoDB Atlas <code>$vectorSearch</code> performs ANN cosine similarity at query time against per-commander averaged profiles built from EDHREC's top decklists. Cards in the top 200 by vector similarity with &lt;20% EDHREC inclusion and cost ≤ their popular equivalent receive a 1.5–2.0× score multiplier and a "Hidden Gem" badge — these are the cards that play like staples but cost $0.50 and appear in 3% of decks. <strong>This combination — archetype-aware scoring + semantic vector search + obscurity detection — cannot be replicated by adding a filter to a popularity table.</strong> It requires a fundamentally different data architecture.</p>

      <h3>3. Budget as a Constraint, Not a Filter</h3>
      <p>Budget is enforced end-to-end. Three-tier price resolution (live Scryfall cache → embedded prices → sentinel 999.0), a per-card cap of budget/50 pre-filters the candidate pool, and a post-assembly swap pass guarantees no over-budget cards survive final assembly. A $50 budget yields a coherent, playable 99-card deck — not a premium list with 10 cards swapped out after the fact.</p>

      <h3>4. Monte Carlo Goldfish Simulator</h3>
      <p>After a deck is assembled, the user runs it through a full solitaire simulator: N games (default 500) producing a graded report across six categories: Mana Health, Tempo, Throughput, Early Game, Board Development, and Graveyard Recursion. Grading is bracket-aware — a casual bracket-2 deck is evaluated against more forgiving curves than a cEDH bracket-4 build. <strong>This is the closest thing the EDH ecosystem has to a "compile and run" step for a deck</strong> — you don't just get a list, you get a performance report on the list.</p>
      <p>N=500 is the empirically optimal default — calibrated across a 6-deck panel run at N ∈ {50, 100, 200, 300, 500, 1000} with 5 deterministic seeds per N. It is 46% faster than N=1000 with equivalent information for solidly-in-band decks. Three of six test decks converged by N=50–200; three were genuine boundary cases that remained unstable at any N, confirming the need for tier-aware caps (Premium: 750, Pro: 1000).</p>

      <h2>Wave 6: Production Hardening &amp; Observability</h2>
      <p>After deploying to Railway, settled RSS was 823 MB against a 512 MB target. Root cause: glibc arena fragmentation — glibc defaults to one malloc arena per CPU thread, and Railway's container reported 22+ threads. Setting <code>MALLOC_ARENA_MAX=2</code> reduced RSS to 558 MB (−32%), confirmed via <code>/admin/_memory</code>. <code>tracemalloc</code> is gated behind <code>ENABLE_TRACEMALLOC=1</code>; the memory endpoint now tracks RSS, peak RSS, and thread count. The <code>_job_store</code> was hardened with a 50-entry hard cap and oldest-first eviction.</p>

      <h2>Collection Management System</h2>
      <p>A full personal card inventory system — built as the foundation for Phase 2 (build decks from owned cards) and Phase 3 (preference-weighting in recommendations). A virtualized infinite-scroll grid with <code>IntersectionObserver</code> handles 110,000-card performance. Per-card normal/foil quantity tracking with auto-delete at zero, a slide-in detail panel with deck cross-references, chip-based color/type/CMC filters with per-color active glow, and bulk edit mode with multi-select tiles and indeterminate select-all.</p>

      <h2>Import System</h2>
      <p>A four-source decklist import pipeline: Archidekt JSON API with section routing, Archidekt .txt, Moxfield .txt, and manual paste. The flow follows a four-step sequence: Parse → Resolve (Scryfall ID match, then case-insensitive name fallback) → Preview (three-step modal) → Confirm. Basic land expansion, DFC land detection via <code>card_faces</code> fallback, and commander field normalization are handled in the import layer.</p>

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
      <p>EcoRec is the most complete demonstration I have of the intersection I operate at every day: <strong>business strategy × data engineering × applied AI</strong> — where the technical choices are justified by product outcomes, and the product outcomes are measurable.</p>

    </div>`,
    category: 'personal',
    technologies: ['Python', 'Flask', 'MongoDB Atlas', 'Voyage AI', 'Vector Search', 'React', 'TypeScript', 'Stripe', 'PayPal', 'Railway', 'Scryfall API'],
    image: '/assets/images/mtg-ecorec.png',
    demoUrl: 'https://mtgecorec.com',
    githubUrl: 'https://github.com/mattieg93/mtg-ecorec',
    impact: {
      metric: 'Cards in Recommendation Pool',
      value: '110,000+'
    },
    tags: ['Python', 'Flask', 'MongoDB', 'Vector Search', 'AI', 'Recommendation Engine', 'SaaS', 'Stripe', 'Monte Carlo'],
    featured: true,
    date: '2025-03-01'
  },
  {
    id: 'shep',
    title: 'Shep: GUI for Ollama Model Management',
    description: 'Ollama is powerful but entirely terminal-driven — managing models means memorizing daemon commands, VRAM flags, and model identifiers. Shep is the missing GUI: a React + FastAPI desktop app that puts model discovery, download progress, daemon control, and settings into a clean interface. Zero terminal required after clone.',
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
    description: 'Most online learners watch lectures and forget them. This fully local, zero-cost AI study partner fixes the retention loop: it captures your Coursera notes automatically, answers multi-select quiz questions with per-option reasoning via Apple Silicon MLX inference, and builds a RAG knowledge base that improves every time you correct it — without sending a single byte to a third-party server.',
    longDescription: `<div class="space-y-8">

      <h2>The Problem With Passive Online Learning</h2>
      <p>Coursera gives you access to world-class university courses, but access and understanding are not the same thing. Videos play, transcripts scroll, and by exam time the material has evaporated. Students juggle multiple courses simultaneously, each with its own vocabulary and notation, and there is no professor available at 2 a.m. when a concept stops making sense. Multi-select quiz questions make this worse — the correct answer isn't just the right option, it's the right <em>set</em> of options, and confusing "select all that apply" with "pick one" costs full credit. The standard approach to all of this is to take better notes and study harder. That is the wrong lever.</p>
      <p>The Coursera Study Assistant attacks the logistics problem, not the discipline problem. It is a <strong>fully local, zero-cost AI study partner</strong> that automates the mechanical work of learning — capturing notes, retrieving context, explaining options — so the student's cognitive budget goes toward understanding rather than administration.</p>

      <h2>The Four-Step Study Loop</h2>
      <ul>
        <li><strong>Capture</strong> — the Coursera Agent navigates a module on your behalf, pulls every transcript and reading, summarises it with a local LLM, and writes structured notes into a Google Doc you own. You walk away with a searchable reference document after every study session without typing a word.</li>
        <li><strong>Understand</strong> — the Study Assistant uses Retrieval-Augmented Generation against those exact notes. When you ask "why does backpropagation use the chain rule?" the system retrieves the most relevant lecture segments and grounds its answer in course-specific language, not generic internet text.</li>
        <li><strong>Drill</strong> — paste or screenshot any quiz question. A vision LLM extracts the structured question data directly from the image. The RAG engine answers each option individually with a <code>CORRECT / INCORRECT</code> verdict and reasoning. When the AI is wrong, correct it in plain English; that correction is stored and improves future answers on the same material.</li>
        <li><strong>Repeat</strong> — everything runs on Apple Silicon via MLX. No API keys, no per-token cost, no data sent to a third-party server. A student on a plane can still study.</li>
      </ul>

      <h2>V2.0: Why a Full Rewrite Was Necessary</h2>
      <p>V1 was a Streamlit app backed by Ollama. It worked, but both choices imposed hard ceilings: Streamlit's synchronous component model made real-time streaming awkward, and Ollama required a separate always-running daemon that added startup friction and memory overhead. The deeper problem was architectural — a script pretending to be an application cannot cleanly support three different real-time patterns on different data paths. V2.0 was designed from the ground up as a real full-stack system.</p>
      <ul>
        <li><strong>Frontend:</strong> React 19 + TypeScript SPA built with Vite. Tailwind CSS for styling, wouter for lightweight routing, Zustand for persistent global state (model selection, dark mode, active doc), TanStack Query for server state and background refetch. Three pages — Study, Agent, Knowledge Base — with a sidebar that stays coherent across navigation.</li>
        <li><strong>Backend:</strong> FastAPI + Uvicorn replaces Streamlit. Async from the ground up. HTTP endpoints for chat, extraction, and knowledge-base management; WebSocket endpoints for real-time agent streaming; SSE for per-question quiz-answer streaming.</li>
        <li><strong>Inference:</strong> Ollama replaced by <strong>MLX</strong> (<code>mlx-lm</code> for text, <code>mlx-vlm</code> for vision). Models are lazy-loaded on first call and cached in-process — no external daemon, no startup overhead after warm-up. Default model: IBM Granite 3.3 8B, 4-bit quantised.</li>
        <li><strong>Per-course isolation:</strong> Each Google Doc gets its own <code>study_db_{doc_id}.pkl</code> vector index. Switching courses in the sidebar reloads the correct index in-memory — there is no bleed between a machine-learning course and a data-structures course.</li>
      </ul>

      <h2>Quiz Extraction — Vision-First, Not OCR</h2>
      <p>The original system used Apple Vision Framework for OCR and then parsed the resulting text with regex. That approach fails on anything non-standard: Coursera's checkbox glyphs, LaTeX artefacts, multi-line option text. V2.0 replaces it with a multimodal LLM pipeline that understands the screenshot semantically, not character-by-character — the model reads the question the way a person would.</p>
      <ul>
        <li>Screenshot bytes → <code>chat_vision(_VISION_PROMPT, img)</code> → raw JSON with structured question objects</li>
        <li><code>_parse_vision_raw()</code> strips markdown fences, repairs invalid backslash escapes, unwraps dict-wrapped arrays</li>
        <li><code>_normalise_questions()</code> removes Coursera checkbox/radio glyphs (<code>□ ■ ○ ●</code>), fixes LaTeX artefacts, upgrades <code>"single"</code> → <code>"multi"</code> when the stem contains "select all that apply" or "which two/three"</li>
        <li>Retry pass: any question with fewer than 2 options extracted triggers a second vision call with the first response as context; results are merged where the retry produced more options</li>
        <li>Remaining questions below threshold get an <code>extraction_warning</code> displayed as an amber alert in the UI</li>
      </ul>
      <p><strong>Multi-select support covers A–Z</strong> (not just A–D). The RAG prompt was redesigned to emit per-option <code>CORRECT/INCORRECT</code> verdicts with explicit over-selection and under-selection guards. Answer comparison uses set equality with normalisation so "A, D" and "D and A" are treated as equivalent.</p>

      <h2>RAG Study Engine — Knowledge That Compounds</h2>
      <p>The knowledge base is a lightweight NumPy + pickle vector store — no ChromaDB dependency, no Pydantic version conflicts. <code>all-MiniLM-L6-v2</code> sentence-transformer embeddings are loaded lazily on first query. For each quiz question, the retriever builds one query per option (up to 8) plus one for the question stem — up to 10 combined results, deduplicated. The prompt injects the retrieved lecture text, the full option list, an <code>expected_count</code> hint if the stem states it ("select all 3"), and explicit warnings against under-selection.</p>
      <p>The compounding mechanic is the most underrated feature: each correction the student provides is stored as a special document keyed to the original question text and reingested into the index. The system gets more accurate on your specific course the more you use it — not through retraining, but through curated retrieval context.</p>

      <h2>Coursera Agent — WebSocket Streaming</h2>
      <p>The agent uses Playwright connected to a running Chromium instance via CDP (port 9222). The student logs in once manually; the agent reuses that session from a dedicated profile so no credentials are ever passed to the code. In V2.0, agent subprocess stdout is piped over a WebSocket (<code>/ws/agent/{job_id}</code>) and parses structured emoji-tagged progress lines into typed JSON events that drive per-lecture progress bars in real time. The textbook-aware notes path detects when a lecture maps to a known textbook chapter and switches to parametric generation — the LLM draws on its trained knowledge of the book rather than summarising a transcript, which produces materially better notes for courses that follow a textbook closely.</p>

      <h2>SSE Quiz Answer Streaming</h2>
      <p>A full quiz of 10 questions previously waited for all answers to complete before rendering anything — a loading spinner for as long as it takes to run 10 LLM calls. V2.0 uses Server-Sent Events via FastAPI's <code>StreamingResponse</code>: each question is answered and its result frame emitted as soon as the LLM finishes it. The frontend renders each answer card as it arrives. The experience shifts from "wait, then read" to "read as it appears" — which is also better for learning.</p>

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
      <p>The domain is education, but the engineering problems are identical to those in any serious data product: latency, streaming, state isolation, and graceful degradation when an inference call fails. V1 was a Streamlit script. V2 is a production-grade full-stack application. The rewrite required a real API contract between frontend and backend, an async server supporting three different real-time patterns on different data paths, and migrating LLM inference off an external daemon onto in-process native hardware acceleration. The constraints of building for a single user on local hardware made the design sharper, not more forgiving.</p>

    </div>`,
    category: 'personal',
    technologies: ['React', 'TypeScript', 'FastAPI', 'Python', 'MLX', 'Apple Silicon', 'RAG', 'Playwright', 'Tailwind CSS', 'Zustand'],
    image: '/assets/images/study_assistant.png',
    githubUrl: 'https://github.com/mattieg93/coursera-study-assistant',
    impact: {
      metric: 'Infrastructure Cost',
      value: '$0/month'
    },
    tags: ['AI', 'RAG', 'MLX', 'Apple Silicon', 'React', 'FastAPI', 'Education', 'Local LLM', 'Python'],
    featured: true,
    date: '2026-01-15'
  },
  {
    id: 'queer-data-network',
    title: 'Queer Data Network',
    description: 'LGBTQ+ professionals in data and tech lack a community that treats their specific challenges as real product requirements. Queer Data Network is a full-stack community platform — custom JWT auth, role-based moderation, A/B-tested policy rollouts, LangChain/RAG-powered resource discovery, and privacy-first analytics — built concept to production in one month on Azure serverless infrastructure for under $10/month.',
    longDescription: `<div class="space-y-8">

      <h2>Why This Platform Exists</h2>
      <p>LGBTQ+ professionals in data and tech face a specific set of challenges that general professional communities aren't built to address: working with datasets that erase or misrepresent queer identities, navigating workplace cultures that aren't always inclusive, and lacking peer networks that understand both the technical work and the lived experience simultaneously. Existing platforms treat diversity as a tag, not a design constraint. Queer Data Network was built with those needs as first-class requirements from day one — not retrofitted in.</p>

      <h2>Scope and the One-Month Constraint</h2>
      <p>The scope was deliberately full: authentication, role-based permissions, a resource library, community board, content moderation, A/B testing infrastructure, LangChain/RAG-powered resource discovery, privacy-first analytics, and a working CI/CD pipeline. The one-month constraint forced a specific kind of architectural discipline — every decision was made to maximise real surface area shipped rather than infrastructure elegance. That constraint produces better product instincts than unlimited time ever does.</p>

      <h2>Technical Architecture</h2>
      <ul>
        <li><strong>Frontend:</strong> React 18.2 SPA with React Router — component-driven, stateful, accessible.</li>
        <li><strong>Backend:</strong> Azure Functions (Python) — serverless, event-driven, scales to zero between bursts.</li>
        <li><strong>Database:</strong> MongoDB via Azure Cosmos DB (MongoDB API) — flexible document model for community content.</li>
        <li><strong>Auth:</strong> Custom stateless JWT system — access + refresh tokens, server-side verification on all protected routes, user IDs extracted from JWT payload. No session store, no OAuth dependency, full control over rate limiting and account lockout.</li>
        <li><strong>CI/CD:</strong> GitHub Actions deploys to Azure Static Web Apps on every push to <code>main</code>.</li>
      </ul>

      <h2>Community Features</h2>
      <ul>
        <li>Resource library with Quill.js rich-text editor and DOMPurify sanitization — XSS prevention without sacrificing formatted content</li>
        <li>Community board: discussions, events, announcements, nested commenting, reactions</li>
        <li>Role-based permissions enforced at the API layer: member / moderator / admin</li>
        <li>Moderation tools: hide/unhide content, user reporting, admin panel for pending reports</li>
        <li>Terms acceptance flow gates access to community content</li>
        <li>18+ custom REST endpoints across auth, content, analytics, and moderation surfaces</li>
      </ul>

      <h2>Experimentation &amp; AI Features</h2>
      <p>Most community platforms make policy decisions by instinct. QDN treats them as experiments. <strong>A/B testing with frequentist hypothesis testing</strong> evaluates moderation policy changes and feature rollouts — when a new rule is proposed, it's measured, not assumed. <strong>LangChain/RAG</strong> powers conversational resource discovery: members ask questions in natural language and get answers grounded in the curated resource library, rather than a generic search result list that buries the most relevant entry three scrolls down.</p>

      <h2>Privacy-First Analytics</h2>
      <p>The pageview tracker was built from scratch. It buffers up to 10 events client-side and flushes every 30 seconds or when full — reducing API calls ~90% compared to per-page tracking. Session-based deduplication (5-minute window) prevents double-counts without storing personally identifiable data. All analytics records expire after 90 days automatically. <strong>No third-party tracking scripts. No ad pixels. No external analytics services.</strong> In a community built around trust, how you collect data is a product decision, not an engineering afterthought.</p>

      <h2>Image Gallery</h2>

      <!--QDN_IMAGE_GALLERY-->

      <h2>Safety as a Design Constraint</h2>
      <p>Every technical decision had a community-safety analogue. Custom auth gives full control over rate limiting and account lockout without handing credentials to a third party. DOMPurify protects members from malicious content without disabling rich formatting. Privacy-first analytics let the platform understand growth without surveilling members. Serverless infrastructure keeps costs under $10/month while maintaining the ability to absorb traffic spikes during events or press coverage. The goal throughout: a platform that a queer professional in data can trust with their real name and their real work.</p>

    </div>`,
    category: 'personal',
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'DOMPurify', 'CI/CD'],
    image: '/assets/images/queer_data_network.png',
    githubUrl: 'https://github.com/mattieg93/queer-data-network',
    impact: {
      metric: 'Infrastructure Cost',
      value: 'Under $10/month'
    },
    tags: ['React', 'TypeScript', 'Community Platform', 'Privacy', 'Full-Stack', 'CI/CD', 'LGBTQ+'],
    featured: true,
    date: '2025-06-01'
  },
  {
    id: 'shutdown-skies',
    title: 'Shutdown Skies: Aviation Impact of U.S. Government Shutdowns',
    description: 'Government shutdowns are measured in furloughs and paused spending — but what do they actually cost the systems those employees run? Shutdown Skies uses causal inference and ensemble time-series forecasting across 2M+ flight records and five major shutdowns to quantify the aviation impact and model recovery timelines.',
    longDescription: `<div class="space-y-8">

      <h2>The Question Worth Asking</h2>
      <p>Government shutdowns are usually quantified in terms of federal employee furloughs and direct spending pauses. The harder question is: what do they cost the systems those employees operate? Shutdown Skies is a data science investigation into how U.S. government shutdowns cascade through the aviation system, using causal inference and ensemble time-series forecasting to quantify impact and predict recovery.</p>

      <h2>The Data</h2>
      <p>Five major shutdowns from 1995 to 2019, over 2 million flight records across 15 major airports, Bureau of Transportation Statistics operations data, FAA staffing records, and economic indicators. The 2018–2019 shutdown — 35 days, the longest in U.S. history — is the primary case study.</p>

      <h2>Methodology</h2>
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
    description: 'Weather shapes mood, and mood shapes what you want to hear. Musical Weather models the statistical relationship between meteorological conditions and listening behavior to generate personalized playlists — and uses that signal to surface underplayed local artists instead of recycling the same top-40 rotation.',
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
    description: 'The U.S. House is apportioned by population — but population and economic output aren\'t the same thing. This R-based analysis tests whether a state\'s share of national GDP has any predictive relationship with its congressional delegation, then breaks the residuals out by party affiliation to surface where the representation gap falls.',
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
    description: 'Most re-engagement campaigns fail because they treat all lapsed customers the same. This RFM segmentation analysis scores every customer on Recency, Frequency, and Monetary value — separating "At-Risk High-Value" customers from genuinely churned ones to enable precision targeting. Measured campaign ROI improvement: +45%.',
    longDescription: `<div class="space-y-8">

      <h2>The Method</h2>
      <p>RFM segmentation scores every customer on three axes: <strong>Recency</strong> (how recently they purchased), <strong>Frequency</strong> (how often), and <strong>Monetary value</strong> (how much they spent). The resulting segments &mdash; Champions, At-Risk, Lost, New Customers &mdash; tell a marketing team exactly who to invest in and how.</p>

      <h2>Implementation</h2>
      <p>Python + Pandas for data preparation and RFM score calculation. Customers are quantile-ranked on each dimension and assigned segment labels from composite scores. Matplotlib and Seaborn visualize segment distribution, purchasing behavior clusters, and the revenue concentration curve (the top 20% of customers typically generate 60&ndash;80% of revenue).</p>

      <h2>Business Impact</h2>
      <p>The segmentation directly informed re-engagement campaign targeting. Separating &ldquo;At-Risk High-Value&rdquo; customers (high monetary, declining recency) from genuinely churned customers enabled precision targeting &mdash; winning back the customers worth winning back, and not wasting spend on lost causes. Measured campaign ROI improvement: <strong>+45%</strong>.</p>

    </div>`,
    category: 'academic',
    technologies: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Statistical Analysis'],
    image: '/assets/images/rfm_analysis.png',
    githubUrl: 'https://github.com/mattieg93/rfm-analysis',
    impact: {
      metric: 'Campaign ROI Improvement',
      value: '+45%'
    },
    tags: ['Python', 'Customer Segmentation', 'Marketing Analytics', 'RFM', 'Data Science'],
    featured: false,
    date: '2023-06-10'
  },
  {
    id: 'sentiment-analysis',
    title: 'Real-Time Brand Sentiment Analysis',
    description: 'Brand teams cannot manually read thousands of social mentions per day. This two-stage NLP pipeline streams brand mentions from Twitter, classifies tone with TextBlob + a fine-tuned NLTK Naive Bayes model, and serves a dashboard showing sentiment trends over time — with automated alerts on negative-sentiment spikes. 87% classification accuracy on a held-out test set.',
    longDescription: `<div class="space-y-8">

      <h2>The Problem</h2>
      <p>Brand teams cannot manually read thousands of social media mentions per day. They need a system that classifies tone automatically, flags urgent negative sentiment, and produces a queryable record of how public perception shifts over time.</p>

      <h2>How It Works</h2>
      <p>A Python pipeline connects to the Twitter API to stream brand mentions in real-time. Each tweet passes through a two-stage NLP classifier: <strong>TextBlob</strong> provides fast polarity scoring; a fine-tuned <strong>NLTK</strong> Naive Bayes model handles edge cases where polarity alone is ambiguous (sarcasm, mixed sentiment). A Flask backend stores classified mentions and serves a dashboard showing sentiment trends over time.</p>

      <h2>Results and Honest Limitations</h2>
      <p>87% classification accuracy on a held-out test set of labeled brand mentions. The model performs best on clearly positive or negative text; accuracy on neutral and ambiguous tweets is lower — which the dashboard surfaces explicitly rather than hiding. Negative-sentiment spikes trigger alerts, which is the use case that matters most for real-time brand management.</p>

    </div>`,
    category: 'academic',
    technologies: ['Python', 'NLP', 'TextBlob', 'NLTK', 'Flask', 'Twitter API', 'Machine Learning'],
    image: '/assets/images/sentiment_analysis.png',
    githubUrl: 'https://github.com/mattieg93/brand-sentiment-analysis',
    impact: {
      metric: 'Classification Accuracy',
      value: '87%'
    },
    tags: ['NLP', 'Sentiment Analysis', 'Python', 'Machine Learning', 'Real-Time', 'Flask'],
    featured: false,
    date: '2023-04-20'
  },
  {
    id: 'spark-setup-guide',
    title: 'Apache Spark Local Setup Guide',
    description: 'Setting up a local Spark environment on an Ubuntu VM involves a non-obvious sequence of Java version pinning, environment variable configuration, memory tuning, and PySpark integration steps that aren\'t documented in one place. This guide is the single reference that fills that gap — 2,500+ Medium views and linked from several data engineering learning paths.',
    longDescription: `<div class="space-y-8">

      <h2>The Gap</h2>
      <p>Apache Spark documentation assumes a working cluster. Setting up a local Spark environment on an Ubuntu VM &mdash; for development, testing, or learning &mdash; involves a non-obvious sequence of Java version pinning, environment variable configuration, memory tuning, and PySpark integration steps that aren&rsquo;t documented in one place. This guide fills that gap.</p>

      <h2>What It Covers</h2>
      <ul>
        <li>Java version selection and <code>JAVA_HOME</code> configuration (Spark version compatibility matters)</li>
        <li><code>SPARK_HOME</code> and <code>PATH</code> setup</li>
        <li>PySpark integration and the <code>PYTHONPATH not set</code> failure mode</li>
        <li>Memory configuration for local development without cluster overhead</li>
        <li>Validation steps that confirm a working environment before writing any Spark code</li>
      </ul>

      <h2>Reception</h2>
      <p>Published on Medium. <strong>2,500+ views</strong> — one of the more-read practical Spark setup guides in the data engineering community, linked from several data engineering learning paths.</p>

    </div>`,
    category: 'academic',
    technologies: ['Apache Spark', 'PySpark', 'Ubuntu', 'Java', 'Python', 'Data Engineering'],
    image: '/assets/images/spark_setup.png',
    demoUrl: 'https://medium.com/@grahammr93/apache-spark-local-setup',
    impact: {
      metric: 'Medium Views',
      value: '2,500+'
    },
    tags: ['Apache Spark', 'PySpark', 'Data Engineering', 'Tutorial', 'Python', 'Ubuntu'],
    featured: false,
    date: '2023-02-14'
  },
  {
    id: 'over-the-table',
    title: 'Over the Table (OTT): Statistical Python API',
    description: 'Statistics textbooks prove theorems. Python docs describe function signatures. Neither bridges the gap between understanding a test mathematically and implementing it correctly in code. OTT wraps classical statistical tests in an interface that surfaces the reasoning alongside the result — 45+ GitHub stars and referenced in several data analytics learning curricula.',
    longDescription: `<div class="space-y-8">

      <h2>The Gap It Fills</h2>
      <p>Statistics textbooks prove theorems. Python documentation describes function signatures. Neither bridges the gap: given a concept you understand mathematically, how do you implement it correctly in code? Over the Table (OTT) is a Python API designed to answer that question — wrapping classical statistical tests and proofs in an interface that surfaces the reasoning, not just the result.</p>

      <h2>What It Covers</h2>
      <p>Descriptive statistics, hypothesis testing (t-tests, chi-square, ANOVA), probability distributions, regression diagnostics, and correlation measures. Each module includes worked examples drawn from the statistical proofs that motivate the test — connecting the math students learned to the code they need to write.</p>

      <h2>Reception</h2>
      <p><strong>45+ GitHub stars.</strong> Published tutorial on Medium documenting the design philosophy and use cases, referenced in several data analytics learning curricula.</p>

    </div>`,
    category: 'academic',
    technologies: ['Python', 'Statistical Analysis', 'NumPy', 'SciPy', 'Pandas', 'API Design'],
    image: '/assets/images/over_the_table.png',
    githubUrl: 'https://github.com/mattieg93/over-the-table',
    impact: {
      metric: 'GitHub Stars',
      value: '45+'
    },
    tags: ['Python', 'Statistics', 'API', 'Education', 'Data Science', 'Open Source'],
    featured: false,
    date: '2022-11-30'
  }
];

// ─── MERGE OVERRIDES ────────────────────────────────────────────────────────
const _ov = projectOverridesData as { hidden: string[]; projects: Project[] };
const _hiddenIds = new Set(_ov.hidden);
const _overrideMap = new Map(_ov.projects.map((p: Project) => [p.id, p]));

export const projects: Project[] = baseProjects
  .filter((p) => !p.hidden && !_hiddenIds.has(p.id))
  .map((p) => {
    const override = _overrideMap.get(p.id);
    if (!override) return p;
    return { ...p, ...override };
  })
  .concat(_ov.projects.filter((o: Project) => !baseProjects.some((p: Project) => p.id === o.id)));

// BLOG POSTS DATA
export const blogPosts: BlogPost[] = [
  {
    id: 'getting-started-with-llms',
    title: 'Getting Started with Large Language Models',
    excerpt: 'A practical guide to integrating LLMs into your data workflows, from prompt engineering to production deployment.',
    content: `# Getting Started with Large Language Models

Large Language Models have transformed how we approach data analysis and automation. This guide covers practical approaches to integrating LLMs into your existing workflows.

## Understanding LLM Capabilities

LLMs excel at:
- Natural language processing and generation
- Code generation and explanation
- Data summarization and extraction
- Pattern recognition in unstructured text

## Prompt Engineering Basics

The key to effective LLM integration is crafting clear, specific prompts. Here are some patterns that work well:

### Zero-shot prompting
Provide clear instructions without examples when the task is straightforward.

### Few-shot prompting
Include 2-3 examples when you need specific output formats or handling of edge cases.

### Chain-of-thought prompting
Ask the model to "think step by step" for complex reasoning tasks.

## Production Considerations

When moving from prototype to production:
1. **Rate limiting** — implement exponential backoff and request queuing
2. **Cost management** — cache common queries, use smaller models where appropriate
3. **Evaluation** — build a test suite of known good/bad outputs
4. **Monitoring** — track latency, error rates, and output quality over time`,
    author: 'Mattie Graham',
    date: '2024-03-15',
    tags: ['LLMs', 'AI', 'Data Engineering', 'Tutorial'],
    featured: true,
    readTime: '8 min'
  },
  {
    id: 'python-data-libraries',
    title: 'Essential Python Libraries for Data Analysis',
    excerpt: 'A comprehensive overview of the Python libraries every data analyst should know, from Pandas to Plotly.',
    content: `# Essential Python Libraries for Data Analysis

Python has become the dominant language for data analysis, and for good reason. Its rich ecosystem of libraries makes it incredibly powerful for working with data. Here's a guide to the most essential libraries every data analyst should master.

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