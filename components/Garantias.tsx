import Link from "next/link";
import { Icone, type NomeIcone } from "./Icones";

/**
 * As garantias: uma régua de quatro promessas no pé do hero, cada uma
 * um link para onde a promessa se cumpre. Só o que a loja cumpre de
 * fato, lido do Instagram dela e das fichas de fábrica: orçamento
 * pelo WhatsApp, a loja em Contagem, as medidas na etiqueta e os
 * padrões de tecido.
 */
const ITENS: { icone: NomeIcone; titulo: string; texto: string; href: string; externa?: boolean }[] = [
  { icone: "conversa", titulo: "Orçamento pelo WhatsApp", texto: "sem cadastro, sem carrinho", href: "", externa: true },
  { icone: "loja", titulo: "Loja em Contagem, MG", texto: "Av. Fernão Dias, 880, Jardim Laguna", href: "/#loja" },
  { icone: "regua", titulo: "Medidas na etiqueta", texto: "largura, altura e profundidade da ficha", href: "/#cabe" },
  { icone: "tecido", titulo: "Vários padrões de tecido", texto: "veludo, bouclê, linho e corino", href: "/#como-e-feito" },
];

export function Garantias({ linkWhats }: { linkWhats: string }) {
  return (
    <section aria-label="Como a loja funciona" className="miolo">
      <ul className="garantias sangra faixa-scroll lg:mx-0">
        {ITENS.map((i) => {
          const href = i.href || linkWhats;
          const conteudo = (
            <>
              <span className="garantia-icone">
                <Icone nome={i.icone} className="h-6 w-6" peso={1.5} />
              </span>
              <span className="min-w-0">
                <span className="garantia-titulo">{i.titulo}</span>
                <span className="mt-1 block text-[0.8125rem] leading-snug text-tinta-fraca">{i.texto}</span>
              </span>
            </>
          );
          return (
            <li key={i.titulo}>
              {i.externa ? (
                <a href={href} target="_blank" rel="noreferrer" className="garantia">
                  {conteudo}
                </a>
              ) : (
                <Link href={href} className="garantia">
                  {conteudo}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
