// ============================================================
// NexaTech — Pagina de detalles
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(location.search);
  const id = parseInt(params.get('id'));
  const services = getServices();
  const service = services.find(s => s.id === id);
  const container = document.getElementById('detailContent');

  if (!service || !container) {
    container.innerHTML = `
      <div style="padding:80px 0; text-align:center; grid-column:1/-1;">
        <div style="font-size:3rem; margin-bottom:16px; opacity:0.4">😕</div>
        <h2 style="font-family:var(--font-head); margin:0 0 12px;">Servicio no encontrado</h2>
        <a href="catalog.html" class="btn btn--outline">← Volver al catálogo</a>
      </div>
    `;
    return;
  }

  document.title = `${service.name} — NexaTech`;
  const fav = isFavorite(service.id);

  const tagsHtml = (service.tags || []).map(t => `<span class="tag">${t}</span>`).join('');

  container.innerHTML = `
    <div>
      <a href="catalog.html" class="back-link">← Volver al catálogo</a>
      <div class="detail-img-wrap">
        <img src="${service.image}" alt="${service.name}" />
      </div>
    </div>
    <div class="detail-info">
      <span class="detail-badge">${service.category}</span>
      <h1 class="detail-title">${service.name}</h1>
      <div class="detail-price">${service.price}</div>
      <p class="detail-desc">${service.description}</p>
      <div class="detail-tags">${tagsHtml}</div>
      <div class="detail-actions">
        <button class="btn btn--primary btn--lg" id="favBtn">
          ${fav ? '★ En Favoritos' : '☆ Agregar a Favoritos'}
        </button>
        <a href="contact.html?service=${encodeURIComponent(service.name)}" class="btn btn--ghost btn--lg">Solicitar información →</a>
      </div>
    </div>
  `;

  const favBtn = document.getElementById('favBtn');
  favBtn.addEventListener('click', () => {
    toggleFavorite(service.id);
    const now = isFavorite(service.id);
    favBtn.textContent = now ? '★ En Favoritos' : '☆ Agregar a Favoritos';
    favBtn.style.background = now ? 'rgba(245,158,11,0.15)' : '';
    favBtn.style.color = now ? 'var(--gold)' : '';
    favBtn.style.borderColor = now ? 'var(--gold)' : '';
  });

  if (isFavorite(service.id)) {
    favBtn.style.background = 'rgba(245,158,11,0.15)';
    favBtn.style.color = 'var(--gold)';
    favBtn.style.borderColor = 'var(--gold)';
  }

  // Related services
  const related = services.filter(s => s.category === service.category && s.id !== service.id).slice(0, 3);
  if (related.length > 0) {
    const section = document.getElementById('relatedSection');
    const grid = document.getElementById('relatedGrid');
    section.style.display = '';
    related.forEach((svc, i) => grid.appendChild(buildCard(svc, i * 100)));
  }
});
