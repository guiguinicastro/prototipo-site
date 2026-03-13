// ============================================================
// catalog.js
// Responsável por RENDERIZAR os cards do catálogo.
// Lê os dados de data.js e injeta o HTML no DOM.
//
// DEPENDE DE: data.js (deve ser carregado antes no HTML)
// ============================================================


// ── Função auxiliar: gera as estrelas em SVG ──────────────────
/*
  Parâmetros:
    rating  → número decimal ex: 4.8
    size    → tamanho em pixels de cada estrela (padrão: 11)

  Retorna:
    Uma string com 5 elementos <svg>, cada um colorido
    de amarelo (#f5a623) se a posição for <= nota arredondada,
    ou vazio/cinza se não.
*/
function buildStars(rating, size = 11) {
  // Math.round(4.8) = 5  →  as 5 estrelas ficam cheias
  // Math.round(3.2) = 3  →  só as 3 primeiras ficam cheias
  const fullCount = Math.round(rating);

  // [1,2,3,4,5].map(...) percorre cada posição e retorna um SVG
  return [1, 2, 3, 4, 5]
    .map((position) => {
      const isFull = position <= fullCount;
      const fillColor   = isFull ? '#f5a623' : 'none';
      const strokeColor = isFull ? '#f5a623' : '#2a4060';

      // Template literal: string que aceita ${variáveis} dentro
      return `
        <svg
          width="${size}"
          height="${size}"
          viewBox="0 0 24 24"
          fill="${fillColor}"
          stroke="${strokeColor}"
          stroke-width="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      `;
    })
    .join(''); // Junta o array de strings numa só string
}


// ── Função auxiliar: gera o HTML do ícone SVG do WhatsApp ─────
function buildWhatsAppIcon() {
  return `
    <svg viewBox="0 0 24 24" fill="#25d366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  `;
}


// ── Função principal: cria e injeta todos os cards ────────────
function renderCatalog() {
  // 1. Busca o elemento container no HTML pelo id="catGrid"
  const grid = document.getElementById('catGrid');

  // Verificação de segurança: se o elemento não existir, para aqui
  if (!grid) {
    console.error('Elemento #catGrid não encontrado no HTML.');
    return;
  }

  // 2. Percorre cada produto em ITEMS (definido em data.js)
  ITEMS.forEach((product) => {

    // 3. Cria um novo elemento <div> na memória
    //    (ainda não está visível na página)
    const card = document.createElement('div');
    card.className = 'cat-card';

    // 4. Monta a mensagem do WhatsApp e codifica para URL
    //    encodeURIComponent transforma espaços em %20,
    //    acentos em %C3%A7 etc. — necessário em URLs.
    const waMessage = `Olá! Tenho interesse em: ${product.n} (${product.p})`;
    const waMessageEncoded = encodeURIComponent(waMessage);
    const waLink = `https://wa.me/${WA_NUM}?text=${waMessageEncoded}`;

    // 5. Define o HTML interno do card
    //    O operador ternário: condição ? seVerdadeiro : seFalso
    //    product.b ? `<span...>` : ''
    //    → Se tiver badge, renderiza o span; se não, string vazia
    card.innerHTML = `
      ${product.b ? `<span class="cat-badge">${product.b}</span>` : ''}

      <div class="cat-img">${product.e}</div>

      <div class="cat-body">
        <div class="cat-name">${product.n}</div>
        <div class="cat-price">${product.p}</div>

        <div class="cat-stars">
          <div class="star-row">${buildStars(product.r)}</div>
          <span class="rev-count">${product.r} · ${product.c} avaliações</span>
        </div>

        <a class="cat-wa"
           href="${waLink}"
           target="_blank"
           rel="noopener noreferrer">
          ${buildWhatsAppIcon()}
          Perguntar disponibilidade
        </a>
      </div>
    `;

    // 6. Insere o card criado DENTRO do container na página
    //    Só agora o usuário passa a ver o card
    grid.appendChild(card);
  });
}


// ── Inicialização ─────────────────────────────────────────────
/*
  DOMContentLoaded dispara quando o HTML terminou de carregar,
  mas antes de imagens e fontes. É o momento certo para
  manipular o DOM com JavaScript.
*/
document.addEventListener('DOMContentLoaded', renderCatalog);