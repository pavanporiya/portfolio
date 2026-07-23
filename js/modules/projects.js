import { $, $$ } from '../utils/dom.js';

export const initProjects = () => {
  const filterBtns = $$('.projects__filter-btn');
  const projectCards = $$('.project-card');
  const modal = $('#project-modal');
  const modalCloseBtn = $('#modal-close-btn');

  // Filter Handling
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Modal Launcher
  const modalTriggers = $$('[data-open-modal]');
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = trigger.dataset.openModal;
      openModal(projectId);
    });
  });

  if (modalCloseBtn && modal) {
    modalCloseBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  function openModal(id) {
    if (!modal) return;
    const titleEl = $('#modal-title');
    if (titleEl) titleEl.textContent = `Engineering Case Study: ${id.replace(/-/g, ' ').toUpperCase()}`;
    modal.showModal();
  }

  function closeModal() {
    if (!modal) return;
    modal.close();
  }
};
