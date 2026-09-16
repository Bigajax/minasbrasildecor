/**
 * Dados fixos do negócio. O que a loja edita no dia a dia (aviso do
 * topo, frase do hero, WhatsApp) vive na tabela `config` e é editável
 * em /painel/config, não aqui.
 */

function resolverUrl(): string {
  const candidatos = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.NEXT_PUBLIC_VERCEL_URL,
    process.env.VERCEL_URL,
  ];

  for (const bruto of candidatos) {
    const valor = bruto?.trim();
    if (!valor) continue;
    const comProtocolo = /^https?:\/\//i.test(valor) ? valor : `https://${valor}`;
    try {
      return new URL(comProtocolo).origin;
    } catch {
      // valor malformado: tenta o próximo em vez de derrubar o build
    }
  }

  return "http://localhost:3130";
}

export const site = {
  nome: "Minas Brasil Decor",
  marca: "Minas Brasil Decor",
  posicionamento: "Sofás, mesas de madeira, painéis e camas, com as medidas na etiqueta, em Contagem",
  cidade: "Contagem | MG",
  /* a loja não publica telefone no Instagram: fica vazio até ela passar.
     Na prévia nada disso é usado: ver PREVIA. */
  whatsapp: "",
  instagram: "minasbrasildecorltda",
  instagramSegundo: "minasbrasildecor",
  url: resolverUrl(),
  /* o endereço é a bio inteira do Instagram, palavra por palavra */
  endereco: "Av. Fernão Dias, 880, Jardim Laguna, Contagem - MG",
  maps: "https://www.google.com/maps/search/?api=1&query=Av.+Fern%C3%A3o+Dias+880+Jardim+Laguna+Contagem+MG",
} as const;

/**
 * MODO PRÉVIA. Enquanto a vitrine é uma amostra, TODO botão de WhatsApp
 * aponta para o estúdio com a mesma mensagem. Quando a loja contratar:
 * PREVIA = null e o número acima passa a valer.
 */
export const PREVIA: { whatsapp: string; mensagem: string } | null = {
  whatsapp: "5544999997219",
  mensagem: "Oi! Vi a prévia da vitrine da Minas Brasil Decor e quero colocar no ar.",
};

/** Valores iniciais da tabela `config`. Sobrescritos pelo banco quando existirem. */
export const configPadrao: Record<string, string> = {
  whatsapp: site.whatsapp,
  instagram: site.instagram,
  cidade: site.cidade,
  /* frases separadas por "|": o cabeçalho reveza uma de cada vez */
  aviso_topo: "Loja em Contagem, MG: Av. Fernão Dias, 880, Jardim Laguna | Madeira de eucalipto de reflorestamento e pés em madeira maciça | Vários padrões de tecido: veludo, bouclê, linho e corino | Orçamento pelo WhatsApp, sem cadastro",
  frase_hero: "Sofá, mesa e cama. A casa inteira, medida por medida.",
  endereco: site.endereco,
  horario: "",
};
