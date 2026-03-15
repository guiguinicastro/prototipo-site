cat > /home/claude/geracao-y-project/js/freight.js << 'EOF'
// ============================================================
// freight.js
// Sistema de cálculo de frete por CEP.
//
// Como funciona:
// 1. Usuário digita o CEP
// 2. Consultamos a API gratuita ViaCEP para validar e obter cidade
// 3. Cruzamos com nossas faixas de CEP para identificar a região
// 4. Exibimos o valor do frete correspondente
// ============================================================


// ── Tabela de preços por região ───────────────────────────────
const FREIGHT_PRICES = {
  guarulhos:    5.00,
  sp_capital:   8.00,
  grande_sp:   10.00,
};

// ── Faixas de CEP por região ──────────────────────────────────
/*
  CEPs no Brasil seguem um padrão geográfico.
  Cada faixa abaixo cobre os bairros/cidades da região.
  Fonte: Correios — faixas oficiais de CEP por município.

  Guarulhos:     07000-000 até 07299-999
  São Paulo:     01000-000 até 05999-999  e  08000-000 até 08499-999
  Grande SP:     demais CEPs da região metropolitana
*/
const CEP_RANGES = [
  {
    region:  'guarulhos',
    label:   'Guarulhos',
    ranges:  [
      { min: 7000000, max: 7299999 },
    ],
  },
  {
    region: 'sp_capital',
    label:  'São Paulo Capital',
    ranges: [
      { min: 1000000,  max: 5999999  },
      { min: 8000000,  max: 8499999  },
    ],
  },
  {
    region: 'grande_sp',
    label:  'Grande São Paulo',
    ranges: [
      // ABC Paulista (Santo André, São Bernardo, São Caetano, Diadema)
      { min: 9000000,  max: 9999999  },
      // Osasco, Carapicuíba, Barueri
      { min: 6000000,  max: 6499999  },
      // Guarulhos vizinhos (Arujá, Santa Isabel, Mairiporã)
      { min: 7300000,  max: 7599999  },
      // Demais cidades da Grande SP
      { min: 6500000,  max: 7999999  },
      { min: 8500000,  max: 8999999  },
    ],
  },
];


// ── Função: identifica a região pelo número do CEP ────────────
/*
  Recebe o CEP como string ("07180-000" ou "07180000")
  Remove o hífen, converte para número e compara com as faixas.
  Retorna o objeto da região ou null se não encontrar.
*/
function getRegionByCep(cepStr) {
  // Remove tudo que não é número: "07180-000" → "07180000"
  const digits = cepStr.replace(/\D/g, '');

  // CEP brasileiro sempre tem 8 dígitos
  if (digits.length !== 8) return null;

  const cepNum = parseInt(digits, 10);

  // Percorre cada região e suas faixas
  for (const entry of CEP_RANGES) {
    for (const range of entry.ranges) {
      if (cepNum >= range.min && cepNum <= range.max) {
        return entry; // Retorna a região encontrada
      }
    }
  }

  return null; // CEP fora das regiões cobertas
}


// ── Função: formata valor em reais ────────────────────────────
function formatPrice(value) {
  return value.toLocaleString('pt-BR', {
    style:    'currency',
    currency: 'BRL',
  });
}


// ── Função: aplica máscara de CEP enquanto o usuário digita ──
/*
  Transforma "07180000" em "07180-000" automaticamente.
*/
function maskCep(value) {
  return value
    .replace(/\D/g, '')           // remove não-números
    .replace(/^(\d{5})(\d)/, '$1-$2') // insere o hífen na posição 5
    .substring(0, 9);             // limita a 9 caracteres (00000-000)
}


// ── Função: consulta o ViaCEP e valida o CEP ─────────────────
/*
  ViaCEP é uma API gratuita e pública que retorna dados
  de endereço a partir de um CEP brasileiro.
  Endpoint: https://viacep.com.br/ws/CEPAQUI/json/
*/
async function fetchCepData(cep) {
  const digits = cep.replace(/\D/g, '');
  if (digits.length !== 8) return null;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
    const data     = await response.json();

    // ViaCEP retorna { erro: true } se o CEP não existe
    if (data.erro) return null;

    return data; // { cep, logradouro, bairro, localidade, uf, ... }
  } catch {
    return null; // Erro de rede
  }
}


