// ============================================================
// navigation.js
// Controla a navegação entre as "páginas" do site.
//
// O site é um SPA (Single Page Application):
// só existe um arquivo HTML, mas múltiplas seções
// são mostradas/escondidas via JavaScript.
//
// COMO FUNCIONA:
// 1. Todas as páginas existem no HTML com class="page"
// 2. Só a página com class="page active" fica visível (CSS)
// 3. showPage() troca qual elemento tem a classe "active"
// ============================================================


// ── Função principal de navegação ────────────────────────────
/*
  Parâmetro:
    pageId → string com o id da página desejada
             ex: 'home', 'catalogo', 'whatsapp'

  O HTML tem:
    <main id="page-home" class="page">
    <main id="page-catalogo" class="page">
    <main id="page-whatsapp" class="page">

  E os links do menu têm:
    data-page="home"
    data-page="catalogo"
    data-page="whatsapp"
*/
function showPage(pageId) {

  // ── PASSO 1: Esconde TODAS as páginas ──────────────────────
  /*
    querySelectorAll('.page') retorna uma NodeList
    (parecida com um array) com todos os elementos
    que têm a classe "page".

    forEach percorre cada um e remove a classe "active".
    Sem "active", o CSS aplica display:none → invisível.
  */
  document.querySelectorAll('.page').forEach(function(page) {
    page.classList.remove('active');
  });


  // ── PASSO 2: Mostra só a página solicitada ─────────────────
  /*
    'page-' + pageId monta o id completo:
    'page-' + 'catalogo' = 'page-catalogo'

    getElementById busca exatamente esse elemento.
    classList.add('active') o torna visível novamente.
  */
  const targetPage = document.getElementById('page-' + pageId);

  if (!targetPage) {
    console.error('Página não encontrada: page-' + pageId);
    return;
  }

  targetPage.classList.add('active');


  // ── PASSO 3: Atualiza o estado visual do menu ──────────────
  /*
    querySelectorAll('[data-page]') busca todos os elementos
    que possuem o atributo data-page (independente do valor).

    Para cada link do menu:
    - Se o data-page dele é igual ao pageId clicado → adiciona 'active'
    - Se não é → remove 'active'

    classList.toggle(className, condition):
    → true  = adiciona a classe
    → false = remove a classe
  */
  document.querySelectorAll('[data-page]').forEach(function(link) {
    const isCurrentPage = link.dataset.page === pageId;
    link.classList.toggle('active', isCurrentPage);
  });


  // ── PASSO 4: Volta para o topo da página ──────────────────
  /*
    Quando o usuário troca de aba, a página pode estar
    rolada para baixo. Scrollamos de volta ao topo.
    behavior: 'smooth' faz a rolagem ser suave.
  */
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}


// ── Inicialização: garante que a página inicial esteja correta ─
/*
  Quando o HTML carrega, já exibimos a página 'home'
  e marcamos o ícone correto no menu como ativo.
  Isso garante consistência mesmo se o cache do navegador
  deixar um estado anterior incorreto.
*/
document.addEventListener('DOMContentLoaded', function() {
  showPage('home');
});