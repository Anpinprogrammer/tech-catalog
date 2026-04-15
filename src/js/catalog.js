// ============================================================
// NexaTech — Pagina de Catalogo
// ============================================================
let activeCategory = 'Todos';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  buildFilters();
  renderCatalog();

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderCatalog();
    });
  }
});

function buildFilters() {
  const container = document.getElementById('filters');
  if (!container) return;
  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `filter-btn ${cat === activeCategory ? 'active' : ''}`;
    btn.textContent = cat;
    btn.addEventListener('click', () => {
      activeCategory = cat;
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCatalog();
    });
    container.appendChild(btn);
  });
}

function renderCatalog() {
  const grid = document.getElementById('catalogGrid');
  const empty = document.getElementById('emptyState');
  const count = document.getElementById('resultsCount');
  if (!grid) return;

  let services = getServices();

  if (activeCategory !== 'Todos') {
    services = services.filter(s => s.category === activeCategory);
  }

  if (searchQuery) {
    services = services.filter(s =>
      s.name.toLowerCase().includes(searchQuery) ||
      s.shortDesc.toLowerCase().includes(searchQuery) ||
      s.category.toLowerCase().includes(searchQuery) ||
      (s.tags && s.tags.some(t => t.toLowerCase().includes(searchQuery)))
    );
  }

  grid.innerHTML = '';

  if (services.length === 0) {
    empty.style.display = 'block';
    grid.style.display = 'none';
    if (count) count.textContent = '';
  } else {
    empty.style.display = 'none';
    grid.style.display = '';
    if (count) count.textContent = `${services.length} servicio${services.length !== 1 ? 's' : ''} encontrado${services.length !== 1 ? 's' : ''}`;
    services.forEach((svc, i) => {
      grid.appendChild(buildCard(svc, i * 80));
    });
  }
}
