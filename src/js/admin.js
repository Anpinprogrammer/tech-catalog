// ============================================================
// NexaTech — Admin CRUD Page
// ============================================================

let editingId = null;
let deletingId = null;

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80';

document.addEventListener('DOMContentLoaded', () => {
  renderStats();
  renderTable();

  // Open create modal
  document.getElementById('openCreateModal').addEventListener('click', () => {
    editingId = null;
    clearModalForm();
    document.getElementById('modalTitle').textContent = 'Nuevo Servicio';
    openModal('serviceModal');
  });

  // Close modals
  document.getElementById('closeModal').addEventListener('click', () => closeModal('serviceModal'));
  document.getElementById('cancelModal').addEventListener('click', () => closeModal('serviceModal'));
  document.getElementById('cancelDelete').addEventListener('click', () => closeModal('deleteModal'));

  // Save service
  document.getElementById('saveService').addEventListener('click', saveService);

  // Confirm delete
  document.getElementById('confirmDelete').addEventListener('click', () => {
    if (deletingId !== null) {
      let services = getServices();
      services = services.filter(s => s.id !== deletingId);
      saveServices(services);
      deletingId = null;
      closeModal('deleteModal');
      renderStats();
      renderTable();
      showToast('Servicio eliminado', 'danger');
    }
  });

  // Reset to defaults
  document.getElementById('resetServicesBtn').addEventListener('click', () => {
    if (confirm('¿Restaurar todos los servicios a los valores por defecto? Se perderán los cambios actuales.')) {
      localStorage.removeItem('nexatech_services');
      renderStats();
      renderTable();
      showToast('Servicios restaurados', 'info');
    }
  });

  // Close on overlay click
  ['serviceModal', 'deleteModal'].forEach(id => {
    document.getElementById(id).addEventListener('click', (e) => {
      if (e.target.id === id) closeModal(id);
    });
  });
});

function renderStats() {
  const services = getServices();
  const container = document.getElementById('adminStats');
  if (!container) return;

  const cats = [...new Set(services.map(s => s.category))];
  const featured = services.filter(s => s.featured).length;
  const favs = getFavorites().length;

  container.innerHTML = `
    <div class="pillar">
      <div class="pillar__icon" style="font-size:1.4rem;">📦</div>
      <h3 style="font-size:2rem; font-family:var(--font-head); letter-spacing:-1px;">${services.length}</h3>
      <p>Servicios totales</p>
    </div>
    <div class="pillar">
      <div class="pillar__icon" style="font-size:1.4rem;">⭐</div>
      <h3 style="font-size:2rem; font-family:var(--font-head); letter-spacing:-1px;">${featured}</h3>
      <p>Servicios destacados</p>
    </div>
    <div class="pillar">
      <div class="pillar__icon" style="font-size:1.4rem;">🏷️</div>
      <h3 style="font-size:2rem; font-family:var(--font-head); letter-spacing:-1px;">${cats.length}</h3>
      <p>Categorías activas</p>
    </div>
    <div class="pillar">
      <div class="pillar__icon" style="font-size:1.4rem;">💛</div>
      <h3 style="font-size:2rem; font-family:var(--font-head); letter-spacing:-1px;">${favs}</h3>
      <p>En favoritos</p>
    </div>
  `;
}

