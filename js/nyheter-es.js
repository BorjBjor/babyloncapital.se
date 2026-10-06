const button=document.querySelector('.menu-button'),nav=document.querySelector('.nav');button.addEventListener('click',()=>{const open=nav.classList.toggle('open');button.setAttribute('aria-expanded',open)});
    const revealSignup=(panel,input)=>requestAnimationFrame(()=>{panel.scrollIntoView({behavior:'smooth',block:'start'});setTimeout(()=>input.focus({preventScroll:true}),450)});
    document.querySelectorAll('.video-card').forEach(card=>{const video=card.querySelector('video'),play=card.querySelector('.play-button');let tracked=false;play.addEventListener('click',()=>video.play());video.addEventListener('play',()=>{play.classList.add('hidden');if(!tracked&&typeof gtag==='function'){gtag('event','investerarmote_play',{video_title:card.querySelector('h3').textContent,video_file:video.querySelector('source').src.split('/').pop()});tracked=true}});video.addEventListener('pause',()=>{if(video.currentTime===0)play.classList.remove('hidden')});});
    const letterToggle=document.querySelector('#letter-toggle'),letterSignup=document.querySelector('#letter-signup');letterToggle.addEventListener('click',()=>{const open=letterSignup.classList.toggle('open');letterToggle.setAttribute('aria-expanded',open);letterToggle.textContent=open?'Cerrar formulario':'Sí, envíame la carta a inversores';if(open)document.querySelector('#letter-name').focus()});
    const letterForm=document.querySelector('#letter-form'),letterStatus=document.querySelector('#letter-status');letterForm.addEventListener('submit',async event=>{event.preventDefault();const submit=letterForm.querySelector('.signup-submit');submit.disabled=true;submit.textContent='Registrando…';letterStatus.className='signup-status';try{const response=await fetch(letterForm.action,{method:'POST',body:new FormData(letterForm),headers:{Accept:'application/json'}});const result=await response.json();if(!response.ok||!result.ok)throw new Error(result.error||'No se pudo completar el registro.');letterForm.reset();letterForm.hidden=true;letterStatus.textContent='¡Gracias! Ya estás registrado para recibir las próximas cartas a inversores.';letterStatus.className='signup-status show'}catch(error){letterStatus.textContent='Algo salió mal. Comprueba los datos e inténtalo de nuevo.';letterStatus.className='signup-status show error';submit.disabled=false;submit.textContent='Registrarme'}});

document.querySelectorAll('[data-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    const panel = document.getElementById(button.dataset.toggle);
    const meeting = button.dataset.meeting;
    const open = !panel.classList.contains('is-open');
    panel.classList.toggle('is-open', open);
    if (meeting) {
      panel.querySelector('[name="source"]').value = `Babylon Capital – ${meeting}`;
      const message = panel.querySelector('[name="message"]');
      message.value = meeting + ' — ' + message.value.replace(/^[^\n]* — /, '');
      const emailLink = panel.querySelector('.form-help a');
      emailLink.href = 'mailto:henrik.hallenborg@borstjanaren.se?subject=' + encodeURIComponent('Babylon Capital – ' + meeting);
    }
    document.querySelectorAll(`[data-toggle="${panel.id}"]`).forEach(trigger => trigger.setAttribute('aria-expanded', String(open)));
    button.setAttribute('aria-expanded', String(open));
    if (open) {
      document.querySelectorAll('.signup-panel.is-open').forEach((otherPanel) => {
        if (otherPanel === panel) return;
        otherPanel.classList.remove('is-open');
        document.querySelectorAll(`[data-toggle="${otherPanel.id}"]`).forEach(trigger => trigger.setAttribute('aria-expanded', 'false'));
      });

      window.requestAnimationFrame(() => {
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        panel.querySelector('input')?.focus({ preventScroll: true });
      });
    }
  });
});

const newsLanguage = document.documentElement.lang || 'sv';
const newsMessages = {
  sv: { sending: 'Skickar…', sendError: 'Formuläret kunde inte skickas.', generalError: 'Något gick fel. Kontrollera uppgifterna och försök igen, eller använd e-postlänken.', retry: 'Försök igen', greeting: 'Hej Henrik', request: 'Ja tack, skicka mig investerarbrevet.', name: 'Namn', email: 'E-post', phone: 'Telefon', message: 'Meddelande', missing: 'Ej angivet' },
  en: { sending: 'Sending…', sendError: 'The form could not be submitted.', generalError: 'Something went wrong. Check your details and try again, or use the email link.', retry: 'Try again', greeting: 'Hello Henrik', request: 'Yes please, send me the investor letter.', name: 'Name', email: 'Email', phone: 'Phone', message: 'Message', missing: 'Not provided' },
  es: { sending: 'Enviando…', sendError: 'No se pudo enviar el formulario.', generalError: 'Algo salió mal. Revisa los datos e inténtalo de nuevo o utiliza el enlace de correo electrónico.', retry: 'Intentar de nuevo', greeting: 'Hola Henrik', request: 'Sí, envíame la carta al inversor.', name: 'Nombre', email: 'Correo electrónico', phone: 'Teléfono', message: 'Mensaje', missing: 'No indicado' }
};
const newsText = newsMessages[newsLanguage] || newsMessages.sv;

document.querySelectorAll('.ajax-form').forEach((form) => {
  const status = form.parentElement.querySelector('.form-status');
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const submit = form.querySelector('.form-submit');
    submit.disabled = true;
    submit.textContent = newsText.sending;
    status.className = 'form-status';

    try {
      const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.ok === false) throw new Error(result.error || newsText.sendError);
      form.reset();
      form.hidden = true;
      form.setAttribute('aria-hidden', 'true');
      form.style.setProperty('display', 'none', 'important');
      status.textContent = form.dataset.success;
      status.className = 'form-status is-visible';
      status.setAttribute('tabindex', '-1');
      status.focus({ preventScroll: true });
      status.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } catch (error) {
      status.textContent = newsText.generalError;
      status.className = 'form-status is-visible is-error';
      submit.disabled = false;
      submit.textContent = newsText.retry;
    }
  });
});

