import { Icone } from "./Icones";
import { site } from "@/data/site.config";

/**
 * A loja física, sobre o feltro: o endereço que a bio do Instagram
 * repete em todo post, o botão de chamar e o de chegar, e o mapa do
 * Google embutido. Horário e telefone só quando a loja passar.
 */
export function Loja({ linkWhats, horario }: { linkWhats: string; horario?: string }) {
  return (
    <section id="loja" aria-labelledby="loja-titulo" className="mt-12 scroll-mt-24 bg-feltro lg:mt-16">
      <div className="miolo grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center lg:py-14">
        <div>
          <h2 id="loja-titulo" className="secao">
            A loja fica em Contagem
          </h2>
          <p className="falada mt-4 max-w-[48ch] text-[1.0625rem] text-tinta-fraca">
            Na Avenida Fernão Dias, no Jardim Laguna. Você escolhe aqui, manda no WhatsApp e combina com a loja o tecido, o valor e a entrega. Se quiser sentar antes de decidir, as peças estão no salão.
          </p>
          <dl className="mt-6 grid gap-4">
            <div className="flex gap-3">
              <Icone nome="pino" className="mt-0.5 h-6 w-6 shrink-0 text-madeira-escura" peso={1.4} />
              <div>
                <dt className="etiqueta">Endereço</dt>
                <dd className="mt-0.5 text-[0.9375rem] text-tinta">{site.endereco}</dd>
              </div>
            </div>
            {horario ? (
              <div className="flex gap-3">
                <Icone nome="loja" className="mt-0.5 h-6 w-6 shrink-0 text-madeira-escura" peso={1.4} />
                <div>
                  <dt className="etiqueta">Horário</dt>
                  <dd className="mt-0.5 text-[0.9375rem] text-tinta">{horario}</dd>
                </div>
              </div>
            ) : null}
          </dl>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--tinta">
              <Icone nome="whats" className="h-[1.125rem] w-[1.125rem]" />
              Falar com a loja
            </a>
            <a href={site.maps} target="_blank" rel="noreferrer" className="btn btn--linha">
              Como chegar
            </a>
          </div>
        </div>
        <div className="cartao overflow-hidden">
          <iframe title="Mapa: Minas Brasil Decor, Contagem" src={`https://www.google.com/maps?q=${encodeURIComponent("Av. Fernão Dias, 880, Jardim Laguna, Contagem - MG")}&output=embed`} width="100%" height="340" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block w-full" />
        </div>
      </div>
    </section>
  );
}
