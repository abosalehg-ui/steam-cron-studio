// =============================================================
// STEAM CRON STUDIO — Prompt Diff Viewer
// Simple line-by-line diff between two text strings
// =============================================================

/**
 * Compute a simple line-level diff between two texts
 * @param {string} oldText
 * @param {string} newText
 * @returns {Array<{type: 'context'|'added'|'removed', text: string}>}
 */
export function computeDiff(oldText, newText) {
  const oldLines = oldText.split('\n');
  const newLines = newText.split('\n');
  const result   = [];

  // Build LCS table
  const m = oldLines.length;
  const n = newLines.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (oldLines[i - 1] === newLines[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Backtrack
  function backtrack(i, j) {
    if (i === 0 && j === 0) return;
    if (i > 0 && j > 0 && oldLines[i - 1] === newLines[j - 1]) {
      backtrack(i - 1, j - 1);
      result.push({ type: 'context', text: oldLines[i - 1] });
    } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
      backtrack(i, j - 1);
      result.push({ type: 'added', text: newLines[j - 1] });
    } else {
      backtrack(i - 1, j);
      result.push({ type: 'removed', text: oldLines[i - 1] });
    }
  }

  backtrack(m, n);
  return result;
}

/**
 * Render diff array as HTML string
 * @param {Array} diff
 * @returns {string}
 */
export function renderDiffHtml(diff) {
  return diff.map(({ type, text }) => {
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const prefix = type === 'added' ? '+ ' : type === 'removed' ? '- ' : '  ';
    return `<div class="diff-line diff-${type}">${prefix}${escaped}</div>`;
  }).join('');
}

/**
 * Mount a diff viewer into a container element
 * @param {string} containerId
 * @param {string} oldText
 * @param {string} newText
 */
export function mountDiffViewer(containerId, oldText, newText) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const diff = computeDiff(oldText, newText);
  const added   = diff.filter(d => d.type === 'added').length;
  const removed = diff.filter(d => d.type === 'removed').length;

  container.innerHTML = `
    <div style="display:flex;gap:8px;margin-bottom:8px;font-size:0.8rem;">
      <span style="color:#8fb940">+${added} added</span>
      <span style="color:#d4706e">-${removed} removed</span>
    </div>
    <div style="font-family:var(--font-mono);font-size:0.8rem;line-height:1.6;overflow-x:auto;">
      ${renderDiffHtml(diff)}
    </div>
  `;
}
