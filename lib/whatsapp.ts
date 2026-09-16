import { PREVIA, site } from "@/data/site.config";
import type { Produto } from "./tipos";

function numero(whatsapp?: string) {
  return (whatsapp ?? site.whatsapp).replace(/\D/g, "");
}

export function linkWhatsApp(texto: string, whatsapp?: string): string {
  /* na prévia, o destino e a mensagem são fixos: ver PREVIA em site.config */
  if (PREVIA) return `https://wa.me/${PREVIA.whatsapp}?text=${encodeURIComponent(PREVIA.mensagem)}`;
  return `https://wa.me/${numero(whatsapp)}?text=${encodeURIComponent(texto)}`;
}

const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export type Pedido = {
  whatsapp?: string;
  base?: string;
  /* o tecido ou a cor que a pessoa quer, escrito */
  tecido?: string;
  /* a largura escolhida, quando a peça vem em dois tamanhos */
  largura?: string;
  quantidade?: number;
  observacao?: string;
  preco?: number | null;
};

/**
 * CTA de produto: a mensagem chega estruturada, uma linha por coisa,
 * para quem atende não precisar perguntar o básico. O que a pessoa
 * não preencheu não aparece; nada vira "undefined".
 */
export function linkPeca(produto: Pick<Produto, "codigo" | "nome" | "slug">, opcoes: Pedido = {}): string {
  const base = opcoes.base ?? site.url;
  const url = `${base.replace(/\/$/, "")}/produto/${produto.slug}`;
  const quantidade = opcoes.quantidade && opcoes.quantidade > 0 ? opcoes.quantidade : 1;
  const preco = opcoes.preco ?? null;

  const linhas = [
    "Oi! Vi no site da Minas Brasil Decor e quero um orçamento:",
    `• ${produto.nome} (${produto.codigo})`,
    quantidade > 1 ? `• Quantidade: ${quantidade}` : null,
    opcoes.largura ? `• Largura: ${opcoes.largura}` : null,
    opcoes.tecido?.trim() ? `• Tecido ou cor: ${opcoes.tecido.trim()}` : null,
    opcoes.observacao?.trim() ? `• Obs.: ${opcoes.observacao.trim()}` : null,
    preco !== null ? `• Preço no site: ${BRL.format(preco)}` : null,
    "Qual o valor e o prazo de entrega?",
    url,
  ].filter(Boolean);

  return linkWhatsApp(linhas.join("\n"), opcoes.whatsapp);
}

export function linkGeral(whatsapp?: string): string {
  return linkWhatsApp("Oi! Vim pelo site da Minas Brasil Decor.", whatsapp);
}
