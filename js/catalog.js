// ============================================================
// catalog.js
// Responsável por RENDERIZAR os cards do catálogo e gerenciar
// o sistema de avaliações interativo (estilo Google Play Store).
//
// DEPENDE DE: data.js (deve ser carregado antes no HTML)
// ============================================================


// ── Banco de avaliações em memória ───────────────────────────
/*
  Objeto que guarda as avaliações de cada produto.
  A chave é o índice do produto no array ITEMS.
  Cada produto tem:
    - ratings: array de notas dadas pelos usuários
    - comments: array de objetos { stars, text, date }

  Como não temos backend ainda, os dados somem ao recarregar
  a página. No backend isso será salvo no banco de dados.
*/
const reviewsDB = {};


// ── Função: inicializa o banco vazio para cada produto ───────
function initReviewsDB() {
  ITEMS.forEach((_, index) => {
    reviewsDB[index] = {
      ratings: [],
      comments: [],
    };
  });
}


// ── Função: calcula a média das notas de um produto ──────────
function calcAverage(index) {
  const ratings = reviewsDB[index].ratings;
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((total, n) => total + n, 0);
  return (sum / ratings.length).toFixed(1);
}


// ── Função: gera estrelas ESTÁTICAS (só para exibir média) ───
function buildStarsStatic(rating, size = 12) {
  const fullCount = Math.round(rating);
  return [1, 2, 3, 4, 5]
    .map((position) => {
      const isFull = position <= fullCount;
      return `<svg width="${size}" height="${size}" viewBox="0 0 24 24"
        fill="${isFull ? '#f5a623' : 'none'}"
        stroke="${isFull ? '#f5a623' : '#2a4060'}"
        stroke-width="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>`;
    })
    .join('');
}


// ── Função: gera estrelas INTERATIVAS (clicáveis) ────────────
function buildStarsInteractive(productIndex) {
  return [1, 2, 3, 4, 5]
    .map((position) => `
      <svg class="star-pick"
        data-index="${productIndex}"
        data-star="${position}"
        width="26" height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#2a4060"
        stroke-width="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>`)
    .join('');
}


// ── Função: pinta as estrelas do seletor ─────────────────────
function updatePickerStars(productIndex, highlightUpTo) {
  document.querySelectorAll(`.star-pick[data-index="${productIndex}"]`)
    .forEach((star) => {
      const pos    = parseInt(star.dataset.star);
      const active = pos <= highlightUpTo;
      star.setAttribute('fill',   active ? '#f5a623' : 'none');
      star.setAttribute('stroke', active ? '#f5a623' : '#2a4060');
    });
}


// ── Função: atualiza resumo (média + total) no card ──────────
function updateSummary(productIndex) {
  const avg   = calcAverage(productIndex);
  const total = reviewsDB[productIndex].ratings.length;

  const avgEl   = document.getElementById(`avg-${productIndex}`);
  const starsEl = document.getElementById(`avg-stars-${productIndex}`);
  const totalEl = document.getElementById(`total-${productIndex}`);

  if (avgEl)   avgEl.textContent   = total > 0 ? avg : '—';
  if (starsEl) starsEl.innerHTML   = buildStarsStatic(total > 0 ? parseFloat(avg) : 0);
  if (totalEl) totalEl.textContent = total === 0
    ? 'Seja o primeiro a avaliar'
    : `${total} avaliação${total > 1 ? 'ões' : ''}`;
}


// ── Função: renderiza lista de comentários ───────────────────
function renderComments(productIndex) {
  const list = document.getElementById(`comments-${productIndex}`);
  if (!list) return;

  const comments = reviewsDB[productIndex].comments;

  if (comments.length === 0) {
    list.innerHTML = `<p class="no-comments">Nenhuma avaliação ainda. Seja o primeiro!</p>`;
    return;
  }

  list.innerHTML = [...comments].reverse().map((c) => `
    <div class="comment-item">
      <div class="comment-header">
        <div class="comment-stars">${buildStarsStatic(c.stars, 11)}</div>
        <span class="comment-date">${c.date}</span>
      </div>
      <p class="comment-text ${c.text ? '' : 'muted'}">
        ${c.text || 'Sem comentário.'}
      </p>
    </div>
  `).join('');
}


