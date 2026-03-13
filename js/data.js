// ============================================================
// data.js
// Todos os dados do site ficam aqui centralizados.
// Para adicionar ou editar produtos, mexa SÓ neste arquivo.
// Os outros arquivos JS leem daqui — nunca duplicamos dados.
// ============================================================

// ── Número do WhatsApp da empresa ──
// Formato internacional sem símbolos: 55 (Brasil) + DDD + número
const WA_NUM = '551142183525';

// ── Lista de produtos do catálogo ──
/*
  Cada produto é um OBJETO com as seguintes propriedades:
  e  → emoji  (ícone visual do produto)
  n  → name   (nome do produto)
  p  → price  (faixa de preço)
  b  → badge  (etiqueta especial, ex: "Top venda". Deixe '' para nenhum.)
  r  → rating (nota média, de 0 a 5)
  c  → count  (número de avaliações)
*/
const ITEMS = [
  {
    e: '📱',
    n: 'Capinhas',
    p: 'R$ 20 – R$ 80',
    b: 'Top venda',
    r: 4.8,
    c: 34,
  },
  {
    e: '🔋',
    n: 'Carregadores',
    p: 'R$ 20 – R$ 79,90',
    b: '',
    r: 4.7,
    c: 21,
  },
  {
    e: '🎧',
    n: 'Fones de Ouvido',
    p: 'R$ 49 – R$ 140',
    b: '',
    r: 4.6,
    c: 15,
  },
  {
    e: '🎵',
    n: 'Headphones',
    p: 'R$ 50 – R$ 200',
    b: 'Premium',
    r: 4.9,
    c: 9,
  },
  {
    e: '🛡️',
    n: 'Películas',
    p: 'R$ 20 – R$ 79,90',
    b: 'Top venda',
    r: 4.8,
    c: 42,
  },
  {
    e: '🔒',
    n: 'Película Privativa',
    p: 'R$ 20 – R$ 79,90',
    b: '',
    r: 4.5,
    c: 7,
  },
  {
    e: '🔌',
    n: 'Cabos',
    p: 'R$ 20 – R$ 79',
    b: '',
    r: 4.7,
    c: 18,
  },
  {
    e: '💾',
    n: 'Pendrive',
    p: 'R$ 30 – R$ 59',
    b: '',
    r: 4.6,
    c: 11,
  },
  {
    e: '🖱️',
    n: 'Mousepad',
    p: 'R$ 15 – R$ 40',
    b: '',
    r: 4.4,
    c: 6,
  },
  {
    e: '📲',
    n: 'Celulares',
    p: 'R$ 700 – R$ 1.800',
    b: 'Consignado',
    r: 4.9,
    c: 23,
  },
  {
    e: '🧰',
    n: 'Acessórios Div.',
    p: 'R$ 15 – R$ 28',
    b: '',
    r: 4.5,
    c: 30,
  },
];