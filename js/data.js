const WA_NUM = '5511934592257';

const CATEGORIES = [
  { id:'todos',        label:'Todos',         emoji:'🏪' },
  { id:'peliculas',    label:'Películas',      emoji:'🛡️' },
  { id:'suportes',     label:'Suportes',       emoji:'🏍️' },
  { id:'carregadores', label:'Carregadores',   emoji:'🔌' },
  { id:'pilhas',       label:'Pilhas',         emoji:'🔋' },
  { id:'cabos',        label:'Cabos',          emoji:'🔗' },
  { id:'fones',        label:'Fones',          emoji:'🎧' },
  { id:'adaptadores',  label:'Adaptadores',    emoji:'🔄' },
  { id:'informatica',  label:'Informática',    emoji:'💾' },
  { id:'mouse',        label:'Mouse & Pad',    emoji:'🖱️' },
  { id:'teclados',     label:'Teclados',       emoji:'⌨️' },
  { id:'gamer',        label:'Gamer',          emoji:'🎮' },
  { id:'video',        label:'Cabo de Vídeo',  emoji:'📺' },
  { id:'outros',       label:'Outros',         emoji:'📦' },
];

const ITEMS = [

  // ── PELÍCULAS ─────────────────────────────────────────────
  { e:'🛡️', n:'Película de Vidro 3D', p:'R$ 20,00', b:'Top venda', category:'peliculas',
    desc:'Película de vidro temperado 3D com cobertura total para Samsung, Motorola, iPhone, Xiaomi e Edge. Alta transparência, resistente a arranhões e impactos.',
    img:'images/pel3d.jpg', img2:'images/pel3d.jpg' },

  { e:'🔒', n:'Película de Privacidade', p:'R$ 40,00', b:'', category:'peliculas',
    desc:'Bloqueia a visão lateral da tela. Ideal para uso em locais públicos. Compatível com Samsung, Motorola, iPhone, Xiaomi e Edge.',
    img:'images/pelipriv.webp', img2:'images/pelipriv.webp' },

  { e:'💧', n:'Película Hidrogel (Máquina)', p:'R$ 79,00', b:'Premium', category:'peliculas',
    desc:'Aplicada por máquina com precisão milimétrica. Auto-regeneração de pequenos arranhões, cobertura total incluindo bordas curvas.',
    img:'images/pelhidro.jpg', img2:'images/pelhidro.jpg' },

  // ── SUPORTES MOTO / BIKE ──────────────────────────────────
  { e:'🏍️', n:'Suporte Moto à Prova D\'água LE076', p:'R$ 59,90', b:'', category:'suportes',
    desc:'Suporte impermeável para celular em moto e bicicleta. Proteção total contra chuva, encaixe universal e rotação 360°.',
    img:'images/supagua.jpg', img2:'images/supagua.jpg' },

  { e:'🚲', n:'Suporte Universal Moto e Bike LE137', p:'R$ 55,00', b:'', category:'suportes',
    desc:'Suporte universal para moto e bicicleta. Fixação segura no guidão, encaixe ajustável para diferentes tamanhos de tela.',
    img:'images/supbike.jpg', img2:'images/supbike.jpg' },

  { e:'🏍️', n:'Suporte Motocicleta CJ37 H-Maston', p:'R$ 49,90', b:'', category:'suportes',
    desc:'Suporte H-Masson para motocicleta. Encaixe firme, resistente a vibrações, compatível com smartphones de até 7 polegadas.',
    img:'images/supmaston.jpg', img2:'images/supmaston.jpg' },

  // ── SUPORTES CARRO ────────────────────────────────────────
  { e:'🚗', n:'Suporte Universal Carro LE039', p:'R$ 49,90', b:'', category:'suportes',
    desc:'Suporte veicular universal LE039 com fixação no painel. Compatível com todos os smartphones.',
    img:'images/le039.webp', img2:'images/le039.webp' },

  { e:'🔄', n:'Suporte Carro Rotação 360° Tomate MTG056', p:'R$ 39,90', b:'', category:'suportes',
    desc:'Suporte veicular com rotação 360°. Ventosa de alta fixação, ângulo ajustável, compatível com celulares de 4" a 7".',
    img:'images/suptomate.webp', img2:'images/suptomate.webp' },

  { e:'🚗', n:'Suporte Universal LE0232', p:'R$ 49,90', b:'', category:'suportes',
    desc:'Suporte veicular universal LE0232. Design compacto, fixação firme, compatível com qualquer smartphone.',
    img:'images/le023.jpg', img2:'images/le023.jpg' },

  { e:'🚗', n:'Suporte Veicular Ventosa CJ14 H-Maston', p:'R$ 39,90', b:'', category:'suportes',
    desc:'Suporte H-Maston com ventosa de alta fixação. Braço articulado, encaixe universal, ideal para GPS.',
    img:'images/supventosa.jpg', img2:'images/supventosa.jpg' },

  { e:'🚗', n:'Suporte Universal LE-026 IT-BLUE', p:'R$ 39,90', b:'', category:'suportes',
    desc:'Suporte IT-BLUE LE-026 para carro. Fixação firme na saída de ar, compatível com qualquer smartphone.',
    img:'images/le026.webp', img2:'images/le026.webp' },

  { e:'🚗', n:'Suporte de Celular para Carro LE-046', p:'R$ 39,90', b:'', category:'suportes',
    desc:'Suporte veicular modelo LE-046. Fixação estável, rotação ajustável, compatível com todos os tamanhos.',
    img:'images/le046.webp', img2:'images/le046.webp' },

  // ── CARREGADORES VEICULARES ───────────────────────────────
  { e:'⚡', n:'Carregador Carro QC+PD 45W GL18S', p:'R$ 69,90', b:'Turbo', category:'carregadores',
    desc:'Quick Charge + Power Delivery 45W para carro. Compatível com Tipo-C, iPhone e V8.',
    img:'images/carrcarturbo.jpg', img2:'images/carrcarturbo.jpg' },

  { e:'⚡', n:'Carregador Rápido Carro Turbo', p:'R$ 69,90', b:'', category:'carregadores',
    desc:'Carregador veicular Turbo 3 KD302T. Duas saídas USB de alta velocidade.',
    img:'images/carrcar.webp', img2:'images/carrcar.webp' },

  { e:'⚡', n:'Kit Carregador Veicular 60W EOS LED', p:'R$ 89,90', b:'Premium', category:'carregadores',
    desc:'Kit carregador veicular 65W com indicador LED e 9.1A. O mais potente da linha.',
    img:'images/kitcarrturbo.webp', img2:'images/kitcarrturbo.webp' },

  { e:'🔌', n:'Suporte Carregador Veicular 18W', p:'R$ 35,00', b:'', category:'carregadores',
    desc:'Suporte carregador veicular 18W. Compacto, encaixe direto na entrada do carro.',
    img:'images/supcarr.jpg', img2:'images/supcarr.jpg' },

  // ── CARREGADORES COMUNS ───────────────────────────────────
  { e:'🔌', n:'Carregador Super Rápido 45W', p:'R$ 55,00', b:'', category:'carregadores',
    desc:'Carregador de parede com carga super rápida. Compatíveis com Android, iPhone e V8.',
    img:'images/45v.webp', img2:'images/45v.webp' },

  { e:'🔌', n:'LCD USB Charger Original', p:'R$ 15,00', b:'', category:'carregadores',
    desc:'Carregador USB com display LCD. Indicador de tensão e corrente em tempo real.',
    img:'images/lcdchargerori.jpg', img2:'images/lcdchargerori.jpg' },

  { e:'🔌', n:'Carregador Universal Bateria USB ELCD', p:'R$ 15,00', b:'', category:'carregadores',
    desc:'Carregador universal para baterias USB ELCD. Compatível com a maioria dos modelos.',
    img:'images/carrunibat.webp', img2:'images/carrunibat.webp' },

  { e:'📶', n:'Carregador Sem Fio', p:'R$ 59,90', b:'', category:'carregadores',
    desc:'Carregador sem fio por indução. Compatível com todos os aparelhos Qi.',
    img:'images/carrsemfio.webp', img2:'images/carrsemfio.webp' },

  // ── PILHAS ────────────────────────────────────────────────
  { e:'🔋', n:'Pilha AAA (Palito)', p:'R$ 5,00', b:'', category:'pilhas',
    desc:'Pilha AAA (palito) de alta durabilidade. Ideal para controles remotos e dispositivos portáteis.',
    img:'images/AAAverde.webp', img2:'images/AAAverde.webp' },

  { e:'🔋', n:'Pilha AA (Grande)', p:'R$ 5,00', b:'', category:'pilhas',
    desc:'Pilha AA (grande) de alta durabilidade. Ideal para controles, lanternas e câmeras.',
    img:'images/AAverde.webp', img2:'images/AAverde.webp' },

  { e:'🔋', n:'Pilha Telefone Sem Fio', p:'R$ 5,00', b:'', category:'pilhas',
    desc:'Pilha específica para telefone sem fio. Alta durabilidade e desempenho estável.',
    img:'images/telsemfio.jpg', img2:'images/telsemfio.jpg' },

  { e:'🔋', n:'Pilha AAA Recarregável', p:'R$ 29,00', b:'', category:'pilhas',
    desc:'Pilha AAA recarregável. Economize recarregando centenas de vezes.',
    img:'images/AAArecazul.webp', img2:'images/AAArecazul.webp' },

  { e:'🔋', n:'Pilha AA Recarregável', p:'R$ 55,00', b:'', category:'pilhas',
    desc:'Pilha AA recarregável de alta capacidade. Ideal para dispositivos de alto consumo.',
    img:'images/AArecazul.webp', img2:'images/AArecazul.webp' },

  { e:'🔋', n:'Baterias Especiais (Botão/Moeda)', p:'R$ 5,00', b:'', category:'pilhas',
    desc:'Baterias especiais: 23A, LR44/AG13, CR2016, CR1620, 2025, 2430, LR41/AG3 e mais.',
    img:'images/diverbatmoeda.webp', img2:'images/diverbatmoeda.webp' },

  // ── CABOS ─────────────────────────────────────────────────
  { e:'🔗', n:'Cabo Turbo iPhone (USB Data Cable)', p:'R$ 39,90', b:'', category:'cabos',
    desc:'Cabo USB para iPhone com carregamento turbo. Revestimento reforçado, transferência de dados em alta velocidade.',
    img:'images/carriph.webp', img2:'images/carriph.webp' },

  { e:'🔗', n:'Cabo Turbo Tipo-C (USB Data Cable)', p:'R$ 39,90', b:'Top venda', category:'cabos',
    desc:'Cabo USB Tipo-C com carregamento turbo. Compatível com todos os smartphones Android modernos.',
    img:'images/kaidi.jpg', img2:'images/kaidi.jpg' },

  { e:'🔗', n:'Cabo Turbo V8 (USB Data Cable)', p:'R$ 39,90', b:'', category:'cabos',
    desc:'Cabo USB V8 (Micro-USB) com carregamento turbo. Compatível com Samsung, Motorola e outros.',
    img:'images/kaidiv8.webp', img2:'images/kaidiv8.webp' },

  { e:'🔗', n:'Cabo Rápido H-Maston 4.8A iPhone, USB e Tipo-C', p:'R$ 39,90', b:'', category:'cabos',
    desc:'Cabo de carregamento rápido H-Maston 4.8A para iPhone, Tipo-C e USB. Alta durabilidade.',
    img:'images/4.8amaston.jpg', img2:'images/4.8amaston.jpg' },

  { e:'🔗', n:'Cabo Inova Carregamento Rápido iPhone', p:'R$ 28,00', b:'', category:'cabos',
    desc:'Cabo Inova para iPhone com carregamento rápido. Compatível com todos os modelos Lightning.',
    img:'images/inovaiph.jpg', img2:'images/inovaiph.jpg' },

  { e:'🔗', n:'Cabo HDMI Inova', p:'R$ 35,00', b:'', category:'cabos',
    desc:'Cabo HDMI turbo Inova. Alta velocidade de carregamento e transferência de dados.',
    img:'images/hdmiinova.webp', img2:'images/hdmiinova.webp' },

  { e:'🔗', n:'Cabo Metálico (Tipo-C/iPhone/V8)', p:'R$ 15,00', b:'', category:'cabos',
    desc:'Cabo metálico reforçado compatível com Tipo-C, iPhone e V8. Alta resistência a torções.',
    img:'images/metalico.webp', img2:'images/metalico.webp' },

  // ── FONES ─────────────────────────────────────────────────
  { e:'🎧', n:'Fone Esportivo Sem Fio EAFON66', p:'R$ 72,00', b:'', category:'fones',
    desc:'Fone esportivo sem fio Bluetooth EAFON66. Resistente ao suor, autonomia para treinos longos.',
    img:'images/fonesport.jpg', img2:'images/fonesport.jpg' },

  { e:'🎧', n:'Fone Estéreo EJ25', p:'R$ 29,90', b:'', category:'fones',
    desc:'Fone de ouvido estéreo EJ25 com fio. Som nítido, conector universal, leve e confortável.',
    img:'images/ej25.jpg', img2:'images/ej25.jpg' },

  { e:'🎧', n:'Fone Estéreo LE0216 (P2)', p:'R$ 25,00', b:'', category:'fones',
    desc:'Fone de ouvido estéreo LE0216 com conector P2. Compatível com celulares, notebooks e tablets.',
    img:'images/estereo.webp', img2:'images/estereo.webp' },

  { e:'🎧', n:'Fone Estéreo LE0231', p:'R$ 18,00', b:'', category:'fones',
    desc:'Fone de ouvido estéreo LE0231. Ótimo custo-benefício para o dia a dia.',
    img:'images/le2031.webp', img2:'images/le2031.webp' },

  { e:'🎧', n:'Fone Tipo (P2)', p:'R$ 25,00', b:'', category:'fones',
    desc:'Fone de ouvido com conector P2. Compatível com celulares, tablets e notebooks.',
    img:'images/fonep2.webp', img2:'images/fonep2.webp' },

  // ── ADAPTADORES ───────────────────────────────────────────
  { e:'🔄', n:'Conversor Carregador', p:'R$ 15,00', b:'', category:'adaptadores',
    desc:'Conversor de carregador universal. Adapta diferentes tipos de conectores.',
    img:'images/conversor.jpg', img2:'images/conversor.jpg' },

  { e:'🔄', n:'Conversor VGA para HDTV', p:'R$ 49,90', b:'', category:'adaptadores',
    desc:'Conversor VGA para HDTV. Conecte computadores mais antigos em monitores e TVs modernos.',
    img:'images/vgahdtv.jpg', img2:'images/vgahdtv.jpg' },

  { e:'🔄', n:'Conversor SATA para USB', p:'R$ 49,90', b:'', category:'adaptadores',
    desc:'Conversor SATA para USB. Conecte HDs e SSDs de notebook ao computador via USB.',
    img:'images/sata.jpg', img2:'images/sata.jpg' },

  { e:'🔄', n:'Conversor de Áudio', p:'R$ 29,90', b:'', category:'adaptadores',
    desc:'Conversor de áudio universal. Adapta diferentes saídas de som.',
    img:'images/convaudio.jpg', img2:'images/convaudio.jpg' },

  { e:'🔄', n:'Adaptador LiteChip HDTV ET533', p:'R$ 89,90', b:'', category:'adaptadores',
    desc:'Adaptador LiteChip HDTV ET533. Conecte seu celular na TV em alta definição.',
    img:'images/litechip.webp', img2:'images/litechip.webp' },

  { e:'🔄', n:'Adaptador OTG USB', p:'R$ 18,00', b:'', category:'adaptadores',
    desc:'Adaptador OTG para celular. Conecte pen drives, teclados e mouses no seu smartphone.',
    img:'images/otgusb18.webp', img2:'images/otgusb18.webp' },

  { e:'🔄', n:'Adaptador OTG 3 em 1', p:'R$ 25,00', b:'', category:'adaptadores',
    desc:'Adaptador OTG 3 em 1. Conecta USB, Tipo-C e microSD simultaneamente.',
    img:'images/otgusb.jpg', img2:'images/otgusb.jpg' },

  { e:'🔄', n:'OTG USB', p:'R$ 10,00', b:'', category:'adaptadores',
    desc:'Adaptador OTG USB compacto. Conecta dispositivos USB ao seu celular.',
    img:'images/otggusb.jpg', img2:'images/otggusb.jpg' },

  { e:'🔄', n:'Adaptador Tipo-C', p:'R$ 10,00', b:'', category:'adaptadores',
    desc:'Adaptador Tipo-C universal. Converte conexões para compatibilidade com dispositivos mais antigos.',
    img:'images/otgtipoc.webp', img2:'images/mobotgtipoc.jpg' },

  { e:'🔄', n:'Cabo Tipo-C para P2 LE0162', p:'R$ 29,90', b:'', category:'adaptadores',
    desc:'Cabo adaptador Tipo-C para P2. Conecte fones P2 em celulares com entrada Tipo-C.',
    img:'images/tipocp2.webp', img2:'images/tipocp2.webp' },

  { e:'🔄', n:'Cabo iOS para P2 LE054', p:'R$ 29,90', b:'', category:'adaptadores',
    desc:'Cabo adaptador Lightning para P2. Conecte fones P2 diretamente em iPhones.',
    img:'images/iosp2.webp', img2:'images/iosp2.webp' },

  // ── INFORMÁTICA ───────────────────────────────────────────
  { e:'💾', n:'Case HD SATA 2.5 FY280', p:'R$ 59,90', b:'', category:'informatica',
    desc:'Case para HD SATA 2.5" FY280. Transforma HD interno em externo USB. Plug and play.',
    img:'images/case2.5.webp', img2:'images/case2.5.webp' },

  { e:'💾', n:'Cartão de Memória 4GB', p:'R$ 28,00', b:'', category:'informatica',
    desc:'Cartão de memória 4GB. Ideal para câmeras, celulares e armazenamento adicional.',
    img:'images/memorycard.webp', img2:'images/memorycard.webp' },

  { e:'💾', n:'Dongle USB 2.0', p:'R$ 29,90', b:'', category:'informatica',
    desc:'Dongle USB 2.0. Compatível com a maioria dos sistemas operacionais.',
    img:'images/dongle.webp', img2:'images/dongle.webp' },

  { e:'💾', n:'USB Virtual 7.1 Sound Adapter', p:'R$ 29,90', b:'', category:'informatica',
    desc:'Adaptador de som USB 7.1 virtual. Adiciona saída de áudio ao computador. Plug and play.',
    img:'images/usbvirtual.webp', img2:'images/usbvirtual.webp' },

  { e:'💾', n:'Adaptador Reader USB 802.11', p:'R$ 40,00', b:'', category:'informatica',
    desc:'Adaptador Wi-Fi USB 802.11. Adicione conectividade sem fio ao seu computador.',
    img:'images/adapusb.webp', img2:'images/adapusb.webp' },

  { e:'💾', n:'Reader USB Music', p:'R$ 25,00', b:'', category:'informatica',
    desc:'Reader USB para música. Lê cartões e pen drives para reprodução de áudio.',
    img:'images/pendrive.webp', img2:'images/pendrive.webp' },

  // ── MOUSE & MOUSEPAD ──────────────────────────────────────
  { e:'🖱️', n:'Mouse A153', p:'R$ 25,00', b:'', category:'mouse',
    desc:'Mouse USB A153. Ergonômico, silencioso e preciso. Compatível com Windows, Mac e Linux.',
    img:'images/mousea153.jpg', img2:'images/mousea153.jpg' },

  { e:'🖱️', n:'Mouse sem fio H-Maston RGB', p:'R$ 85,00', b:'', category:'mouse',
    desc:'Mouse sem fio com iluminação RGB. Sensor óptico de alta precisão.',
    img:'images/mousergb.jpg', img2:'images/mousergb.jpg' },

  { e:'🖱️', n:'Mouse Óptico KNP', p:'R$ 39,90', b:'', category:'mouse',
    desc:'Mouse óptico KNP de alta precisão. Ideal para trabalho e estudo.',
    img:'images/knup.webp', img2:'images/knup.webp' },

  { e:'🟦', n:'Mousepad Simples', p:'R$ 15,00', b:'', category:'mouse',
    desc:'Mousepad Simples. Base antiderrapante, superfície lisa para movimentos precisos.',
    img:'images/mousepadsimples.webp', img2:'images/mousepadsimples.webp' },

  { e:'🟦', n:'Mousepad B-max', p:'R$ 29,90', b:'', category:'mouse',
    desc:'Mousepad B-max. Superfície texturizada, base de borracha antiderrapante.',
    img:'images/mousepadbmax.webp', img2:'images/mousepadbmax.webp' },

  { e:'🟦', n:'Mousepad KNUP', p:'R$ 20,00', b:'', category:'mouse',
    desc:'Mousepad KNUP. Tamanho padrão, base antiderrapante, ótimo custo-benefício.',
    img:'images/mousepadknup.webp', img2:'images/mousepadknup.webp' },

  { e:'🎮', n:'Mousepad Gamer H-Maston', p:'R$ 89,90', b:'Gamer', category:'mouse',
    desc:'Mousepad gamer H-Maston de grande formato. Superfície de alta velocidade.',
    img:'images/mousepadmata.jpg', img2:'images/mousepadmata.jpg' },

  { e:'🎮', n:'Mousepad Free-Fire', p:'R$ 20,00', b:'', category:'mouse',
    desc:'Mousepad temático com o jogo Free-Fire, bom custo benefício e superfície antiderrapante.',
    img:'images/mousepadff.webp', img2:'images/mousepadff.webp' },

  // ── TECLADOS ──────────────────────────────────────────────
  { e:'⌨️', n:'Teclado Numérico USB', p:'R$ 45,00', b:'', category:'teclados',
    desc:'Teclado numérico USB compacto. Ideal para planilhas e entrada rápida de dados.',
    img:'images/tecnumusb.jpg', img2:'images/tecnumusb.jpg' },

  { e:'⌨️', n:'Teclado USB para PC/Notebook', p:'R$ 155,00', b:'', category:'teclados',
    desc:'Teclado USB ABNT2. Layout padrão brasileiro, teclas silenciosas, cabo reforçado.',
    img:'images/tec.jpg', img2:'images/tec.jpg' },

  { e:'⌨️', n:'Mouse + Keyboard AM030', p:'R$ 150,00', b:'', category:'teclados',
    desc:'Kit teclado e mouse AM030. Combo completo para trabalho e estudo.',
    img:'images/keyboard.webp', img2:'images/keyboard.webp' },

  { e:'⌨️', n:'Kit Teclado e Mouse Sem Fio Lehmox LEY-177', p:'R$ 195,00', b:'Premium', category:'teclados',
    desc:'Kit teclado e mouse sem fio. Receptor USB único, bateria de longa duração.',
    img:'images/kitmousetec.webp', img2:'images/kitmousetec.webp' },

  // ── GAMER ─────────────────────────────────────────────────
  { e:'🎮', n:'Kit Carga e Joga', p:'R$ 69,90', b:'', category:'gamer',
    desc:'Kit carga e joga para controle. Carregue enquanto joga sem interrupções.',
    img:'images/kitcargaejoga.webp', img2:'images/kitcargaejoga.webp' },

  { e:'🎮', n:'Controle Gamer XBOX-360', p:'R$ 135,00', b:'', category:'gamer',
    desc:'Controle XBOX-360 preto USB. Compatível com PC e consoles, layout ergonômico.',
    img:'images/OIP.webp', img2:'images/OIP.webp' },

  // ── CABOS DE VÍDEO ────────────────────────────────────────
  { e:'📺', n:'Cabo Ultra HD 4K 5m', p:'R$ 59,90', b:'', category:'video',
    desc:'Cabo HDMI Ultra HD 4K com 5 metros. Suporte 4K 60Hz, conectores banhados a ouro.',
    img:'images/4k.webp', img2:'images/4k.webp' },

  { e:'📺', n:'DisplayPort', p:'R$ 29,90', b:'', category:'video',
    desc:'Cabo DisplayPort para monitores e placas de vídeo. Suporte Full HD e 4K.',
    img:'images/displayport.jpg', img2:'images/displayport.jpg' },

  { e:'📺', n:'Mini DisplayPort', p:'R$ 49,90', b:'', category:'video',
    desc:'Cabo Mini DisplayPort. Compatível com MacBooks e notebooks com saída Thunderbolt.',
    img:'images/minidisplayport.jpg', img2:'images/minidisplayport.jpg' },

  { e:'📺', n:'Cabo HD Conversão', p:'R$ 49,90', b:'', category:'video',
    desc:'Cabo de conversão HD. Ideal para ligar computadores a TVs com diferentes entradas.',
    img:'images/convhd.webp', img2:'images/convhd.webp' },

  // ── OUTROS ────────────────────────────────────────────────
  { e:'🌧️', n:'Protetor de Chuva para Celular', p:'R$ 25,00', b:'', category:'outros',
    desc:'Protetor impermeável para celular. Protege seu smartphone da chuva durante o uso.',
    img:'images/protcel.webp', img2:'images/protcel.webp' },

  { e:'🌧️', n:'Protetor de Chuva para celular com Suporte', p:'R$ 25,00', b:'', category:'outros',
    desc:'Protetor impermeável com suporte. Protege e sustenta o celular ao mesmo tempo.',
    img:'images/supcel.jpg', img2:'images/supcel.jpg' },

  { e:'🚗', n:'Placa 99/Uber', p:'R$ 35,00', b:'', category:'outros',
    desc:'Placa identificadora para motoristas de aplicativo 99 e Uber. Visibilidade clara.',
    img:'images/placa99uber.jpg', img2:'images/placa99uber.jpg' },

  { e:'📍', n:'Localizador Rastreador', p:'R$ 39,90', b:'', category:'outros',
    desc:'Localizador inteligente de objetos. Encontre chaves e carteiras pelo celular.',
    img:'images/localizador.jpg', img2:'images/localizador.jpg' },

  { e:'💧', n:'Bomba Elétrica Galão de Água', p:'R$ 55,00', b:'', category:'outros',
    desc:'Bomba elétrica para galão de água. Recarregável via USB, serve galões de 10 a 20 litros.',
    img:'images/galaodagua.webp', img2:'images/galaodagua.webp' },

  { e:'📱', n:'DMAX Multimídia Portátil', p:'R$ 69,90', b:'', category:'outros',
    desc:'Dispositivo multimídia portátil. Reproduz músicas, vídeos e imagens.',
    img:'images/multimidiaportatil.webp', img2:'images/multimidaportatil.webp' },

  { e:'🧮', n:'Calculadora Multifuncional', p:'R$ 25,00', b:'', category:'outros',
    desc:'Calculadora multifuncional. Operações básicas e científicas, display LCD.',
    img:'images/calculadoramultfunc.webp', img2:'images/calculadoramultifunc.webp' },

  { e:'💅', n:'Cortador de Unha', p:'R$ 10,90', b:'', category:'outros',
    desc:'Cortador de unha de aço inox. Corte preciso, acompanha lima e estojo protetor.',
    img:'images/cortadordeunha.jpg', img2:'images/cortadordeunha.jpg' },

  { e:'💿', n:'DVD-R', p:'R$ 5,00', b:'', category:'outros',
    desc:'DVD-R virgem para gravação. Capacidade de 4.7GB, compatível com todos os gravadores.',
    img:'images/dvdr.jpg', img2:'images/dvdr.jpg' },

  { e:'💻', n:'Suporte Notebook/Tablet', p:'R$ 55,00', b:'', category:'outros',
    desc:'Suporte ergonômico para notebook e tablet. Eleva a tela, melhora postura e ventilação.',
    img:'images/suportenotetab.jpg', img2:'images/suportenotetab.jpg' },

  { e:'⌚', n:'Carregador Smartwatch D13', p:'R$ 40,00', b:'', category:'outros',
    desc:'Carregador magnético para smartwatch D13. Encaixe fácil, carregamento rápido.',
    img:'images/carresmartwatch.webp', img2:'images/carresmartwatch.webp' },

];