// ============================================================
// catalog.js — Geração Y
// ============================================================

// ── Estado global ────────────────────────────────────────────
var reviewsDB     = {};
var currentSort   = 'az';      // 'az' | 'price' | 'category'
var activeCategory = 'todos';

// ── Banco de avaliações ──────────────────────────────────────
function initReviewsDB() {
  for (var i = 0; i < ITEMS.length; i++) {
    reviewsDB[i] = { ratings: [], comments: [] };
  }
}

function calcAverage(i) {
  var r = reviewsDB[i].ratings;
  if (!r.length) return 0;
  var sum = 0;
  for (var x = 0; x < r.length; x++) sum += r[x];
  return (sum / r.length).toFixed(1);
}

// ── Estrelas ─────────────────────────────────────────────────
function buildStarsStatic(rating, size) {
  size = size || 12;
  var full = Math.round(rating);
  var html = '';
  for (var i = 1; i <= 5; i++) {
    var f = i <= full ? '#f5a623' : 'none';
    var s = i <= full ? '#f5a623' : '#2a4060';
    html += '<svg width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="' + f + '" stroke="' + s + '" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  }
  return html;
}

function buildStarsInteractive(idx) {
  var html = '';
  for (var p = 1; p <= 5; p++) {
    html += '<svg class="star-pick" data-index="' + idx + '" data-star="' + p + '" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2a4060" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>';
  }
  return html;
}

function updatePickerStars(idx, up) {
  var stars = document.querySelectorAll('.star-pick[data-index="' + idx + '"]');
  for (var i = 0; i < stars.length; i++) {
    var active = parseInt(stars[i].dataset.star) <= up;
    stars[i].setAttribute('fill',   active ? '#f5a623' : 'none');
    stars[i].setAttribute('stroke', active ? '#f5a623' : '#2a4060');
  }
}

function updateSummary(idx) {
  var avg   = calcAverage(idx);
  var total = reviewsDB[idx].ratings.length;
  var avgEl    = document.getElementById('avg-'       + idx);
  var starsEl  = document.getElementById('avg-stars-' + idx);
  var totalEl  = document.getElementById('total-'     + idx);
  if (avgEl)   avgEl.textContent   = total ? avg : '—';
  if (starsEl) starsEl.innerHTML   = buildStarsStatic(total ? parseFloat(avg) : 0);
  if (totalEl) totalEl.textContent = total === 0
    ? 'Seja o primeiro a avaliar'
    : total + ' avaliação' + (total > 1 ? 'ões' : '');
}

function renderComments(idx) {
  var list = document.getElementById('comments-' + idx);
  if (!list) return;
  var c = reviewsDB[idx].comments;
  if (!c.length) {
    list.innerHTML = '<p class="no-comments">Nenhuma avaliação ainda. Seja o primeiro!</p>';
    return;
  }
  var html = '';
  for (var i = c.length - 1; i >= 0; i--) {
    html += '<div class="comment-item"><div class="comment-header"><div class="comment-stars">' + buildStarsStatic(c[i].stars, 11) + '</div><span class="comment-date">' + c[i].date + '</span></div><p class="comment-text ' + (c[i].text ? '' : 'muted') + '">' + (c[i].text || 'Sem comentário.') + '</p></div>';
  }
  list.innerHTML = html;
}

function submitReview(idx) {
  var stars   = document.querySelectorAll('.star-pick[data-index="' + idx + '"]');
  var selected = parseInt((stars[0] && stars[0].dataset.selected) || '0');
  var hint     = document.getElementById('hint-' + idx);
  if (!selected) {
    if (hint) { hint.textContent = 'Selecione pelo menos 1 estrela!'; hint.style.color = '#e05555'; setTimeout(function(){ hint.textContent = ''; }, 3000); }
    return;
  }
  var ta   = document.getElementById('comment-input-' + idx);
  var text = ta ? ta.value.trim() : '';
  var date = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  reviewsDB[idx].ratings.push(selected);
  reviewsDB[idx].comments.push({ stars: selected, text: text, date: date });
  updatePickerStars(idx, 0);
  for (var i = 0; i < stars.length; i++) delete stars[i].dataset.selected;
  if (ta) ta.value = '';
  if (hint) { hint.textContent = '✓ Avaliação enviada! Obrigado.'; hint.style.color = 'var(--teal)'; setTimeout(function(){ hint.textContent = ''; }, 3000); }
  updateSummary(idx);
  renderComments(idx);
}

// ── Helpers ──────────────────────────────────────────────────
function parsePriceValue(str) {
  var clean = str.replace(/\./g, '').match(/[\d,]+/);
  return clean ? parseFloat(clean[0].replace(',', '.')) : 0;
}

function waIcon() {
  return '<svg viewBox="0 0 24 24" fill="#25d366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';
}

function getImgSrc(val) {
  if (!val) return '';
  return val.replace(/src='|'/g, '');
}

// ── SISTEMA DE ORDENAÇÃO ─────────────────────────────────────
var CAT_LABELS = {
  todos:'Todos', peliculas:'Películas', suportes:'Suportes',
  carregadores:'Carregadores', pilhas:'Pilhas', cabos:'Cabos',
  fones:'Fones', adaptadores:'Adaptadores', informatica:'Informática',
  mouse:'Mouse & Pad', teclados:'Teclados', gamer:'Gamer',
  video:'Cabo de Vídeo', outros:'Outros'
};
var CAT_EMOJI = {
  todos:'🏪', peliculas:'🛡️', suportes:'🏍️', carregadores:'🔌',
  pilhas:'🔋', cabos:'🔗', fones:'🎧', adaptadores:'🔄',
  informatica:'💾', mouse:'🖱️', teclados:'⌨️', gamer:'🎮',
  video:'📺', outros:'📦'
};

function renderSortBar() {
  var bar = document.getElementById('sortBar');
  if (!bar) return;

  // Pills de categoria (só quando modo = category)
  var pillsHtml = '';
  if (currentSort === 'category') {
    var cats = ['todos'];
    for (var i = 0; i < ITEMS.length; i++) {
      if (cats.indexOf(ITEMS[i].category) === -1) cats.push(ITEMS[i].category);
    }
    pillsHtml = '<div class="category-picker">';
    for (var c = 0; c < cats.length; c++) {
      var cat = cats[c];
      var isActive = activeCategory === cat ? ' active' : '';
      pillsHtml += '<button class="cat-pill' + isActive + '" onclick="setCategory(\'' + cat + '\')">'
        + '<span>' + (CAT_EMOJI[cat] || '📦') + '</span>'
        + (CAT_LABELS[cat] || cat)
        + '</button>';
    }
    pillsHtml += '</div>';
  }

  bar.innerHTML =
    '<div class="sort-controls">' +
      '<span class="sort-label">Ordenar por:</span>' +
      '<div class="sort-btns">' +
        '<button class="sort-btn' + (currentSort === 'az'       ? ' active' : '') + '" onclick="setSort(\'az\')">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M3 7h18M6 12h12M9 17h6"/></svg> A → Z' +
        '</button>' +
        '<button class="sort-btn' + (currentSort === 'price'    ? ' active' : '') + '" onclick="setSort(\'price\')">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> Preço' +
        '</button>' +
        '<button class="sort-btn' + (currentSort === 'category' ? ' active' : '') + '" onclick="setSort(\'category\')">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg> Categoria' +
        '</button>' +
      '</div>' +
    '</div>' +
    pillsHtml;
}

function setSort(mode) {
  currentSort = mode;
  if (mode !== 'category') activeCategory = 'todos';
  renderSortBar();
  refreshGrid();
}

function setCategory(cat) {
  activeCategory = cat;
  renderSortBar();
  refreshGrid();
}

function getSortedItems() {
  var indexed = [];
  for (var i = 0; i < ITEMS.length; i++) indexed.push({ item: ITEMS[i], i: i });

  if (currentSort === 'az') {
    indexed.sort(function(a, b) { return a.item.n.localeCompare(b.item.n, 'pt-BR'); });
  } else if (currentSort === 'price') {
    indexed.sort(function(a, b) { return parsePriceValue(a.item.p) - parsePriceValue(b.item.p); });
  } else if (currentSort === 'category') {
    if (activeCategory !== 'todos') {
      var filtered = [];
      for (var i = 0; i < indexed.length; i++) {
        if (indexed[i].item.category === activeCategory) filtered.push(indexed[i]);
      }
      indexed = filtered;
    }
  }
  return indexed;
}

// ── RENDERIZAR GRID ──────────────────────────────────────────
function refreshGrid() {
  var grid = document.getElementById('catGrid');
  if (!grid) return;
  grid.innerHTML = '';

  var sorted = getSortedItems();
  var empty  = document.getElementById('catEmpty');

  if (!sorted.length) {
    if (empty) empty.style.display = 'block';
    return;
  }
  if (empty) empty.style.display = 'none';

  for (var s = 0; s < sorted.length; s++) {
    var p   = sorted[s].item;
    var idx = sorted[s].i;
    var img  = getImgSrc(p.img);
    var waMsg = encodeURIComponent('Olá! Tenho interesse em: ' + p.n + ' (' + p.p + ')');

    var card = document.createElement('div');
    card.className = 'cat-card';
    card.dataset.category = p.category;

    card.innerHTML =
      (p.b ? '<span class="cat-badge">' + p.b + '</span>' : '') +
      '<div class="cat-img-wrap" onclick="openProduct(' + idx + ')">' +
        '<img class="cat-img-real" src="' + img + '" alt="' + p.n + '" loading="lazy"' +
          ' onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
        '<div class="cat-img-fallback" style="display:none">' + p.e + '</div>' +
      '</div>' +
      '<div class="cat-body">' +
        '<div class="cat-name" onclick="openProduct(' + idx + ')" style="cursor:pointer">' + p.n + '</div>' +
        '<div class="cat-price">' + p.p + '</div>' +
        '<div class="rating-summary">' +
          '<span class="avg-number" id="avg-' + idx + '">—</span>' +
          '<div class="avg-stars" id="avg-stars-' + idx + '">' + buildStarsStatic(0) + '</div>' +
          '<span class="avg-total" id="total-' + idx + '">Seja o primeiro a avaliar</span>' +
        '</div>' +
        '<div class="review-form">' +
          '<span class="review-form-label">Avalie este produto:</span>' +
          '<div class="star-picker">' + buildStarsInteractive(idx) + '</div>' +
          '<textarea id="comment-input-' + idx + '" class="comment-input" placeholder="Conte sua experiência (opcional)..." rows="2" maxlength="300"></textarea>' +
          '<div class="review-form-footer">' +
            '<span class="review-hint" id="hint-' + idx + '"></span>' +
            '<button class="review-submit" onclick="submitReview(' + idx + ')">Enviar avaliação</button>' +
          '</div>' +
        '</div>' +
        '<div class="comments-list" id="comments-' + idx + '">' +
          '<p class="no-comments">Nenhuma avaliação ainda. Seja o primeiro!</p>' +
        '</div>' +
        '<a class="cat-wa" href="https://wa.me/' + WA_NUM + '?text=' + waMsg + '" target="_blank" rel="noopener noreferrer">' +
          waIcon() + ' Perguntar disponibilidade' +
        '</a>' +
      '</div>';

    grid.appendChild(card);
  }

  attachStarEvents();
}

// ── PÁGINA INDIVIDUAL ────────────────────────────────────────
function openProduct(idx) {
  var p     = ITEMS[idx];
  var avg   = calcAverage(idx);
  var total = reviewsDB[idx].ratings.length;
  var img   = getImgSrc(p.img);
  var img2  = getImgSrc(p.img2 || p.img);
  var waMsg = encodeURIComponent('Olá! Tenho interesse em: ' + p.n + ' (' + p.p + ')');

  var pages = document.querySelectorAll('.page');
  for (var i = 0; i < pages.length; i++) pages[i].classList.remove('active');
  var navLinks = document.querySelectorAll('[data-page]');
  for (var i = 0; i < navLinks.length; i++) navLinks[i].classList.remove('active');

  var page = document.getElementById('page-produto');
  page.innerHTML =
    '<div class="produto-wrap">' +
      '<button class="produto-back" onclick="showPage(\'catalogo\')">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>' +
        ' Voltar ao catálogo' +
      '</button>' +
      '<div class="produto-grid">' +
        '<div class="produto-gallery">' +
          '<div class="produto-img-single">' +
            '<img src="' + img + '" alt="' + p.n + '" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
            '<div class="cat-img-fallback" style="display:none">' + p.e + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="produto-info">' +
          (p.b ? '<span class="produto-badge">' + p.b + '</span>' : '') +
          '<h1 class="produto-nome">' + p.n + '</h1>' +
          '<div class="produto-price">' + p.p + '</div>' +
          '<div class="produto-rating-bar">' +
            '<span class="produto-avg-num">' + (total ? avg : '—') + '</span>' +
            '<div class="produto-avg-stars" id="avg-stars-' + idx + '">' + buildStarsStatic(total ? parseFloat(avg) : 0, 14) + '</div>' +
            '<span class="produto-avg-total" id="total-' + idx + '">' + (total === 0 ? 'Seja o primeiro a avaliar' : total + ' avaliação' + (total > 1 ? 'ões' : '')) + '</span>' +
          '</div>' +
          '<p class="produto-desc">' + p.desc + '</p>' +
          '<a class="produto-wa" href="https://wa.me/' + WA_NUM + '?text=' + waMsg + '" target="_blank" rel="noopener noreferrer">' +
            '<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>' +
            ' Perguntar disponibilidade' +
          '</a>' +
        '</div>' +
      '</div>' +
      '<div class="produto-reviews">' +
        '<h2 class="produto-reviews-title">Avaliações dos clientes</h2>' +
        '<div class="produto-review-form">' +
          '<span class="review-form-label">Avalie este produto:</span>' +
          '<div class="star-picker">' + buildStarsInteractive(idx) + '</div>' +
          '<textarea id="comment-input-' + idx + '" class="comment-input" placeholder="Conte sua experiência com este produto (opcional)..." rows="3" maxlength="500"></textarea>' +
          '<div class="review-form-footer">' +
            '<span class="review-hint" id="hint-' + idx + '"></span>' +
            '<button class="review-submit" onclick="submitReview(' + idx + ')">Enviar avaliação</button>' +
          '</div>' +
        '</div>' +
        '<div class="comments-list expanded" id="comments-' + idx + '">' +
          '<p class="no-comments">Nenhuma avaliação ainda. Seja o primeiro!</p>' +
        '</div>' +
      '</div>' +
    '</div>';

  page.classList.add('active');
  attachStarEvents();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── EVENTOS ESTRELAS ─────────────────────────────────────────
function attachStarEvents() {
  document.addEventListener('mouseover', function(e) {
    var s = e.target.closest && e.target.closest('.star-pick');
    if (!s) return;
    updatePickerStars(parseInt(s.dataset.index), parseInt(s.dataset.star));
  });
  document.addEventListener('mouseout', function(e) {
    var s = e.target.closest && e.target.closest('.star-pick');
    if (!s) return;
    var idx   = parseInt(s.dataset.index);
    var first = document.querySelector('.star-pick[data-index="' + idx + '"]');
    updatePickerStars(idx, parseInt((first && first.dataset.selected) || '0'));
  });
  document.addEventListener('click', function(e) {
    var s = e.target.closest && e.target.closest('.star-pick');
    if (!s) return;
    var idx  = parseInt(s.dataset.index);
    var pos  = parseInt(s.dataset.star);
    var all  = document.querySelectorAll('.star-pick[data-index="' + idx + '"]');
    for (var i = 0; i < all.length; i++) all[i].dataset.selected = pos;
    updatePickerStars(idx, pos);
  });
}

// ── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  initReviewsDB();
  renderSortBar();
  refreshGrid();
});