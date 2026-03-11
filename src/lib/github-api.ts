/**
 * GitHub Contents API helpers for writing projects-overrides.json
 * Used by the admin portal to commit changes without a manual code push.
 *
 * Required env vars (add to .env.local and as GitHub Actions secrets):
 *   NEXT_PUBLIC_GITHUB_TOKEN  – Personal Access Token with repo:contents write scope
 *   NEXT_PUBLIC_GITHUB_OWNER  – GitHub username (default: mattieg93)
 *   NEXT_PUBLIC_GITHUB_REPO   – Repo name (default: mattieg93.github.io)
 */

import type { Project } from '@/data/cms-config';

const OWNER  = process.env.NEXT_PUBLIC_GITHUB_OWNER ?? 'mattieg93';
const REPO   = process.env.NEXT_PUBLIC_GITHUB_REPO  ?? 'mattieg93.github.io';
const PATH   = 'src/data/projects-overrides.json';
const API    = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`;

export interface ProjectsOverrides {
  hidden:   string[];
  projects: Project[];
}

function authHeaders(token: string) {
  return {
    Authorization:  `Bearer ${token}`,
    Accept:         'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  };
}

/** Fetch the current overrides file from GitHub. Returns content + sha. */
export async function fetchOverrides(): Promise<{ data: ProjectsOverrides; sha: string }> {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN ?? '';
  const headers: Record<string, string> = { Accept: 'application/vnd.github.v3+json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(API, { headers, cache: 'no-store' });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${res.statusText}`);

  const file = await res.json();
  // GitHub returns base64 content with internal newlines — strip them before decoding
  const json = atob(file.content.replace(/\n/g, ''));
  return { data: JSON.parse(json), sha: file.sha };
}

/**
 * Commit an updated overrides object back to GitHub.
 * Returns the new file SHA (needed for the next commit).
 */
export async function commitOverrides(
  overrides: ProjectsOverrides,
  sha: string,
  message: string,
): Promise<string> {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN ?? '';
  if (!token) throw new Error('NEXT_PUBLIC_GITHUB_TOKEN is not set. Add it to .env.local.');

  // btoa doesn't handle non-latin characters — use encodeURIComponent + unescape trick
  const jsonStr  = JSON.stringify(overrides, null, 2);
  const encoded  = btoa(unescape(encodeURIComponent(jsonStr)));

  const res = await fetch(API, {
    method: 'PUT',
    headers: authHeaders(token),
    body: JSON.stringify({ message, content: encoded, sha }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { message?: string }).message ?? `GitHub commit failed: ${res.status}`);
  }

  const data = await res.json();
  return data.content.sha as string;
}