function renderTable() {
  const tbody = document.getElementById('adminTbody');
  if (!tbody) return;
  const services = getServices();

  tbody.innerHTML = '';

  if (services.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted); padding:40px;">No hay servicios registrados.</td></tr>`;
    return;
  }

  services.forEach(svc => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><img src="${svc.image || DEFAULT_IMAGE}" alt="${svc.name}" onerror="this.src='${DEFAULT_IMAGE}'" /></td>
      <td style="font-weight:600; max-width:200px;">${svc.name}</td>
      <td><span class="tag" style="white-space:nowrap;">${svc.category}</span></td>
      <td style="color:var(--accent); font-weight:600; white-space:nowrap;">${svc.price}</td>
      <td style="text-align:center;">${svc.featured ? '<span style="color:var(--gold);">★</span>' : '<span style="color:var(--text-muted);">☆</span>'}</td>
      <td>
        <div class="td-actions">
          <button class="btn btn--ghost btn--sm" data-edit="${svc.id}">✏ Editar</button>
          <button class="btn btn--danger btn--sm" data-delete="${svc.id}">🗑 Eliminar</button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  // Bind edit buttons
  tbody.querySelectorAll('[data-edit]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.edit);
      openEditModal(id);
    });
  });

  // Bind delete buttons
  tbody.querySelectorAll('[data-delete]').forEach(btn => {
    btn.addEventListener('click', () => {
      deletingId = parseInt(btn.dataset.delete);
      openModal('deleteModal');
    });
  });
}

function openEditModal(id) {
  const services = getServices();
  const svc = services.find(s => s.id === id);
  if (!svc) return;

  editingId = id;
  document.getElementById('modalTitle').textContent = 'Editar Servicio';
  document.getElementById('mName').value = svc.name || '';
  document.getElementById('mCategory').value = svc.category || '';
  document.getElementById('mPrice').value = svc.price || '';
  document.getElementById('mShortDesc').value = svc.shortDesc || '';
  document.getElementById('mDesc').value = svc.description || '';
  document.getElementById('mImage').value = svc.image || '';
  document.getElementById('mTags').value = (svc.tags || []).join(', ');
  document.getElementById('mFeatured').checked = svc.featured || false;

  openModal('serviceModal');
}

function clearModalForm() {
  ['mName', 'mCategory', 'mPrice', 'mShortDesc', 'mDesc', 'mImage', 'mTags'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.getElementById('mFeatured').checked = false;
  ['mName', 'mCategory', 'mPrice', 'mShortDesc', 'mDesc'].forEach(id => {
    const el = document.getElementById(id);
    const err = document.getElementById(id + 'Err');
    if (el) el.classList.remove('error');
    if (err) err.classList.remove('show');
  });
}

function saveService() {
  const requiredFields = ['mName', 'mCategory', 'mPrice', 'mShortDesc', 'mDesc'];
  let allValid = true;

  requiredFields.forEach(id => {
    const el = document.getElementById(id);
    const err = document.getElementById(id + 'Err');
    const valid = el && el.value.trim().length > 0;
    if (el) el.classList.toggle('error', !valid);
    if (err) err.classList.toggle('show', !valid);
    if (!valid) allValid = false;
  });

  if (!allValid) {
    showToast('Completa todos los campos requeridos', 'danger');
    return;
  }

  const services = getServices();
  const tagsRaw = document.getElementById('mTags').value;
  const tags = tagsRaw ? tagsRaw.split(',').map(t => t.trim()).filter(Boolean) : [];

  const serviceData = {
    name:        document.getElementById('mName').value.trim(),
    category:    document.getElementById('mCategory').value,
    price:       document.getElementById('mPrice').value.trim(),
    shortDesc:   document.getElementById('mShortDesc').value.trim(),
    description: document.getElementById('mDesc').value.trim(),
    image:       document.getElementById('mImage').value.trim() || DEFAULT_IMAGE,
    tags,
    featured:    document.getElementById('mFeatured').checked
  };

  if (editingId !== null) {
    // Update existing
    const idx = services.findIndex(s => s.id === editingId);
    if (idx !== -1) {
      services[idx] = { ...services[idx], ...serviceData };
    }
    showToast(`"${serviceData.name}" actualizado`, 'success');
  } else {
    // Create new
    const maxId = services.reduce((max, s) => Math.max(max, s.id), 0);
    services.push({ id: maxId + 1, ...serviceData });
    showToast(`"${serviceData.name}" creado exitosamente`, 'success');
  }

  saveServices(services);
  closeModal('serviceModal');
  renderStats();
  renderTable();
}

function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}
