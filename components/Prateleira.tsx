import Link from "next/link";
import { CardProduto } from "./CardProduto";
import type { Categoria, Produto } from "@/lib/tipos";

/**
 * Uma prateleira da home: o título do cômodo em Bricolage com a linha
 * do que tem lá, o caminho para ver tudo, e uma amostra curta das
 * peças: quatro cartões e o fecho, numa linha de cinco no desktop e
 * num trilho que rola de lado no celular. A home não é o catálogo:
 * mostra poucas e fecha a fila com um cartão de tinta que diz quantas
 * faltam e leva para o cômodo inteiro.
 */
export function Prateleira({
  id,
  titulo,
  href,
  verTudo,
  produtos,
  categorias,
  prioridade = false,
  limite = 4,
  total,
  nomeDaPorta,
  feminino = false,
  subtitulo,
}: {
  id: string;
  titulo: string;
  href: string;
  verTudo: string;
  produtos: Produto[];
  categorias: Map<string, Categoria>;
  prioridade?: boolean;
  limite?: number;
  total?: number;
  nomeDaPorta?: string;
  feminino?: boolean;
  subtitulo?: string;
}) {
  if (!produtos.length) return null;

  const amostra = produtos.slice(0, limite);
  const todas = total ?? produtos.length;
  const restantes = todas - amostra.length;
  const fecho = restantes > 0 ? <CardVerMais href={href} restantes={restantes} total={todas} nome={nomeDaPorta ?? titulo.toLowerCase()} feminino={feminino} /> : null;
  const largura = "w-[68vw] shrink-0 sm:w-[17rem] lg:w-auto";

  return (
    <section aria-labelledby={id} className="miolo scroll-mt-24 pt-12 lg:pt-16">
      <div className="regua">
        <div>
          <h2 id={id} className="secao">
            {titulo}
          </h2>
          {subtitulo ? <p className="mt-1 text-[0.9375rem] text-tinta-fraca">{subtitulo}</p> : null}
        </div>
        <Link href={href} className="btn btn--texto shrink-0">
          {verTudo}
        </Link>
      </div>
      <ul className="faixa-scroll sangra mt-6 flex gap-3 overflow-x-auto pb-2 sm:gap-4 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0">
        {amostra.map((p, i) => (
          <li key={p.id} className={largura}>
            <CardProduto produto={p} categoria={categorias.get(p.categoria_slug ?? "")} prioridade={prioridade && i < 2} tamanhos="(max-width: 640px) 68vw, (max-width: 1024px) 17rem, 18vw" />
          </li>
        ))}
        {fecho ? <li className={largura}>{fecho}</li> : null}
      </ul>
    </section>
  );
}

/**
 * O fecho da prateleira: um cartão de tinta do tamanho dos outros, com
 * o número do que ficou de fora em Bricolage grande e a placa que leva
 * para o cômodo inteiro.
 */
function CardVerMais({ href, restantes, total, nome, feminino }: { href: string; restantes: number; total: number; nome: string; feminino: boolean }) {
  return (
    <Link href={href} className="escuro bloco group flex h-full flex-col justify-between p-5 sm:p-6">
      <span className="etiqueta">Tem mais</span>
      <span className="my-auto block">
        <span className="manchete block text-[clamp(2.5rem,4vw,3.5rem)] leading-none text-madeira-clara">+{restantes}</span>
        <span className="mt-3 block text-[0.9375rem] text-parede">
          {nome} além {feminino ? (restantes === 1 ? "desta" : "destas") : restantes === 1 ? "deste" : "destes"}.<br />
          <span className="text-marfim-fraco">{total} ao todo.</span>
        </span>
      </span>
      <span className="btn btn--placa-fio btn--pequeno w-full transition-colors group-hover:bg-parede group-hover:text-tinta">Ver {feminino ? "as" : "os"} {total}</span>
    </Link>
  );
}
