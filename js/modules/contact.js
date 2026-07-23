import { $, setText } from '../utils/dom.js';

export const initContact = () => {
  const form = $('#contact-form');
  const feedback = $('#form-feedback');

  if (!form) return;

  let isSubmitting = false;
  let feedbackTimeout = null;
  let fadeTimeout = null;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const nameInput = $('#contact-name');
    const emailInput = $('#contact-email');
    const messageInput = $('#contact-message');
    const submitBtn = $('#contact-submit-btn');

    if (!nameInput?.value.trim() || !emailInput?.value.trim() || !messageInput?.value.trim()) {
      showFeedback('Please complete all required fields.', 'error');
      return;
    }

    if (!validateEmail(emailInput.value.trim())) {
      showFeedback('Please provide a valid email address.', 'error');
      return;
    }

    isSubmitting = true;
    if (submitBtn) {
      submitBtn.disabled = true;
      setText(submitBtn, 'Sending...');
    }

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

      if (!response.ok) {
        showFeedback(data.message || 'Failed to send message.', 'error');
        return;
      }

      form.reset();
      showFeedback('Thank you! Your message has been sent successfully.', 'success');

    } catch (error) {
      console.error(error);

      showFeedback(
        'Something went wrong. Please try again later.',
        'error'
      );
    } finally {
      isSubmitting = false;
      if (submitBtn) {
        submitBtn.disabled = false;
        setText(submitBtn, 'Send Message');
      }
    }
  });

  function showFeedback(msg, type) {
    if (!feedback) return;

    if (feedbackTimeout) clearTimeout(feedbackTimeout);
    if (fadeTimeout) clearTimeout(fadeTimeout);

    feedback.style.opacity = '1';
    feedback.style.transition = 'opacity 0.4s ease';
    setText(feedback, msg);
    feedback.className = `form-feedback form-feedback--${type}`;

    feedbackTimeout = setTimeout(() => {
      feedback.style.opacity = '0';
      fadeTimeout = setTimeout(() => {
        setText(feedback, '');
        feedback.className = 'form-feedback';
        feedback.style.opacity = '1';
      }, 400);
    }, 4000);
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
};

