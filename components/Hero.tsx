import Image from "next/image";
import Link from "next/link";
import { Cota } from "./Cota";
import { Icone } from "./Icones";
import { larguraTexto, metros } from "@/lib/medidas";
import type { Produto } from "@/lib/tipos";

/**
 * A abertura, sobre a parede: à esquerda a manchete em Bricolage
 * pesada (a frase do painel), a linha de apoio com os números da loja
 * e os dois caminhos (a sala, o WhatsApp). À direita a estrela da vez
 * numa foto 4:3, com A COTA desenhada por fora dela: a largura embaixo
 * e a altura na lateral, lidas da ficha de fábrica. É a promessa da
 * casa dita em desenho: aqui a peça vem com medida.
 */
export function Hero({ frase, estrelas, linkWhats, totais }: { frase: string; estrelas: Produto[]; linkWhats: string; totais: { produtos: number; categorias: number } }) {
  const principal = estrelas.find((p) => p.medidas) ?? estrelas[0];
  const capa = principal?.imagens[0];
  const m = principal?.medidas;
  const largura = m ? larguraTexto(m) ?? (m.modulos ? "módulos de 0,80 a 1,20 m" : null) : null;
  const altura = m?.altura ? metros(m.altura) : null;

  return (
    <section aria-labelledby="titulo-hero" className="relative overflow-hidden">
      <div className="miolo grid gap-10 py-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14 lg:py-16">
        <div>
          <h1 id="titulo-hero" className="manchete max-w-[13ch] text-[clamp(2.5rem,8.5vw,3.75rem)] text-tinta lg:text-[clamp(3rem,4.8vw,4.75rem)]">
            {frase}
          </h1>
          <p className="falada mt-6 max-w-[42ch] text-[1.0625rem] text-tinta-fraca lg:text-[1.125rem]">
            {totais.produtos} peças de estofado e madeira, entre sala, jantar e quarto, com largura, altura e profundidade na etiqueta. Você escolhe aqui e fecha o orçamento pelo WhatsApp com a loja, em Contagem.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/catalogo/sala" className="btn btn--tinta">
              Ver a sala
            </Link>
            <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--linha">
              <Icone nome="whats" className="h-[1.125rem] w-[1.125rem]" />
              Chamar no WhatsApp
            </a>
          </div>
        </div>

        {principal && capa ? (
          <figure className="grid grid-cols-[minmax(0,1fr)_1.25rem] grid-rows-[auto_1.25rem] gap-x-3 gap-y-3">
            <Link href={`/produto/${principal.slug}`} className="group block" aria-label={principal.nome}>
              <span className="foto block aspect-[4/3] rounded-[var(--raio)]">
                <Image src={capa.url} alt={capa.alt ?? principal.nome} fill priority sizes="(max-width: 1024px) 100vw, 52vw" placeholder={capa.blur ? "blur" : "empty"} blurDataURL={capa.blur ?? undefined} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]" />
              </span>
            </Link>
            {altura ? <Cota valor={altura} vertical /> : <span aria-hidden="true" />}
            {largura ? <Cota valor={largura} /> : <span aria-hidden="true" />}
            <span aria-hidden="true" />
            <figcaption className="col-span-2 mt-1 flex items-baseline justify-between gap-3 text-[0.9375rem] text-tinta-fraca">
              <span>
                Na foto:{" "}
                <Link href={`/produto/${principal.slug}`} className="font-semibold text-tinta hover:text-madeira-escura">
                  {principal.nome}
                </Link>
              </span>
              <span className="miudo shrink-0">medidas da ficha de fábrica</span>
            </figcaption>
          </figure>
        ) : null}
      </div>
    </section>
  );
}
