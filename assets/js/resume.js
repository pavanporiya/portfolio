/**
 * Web Resume Interactive Module & Print Controller
 * File: assets/js/resume.js
 * Description: Interactive behavior for dedicated web resume page.
 *              Manages print triggers, PDF export handling, accessibility,
 *              and keyboard shortcuts.
 */

document.addEventListener('DOMContentLoaded', () => {
  const printBtn = document.getElementById('print-resume-btn');
  const downloadPdfBtn = document.getElementById('download-pdf-btn');

  // Print Resume Trigger
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Download PDF / Print Dialog Trigger
  if (downloadPdfBtn) {
    downloadPdfBtn.addEventListener('click', (e) => {
      // If direct PDF asset does not exist or user clicks action button, invoke window.print()
      const pdfPath = downloadPdfBtn.getAttribute('href');
      if (!pdfPath || pdfPath === '#') {
        e.preventDefault();
        window.print();
      }
    });
  }

  // Keyboard shortcut: Ctrl + P / Cmd + P handler override for seamless print dialog
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
      // Let standard browser print trigger cleanly
    }
  });
});
