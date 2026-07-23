import { CONFIG } from '../config/constants.js';
import { $, setText } from '../utils/dom.js';
import { escapeHTML } from '../utils/formatters.js';
import { getItem, setItem } from '../utils/storage.js';

export const initGitHub = async () => {
  const container = $('#github-repos-grid');
  if (!container) return;

  try {
    const cachedData = getItem(CONFIG.STORAGE_KEYS.GITHUB_CACHE);
    const cachedTime = getItem(CONFIG.STORAGE_KEYS.GITHUB_CACHE_TIME);
    const now = Date.now();

    if (cachedData && cachedTime && (now - Number(cachedTime) < CONFIG.CACHE_TTL_MS)) {
      renderRepos(JSON.parse(cachedData), container);
      return;
    }

    const response = await fetch(CONFIG.GITHUB_API_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const repos = await response.json();
    setItem(CONFIG.STORAGE_KEYS.GITHUB_CACHE, JSON.stringify(repos));
    setItem(CONFIG.STORAGE_KEYS.GITHUB_CACHE_TIME, String(now));

    renderRepos(repos, container);
  } catch (error) {
    console.warn('GitHub API fetch failed, retaining static markup:', error);
    const statusNotice = $('#github-status-notice');
    if (statusNotice) {
      setText(statusNotice, 'Displaying cached repository snapshot.');
    }
  }
};

const renderRepos = (repos, container) => {
  if (!Array.isArray(repos) || repos.length === 0) return;

  const html = repos.slice(0, 6).map(repo => `
    <article class="repo-card" data-repo="${escapeHTML(repo.name)}">
      <div class="repo-header">
        <h3 class="repo-name">
          <a href="${escapeHTML(repo.html_url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(repo.name)} <span class="sr-only">(opens in new tab)</span></a>
        </h3>
        <p class="repo-description">${escapeHTML(repo.description || 'Public repository on GitHub.')}</p>
      </div>
      <div class="repo-meta">
        <span class="repo-lang">Language: ${escapeHTML(repo.language || 'Code')}</span>
        <a href="${escapeHTML(repo.html_url)}" target="_blank" rel="noopener noreferrer" class="repo-link" aria-label="View ${escapeHTML(repo.name)} on GitHub (opens in new tab)">View Repo <span class="sr-only">(opens in new tab)</span></a>
      </div>
    </article>
  `).join('');

  container.innerHTML = html;
};
