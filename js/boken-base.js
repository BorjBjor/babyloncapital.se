const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const dropdowns = document.querySelectorAll('.nav-dropdown');

document.querySelectorAll('.footer-meta').forEach((footerMeta) => {
  if (footerMeta.querySelector('.footer-x-link')) return;

  const xLink = document.createElement('a');
  xLink.className = 'footer-x-link';
  xLink.href = 'https://x.com/borstjanaren';
  xLink.target = '_blank';
  xLink.rel = 'noopener noreferrer';
  xLink.setAttribute('aria-label', 'Följ Börstjänaren på X');
  xLink.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817-5.967 6.817H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"/></svg><span>Följ på X</span>';
  footerMeta.prepend(xLink);
});

function updateHeader() {
  header?.classList.toggle('is-scrolled', window.scrollY > 30);
}

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const open = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
  document.body.style.overflow = open ? 'hidden' : '';
});

dropdowns.forEach((dropdown) => {
  const trigger = dropdown.querySelector(':scope > a');
  trigger?.setAttribute('aria-haspopup', 'true');
  trigger?.setAttribute('aria-expanded', 'false');

  trigger?.addEventListener('click', (event) => {
    if (window.innerWidth <= 1040) {
      event.preventDefault();
      const open = !dropdown.classList.contains('is-open');
      dropdowns.forEach((item) => {
        item.classList.remove('is-open');
        item.querySelector(':scope > a')?.setAttribute('aria-expanded', 'false');
      });
      dropdown.classList.toggle('is-open', open);
      trigger.setAttribute('aria-expanded', String(open));
    }
  });
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    if (!link.closest('.nav-dropdown') || link.closest('.dropdown-menu')) {
      navigation.classList.remove('is-open');
      menuButton?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
});

const contactSection = document.querySelector('#kontakt');
const contactNav = document.querySelector('[data-contact-nav]');

if (contactSection && contactNav) {
  const contactObserver = new IntersectionObserver((entries) => {
    const isCurrent = entries[0].isIntersecting;
    contactNav.classList.toggle('is-current', isCurrent);
    if (isCurrent) {
      contactNav.setAttribute('aria-current', 'location');
    } else {
      contactNav.removeAttribute('aria-current');
    }
  }, { threshold: 0.28 });

  contactObserver.observe(contactSection);
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const heroVideo = document.querySelector('[data-hero-video]');
const videoControl = document.querySelector('[data-video-control]');

if (heroVideo) {
  heroVideo.muted = true;
  heroVideo.defaultMuted = true;
  heroVideo.volume = 0;
}

heroVideo?.play().catch(() => {
  videoControl?.setAttribute('hidden', '');
});

videoControl?.addEventListener('click', () => {
  if (heroVideo.paused) {
    heroVideo.play();
    videoControl.textContent = 'Pausa';
    videoControl.setAttribute('aria-label', 'Pausa bakgrundsvideon');
  } else {
    heroVideo.pause();
    videoControl.textContent = 'Spela';
    videoControl.setAttribute('aria-label', 'Spela bakgrundsvideon');
  }
});

document.querySelectorAll('[data-contact-form]').forEach((form) => {
  const status = form.parentElement.querySelector('.contact-form-status');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submit = form.querySelector('.contact-submit');
    const originalLabel = submit.textContent;
    submit.disabled = true;
    submit.textContent = 'Skickar…';
    status.className = 'contact-form-status';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || 'Formuläret kunde inte skickas.');
      form.reset();
      form.hidden = true;
      status.textContent = form.dataset.success;
      status.className = 'contact-form-status is-visible';
    } catch (error) {
      status.textContent = 'Något gick fel. Försök igen eller kontakta mig via WhatsApp eller telefon.';
      status.className = 'contact-form-status is-visible is-error';
      submit.disabled = false;
      submit.textContent = originalLabel;
    }
  });
});

document.querySelector('#home-whatsapp-submit')?.addEventListener('click', () => {
  const form = document.querySelector('#home-information-form');
  if (!form || !form.reportValidity()) return;
  const name = form.querySelector('[name="name"]').value.trim();
  const email = form.querySelector('[name="email"]').value.trim();
  const phone = form.querySelector('[name="phone"]').value.trim();
  const note = form.querySelector('[name="message"]').value.trim();
  const message = `Hej Henrik,\n\nJag vill gärna få mer information om Hallenborg CTA och Arkad.\n\nNamn: ${name}\nE-post: ${email}\nTelefon: ${phone || 'Ej angivet'}\nMeddelande: ${note || 'Ej angivet'}`;
  window.open(`https://wa.me/34638008073?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
});
