import { CabeNaSala } from "@/components/CabeNaSala";
import { ComoEFeito } from "@/components/ComoEFeito";
import { FaixaWhats } from "@/components/FaixaWhats";
import { Garantias } from "@/components/Garantias";
import { Hero } from "@/components/Hero";
import { Loja } from "@/components/Loja";
import { Portas } from "@/components/Portas";
import { Prateleira } from "@/components/Prateleira";
import { Vitrines } from "@/components/Vitrines";
import { carregarCatalogo, obterConfig } from "@/lib/dados";
import { GRUPOS } from "@/lib/grupos";
import { linkGeral } from "@/lib/whatsapp";
import { configPadrao, site } from "@/data/site.config";

/**
 * A home: o hero com a cota desenhada na estrela da vez, a régua das
 * garantias, os três cômodos, "cabe na sua parede?" (o único momento
 * interativo), a prateleira da sala, as duas vitrines (estofado e
 * madeira), as prateleiras do jantar e do quarto, "como é feito" na
 * tinta, a loja no mapa e a faixa do WhatsApp. Tudo montado do catálogo.
 */
export default async function Home() {
  const [{ categorias, produtos, hero }, config] = await Promise.all([carregarCatalogo(), obterConfig()]);

  const whats = linkGeral(config.whatsapp);
  const ativos = produtos.filter((p) => p.ativo);
  const ativas = categorias.filter((c) => c.ativo);
  const porSlug = new Map(ativas.map((c) => [c.slug, c]));
  const da = (slug: string) => ativos.filter((p) => p.categoria_slug === slug).sort((a, b) => a.ordem - b.ordem);
  const doComodo = (slug: string) => GRUPOS[slug].categorias.flatMap(da);

  const destaques = hero
    .map((h) => ativos.find((p) => p.slug === h.slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const estrelaDoComodo = (slug: string) => destaques.find((p) => GRUPOS[slug].categorias.includes(p.categoria_slug ?? "")) ?? doComodo(slug)[0] ?? null;
  const peca = (slug: string) => ativos.find((p) => p.slug === slug) ?? null;

  /* as prateleiras mostram primeiro o que NÃO está no hero, para a home não repetir foto */
  const inedito = (lista: typeof ativos) => [...lista.filter((p) => !destaques.slice(0, 1).includes(p)), ...lista.filter((p) => destaques.slice(0, 1).includes(p))];

  const sala = inedito(doComodo("sala"));
  const jantar = inedito(doComodo("jantar"));
  const quarto = inedito(doComodo("quarto"));

  return (
    <>
      <Hero frase={config.frase_hero || configPadrao.frase_hero} estrelas={destaques} linkWhats={whats} totais={{ produtos: ativos.length, categorias: ativas.length }} />

      <Garantias linkWhats={whats} />

      <Portas portas={Object.entries(GRUPOS).map(([slug, g]) => ({ nome: g.nome, href: `/catalogo/${slug}`, icone: slug as "sala" | "jantar" | "quarto", peca: estrelaDoComodo(slug), total: doComodo(slug).length, linha: g.linha }))} />

      <CabeNaSala produtos={[...da("sofas-e-cantos"), ...da("poltronas"), ...da("sofas-retrateis")]} categorias={porSlug} />

      <Prateleira id="destaques" titulo="Sala" subtitulo="Sofás retráteis, sofás e cantos, poltronas, painéis e racks." href="/catalogo/sala" verTudo={`Ver as ${sala.length} da sala`} produtos={sala} categorias={porSlug} prioridade nomeDaPorta="peças" feminino />

      <Vitrines
        vitrines={[
          { titulo: "Sofás retráteis", texto: "Assento que abre, encosto que deita, pillow top de 20 cm. Montados por módulo, de 0,80 a 1,20 m.", href: "/catalogo/sofas-retrateis", peca: peca("sofa-retratil-e-reclinavel-pillow-top-em-boucle-off-white") ?? da("sofas-retrateis")[0], acao: "Ver os retráteis" },
          { titulo: "Mesas de madeira maciça", texto: "Tampo e pés de madeira de verdade, com as cadeiras que combinam. Redonda, oval ou retangular.", href: "/catalogo/mesas-de-jantar", peca: peca("mesa-de-jantar-em-madeira-macica-com-cadeiras") ?? da("mesas-de-jantar")[0], acao: "Ver as mesas" },
        ].filter((v): v is typeof v & { peca: NonNullable<typeof v.peca> } => Boolean(v.peca))}
      />

      <Prateleira id="prateleira-jantar" titulo="Jantar" subtitulo="Mesas de madeira, bistrôs, banquetas e cadeiras." href="/catalogo/jantar" verTudo={`Ver as ${jantar.length} do jantar`} produtos={jantar} categorias={porSlug} nomeDaPorta="peças" feminino />

      <Prateleira id="prateleira-quarto" titulo="Quarto" subtitulo="Camas box, cômodas e roupeiros." href="/catalogo/quarto" verTudo={`Ver as ${quarto.length} do quarto`} produtos={quarto} categorias={porSlug} nomeDaPorta="peças" feminino />

      <ComoEFeito />

      <Loja linkWhats={whats} horario={config.horario} />

      <FaixaWhats linkWhats={whats} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FurnitureStore",
            name: "Minas Brasil Decor",
            url: site.url,
            address: { "@type": "PostalAddress", streetAddress: "Av. Fernão Dias, 880", addressLocality: "Contagem", addressRegion: "MG", addressCountry: "BR" },
          }),
        }}
      />
    </>
  );
}
