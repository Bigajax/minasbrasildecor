import Image from "next/image";
import Link from "next/link";
import { CotaCurta } from "./Cota";
import { Icone } from "./Icones";
import { precoBRL } from "@/lib/formato";
import { temDesconto } from "@/lib/filtro";
import { cotaCurta } from "@/lib/medidas";
import { linkPeca } from "@/lib/whatsapp";
import type { Categoria, Produto } from "@/lib/tipos";

/**
 * O cartão da peça: foto 4:3 (as artes de fábrica são 4:3 depois do
 * recorte da ficha; as fotos da loja se ajustam), a categoria em
 * madeira, o nome em Bricolage, A COTA com largura, altura e
 * profundidade quando a ficha existe (ou "medidas no WhatsApp"), e o
 * botão de orçamento preso no pé, com a mensagem já montada. Preço
 * só quando a loja cadastrar: por ora, nenhum.
 */
export function CardProduto({
  produto,
  categoria,
  prioridade = false,
  tamanhos = "(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw",
}: {
  produto: Produto;
  categoria?: Categoria | null;
  prioridade?: boolean;
  tamanhos?: string;
}) {
  const capa = produto.imagens[0];
  const promo = temDesconto(produto);
  const cheio = precoBRL(produto.preco);
  const vigenteNumero = produto.preco_promocional ?? produto.preco;
  const vigente = precoBRL(vigenteNumero);
  const href = `/produto/${produto.slug}`;
  const pedir = linkPeca(produto, { preco: vigenteNumero ?? null });
  const cota = cotaCurta(produto);

  return (
    <article className="cartao group flex h-full flex-col">
      <Link href={href} className="foto block aspect-[4/3] rounded-b-none" aria-label={produto.nome}>
        {vigente ? (
          <span className="placa-etiqueta absolute left-3 top-3 z-[1] !flex items-baseline gap-2">
            <span className="preco text-[0.9375rem]">{vigente}</span>
            {promo && cheio ? <span className="text-[0.75rem] font-normal line-through opacity-70">{cheio}</span> : null}
          </span>
        ) : null}
        {capa ? (
          <Image src={capa.url} alt={capa.alt ?? produto.nome} fill sizes={tamanhos} placeholder={capa.blur ? "blur" : "empty"} blurDataURL={capa.blur ?? undefined} priority={prioridade} className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-3">
        <p className="etiqueta min-h-[1em]">{categoria?.nome ?? ""}</p>
        <h3 className="titulo-cartao mt-1 line-clamp-2 min-h-[2.4em] text-tinta">
          <Link href={href} className="hover:text-madeira-escura">
            {produto.nome}
          </Link>
        </h3>
        <p className="mt-2 min-h-[1.25rem] truncate text-tinta-fraca">
          {cota ? <CotaCurta texto={cota} className="text-tinta" /> : <span className="text-[0.8125rem]">Medidas no WhatsApp</span>}
        </p>

        <div className="mt-auto pt-3">
          <a href={pedir} target="_blank" rel="noreferrer" className="btn btn--tinta btn--pequeno w-full">
            <Icone nome="whats" className="h-[1.125rem] w-[1.125rem]" />
            Pedir orçamento
          </a>
        </div>
      </div>
    </article>
  );
}
