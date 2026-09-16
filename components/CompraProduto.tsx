"use client";

import { useState } from "react";
import { precoBRL } from "@/lib/formato";
import { larguraTexto } from "@/lib/medidas";
import { linkPeca } from "@/lib/whatsapp";
import type { Produto } from "@/lib/tipos";

/**
 * O pedido de orçamento, montado antes de sair: a largura quando a
 * peça vem em dois tamanhos (chips lidos da ficha), o tecido ou a cor
 * que a pessoa quer (escrito, porque a loja tem "vários padrões" e
 * não publica a cartela), quantidade e uma observação livre. Tudo vai
 * numa mensagem estruturada para o WhatsApp. Não existe carrinho: a
 * conversa é o pedido.
 */
export function CompraProduto({ produto, whatsapp, base }: { produto: Produto; whatsapp: string; base: string; atendimento?: boolean }) {
  const [largura, setLargura] = useState<string | null>(null);
  const [tecido, setTecido] = useState("");
  const [quantidade, setQuantidade] = useState(1);
  const [observacao, setObservacao] = useState("");

  const preco = produto.preco_promocional ?? produto.preco;
  const total = preco !== null ? preco * quantidade : null;
  const larguras = produto.medidas?.larguras ?? [];
  const estofado = ["sofas-retrateis", "sofas-e-cantos", "poltronas", "cadeiras", "bistros-e-banquetas"].includes(produto.categoria_slug ?? "");

  const link = linkPeca(produto, {
    whatsapp,
    base,
    largura: largura ?? undefined,
    tecido,
    quantidade,
    observacao,
    preco,
  });

  return (
    <div className="space-y-6">
      {larguras.length > 1 ? (
        <fieldset>
          <legend className="etiqueta mb-2">Largura</legend>
          <div className="flex flex-wrap gap-2">
            {larguras.map((l) => {
              const texto = larguraTexto({ largura: l }) ?? "";
              return (
                <button key={l} type="button" className="chip min-w-[4.5rem] justify-center tabular-nums" aria-pressed={largura === texto} onClick={() => setLargura(largura === texto ? null : texto)}>
                  {texto}
                </button>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-end">
        <div>
          <p className="etiqueta mb-2">Quantidade</p>
          <div className="inline-flex items-stretch overflow-hidden rounded-[var(--raio-mini)] border border-linha bg-branco">
            <button type="button" onClick={() => setQuantidade((q) => Math.max(1, q - 1))} aria-label="Uma a menos" className="px-4 text-[1.125rem] font-semibold text-tinta hover:bg-feltro disabled:opacity-40" disabled={quantidade <= 1}>
              −
            </button>
            <input
              type="number"
              min={1}
              max={20}
              inputMode="numeric"
              value={quantidade}
              onChange={(e) => setQuantidade(Math.min(20, Math.max(1, Number(e.target.value) || 1)))}
              aria-label="Quantidade"
              className="w-14 border-x border-linha bg-branco text-center text-[1rem] font-semibold text-tinta [appearance:textfield] focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <button type="button" onClick={() => setQuantidade((q) => Math.min(20, q + 1))} aria-label="Uma a mais" className="px-4 text-[1.125rem] font-semibold text-tinta hover:bg-feltro">
              +
            </button>
          </div>
        </div>

        <label className="campo-flutuante">
          <span>{estofado ? "Tecido ou cor" : "Cor ou acabamento"}</span>
          <input value={tecido} onChange={(e) => setTecido(e.target.value)} placeholder={estofado ? "Ex.: veludo verde, bouclê off-white" : "Ex.: madeira com off-white"} maxLength={60} />
        </label>
      </div>

      <label className="campo-flutuante">
        <span>Alguma observação?</span>
        <input value={observacao} onChange={(e) => setObservacao(e.target.value)} placeholder="Medida da parede, entrega, pergunta" maxLength={140} />
      </label>

      <div className="rounded-[var(--raio)] border border-linha bg-branco p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-4">
          <span className="text-[0.9375rem] text-tinta-fraca">
            {quantidade} {quantidade === 1 ? "peça" : "peças"}
            {preco !== null ? ` de ${precoBRL(preco)}` : ""}
          </span>
          <span className="preco text-[1.375rem] text-tinta">{total !== null ? precoBRL(total) : "valor na conversa"}</span>
        </div>
        <a href={link} target="_blank" rel="noreferrer" className="btn btn--cta mt-4 w-full">
          Pedir orçamento pelo WhatsApp
        </a>
        <p className="miudo mt-3">A mensagem já vai com a peça, a medida e o tecido que você escolheu. A loja responde com o valor, o prazo e combina a entrega.</p>
      </div>
    </div>
  );
}
