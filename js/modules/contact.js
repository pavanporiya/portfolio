import { $, setText } from '../utils/dom.js';

export const initContact = () => {
  const form = $('#contact-form');
  const feedback = $('#form-feedback');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameInput = $('#contact-name');
    const emailInput = $('#contact-email');
    const messageInput = $('#contact-message');
    const submitBtn = $('#contact-submit-btn');

    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      showFeedback('Please complete all required fields.', 'error');
      return;
    }

    if (!validateEmail(emailInput.value.trim())) {
      showFeedback('Please provide a valid email address.', 'error');
      return;
    }

    submitBtn.disabled = true;
    setText(submitBtn, 'Sending Message...');

    // Simulate API network request
    setTimeout(() => {
      submitBtn.disabled = false;
      setText(submitBtn, 'Send Message');
      form.reset();
      showFeedback('Thank you! Your message has been sent successfully.', 'success');
    }, 1000);
  });

  function showFeedback(msg, type) {
    if (!feedback) return;
    setText(feedback, msg);
    feedback.className = `form__feedback form__feedback--${type}`;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
};
