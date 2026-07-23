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

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          subject: $('#contact-subject')?.value.trim() || 'Portfolio Contact',
          message: messageInput.value.trim(),
        }),
      });

      const data = await response.json();

      submitBtn.disabled = false;
      setText(submitBtn, 'Send Message');

      if (!response.ok) {
        showFeedback(data.message || 'Failed to send message.', 'error');
        return;
      }

      form.reset();
      showFeedback('Thank you! Your message has been sent successfully.', 'success');

    } catch (error) {
      console.error(error);

      submitBtn.disabled = false;
      setText(submitBtn, 'Send Message');

      showFeedback(
        'Something went wrong. Please try again later.',
        'error'
      );
    }
  });

  function showFeedback(msg, type) {
    if (!feedback) return;
    setText(feedback, msg);
    feedback.className = `form-feedback form-feedback--${type}`;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
};
