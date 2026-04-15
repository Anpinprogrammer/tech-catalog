// ============================================================
// NexaTech — Pagina Contacto
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // Mostrar menu de servicios
  const serviceSelect = document.getElementById('service');
  if (serviceSelect) {
    getServices().forEach(svc => {
      const opt = document.createElement('option');
      opt.value = svc.name;
      opt.textContent = svc.name;
      serviceSelect.appendChild(opt);
    });
    const params = new URLSearchParams(location.search);
    const preSelected = params.get('service');
    if (preSelected) serviceSelect.value = preSelected;
  }

  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', handleSubmit);
  }

  // Validacion en tiempo real
  ['firstName', 'lastName', 'email', 'message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('blur', () => validateField(id));
    if (el) el.addEventListener('input', () => clearError(id));
  });
});

function validateField(id) {
  const el = document.getElementById(id);
  const errEl = document.getElementById(id + 'Err');
  if (!el || !errEl) return true;

  let valid = true;

  if (id === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    valid = emailRegex.test(el.value.trim());
  } else if (id === 'message') {
    valid = el.value.trim().length >= 20;
  } else {
    valid = el.value.trim().length > 0;
  }

  el.classList.toggle('error', !valid);
  errEl.classList.toggle('show', !valid);
  return valid;
}

function clearError(id) {
  const el = document.getElementById(id);
  const errEl = document.getElementById(id + 'Err');
  if (el) el.classList.remove('error');
  if (errEl) errEl.classList.remove('show');
}

function handleSubmit() {
  // Ocultar las alertas 
  document.getElementById('successAlert').classList.remove('show');
  document.getElementById('errorAlert').classList.remove('show');

  const fields = ['firstName', 'lastName', 'email', 'message'];
  const validations = fields.map(f => validateField(f));

  // Revision de terminos
  const terms = document.getElementById('terms');
  const termsErr = document.getElementById('termsErr');
  const termsValid = terms && terms.checked;
  if (termsErr) termsErr.classList.toggle('show', !termsValid);

  const allValid = validations.every(Boolean) && termsValid;

  if (!allValid) {
    document.getElementById('errorAlert').classList.add('show');
    document.getElementById('errorAlert').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    return;
  }

  // Simulacion de envio de informacion 
  const btn = document.getElementById('submitBtn');
  btn.textContent = 'Enviando...';
  btn.disabled = true;

  setTimeout(() => {
    // Guardar en localStorage
    const submissions = JSON.parse(localStorage.getItem('nexatech_contacts') || '[]');
    submissions.push({
      id: Date.now(),
      firstName: document.getElementById('firstName').value.trim(),
      lastName: document.getElementById('lastName').value.trim(),
      email: document.getElementById('email').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      service: document.getElementById('service').value,
      budget: document.getElementById('budget').value,
      message: document.getElementById('message').value.trim(),
      date: new Date().toLocaleString('es-CO')
    });
    localStorage.setItem('nexatech_contacts', JSON.stringify(submissions));

    // Reestablecer el formulario
    ['firstName', 'lastName', 'email', 'phone', 'message'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    document.getElementById('service').value = '';
    document.getElementById('budget').value = '';
    document.getElementById('terms').checked = false;

    btn.textContent = 'Enviar mensaje →';
    btn.disabled = false;

    document.getElementById('successAlert').classList.add('show');
    document.getElementById('successAlert').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    showToast('¡Mensaje enviado exitosamente!', 'success');
  }, 1200);
}
