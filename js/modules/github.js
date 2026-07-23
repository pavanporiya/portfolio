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
    <article class="github-card">
      <div>
        <div class="github-card__header">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          <a href="${escapeHTML(repo.html_url)}" target="_blank" rel="noopener noreferrer" class="github-card__title">${escapeHTML(repo.name)}</a>
        </div>
        <p class="github-card__desc">${escapeHTML(repo.description || 'No description provided.')}</p>
      </div>
      <div class="github-card__footer">
        <div class="github-card__meta">
          <span><span class="github-card__lang-dot" style="background-color: var(--accent-primary);"></span>${escapeHTML(repo.language || 'Code')}</span>
          <span>★ ${repo.stargazers_count}</span>
        </div>
        <span>Updated ${new Date(repo.updated_at).toLocaleDateString()}</span>
      </div>
    </article>
  `).join('');

  container.innerHTML = html;
};
