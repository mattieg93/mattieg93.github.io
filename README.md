# mattieg93.github.io

Hi, I'm **Mattie Graham** - an AI & Analytics Engineer with $9B+ in documented business impact across data pipelines, machine learning systems, and analytics automation. This is my personal portfolio and the place I send clients to learn what I do and how to work with me.

Built from scratch with Next.js 15, TypeScript, and Tailwind CSS - designed, written, and deployed by me.

> I built this to support my freelance consulting practice on Upwork, targeting AI pipeline development, analytics automation, and ML engineering engagements at $125-150/hr.

## Other Things I've Built (`quick_tools/`)

Beyond the portfolio site, I've built a set of local AI tools for my own use. These run on my machine and solve real problems I have day-to-day.

### Shep - Ollama Model Manager

A full-stack GUI for managing local Ollama models on macOS. I got tired of context-switching to the terminal every time I wanted to check what was loaded or free up VRAM, so I built this.

**Stack:** React + Vite frontend, FastAPI backend, Tailwind CSS

- View all locally installed models with size and VRAM requirements
- Start/stop the Ollama daemon directly from the UI
- Stop individual models to free up RAM without nuking the daemon
- Search and pull new models from the Ollama library with one click
- Real-time status polling, single `launch.sh` script handles all setup

### AI Study Assistant

A RAG-based study tool I built to work through Coursera lectures and quizzes more efficiently. It ingests course materials into a local vector database and lets me ask questions or submit quiz screenshots for parsing and explanation.

**Stack:** Streamlit, ChromaDB, Ollama (Granite 3.2 8B), EasyOCR + Apple Vision

- Loads course materials into ChromaDB for semantic search
- Chat UI for RAG-powered Q&A against my own notes and slides
- OCR pipeline that reads quiz screenshots and extracts questions and answer choices
- Quiz generator that turns extracted questions into interactive practice sessions
- Everything runs locally - no API keys, no data leaving my machine

### Coursera Agent

A browser automation agent that watches Coursera lecture videos and drafts structured notes into Google Docs. Built with Playwright for browser control and Ollama for local summarization.

**Stack:** Playwright, Ollama, Google Docs API

- Navigates Coursera lectures automatically
- Captures transcript segments and sends them to a local LLM for summarization
- Writes structured notes (headers, bullets, key terms) directly into a Google Doc
- Runs so I can walk away while it takes notes for me

---

## What I Built (the portfolio site)

- **My story, my way** - Every word on this site is written to reflect my actual impact: $9B+ total ($2B saved, $7B in assets managed), 160+ hours of analytics automated per month, 200+ reports delivered
- **Services page** (`/services`) - I laid out exactly what I offer: AI pipeline development, analytics automation, ML engineering, rapid MVPs, data strategy, and training - with real process details and engagement options
- **Contact form** - Wired up EmailJS so messages land directly in my inbox with zero backend infrastructure
- **Project showcase** - I built a custom filter system that surfaces the most relevant projects first, with tech tags sorted by how frequently I use them
- **Interactive resume** - Showcases my IBM AI Engineer certifications (PyTorch, Keras/TensorFlow, ML with Python), my career narrative, and the numbers behind my work
- **Live admin portal** (`/admin`) - I built a PIN-gated CMS backed by the GitHub Contents API - I can add, hide, or delete projects directly from the browser, and it commits to the repo and triggers a rebuild automatically
- **SEO** - Full Open Graph and Twitter card metadata so my work looks sharp when shared
- **Dark theme** - Purple/blue/emerald palette I designed to feel like an AI engineer's workspace, not a generic portfolio template

## Project Structure

```
mattieg93.github.io/
├── src/
│   ├── app/
│   │   ├── about/          # My story, background, and technical expertise
│   │   ├── admin/          # PIN-gated live CMS - add/hide/delete projects via GitHub API
│   │   ├── blog/           # Blog archive (preserved for SEO, not in nav)
│   │   ├── contact/        # Contact page + EmailJS form
│   │   ├── data-science/   # Data science showcase
│   │   ├── projects/       # Project filtering + cards
│   │   ├── resume/         # Interactive resume (IBM certs, $9B+ stats)
│   │   ├── services/       # Services/offerings page
│   │   └── layout.tsx      # Root layout + full SEO metadata
│   ├── components/
│   │   ├── navigation.tsx  # Home -> About -> Services -> Projects -> Resume -> Contact
│   │   ├── hero.tsx        # AI & Analytics Engineer headline + outcome pills
│   │   ├── contact-form.tsx # EmailJS form
│   │   ├── project-filter.tsx # Tag pills (frequency sorted), category filter
│   │   ├── cms-admin.tsx   # Live GitHub CRUD admin UI
│   │   └── ...
│   └── data/
│       ├── cms-config.ts          # Base projects + merge logic
│       └── projects-overrides.json # Admin-writable overrides
├── src/lib/
│   └── github-api.ts     # GitHub Contents API utilities
├── public/                 # Static assets, images
├── .github/workflows/
│   └── deploy.yml          # Build with secrets -> deploy to gh-pages
└── DEPLOYMENT.md
```

## How I Manage Content

All projects live in `src/data/cms-config.ts`. I can add or update them by editing that file directly, or I use the admin portal at `/admin` - a PIN-gated interface I built that writes changes directly to the repo via GitHub Contents API and triggers a rebuild automatically. No manual commits, no deploy steps. Changes go live in about 2-3 minutes.

Each project entry carries:

```typescript
{
  id: 'my-project',
  title: 'My Project',
  description: 'One-liner for cards',
  longDescription: 'Full paragraph for detail view',
  category: 'professional' | 'academic' | 'personal',
  technologies: ['Python', 'LangChain', 'FastAPI'],
  image: '/images/projects/my-project.png',
  githubUrl: 'https://github.com/mattieg93/repo',
  liveUrl: 'https://example.com',
  featured: true,
  date: '2025-01-15',
  status: 'completed' | 'in-progress' | 'archived',
  metrics: ['Saved 40 hrs/mo', '95% accuracy'],
}
```

## Deployment

I have a GitHub Actions workflow that builds and deploys automatically on every push to `main`. Zero manual steps once it's set up.

See [DEPLOYMENT.md](./DEPLOYMENT.md) for details.

## Stack

I chose each of these deliberately:

- **[Next.js 15](https://nextjs.org/)** - static export so it runs for free on GitHub Pages with no server
- **TypeScript 5** - because I prefer catching mistakes at compile time
- **[Tailwind CSS 4](https://tailwindcss.com/)** - fast to iterate on design without leaving the component file
- **[EmailJS](https://www.emailjs.com/)** - serverless contact form, messages go straight to my inbox
- **GitHub Contents API** - powers the admin portal so I can manage projects from anywhere without a CMS subscription
- **GitHub Pages + GitHub Actions** - free hosting with automated CI/CD
- **Azure** - my primary cloud platform for production data pipelines and ML workloads
- **Python** - RAG pipelines, computer vision, analytics automation - the core of most of my professional work

## Archive

`archive/` holds older versions of the site, university coursework, and data notebooks from earlier in my career. Not part of the live site, but I keep them around.

---

**Mattie Graham** - AI & Analytics Engineer | [mattieg93.github.io](https://mattieg93.github.io)
