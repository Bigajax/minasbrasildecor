"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CardProduto } from "./CardProduto";
import { larguraMinima, metros } from "@/lib/medidas";
import type { Categoria, Produto } from "@/lib/tipos";

/**
 * "Cabe na sua parede?": a pessoa mede a parede da sala, arrasta a
 * trena e a vitrine mostra só os sofás e poltronas que cabem, pela
 * largura da ficha de fábrica. Os retráteis ficam de fora do filtro
 * porque são montados por módulo (0,80 a 1,20 m cada): para eles a
 * medida se combina com a loja, e o bloco diz isso. É o único momento
 * interativo da home, e é o que a promessa da cota entrega.
 */
export function CabeNaSala({ produtos, categorias }: { produtos: Produto[]; categorias: Map<string, Categoria> }) {
  const comLargura = useMemo(() => produtos.filter((p) => larguraMinima(p.medidas) !== null).sort((a, b) => (larguraMinima(b.medidas) ?? 0) - (larguraMinima(a.medidas) ?? 0)), [produtos]);
  const modulares = useMemo(() => produtos.filter((p) => p.medidas?.modulos).length, [produtos]);
  const maior = Math.max(300, ...comLargura.map((p) => larguraMinima(p.medidas) ?? 0));
  const [parede, setParede] = useState(260);

  const cabem = comLargura.filter((p) => (larguraMinima(p.medidas) ?? 0) <= parede);

  if (!comLargura.length) return null;

  return (
    <section id="cabe" aria-labelledby="titulo-cabe" className="mt-12 scroll-mt-24 bg-feltro lg:mt-16">
      <div className="miolo py-10 lg:py-14">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-end lg:gap-14">
          <div>
            <h2 id="titulo-cabe" className="secao">
              Cabe na sua parede?
            </h2>
            <p className="falada mt-3 max-w-[40ch] text-[1rem] text-tinta-fraca">
              Meça a parede onde o sofá vai ficar e arraste a trena. A vitrine separa o que cabe, pela largura da ficha de fábrica.
            </p>
          </div>
          <div>
            <label htmlFor="trena" className="flex items-baseline justify-between gap-4">
              <span className="etiqueta text-tinta">Minha parede tem</span>
              <span className="manchete text-[clamp(2rem,4vw,2.75rem)] tabular-nums text-tinta">{metros(parede)}</span>
            </label>
            <input
              id="trena"
              type="range"
              min={150}
              max={Math.ceil(maior / 10) * 10 + 20}
              step={5}
              value={parede}
              onChange={(e) => setParede(Number(e.target.value))}
              className="trena mt-2"
              aria-valuetext={metros(parede)}
            />
            <div className="flex justify-between text-[0.75rem] text-tinta-fraca">
              <span>1,50 m</span>
              <span>{metros(Math.ceil(maior / 10) * 10 + 20)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-baseline justify-between gap-4">
          <p className="text-[0.9375rem] text-tinta" aria-live="polite">
            {cabem.length === 0 ? (
              <>Nenhum sofá fixo cabe em {metros(parede)}. Os retráteis são montados por módulo: fale com a loja.</>
            ) : (
              <>
                <span className="font-semibold">{cabem.length}</span> {cabem.length === 1 ? "peça cabe" : "peças cabem"} em {metros(parede)}
                {modulares ? <span className="text-tinta-fraca">, fora os {modulares} retráteis, montados por módulo</span> : null}.
              </>
            )}
          </p>
          <Link href="/catalogo/sala" className="btn btn--texto shrink-0">
            Ver a sala
          </Link>
        </div>

        {cabem.length ? (
          <ul className="faixa-scroll sangra mt-5 flex gap-3 overflow-x-auto pb-2 sm:gap-4 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0">
            {cabem.slice(0, 4).map((p) => (
              <li key={p.id} className="w-[68vw] shrink-0 sm:w-[18rem] lg:w-auto">
                <CardProduto produto={p} categoria={categorias.get(p.categoria_slug ?? "")} tamanhos="(max-width: 640px) 68vw, (max-width: 1024px) 18rem, 22vw" />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
