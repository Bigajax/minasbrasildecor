export type Imagem = {
  id?: string;
  url: string;
  alt: string | null;
  largura?: number | null;
  altura?: number | null;
  blur?: string | null;
  ordem: number;
};

export type Categoria = {
  id: string;
  nome: string;
  slug: string;
  ordem: number;
  ativo: boolean;
  capa?: string | null;
  capaBlur?: string | null;
};

export type Produto = {
  id: string;
  codigo: string;
  nome: string;
  slug: string;
  descricao: string | null;
  marca: string | null;
  preco: number | null;
  preco_promocional: number | null;
  categoria_slug: string | null;
  tamanhos: string[];
  cores: string[];
  destaque: boolean;
  ativo: boolean;
  ordem: number;
  imagens: Imagem[];
  medidas?: Medidas;
};

export type Config = Record<string, string>;

export type Ordenacao = "recentes" | "menor-preco" | "maior-preco";

export type Filtros = {
  categoria?: string;
  marca?: string[];
  tamanho?: string[];
  precoMin?: number;
  precoMax?: number;
  busca?: string;
  ordem?: Ordenacao;
  incluirInativos?: boolean;
};

export type Resultado<T> = { ok: true; dado: T } | { ok: false; erro: string };

/**
 * As medidas da peça, em centímetros, lidas da ficha técnica de fábrica.
 * `largura` quando a peça tem uma só; `larguras` quando vem em mais de
 * um tamanho (2,00 e 2,40 m); `modulos` e `braco` para os retráteis,
 * que são montados por módulo. O que a ficha não diz fica de fora.
 */
export type Medidas = {
  largura?: number;
  larguras?: number[];
  altura?: number;
  profundidade?: number;
  chaise?: number;
  braco?: string;
  modulos?: string;
};
