/**
 * Os cômodos: as portas que juntam categorias. A loja se apresenta
 * por onde a peça vai ficar (sala, jantar, quarto), e o catálogo por
 * tipo de peça. /catalogo/sala lista as quatro categorias da sala.
 */
export const GRUPOS: Record<string, { nome: string; categorias: string[]; linha: string }> = {
  sala: {
    nome: "Sala",
    categorias: ["sofas-retrateis", "sofas-e-cantos", "poltronas", "paineis-e-racks"],
    linha: "sofás retráteis, sofás e cantos, poltronas, painéis e racks",
  },
  jantar: {
    nome: "Jantar",
    categorias: ["mesas-de-jantar", "bistros-e-banquetas", "cadeiras"],
    linha: "mesas de madeira, bistrôs, banquetas e cadeiras",
  },
  quarto: {
    nome: "Quarto",
    categorias: ["camas-e-colchoes", "comodas-e-roupeiros"],
    linha: "camas box, cômodas e roupeiros",
  },
};

export const COMODOS = Object.keys(GRUPOS);

export function categoriasDoGrupo(slug: string): string[] | null {
  return GRUPOS[slug]?.categorias ?? null;
}

/** o cômodo de uma categoria, para o cartão e o caminho de volta */
export function comodoDa(categoriaSlug: string | null): { slug: string; nome: string } | null {
  if (!categoriaSlug) return null;
  for (const [slug, g] of Object.entries(GRUPOS)) {
    if (g.categorias.includes(categoriaSlug)) return { slug, nome: g.nome };
  }
  return null;
}
