import { Icone, type NomeIcone } from "./Icones";

/**
 * "Como é feito": a ficha de fábrica que vem no pé de cada arte
 * (Estofamento / Detalhes), transcrita e posta em pé sobre a tinta.
 * Quatro colunas, uma por parte do móvel, com o que as fichas dizem
 * palavra por palavra. Nada aqui foi inventado: se a ficha não diz,
 * não está.
 */
const PARTES: { icone: NomeIcone; titulo: string; linhas: string[] }[] = [
  {
    icone: "madeira",
    titulo: "Estrutura",
    linhas: ["Madeira de eucalipto de reflorestamento, ecologicamente correto", "Base e pés em madeira maciça", "Poltronas com pés em Tauari"],
  },
  {
    icone: "mola",
    titulo: "Assento",
    linhas: ["Molas Bonnel entrelaçadas com percintas elásticas", "Molas ensacadas nos retráteis pillow top", "Assento retrátil e encosto reclinável nos retráteis"],
  },
  {
    icone: "sala",
    titulo: "Espuma",
    linhas: ["Densidade D-28 soft no encosto e no pillow", "Densidade D-28 firme no assento", "100% fibra siliconada"],
  },
  {
    icone: "tecido",
    titulo: "Tecidos",
    linhas: ["Veludo, bouclê, linho e Puríssimo", "Corino nos braços e nas faixas", "Vários padrões de tecido: a cor se escolhe na loja"],
  },
];

export function ComoEFeito() {
  return (
    <section id="como-e-feito" aria-labelledby="titulo-feito" className="escuro mt-12 scroll-mt-24 lg:mt-16">
      <div className="miolo py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-14">
          <div>
            <h2 id="titulo-feito" className="secao text-parede">
              Como é feito
            </h2>
            <p className="falada mt-3 max-w-[36ch] text-[1rem] text-marfim-fraco">
              O que a ficha de fábrica escreve no pé de cada sofá, sem tradução. É o mesmo padrão em todas as peças estofadas da loja.
            </p>
          </div>
          <dl className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {PARTES.map((p) => (
              <div key={p.titulo} className="border-t border-white/15 pt-4">
                <dt className="flex items-center gap-3">
                  <Icone nome={p.icone} className="h-6 w-6 text-madeira-clara" peso={1.5} />
                  <span className="romana text-[1.125rem] text-parede">{p.titulo}</span>
                </dt>
                {p.linhas.map((l) => (
                  <dd key={l} className="mt-2 text-[0.9375rem] leading-snug text-marfim-fraco">
                    {l}
                  </dd>
                ))}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