// ── Função principal: calcula e exibe o frete ─────────────────
async function calculateFreight() {
  const input      = document.getElementById('cep-input');
  const resultBox  = document.getElementById('freight-result');
  const btn        = document.getElementById('cep-btn');

  if (!input || !resultBox) return;

  const cep = input.value.trim();

  // Valida se tem 8 dígitos
  if (cep.replace(/\D/g, '').length !== 8) {
    showFreightResult(resultBox, 'error', '⚠ Digite um CEP válido com 8 dígitos.');
    return;
  }

  // Estado de carregamento
  btn.disabled      = true;
  btn.textContent   = 'Consultando...';
  resultBox.innerHTML = '';

  // Tenta identificar pelo CEP localmente primeiro (mais rápido)
  const region = getRegionByCep(cep);

  if (region) {
    const price = FREIGHT_PRICES[region.region];

    // Consulta o ViaCEP para exibir o endereço confirmado
    const cepData = await fetchCepData(cep);
    const address = cepData
      ? `${cepData.bairro ? cepData.bairro + ', ' : ''}${cepData.localidade} — ${cepData.uf}`
      : region.label;

    showFreightResult(resultBox, 'success', null, {
      region:  region.label,
      address: address,
      price:   price,
    });

  } else {
    // CEP fora das regiões cobertas — tenta pegar a cidade pelo ViaCEP
    const cepData = await fetchCepData(cep);

    if (!cepData) {
      showFreightResult(resultBox, 'error', '✕ CEP não encontrado. Verifique e tente novamente.');
    } else {
      showFreightResult(resultBox, 'outside', null, {
        address: `${cepData.localidade} — ${cepData.uf}`,
      });
    }
  }

  btn.disabled    = false;
  btn.textContent = 'Calcular frete';
}


// ── Função: renderiza o resultado na tela ────────────────────
function showFreightResult(container, type, message, data = {}) {
  if (type === 'error') {
    container.innerHTML = `
      <div class="freight-error">${message}</div>
    `;
    return;
  }

  if (type === 'outside') {
    container.innerHTML = `
      <div class="freight-outside">
        <span class="freight-outside-icon">📦</span>
        <div>
          <div class="freight-outside-title">Região não atendida</div>
          <div class="freight-outside-addr">${data.address}</div>
          <div class="freight-outside-msg">
            No momento entregamos apenas em Guarulhos, São Paulo capital e Grande SP.
            Entre em contato pelo WhatsApp para verificar disponibilidade.
          </div>
        </div>
      </div>
    `;
    return;
  }

  // Sucesso
  container.innerHTML = `
    <div class="freight-success">
      <div class="freight-success-top">
        <div class="freight-region-info">
          <span class="freight-region-label">Região identificada</span>
          <span class="freight-region-name">${data.region}</span>
          <span class="freight-region-addr">${data.address}</span>
        </div>
        <div class="freight-price-box">
          <span class="freight-price-label">Frete</span>
          <span class="freight-price-value">${formatPrice(data.price)}</span>
        </div>
      </div>
      <div class="freight-wa-hint">
        Finalize seu pedido pelo WhatsApp — informe seu CEP e os produtos desejados.
      </div>
    </div>
  `;
}


// ── Função: inicializa os eventos do campo de CEP ─────────────
function initFreight() {
  const input = document.getElementById('cep-input');
  const btn   = document.getElementById('cep-btn');

  if (!input || !btn) return;

  // Aplica máscara enquanto digita
  input.addEventListener('input', () => {
    input.value = maskCep(input.value);
  });

  // Calcula ao apertar Enter
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') calculateFreight();
  });

  // Calcula ao clicar no botão
  btn.addEventListener('click', calculateFreight);
}

document.addEventListener('DOMContentLoaded', initFreight);