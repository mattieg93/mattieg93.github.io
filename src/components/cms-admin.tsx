'use client';

import { useState, useEffect, useMemo } from 'react';
import { FaSave, FaCopy, FaCheck, FaLock, FaSignOutAlt, FaEye, FaEyeSlash, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { projects as buildTimeProjects, baseProjects, Project } from '@/data/cms-config';
import { fetchOverrides, commitOverrides, type ProjectsOverrides } from '@/lib/github-api';

// ─── PIN gate ──────────────────────────────────────────────────────────────
// Set NEXT_PUBLIC_ADMIN_PIN in .env.local (gitignored) to secure this page.
// The value is embedded in the JS bundle at build time but never appears in
// the source repository, which is sufficient for a portfolio site.
//
// .env.local (create this file, it is already in .gitignore):
//   NEXT_PUBLIC_ADMIN_PIN=your_pin_here
//
// For GitHub Actions deployment, add NEXT_PUBLIC_ADMIN_PIN as a repo secret
// in Settings → Secrets and variables → Actions → New repository secret.
// ───────────────────────────────────────────────────────────────────────────
const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN ?? '';

const SESSION_KEY = 'mg_admin_auth';

interface NewProject {
  id: string;
  title: string;
  description: string;
  category: 'professional' | 'academic' | 'personal';
  status: 'completed' | 'in-progress' | 'archived';
  tags: string;
  technologies: string;
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  featured: boolean;
}

const emptyProject: NewProject = {
  id: '',
  title: '',
  description: '',
  category: 'personal',
  status: 'completed',
  tags: '',
  technologies: '',
  githubUrl: '',
  liveUrl: '',
  imageUrl: '',
  featured: false,
};

function slugify(s: string) {
  return s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

function projectToForm(p: Project): NewProject {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    category: p.category,
    status: 'completed',
    tags: p.tags.join(', '),
    technologies: p.technologies.join(', '),
    githubUrl: p.githubUrl ?? '',
    liveUrl: p.demoUrl ?? '',
    imageUrl: p.image ?? '',
    featured: p.featured,
  };
}

function generateHideInstruction(p: Project, hide: boolean): string {
  return `// In src/data/cms-config.ts, find the project with id: '${p.id}'
// ${hide ? 'Add' : 'Remove'} the hidden flag inside that entry:

  id: '${p.id}',
  hidden: ${hide},   // <-- ${hide ? 'ADD this line' : 'REMOVE this line (or set false)'}
  title: '${p.title}',
  // ... rest of entry unchanged`;
}

function generateDeleteInstruction(p: Project): string {
  return `// In src/data/cms-config.ts, delete the entire project block with:
//   id: '${p.id}'
//   title: '${p.title}'
//
// Remove everything from the opening { to the closing }, for that entry.`;
}

function generateSnippet(p: NewProject): string {
  const tags = p.tags.split(',').map(t => `'${t.trim()}'`).join(', ');
  const techs = p.technologies.split(',').map(t => `'${t.trim()}'`).join(', ');
  return `  {
    id: '${p.id || slugify(p.title)}',
    title: '${p.title}',
    description: '${p.description}',
    longDescription: [
      '${p.description}',
    ],
    category: '${p.category}',
    status: '${p.status}',
    featured: ${p.featured},
    technologies: [${techs}],
    tags: [${tags}],
    image: '${p.imageUrl || '/assets/images/placeholder.png'}',
    links: {
      ${p.githubUrl ? `github: '${p.githubUrl}',` : '// github: \'\','}
      ${p.liveUrl ? `live: '${p.liveUrl}',` : '// live: \'\','}
    },
    metrics: [],
    startDate: '${new Date().toISOString().slice(0, 7)}',
    endDate: '${new Date().toISOString().slice(0, 7)}',
  },`;
}

export default function CMSAdmin() {
  const [authed, setAuthed] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'add-project' | 'manage' | 'guide'>('add-project');
  const [project, setProject] = useState<NewProject>(emptyProject);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [snippet, setSnippet] = useState('');
  const [copied, setCopied] = useState(false);

  // ── GitHub API live state ──────────────────────────────────────────────
  const [overrides, setOverrides] = useState<ProjectsOverrides>({ hidden: [], projects: [] });
  const [overridesSha, setOverridesSha] = useState('');
  const [loadingOverrides, setLoadingOverrides] = useState(false);
  const [saving, setSaving] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [savedId, setSavedId] = useState<string | null>(null);
  const HAS_TOKEN = !!(process.env.NEXT_PUBLIC_GITHUB_TOKEN);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === 'true') setAuthed(true);
  }, []);

  useEffect(() => {
    if (authed) loadOverrides();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  const loadOverrides = async () => {
    setLoadingOverrides(true);
    setApiError(null);
    try {
      const { data, sha } = await fetchOverrides();
      setOverrides(data);
      setOverridesSha(sha);
    } catch (e: unknown) {
      setApiError(e instanceof Error ? e.message : 'Failed to load overrides');
    } finally {
      setLoadingOverrides(false);
    }
  };

  const doCommit = async (
    newOverrides: ProjectsOverrides,
    message: string,
    trackId: string,
  ): Promise<boolean> => {
    setSaving(trackId);
    setApiError(null);
    try {
      const newSha = await commitOverrides(newOverrides, overridesSha, message);
      setOverrides(newOverrides);
      setOverridesSha(newSha);
      setSavedId(trackId);
      setTimeout(() => setSavedId(null), 3000);
      return true;
    } catch (e: unknown) {
      setApiError(e instanceof Error ? e.message : 'Commit failed');
      return false;
    } finally {
      setSaving(null);
    }
  };

  /** Merged project list for Manage tab — uses LIVE overrides, not build-time state */
  const manageProjects = useMemo(() => {
    const buildIds = new Set(buildTimeProjects.map(p => p.id));
    const newAdminProjects = overrides.projects.filter(p => !buildIds.has(p.id));
    const hiddenSet = new Set(overrides.hidden);
    return [...newAdminProjects, ...buildTimeProjects].map(p => ({
      ...p,
      hidden: hiddenSet.has(p.id),
    }));
  }, [overrides]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ADMIN_PIN) {
      // No PIN configured - show setup instructions
      setPinError(true);
      return;
    }
    if (pin === ADMIN_PIN) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setAuthed(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPin('');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setPin('');
  };

  const handleGenerate = () => {
    setSnippet(generateSnippet(project));
    setCopied(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /** Save form state directly to GitHub as a commit */
  const handleSaveToGitHub = async () => {
    const id = project.id || slugify(project.title);
    const newProject: Project = {
      id,
      title:           project.title,
      description:     project.description,
      longDescription: project.description,
      category:        project.category,
      technologies:    project.technologies.split(',').map(t => t.trim()).filter(Boolean),
      image:           project.imageUrl || '/assets/images/placeholder.png',
      demoUrl:         project.liveUrl   || undefined,
      githubUrl:       project.githubUrl  || undefined,
      tags:            project.tags.split(',').map(t => t.trim()).filter(Boolean),
      featured:        project.featured,
      date:            new Date().toISOString().slice(0, 10),
    };
    const existing = overrides.projects.findIndex(p => p.id === id);
    const updated  = [...overrides.projects];
    if (existing >= 0) updated[existing] = newProject;
    else updated.unshift(newProject);

    const ok = await doCommit(
      { ...overrides, projects: updated },
      editingId ? `admin: update project '${id}'` : `admin: add project '${id}'`,
      id,
    );
    if (ok) { setProject(emptyProject); setEditingId(null); setSnippet(''); }
  };

  const handleEdit = (p: Project) => {
    setProject(projectToForm(p));
    setEditingId(p.id);
    setSnippet('');
    setActiveTab('add-project');
  };

  const handleHideToggle = async (p: Project) => {
    const isHidden = overrides.hidden.includes(p.id);
    const newHidden = isHidden
      ? overrides.hidden.filter(id => id !== p.id)
      : [...overrides.hidden, p.id];
    await doCommit(
      { ...overrides, hidden: newHidden },
      `admin: ${isHidden ? 'show' : 'hide'} project '${p.id}'`,
      p.id + '-hide',
    );
  };

  const handleDelete = async (p: Project) => {
    const isAdminProject = overrides.projects.some(op => op.id === p.id);
    if (isAdminProject) {
      await doCommit(
        { ...overrides, projects: overrides.projects.filter(op => op.id !== p.id) },
        `admin: delete project '${p.id}'`,
        p.id + '-delete',
      );
    } else {
      // Base project — can only be hidden via admin, not deleted from source
      await doCommit(
        { ...overrides, hidden: [...overrides.hidden, p.id] },
        `admin: hide base project '${p.id}'`,
        p.id + '-delete',
      );
    }
  };

  const updateField = (field: keyof NewProject, value: string | boolean) => {
    setProject(prev => ({ ...prev, [field]: value }));
    if (field === 'title' && !project.id) {
      setProject(prev => ({ ...prev, title: value as string, id: slugify(value as string) }));
    }
  };

  // ── PIN gate ────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🔐</div>
            <h1 className="text-2xl font-bold text-white">Admin</h1>
            <p className="text-gray-500 text-sm mt-1">Portfolio management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={pin}
                onChange={(e) => { setPin(e.target.value); setPinError(false); }}
                placeholder="Enter PIN"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-center text-lg tracking-widest focus:outline-none focus:border-purple-500"
                autoFocus
              />
            </div>

            {pinError && (
              <p className="text-red-400 text-sm text-center">
                {!ADMIN_PIN
                  ? 'NEXT_PUBLIC_ADMIN_PIN is not set. Add it to .env.local and rebuild.'
                  : 'Incorrect PIN. Try again.'}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-lg text-white font-semibold transition-all duration-300"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              <FaLock className="inline mr-2" />
              Unlock
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Admin UI ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-950 p-4 pt-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Portfolio Admin</h1>
            <p className="text-gray-500 text-sm mt-1">Hidden from navigation - bookmark this URL</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white border border-gray-700 rounded-lg hover:border-gray-500 transition-colors"
          >
            <FaSignOutAlt />
            Lock
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-800 mb-8">
          <nav className="flex gap-8">
            {[
              { id: 'add-project', label: editingId ? '✏️ Edit Project' : '+ Add Project' },
              { id: 'manage', label: `Manage (${manageProjects.length})` },
              { id: 'guide', label: 'Edit Guide' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-400'
                    : 'border-transparent text-gray-500 hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Add / Edit Project tab */}
        {activeTab === 'add-project' && (
          <div className="space-y-6">
            {editingId ? (
              <div className="flex items-center justify-between rounded-lg px-4 py-3" style={{ backgroundColor: 'color-mix(in srgb, var(--secondary) 10%, transparent)', borderColor: 'color-mix(in srgb, var(--secondary) 30%, transparent)' }}>
                <p className="text-sm" style={{ color: 'var(--secondary)' }}>
                  Editing <code className="font-mono">{editingId}</code> — generate the snippet, then <strong>find &amp; replace</strong> the existing entry in{' '}
                  <code className="text-xs">src/data/cms-config.ts</code>.
                </p>
                <button onClick={() => { setEditingId(null); setProject(emptyProject); setSnippet(''); }} className="ml-4 text-gray-500 hover:text-white">
                  <FaTimes />
                </button>
              </div>
            ) : (
              <p className="text-gray-400 text-sm">
                Fill in the fields below, click <strong className="text-white">Generate snippet</strong>, then copy and paste into{' '}
                <code className="bg-gray-800 px-1.5 py-0.5 rounded text-purple-300 text-xs">src/data/cms-config.ts</code>{' '}
                inside the <code className="bg-gray-800 px-1.5 py-0.5 rounded text-purple-300 text-xs">projects</code> array.
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-1.5">Project title *</label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  placeholder="My Awesome Project"
                />
              </div>

              {/* ID / slug */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Slug (auto-generated)</label>
                <input
                  type="text"
                  value={project.id}
                  onChange={(e) => updateField('id', e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none font-mono text-sm"
                  placeholder="my-awesome-project"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Category</label>
                <select
                  value={project.category}
                  onChange={(e) => updateField('category', e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                >
                  <option value="personal">Personal</option>
                  <option value="academic">Academic</option>
                  <option value="professional">Professional</option>
                </select>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-1.5">Short description *</label>
                <textarea
                  value={project.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none resize-none"
                  placeholder="One-sentence description shown on project cards"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={project.tags}
                  onChange={(e) => updateField('tags', e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  placeholder="Python, Machine Learning, NLP"
                />
              </div>

              {/* Technologies */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Technologies (comma-separated)</label>
                <input
                  type="text"
                  value={project.technologies}
                  onChange={(e) => updateField('technologies', e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  placeholder="Python, LangChain, FastAPI"
                />
              </div>

              {/* GitHub URL */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">GitHub URL</label>
                <input
                  type="url"
                  value={project.githubUrl}
                  onChange={(e) => updateField('githubUrl', e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  placeholder="https://github.com/mattieg93/..."
                />
              </div>

              {/* Live URL */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Live demo URL</label>
                <input
                  type="url"
                  value={project.liveUrl}
                  onChange={(e) => updateField('liveUrl', e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  placeholder="https://..."
                />
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Image path</label>
                <input
                  type="text"
                  value={project.imageUrl}
                  onChange={(e) => updateField('imageUrl', e.target.value)}
                  className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  placeholder="/assets/images/my-project.png"
                />
              </div>

              {/* Status + Featured */}
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm text-gray-400 mb-1.5">Status</label>
                  <select
                    value={project.status}
                    onChange={(e) => updateField('status', e.target.value)}
                    className="w-full px-3 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
                  >
                    <option value="completed">Completed</option>
                    <option value="in-progress">In Progress</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <label className="flex items-center gap-2 pb-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={project.featured}
                    onChange={(e) => updateField('featured', e.target.checked)}
                    className="w-4 h-4 rounded accent-purple-500"
                  />
                  <span className="text-sm text-gray-400">Featured</span>
                </label>
              </div>
            </div>

            {/* Save to GitHub (primary) or snippet fallback */}
            {apiError && activeTab === 'add-project' && (
              <div className="bg-red-900/20 border border-red-700 rounded-lg px-4 py-3 text-sm text-red-300">
                ⚠️ {apiError}
              </div>
            )}

            {HAS_TOKEN ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSaveToGitHub}
                  disabled={!project.title || saving === (project.id || slugify(project.title))}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  <FaSave />
                  {saving === (project.id || slugify(project.title))
                    ? 'Saving…'
                    : editingId ? 'Save changes → GitHub' : 'Save to GitHub'}
                </button>
                {savedId === (project.id || slugify(project.title)) && (
                  <span className="text-sm flex items-center gap-1.5" style={{ color: 'var(--secondary)' }}>
                    <FaCheck /> Committed! Rebuild starts in ~30 s
                  </span>
                )}
              </div>
            ) : (
              <>
                <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg px-4 py-3 text-sm text-yellow-300">
                  ⚠️ <strong>NEXT_PUBLIC_GITHUB_TOKEN</strong> not configured — using snippet fallback.
                  Add it to <code className="text-yellow-200">.env.local</code> and as a GitHub Actions secret to enable one-click saving.
                </div>
                <button
                  onClick={handleGenerate}
                  disabled={!project.title}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  <FaSave />
                  {editingId ? 'Generate updated snippet' : 'Generate snippet'}
                </button>
              </>
            )}

            {snippet && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">
                    Paste inside <code className="text-purple-300">src/data/projects-overrides.json</code> → <code className="text-gray-500">projects</code> array
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white transition-colors"
                  >
                    {copied ? <FaCheck style={{ color: 'var(--secondary)' }} /> : <FaCopy />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-xs overflow-x-auto whitespace-pre" style={{ color: 'var(--secondary)' }}>
                  {snippet}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Manage Projects tab */}
        {activeTab === 'manage' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-gray-400 text-sm">
                {HAS_TOKEN
                  ? 'Changes commit directly to GitHub and trigger a rebuild (~2-3 min to go live).'
                  : 'Set NEXT_PUBLIC_GITHUB_TOKEN to enable live edits.'}
              </p>
              <button
                onClick={loadOverrides}
                disabled={loadingOverrides}
                className="text-xs text-gray-500 hover:text-white border border-gray-800 rounded px-2.5 py-1.5 transition-colors"
              >
                {loadingOverrides ? 'Loading…' : '↻ Refresh'}
              </button>
            </div>

            {apiError && (
              <div className="bg-red-900/20 border border-red-700 rounded-lg px-4 py-3 text-sm text-red-300">
                ⚠️ {apiError}
              </div>
            )}

            <div className="space-y-2">
              {manageProjects.map((p) => (
                <div
                  key={p.id}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors ${
                    p.hidden
                      ? 'bg-gray-900/40 border-gray-800 opacity-60'
                      : 'bg-gray-900 border-gray-800'
                  }`}
                >
                  {/* Status dot */}
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${p.hidden ? 'bg-gray-600' : ''}`} style={!p.hidden ? { backgroundColor: 'var(--secondary)' } : {}} />

                  {/* Title + badges */}
                  <div className="flex-1 min-w-0">
                    <span className={`text-sm font-medium truncate block ${p.hidden ? 'text-gray-500 line-through' : 'text-white'}`}>
                      {p.title}
                    </span>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs text-gray-600 font-mono">{p.category}</span>
                      {p.featured && <span className="text-xs text-yellow-500">⭐ featured</span>}
                      {p.hidden && <span className="text-xs text-gray-500 italic">hidden</span>}
                      {overrides.projects.some(op => op.id === p.id) && (
                        <span className="text-xs text-purple-500 italic">admin-managed</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Edit */}
                    <button
                      onClick={() => handleEdit(p)}
                      title="Edit — pre-fills form"
                      className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded border border-gray-700 text-gray-400 hover:text-white hover:border-purple-500 transition-colors"
                    >
                      <FaEdit className="text-purple-400" />
                      Edit
                    </button>

                    {/* Hide / Show */}
                    <button
                      onClick={() => handleHideToggle(p)}
                      disabled={!HAS_TOKEN || saving === p.id + '-hide'}
                      title={p.hidden ? 'Make project visible' : 'Hide project from public'}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded border transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                        savedId === p.id + '-hide'
                          ? ''
                          : p.hidden
                          ? 'border-gray-700 text-gray-400'
                          : 'border-gray-700 text-gray-400 hover:text-yellow-400 hover:border-yellow-600'
                      }`}
                      style={savedId === p.id + '-hide' ? { borderColor: 'var(--secondary)', color: 'var(--secondary)' } : {}}
                    >
                      {savedId === p.id + '-hide' ? (
                        <FaCheck style={{ color: 'var(--secondary)' }} />
                      ) : p.hidden ? (
                        <FaEye />
                      ) : (
                        <FaEyeSlash />
                      )}
                      {saving === p.id + '-hide' ? '…' : savedId === p.id + '-hide' ? 'Done!' : p.hidden ? 'Show' : 'Hide'}
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(p)}
                      disabled={!HAS_TOKEN || saving === p.id + '-delete'}
                      title={overrides.projects.some(op => op.id === p.id)
                        ? 'Delete this project'
                        : 'Hide this project (base projects cannot be deleted from here)'}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded border transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                        savedId === p.id + '-delete'
                          ? ''
                          : 'border-gray-700 text-gray-400 hover:text-red-400 hover:border-red-700'
                      }`}
                      style={savedId === p.id + '-delete' ? { borderColor: 'var(--secondary)', color: 'var(--secondary)' } : {}}
                    >
                      {savedId === p.id + '-delete' ? (
                        <FaCheck style={{ color: 'var(--secondary)' }} />
                      ) : (
                        <FaTrash />
                      )}
                      {saving === p.id + '-delete' ? '…' : savedId === p.id + '-delete' ? 'Done!' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Edit guide tab */}
        {activeTab === 'guide' && (
          <div className="space-y-4">
            <p className="text-gray-400 text-sm">All content is stored in one file. Open it in VS Code to edit anything.</p>
            {[
              {
                color: 'text-purple-400',
                title: 'Add or edit a project',
                steps: [
                  'Open src/data/cms-config.ts',
                  'Find the projects array',
                  'Use the "Add Project" tab above to generate a snippet, or copy an existing entry',
                  'Paste at the top of the array for newest-first ordering',
                ],
              },
              {
                color: 'var(--secondary)',
                title: 'Update personal info / bio',
                steps: [
                  'Open src/data/cms-config.ts',
                  'Find the personalInfo object near the top',
                  'Update name, title, bio, skills, etc.',
                ],
              },
              {
                color: 'var(--primary)',
                title: 'Add a certification',
                steps: [
                  'Open src/components/resume/certifications.tsx',
                  'Copy an existing cert block and update the name, date, and credential ID',
                ],
              },
            ].map((section) => (
              <div key={section.title} className="bg-gray-900 rounded-lg p-5 border border-gray-800">
                <h3 className={`font-semibold mb-3 ${section.color}`}>{section.title}</h3>
                <ol className="space-y-1 text-sm text-gray-400">
                  {section.steps.map((step, i) => (
                    <li key={i}>{i + 1}. {step}</li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
