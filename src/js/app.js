// ============================================================
// NexaTech — Core App Logic
// ============================================================

// ── TOAST NOTIFICATIONS ──
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  const icons = { success: '✓', danger: '✕', info: 'ℹ' };
  toast.innerHTML = `<span>${icons[type] || 'ℹ'}</span> ${message}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'toastIn 0.4s reverse both';
    setTimeout(() => toast.remove(), 400);
  }, 3000);
}

// ── MOBILE MENU ──
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('navBurger');
  const menu   = document.getElementById('navMenu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      menu.classList.toggle('open');
      burger.classList.toggle('open');
    });
    menu.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        burger.classList.remove('open');
      });
    });
  }

  // Active nav link
  const currentPath = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const linkPath = link.getAttribute('href').split('/').pop();
    if (linkPath === currentPath) link.classList.add('active');
    else link.classList.remove('active');
  });

  updateFavBadge();

  // Sticky header shadow
  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) header.style.boxShadow = scrollY > 20 ? '0 4px 24px rgba(0,0,0,0.4)' : 'none';
  });
});

// ── CARD BUILDER ──
function buildCard(service, animDelay = 0) {
  const fav = isFavorite(service.id);
  const card = document.createElement('div');
  card.className = 'card';
  card.style.animationDelay = `${animDelay}ms`;
  card.dataset.id = service.id;
  card.innerHTML = `
    <div class="card__img-wrap">
      <img class="card__img" src="${service.image}" alt="${service.name}" loading="lazy" />
      <span class="card__category">${service.category}</span>
      <button class="card__fav-btn ${fav ? 'active' : ''}" data-id="${service.id}" title="Favorito" aria-label="Favorito">★</button>
    </div>
    <div class="card__body">
      <h3 class="card__title">${service.name}</h3>
      <p class="card__desc">${service.shortDesc}</p>
      <div class="card__footer">
        <span class="card__price">${service.price}</span>
        <a href="detail.html?id=${service.id}" class="btn btn--outline btn--sm">Ver más →</a>
      </div>
    </div>
  `;
  card.querySelector('.card__fav-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite(service.id);
    const btn = e.currentTarget;
    btn.classList.toggle('active', isFavorite(service.id));
    updateAllFavButtons(service.id);
  });
  card.querySelector('.card__img-wrap').addEventListener('click', () => {
    location.href = `paginas/detail.html?id=${service.id}`;
  });
  return card;
}

function updateAllFavButtons(serviceId) {
  document.querySelectorAll(`.card__fav-btn[data-id="${serviceId}"]`).forEach(btn => {
    btn.classList.toggle('active', isFavorite(serviceId));
  });
}
