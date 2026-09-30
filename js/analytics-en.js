(() => {
  const measurementId = 'G-1D51BLBCPR';
  const consentKey = 'blue_babylon_analytics_consent';

  function addConsentStyles() {
    if (document.querySelector('[data-analytics-consent-styles]')) return;
    const style = document.createElement('style');
    style.dataset.analyticsConsentStyles = '';
    style.textContent = `
      .analytics-consent{position:fixed;z-index:10000;right:24px;bottom:24px;left:24px;color:#f8f3e9;background:#0d2942;border:1px solid rgba(201,151,43,.65);box-shadow:0 18px 55px rgba(0,0,0,.3)}
      .analytics-consent__inner{width:min(1180px,100%);margin:0 auto;padding:22px 26px;display:flex;align-items:center;justify-content:space-between;gap:28px;box-sizing:border-box}
      .analytics-consent strong{display:block;margin-bottom:5px;font-family:Georgia,'Times New Roman',serif;font-size:1.2rem;color:#fff}
      .analytics-consent p{max-width:780px;margin:0;color:#d7e1e9;line-height:1.55;font-family:Arial,sans-serif;font-size:15px}
      .analytics-consent a{color:#fff;text-decoration:underline;text-underline-offset:3px}
      .analytics-consent__actions{display:flex;gap:10px;flex:0 0 auto}
      .analytics-consent button{min-width:108px;padding:11px 16px;border:1px solid #d4a53b;color:#fff;background:transparent;font:600 14px Arial,sans-serif;cursor:pointer}
      .analytics-consent button.is-primary{color:#10283d;background:#d4a53b}
      .analytics-consent button:hover,.analytics-consent button:focus-visible{outline:2px solid #fff;outline-offset:2px}
      @media(max-width:720px){.analytics-consent{right:12px;bottom:12px;left:12px}.analytics-consent__inner{padding:18px;align-items:stretch;flex-direction:column;gap:16px}.analytics-consent__actions,.analytics-consent button{width:100%}}
    `;
    document.head.appendChild(style);
  }

  function loadGoogleAnalytics() {
    if (window.blueBabylonAnalyticsLoaded) return;
    window.blueBabylonAnalyticsLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', measurementId);

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }

  function saveConsent(choice) {
    localStorage.setItem(consentKey, choice);
    document.querySelector('[data-analytics-consent]')?.remove();
    if (choice === 'granted') loadGoogleAnalytics();
  }

  function showConsent() {
    addConsentStyles();
    const banner = document.createElement('section');
    banner.className = 'analytics-consent';
    banner.dataset.analyticsConsent = '';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Analytics cookie choices');
    banner.innerHTML = `
      <div class="analytics-consent__inner">
        <div>
          <strong>Analytics cookies</strong>
          <p>We use Google Analytics to understand how the website is used and how often material is downloaded. You decide whether analytics cookies may be used. <a href="/en/privacy-policy/">Read the privacy policy</a>.</p>
        </div>
        <div class="analytics-consent__actions">
          <button type="button" data-analytics-reject>Reject</button>
          <button type="button" class="is-primary" data-analytics-accept>Accept</button>
        </div>
      </div>`;
    document.body.appendChild(banner);
    banner.querySelector('[data-analytics-accept]')?.addEventListener('click', () => saveConsent('granted'));
    banner.querySelector('[data-analytics-reject]')?.addEventListener('click', () => saveConsent('denied'));
  }

  const storedConsent = localStorage.getItem(consentKey);
  if (storedConsent === 'granted') loadGoogleAnalytics();
  else if (storedConsent !== 'denied') showConsent();

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link || typeof window.gtag !== 'function') return;
    const href = link.href;

    if (/managed-futures-folj-flocken-pa-avstand\.v1\.pdf(?:$|[?#])/i.test(href)) {
      window.gtag('event', 'book_pdf_download', {
        site: 'blue_babylon',
        book: 'managed_futures',
        file_name: 'managed-futures-folj-flocken-pa-avstand.v1.pdf',
        link_text: link.textContent.trim()
      });
    }

    if (/Investerarbrev_Nr1_2026\.pdf(?:$|[?#])/i.test(href)) {
      window.gtag('event', 'investor_letter_pdf_download', {
        site: 'blue_babylon',
        letter: 'investerarbrev_1_2026',
        file_name: 'Investerarbrev_Nr1_2026.pdf',
        link_text: link.textContent.trim()
      });
    }
  });
})();
