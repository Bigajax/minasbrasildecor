import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CardProduto } from "@/components/CardProduto";
import { CompraProduto } from "@/components/CompraProduto";
import { Cota } from "@/components/Cota";
import { GaleriaProduto } from "@/components/GaleriaProduto";
import { Regua } from "@/components/Moldura";
import { carregarCatalogo, obterConfig, obterProduto } from "@/lib/dados";
import { temDesconto } from "@/lib/filtro";
import { precoBRL } from "@/lib/formato";
import { comodoDa } from "@/lib/grupos";
import { larguraTexto, linhasDaFicha, metros } from "@/lib/medidas";
import { site } from "@/data/site.config";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { produtos } = await carregarCatalogo();
  return produtos.filter((p) => p.ativo).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const produto = await obterProduto(slug);
  if (!produto) return {};

  const descricao = produto.descricao ?? `${produto.nome}. Na Minas Brasil Decor, em Contagem.`;

  return {
    title: produto.nome,
    description: descricao,
    alternates: { canonical: `/produto/${produto.slug}` },
    openGraph: {
      type: "website",
      title: `${produto.nome} · Minas Brasil Decor`,
      description: descricao,
      url: `/produto/${produto.slug}`,
      images: produto.imagens[0] ? [{ url: produto.imagens[0].url, alt: produto.nome }] : [],
    },
  };
}

/**
 * A ficha da peça: à esquerda a galeria com A COTA por fora da foto
 * (largura embaixo, altura na lateral) quando a ficha de fábrica
 * existe; à direita o cômodo, o nome, a descrição transcrita da
 * ficha, a tabela de medidas com fio e o pedido de orçamento.
 */
export default async function PaginaProduto({ params }: Props) {
  const { slug } = await params;
  const [produto, { categorias, produtos }, config] = await Promise.all([obterProduto(slug), carregarCatalogo(), obterConfig()]);

  if (!produto) notFound();

  const categoria = categorias.find((c) => c.slug === produto.categoria_slug);
  const comodo = comodoDa(produto.categoria_slug);
  const promo = temDesconto(produto);
  const cheio = precoBRL(produto.preco);
  const vigente = precoBRL(produto.preco_promocional ?? produto.preco);
  const m = produto.medidas;
  const ficha = m ? linhasDaFicha(m) : [];
  const cotaLargura = m ? larguraTexto(m) ?? (m.modulos ? "módulos de 0,80 a 1,20 m" : null) : null;
  const cotaAltura = m?.altura ? metros(m.altura) : null;

  const parecidos = produtos.filter((p) => p.ativo && p.id !== produto.id && p.categoria_slug === produto.categoria_slug).slice(0, 4);

  const preco = produto.preco_promocional ?? produto.preco;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: produto.nome,
    sku: produto.codigo,
    ...(produto.descricao ? { description: produto.descricao } : {}),
    image: produto.imagens.map((i) => `${site.url}${i.url}`),
    ...(m?.altura ? { height: { "@type": "QuantitativeValue", value: m.altura, unitCode: "CMT" } } : {}),
    ...(m?.profundidade ? { depth: { "@type": "QuantitativeValue", value: m.profundidade, unitCode: "CMT" } } : {}),
    ...(m?.largura ? { width: { "@type": "QuantitativeValue", value: m.largura, unitCode: "CMT" } } : {}),
    offers: {
      "@type": "Offer",
      url: `${site.url}/produto/${produto.slug}`,
      priceCurrency: "BRL",
      availability: "https://schema.org/InStock",
      ...(preco ? { price: preco } : {}),
      seller: { "@type": "FurnitureStore", name: "Minas Brasil Decor" },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="miolo pb-20 pt-6 lg:pt-10">
        <nav aria-label="Você está em" className="miudo mb-6">
          <Link href="/catalogo" className="hover:text-madeira-escura">
            Catálogo
          </Link>
          {comodo ? (
            <>
              <span className="px-2">/</span>
              <Link href={`/catalogo/${comodo.slug}`} className="hover:text-madeira-escura">
                {comodo.nome}
              </Link>
            </>
          ) : null}
          {categoria ? (
            <>
              <span className="px-2">/</span>
              <Link href={`/catalogo/${categoria.slug}`} className="hover:text-madeira-escura">
                {categoria.nome}
              </Link>
            </>
          ) : null}
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-start lg:gap-14">
          {/* a galeria com a cota por fora */}
          <div className={`self-start ${cotaLargura || cotaAltura ? "grid grid-cols-[minmax(0,1fr)_1.25rem] grid-rows-[auto_1.25rem] gap-x-3 gap-y-3" : ""}`}>
            <GaleriaProduto imagens={produto.imagens} nome={produto.nome} />
            {cotaAltura ? <Cota valor={cotaAltura} vertical /> : cotaLargura ? <span aria-hidden="true" /> : null}
            {cotaLargura ? <Cota valor={cotaLargura} /> : cotaAltura ? <span aria-hidden="true" /> : null}
          </div>

          <div className="lg:pt-2">
            <p className="etiqueta">
              {comodo ? `${comodo.nome} · ` : ""}
              {categoria?.nome ?? ""}
            </p>
            <h1 className="manchete mt-2 text-[clamp(1.625rem,3vw,2.375rem)] text-tinta">{produto.nome}</h1>

            <div className="mt-5 border-b border-linha pb-5">
              {vigente ? (
                <p className="preco flex items-baseline gap-3 text-[1.75rem] text-tinta">
                  {promo && cheio ? <span className="text-[1.125rem] text-tinta-fraca line-through">{cheio}</span> : null}
                  <span>{vigente}</span>
                </p>
              ) : (
                <p className="falada text-[1.0625rem] text-tinta">Valor e prazo pelo WhatsApp. A loja responde com o tecido que você escolher.</p>
              )}
            </div>

            {produto.descricao ? <p className="mt-6 max-w-[56ch] text-[0.9375rem] leading-relaxed text-tinta">{produto.descricao}</p> : null}

            {ficha.length ? (
              <div className="mt-6">
                <p className="etiqueta mb-2">Medidas da ficha de fábrica</p>
                <dl className="ficha">
                  {ficha.map((l) => (
                    <div key={l.rotulo} className="contents">
                      <dt>{l.rotulo}</dt>
                      <dd>{l.valor}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ) : (
              <p className="miudo mt-6">Esta peça está na loja, sem ficha de fábrica publicada: as medidas vêm na conversa.</p>
            )}

            {produto.cores.length === 1 ? (
              <p className="mt-4 text-[0.9375rem] text-tinta-fraca">
                Na foto: <span className="text-tinta">{produto.cores[0]}</span>. Vários padrões de tecido; a cor se escolhe na loja.
              </p>
            ) : null}

            <div className="mt-8">
              <CompraProduto produto={produto} whatsapp={config.whatsapp} base={site.url} />
            </div>
          </div>
        </div>

        {parecidos.length ? (
          <section aria-labelledby="titulo-parecidos" className="mt-16 lg:mt-20">
            <Regua id="titulo-parecidos">{`Mais em ${categoria?.nome.toLowerCase() ?? "a loja"}`}</Regua>
            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
              {parecidos.map((p) => (
                <CardProduto key={p.id} produto={p} categoria={categoria} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}
