// ============================================================
// NexaTech — Pagina Favoritos
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  renderFavorites();

  const clearBtn = document.getElementById('clearFavsBtn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('¿Estás seguro de que quieres eliminar todos tus favoritos?')) {
        saveFavorites([]);
        updateFavBadge();
        renderFavorites();
        showToast('Favoritos eliminados', 'info');
      }
    });
  }
});

function renderFavorites() {
  const grid = document.getElementById('favsGrid');
  const empty = document.getElementById('favsEmpty');
  const clearWrap = document.getElementById('favsClear');
  if (!grid) return;

  const favIds = getFavorites();
  const services = getServices().filter(s => favIds.includes(s.id));

  grid.innerHTML = '';

  if (services.length === 0) {
    empty.style.display = 'block';
    grid.style.display = 'none';
    clearWrap.style.display = 'none';
  } else {
    empty.style.display = 'none';
    grid.style.display = '';
    clearWrap.style.display = 'block';
    services.forEach((svc, i) => {
      const card = buildCard(svc, i * 80);
      const favBtn = card.querySelector('.card__fav-btn');
      favBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleFavorite(svc.id);
        renderFavorites();
      }, true);
      grid.appendChild(card);
    });
  }
}
