// ============================================================
// NexaTech — Pagina de Inicio
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('featuredCards');
  if (!grid) return;
  const services = getServices().filter(s => s.featured).slice(0, 4);
  services.forEach((svc, i) => {
    const card = buildCard(svc, i * 100);
    card.querySelector('a.btn').href = `paginas/detail.html?id=${svc.id}`;
    grid.appendChild(card);
  });
});
