// ...existing code...
document.addEventListener('DOMContentLoaded', () => {
  const FORM_KEY = 'peluqueria_contactos';
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('contact-feedback');
  const yearEl = document.getElementById('year');

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  function load() {
    try { return JSON.parse(localStorage.getItem(FORM_KEY) || '[]'); }
    catch (e) { return []; }
  }
  function save(arr) {
    localStorage.setItem(FORM_KEY, JSON.stringify(arr));
  }

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = (document.getElementById('c-name') || {}).value?.trim() || '';
    const email = (document.getElementById('c-email') || {}).value?.trim() || '';
    const phone = (document.getElementById('c-phone') || {}).value?.trim() || '';
    const subject = (document.getElementById('c-subject') || {}).value?.trim() || '';
    const message = (document.getElementById('c-message') || {}).value?.trim() || '';

    if (!name || !email || !message) {
      alert('Por favor completa los campos requeridos (nombre, correo y mensaje).');
      return;
    }

    const items = load();
    items.push({ name, email, phone, subject, message, created: Date.now() });
    save(items);

    if (feedback) {
      feedback.textContent = 'Mensaje guardado. Gracias — te contactaremos pronto.';
      feedback.style.display = 'block';
      setTimeout(() => { feedback.style.display = 'none'; }, 5000);
    }

    form.reset();
  });
});