// ── Função: envia a avaliação ────────────────────────────────
function submitReview(productIndex) {
  const firstStar = document.querySelector(`.star-pick[data-index="${productIndex}"]`);
  const selected  = parseInt(firstStar?.dataset.selected || '0');

  const hint = document.getElementById(`hint-${productIndex}`);

  if (selected === 0) {
    if (hint) {
      hint.textContent  = 'Selecione pelo menos 1 estrela!';
      hint.style.color  = '#e05555';
      setTimeout(() => { hint.textContent = ''; }, 3000);
    }
    return;
  }

  const textarea = document.getElementById(`comment-input-${productIndex}`);
  const text     = textarea ? textarea.value.trim() : '';
  const date     = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  reviewsDB[productIndex].ratings.push(selected);
  reviewsDB[productIndex].comments.push({ stars: selected, text, date });

  // Reseta o formulário
  updatePickerStars(productIndex, 0);
  document.querySelectorAll(`.star-pick[data-index="${productIndex}"]`)
    .forEach(s => delete s.dataset.selected);
  if (textarea) textarea.value = '';

  if (hint) {
    hint.textContent = '✓ Avaliação enviada! Obrigado.';
    hint.style.color = 'var(--teal)';
    setTimeout(() => { hint.textContent = ''; }, 3000);
  }

  updateSummary(productIndex);
  renderComments(productIndex);
}


// ── Função: ícone WhatsApp SVG ───────────────────────────────
function buildWhatsAppIcon() {
  return `<svg viewBox="0 0 24 24" fill="#25d366">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>`;
}


// ── Função principal: cria e injeta todos os cards ───────────
function renderCatalog() {
  const grid = document.getElementById('catGrid');
  if (!grid) { console.error('Elemento #catGrid não encontrado.'); return; }

  ITEMS.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'cat-card';

    const waLink = `https://wa.me/${WA_NUM}?text=${encodeURIComponent(
      `Olá! Tenho interesse em: ${product.n} (${product.p})`
    )}`;

    card.innerHTML = `
      ${product.b ? `<span class="cat-badge">${product.b}</span>` : ''}
      <div class="cat-img">${product.e}</div>
      <div class="cat-body">
        <div class="cat-name">${product.n}</div>
        <div class="cat-price">${product.p}</div>

        <div class="rating-summary">
          <span class="avg-number" id="avg-${index}">—</span>
          <div class="avg-stars" id="avg-stars-${index}">${buildStarsStatic(0)}</div>
          <span class="avg-total" id="total-${index}">Seja o primeiro a avaliar</span>
        </div>

        <div class="review-form">
          <span class="review-form-label">Avalie este produto:</span>
          <div class="star-picker">${buildStarsInteractive(index)}</div>
          <textarea
            id="comment-input-${index}"
            class="comment-input"
            placeholder="Conte sua experiência (opcional)..."
            rows="2"
            maxlength="300"
          ></textarea>
          <div class="review-form-footer">
            <span class="review-hint" id="hint-${index}"></span>
            <button class="review-submit" onclick="submitReview(${index})">
              Enviar avaliação
            </button>
          </div>
        </div>

        <div class="comments-list" id="comments-${index}">
          <p class="no-comments">Nenhuma avaliação ainda. Seja o primeiro!</p>
        </div>

        <a class="cat-wa" href="${waLink}" target="_blank" rel="noopener noreferrer">
          ${buildWhatsAppIcon()}
          Perguntar disponibilidade
        </a>
      </div>
    `;

    grid.appendChild(card);
  });

  attachStarEvents();
}


// ── Eventos das estrelas via delegação ───────────────────────
function attachStarEvents() {

  document.addEventListener('mouseover', (e) => {
    const star = e.target.closest('.star-pick');
    if (!star) return;
    updatePickerStars(parseInt(star.dataset.index), parseInt(star.dataset.star));
  });

  document.addEventListener('mouseout', (e) => {
    const star = e.target.closest('.star-pick');
    if (!star) return;
    const index    = parseInt(star.dataset.index);
    const firstStar = document.querySelector(`.star-pick[data-index="${index}"]`);
    const selected = parseInt(firstStar?.dataset.selected || '0');
    updatePickerStars(index, selected);
  });

  document.addEventListener('click', (e) => {
    const star = e.target.closest('.star-pick');
    if (!star) return;
    const index = parseInt(star.dataset.index);
    const pos   = parseInt(star.dataset.star);
    document.querySelectorAll(`.star-pick[data-index="${index}"]`)
      .forEach(s => s.dataset.selected = pos);
    updatePickerStars(index, pos);
  });
}


// ── Inicialização ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initReviewsDB();
  renderCatalog();
});