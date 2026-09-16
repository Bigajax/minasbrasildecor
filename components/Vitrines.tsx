import Image from "next/image";
import Link from "next/link";
import type { Produto } from "@/lib/tipos";

export type Vitrine = {
  titulo: string;
  texto: string;
  href: string;
  peca: Produto;
  acao?: string;
};

/**
 * Duas vitrines grandes lado a lado, uma para cada coisa que a loja
 * faz de verdade: o estofado (sofás retráteis) e a madeira (mesas de
 * jantar). A foto ocupa o bloco; embaixo, uma faixa de tinta com o
 * título em Bricolage, a linha de apoio e a placa de fio.
 */
export function Vitrines({ vitrines }: { vitrines: Vitrine[] }) {
  if (!vitrines.length) return null;
  return (
    <section aria-label="Estofado e madeira" className="miolo pt-12 lg:pt-16">
      <ul className="grid gap-4 md:grid-cols-2 lg:gap-6">
        {vitrines.map((v) => {
          const capa = v.peca.imagens[0];
          return (
            <li key={v.titulo}>
              <Link href={v.href} className="bloco group block">
                <span className="foto block aspect-[16/10] rounded-b-none">
                  {capa ? (
                    <Image
                      src={capa.url}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 44rem"
                      placeholder={capa.blur ? "blur" : "empty"}
                      blurDataURL={capa.blur ?? undefined}
                      className="object-cover object-[center_45%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  ) : null}
                </span>
                <span className="escuro flex items-center justify-between gap-4 p-5 sm:p-6">
                  <span className="min-w-0">
                    <span className="romana block text-[clamp(1.25rem,2vw,1.625rem)] text-parede">{v.titulo}</span>
                    <span className="mt-1 block text-[0.875rem] text-marfim-fraco">{v.texto}</span>
                  </span>
                  <span className="btn btn--placa-fio btn--pequeno shrink-0">{v.acao ?? "Ver"}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
