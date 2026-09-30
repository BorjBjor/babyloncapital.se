(() => {
  const modal = document.querySelector('[data-back-cover-modal]');
  const openButton = document.querySelector('[data-back-cover-open]');
  const closeButton = document.querySelector('[data-back-cover-close]');
  const coverImage = document.querySelector('[data-back-cover-image]');
  if (!modal || !openButton || !closeButton || !coverImage) return;

  const open = () => {
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  };

  const close = () => {
    coverImage.classList.remove('is-zoomed');
    modal.hidden = true;
    document.body.style.overflow = '';
    openButton.focus();
  };

  openButton.addEventListener('click', open);
  closeButton.addEventListener('click', close);
  coverImage.addEventListener('click', () => {
    coverImage.classList.toggle('is-zoomed');
    if (!coverImage.classList.contains('is-zoomed')) modal.scrollTo(0, 0);
  });
  modal.addEventListener('click', (event) => {
    if (event.target === modal) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) close();
  });
})();

const bookOrderForm = document.querySelector('#book-order-form');
const bookOrderStatus = document.querySelector('#book-order-status');

bookOrderForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const submit = bookOrderForm.querySelector('.order-submit');
  const originalLabel = submit.innerHTML;
  submit.disabled = true;
  submit.textContent = 'Skickar…';
  bookOrderStatus.className = 'order-status';

  const data = new FormData(bookOrderForm);
  const phone = String(data.get('phone') || '').trim();
  const address = String(data.get('address') || '').trim();
  const quantity = String(data.get('quantity') || '1').trim();
  const note = String(data.get('message') || '').trim();
  data.set('message', `Bokbeställning från Babylon Capital: Managed Futures – Följ flocken på avstånd\nAntal exemplar: ${quantity}\nTelefon: ${phone || 'Ej angivet'}\nLeveransadress: ${address}\nMeddelande: ${note || 'Inget meddelande'}`);

  try {
    const response = await fetch(bookOrderForm.action, {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' }
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.ok === false) throw new Error(result.error || 'Beställningen kunde inte skickas.');
    bookOrderForm.reset();
    bookOrderForm.hidden = true;
    bookOrderStatus.textContent = bookOrderForm.dataset.success;
    bookOrderStatus.className = 'order-status is-visible';
  } catch (error) {
    bookOrderStatus.textContent = 'Något gick fel. Försök igen eller kontakta oss via telefon eller e-post.';
    bookOrderStatus.className = 'order-status is-visible is-error';
    submit.disabled = false;
    submit.innerHTML = originalLabel;
  }
});
