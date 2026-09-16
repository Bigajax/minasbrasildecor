import type { Medidas, Produto } from "./tipos";

/** 256 → "2,56 m"; 86 → "0,86 m" */
export function metros(cm: number): string {
  return `${(cm / 100).toFixed(2).replace(".", ",")} m`;
}

/** a largura que a peça ocupa, ou a menor delas quando vem em dois tamanhos */
export function larguraMinima(m?: Medidas): number | null {
  if (!m) return null;
  if (m.largura) return m.largura;
  if (m.larguras?.length) return Math.min(...m.larguras);
  return null;
}

/** "2,00 ou 2,40 m" / "2,56 m" / null */
export function larguraTexto(m?: Medidas): string | null {
  if (!m) return null;
  if (m.largura) return metros(m.largura);
  if (m.larguras?.length) return `${m.larguras.map((l) => (l / 100).toFixed(2).replace(".", ",")).join(" ou ")} m`;
  return null;
}

/**
 * A linha da cota no cartão: o que a ficha diz, curto.
 *   "L 2,00 ou 2,40 · A 0,95 · P 0,86"
 *   "módulos de 0,80 a 1,20 m · A 1,00"
 * Sem ficha, null: o cartão diz que a medida vem no WhatsApp.
 */
export function cotaCurta(p: Produto): string | null {
  const m = p.medidas;
  if (!m) return null;
  const partes: string[] = [];
  const largura = larguraTexto(m);
  if (largura) partes.push(`L ${largura.replace(" m", "")}`);
  else if (m.modulos) partes.push("módulos de 0,80 a 1,20");
  if (m.altura) partes.push(`A ${(m.altura / 100).toFixed(2).replace(".", ",")}`);
  if (m.profundidade) partes.push(`P ${(m.profundidade / 100).toFixed(2).replace(".", ",")}`);
  return partes.length ? `${partes.join(" · ")} m` : null;
}

/** as linhas da ficha da peça, na ordem em que a fábrica escreve */
export function linhasDaFicha(m: Medidas): { rotulo: string; valor: string }[] {
  const linhas: { rotulo: string; valor: string }[] = [];
  const largura = larguraTexto(m);
  if (largura) linhas.push({ rotulo: "Largura", valor: largura });
  if (m.modulos) linhas.push({ rotulo: "Módulos", valor: m.modulos });
  if (m.altura) linhas.push({ rotulo: "Altura", valor: metros(m.altura) });
  if (m.profundidade) linhas.push({ rotulo: m.modulos ? "Profundidade fechado" : "Profundidade", valor: metros(m.profundidade) });
  if (m.chaise) linhas.push({ rotulo: "Chaise", valor: metros(m.chaise) });
  if (m.braco) linhas.push({ rotulo: "Braço", valor: m.braco });
  return linhas;
}
