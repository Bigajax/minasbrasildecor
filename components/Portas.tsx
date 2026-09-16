import Image from "next/image";
import Link from "next/link";
import { Icone, type NomeIcone } from "./Icones";
import type { Produto } from "@/lib/tipos";

export type Porta = {
  nome: string;
  href: string;
  icone: NomeIcone;
  peca?: Produto | null;
  total: number;
  linha: string;
};

/**
 * Os três cômodos, como ambientes: a foto da estrela do cômodo ocupa
 * o bloco, e no canto de baixo uma placa branca leva o nome em
 * Bricolage, a linha do que tem lá e a contagem. No hover a placa
 * vira tinta. A sala é a maior, porque é onde a loja mais tem peça.
 */
export function Portas({ portas }: { portas: Porta[] }) {
  return (
    <section aria-labelledby="titulo-portas" className="miolo pt-12 lg:pt-16">
      <div className="regua">
        <div>
          <h2 id="titulo-portas" className="secao">
            Por cômodo
          </h2>
          <p className="mt-1 text-[0.9375rem] text-tinta-fraca">Onde a peça vai ficar.</p>
        </div>
        <Link href="/catalogo" className="btn btn--texto shrink-0">
          Ver tudo
        </Link>
      </div>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-4">
        {portas.map((p, i) => {
          const capa = p.peca?.imagens[0];
          return (
            <li key={p.nome} className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
              <Link href={p.href} className="ambiente group">
                <span className={`foto block rounded-none ${i === 0 ? "aspect-[4/3] lg:aspect-[5/4]" : "aspect-[4/3] lg:aspect-[4/5]"}`}>
                  {capa ? (
                    <Image src={capa.url} alt="" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" placeholder={capa.blur ? "blur" : "empty"} blurDataURL={capa.blur ?? undefined} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                  ) : null}
                </span>
                <span className="ambiente-placa">
                  <span className="min-w-0">
                    <span className="romana block text-[1.375rem] leading-none">{p.nome}</span>
                    <span className="mt-1.5 block text-[0.8125rem] leading-snug opacity-80">{p.linha}</span>
                  </span>
                  <span className="medida shrink-0 text-[0.875rem] opacity-80">
                    {p.total} {p.total === 1 ? "peça" : "peças"}
                  </span>
                  <Icone nome="seta" className="hidden h-4 w-4 shrink-0" peso={2} />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
