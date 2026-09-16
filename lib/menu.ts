import type { Produto } from "./tipos";
import { GRUPOS } from "./grupos";
import { site } from "@/data/site.config";

/**
 * O menu das portas, montado do catálogo: três cômodos, "como é feito"
 * e a loja. Cada cômodo abre uma aba com as categorias dele e a
 * contagem; a aba nunca promete o que a vitrine não tem.
 */
export type NomeIconeMenu = "sala" | "jantar" | "quarto" | "loja" | "pino" | "conversa" | "regua" | "madeira" | "novidade";

export type ItemMenu = {
  nome: string;
  href: string;
  icone?: NomeIconeMenu;
  nota?: string;
  externa?: boolean;
};

export type Aba = {
  chave: string;
  nome: string;
  href: string;
  icone: NomeIconeMenu;
  externa?: boolean;
  titulo?: string;
  itens: ItemMenu[];
  colunas: 1 | 2 | 3 | 4;
  /* o número ao lado do nome na fila de portas */
  total?: number;
  /* a linha miúda ao lado do nome, só na porta da loja */
  nota?: string;
};

const NOMES: Record<string, string> = {
  "sofas-retrateis": "Sofás retráteis",
  "sofas-e-cantos": "Sofás e cantos",
  poltronas: "Poltronas",
  "paineis-e-racks": "Painéis e racks",
  "mesas-de-jantar": "Mesas de jantar",
  "bistros-e-banquetas": "Bistrôs e banquetas",
  cadeiras: "Cadeiras",
  "camas-e-colchoes": "Camas e colchões",
  "comodas-e-roupeiros": "Cômodas e roupeiros",
};

export function montarMenu(produtos: Produto[], linkWhats: string): Aba[] {
  const ativos = produtos.filter((p) => p.ativo);
  const conta = (slug: string) => ativos.filter((p) => p.categoria_slug === slug).length;

  return [
    ...Object.entries(GRUPOS).map(([slug, g]): Aba => {
      const total = g.categorias.reduce((n, c) => n + conta(c), 0);
      return {
        chave: slug,
        nome: g.nome,
        href: `/catalogo/${slug}`,
        icone: slug as NomeIconeMenu,
        total,
        titulo: `${total} ${total === 1 ? "peça" : "peças"}: ${g.linha}`,
        colunas: 1,
        itens: [
          ...g.categorias.filter((c) => conta(c) > 0).map((c) => ({ nome: NOMES[c] ?? c, href: `/catalogo/${c}`, nota: String(conta(c)) })),
          { nome: `Toda a ${g.nome.toLowerCase()}`, href: `/catalogo/${slug}`, icone: slug as NomeIconeMenu },
        ],
      };
    }),
    {
      chave: "feito",
      nome: "Como é feito",
      href: "/#como-e-feito",
      icone: "madeira",
      colunas: 1,
      itens: [
        { nome: "Madeira de eucalipto de reflorestamento", href: "/#como-e-feito", icone: "madeira", nota: "estrutura, base e pés" },
        { nome: "Medidas na etiqueta", href: "/#cabe", icone: "regua", nota: "largura, altura e profundidade" },
      ],
    },
    {
      chave: "loja",
      nome: "A loja",
      href: "/#loja",
      icone: "loja",
      nota: "Contagem, MG",
      colunas: 1,
      itens: [
        { nome: "Endereço e como chegar", href: "/#loja", icone: "pino", nota: site.endereco.split(",").slice(0, 2).join(",") },
        { nome: "Falar no WhatsApp", href: linkWhats, icone: "conversa", nota: "orçamento, tecido e entrega", externa: true },
        { nome: "As peças da vez", href: "/#destaques", icone: "novidade", nota: "a seleção da loja" },
      ],
    },
  ];
}
