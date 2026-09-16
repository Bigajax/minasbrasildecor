import type { Metadata } from "next";
import { Catalogo } from "@/components/Catalogo";
import { carregarCatalogo, obterConfig } from "@/lib/dados";
import { linkGeral } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Catálogo",
  description: "Sofás retráteis, sofás e cantos, poltronas, painéis, mesas de jantar, bistrôs, camas e cômodas da Minas Brasil Decor, em Contagem. Orçamento pelo WhatsApp.",
  alternates: { canonical: "/catalogo" },
};

export default async function PaginaCatalogo({ searchParams }: { searchParams: Promise<{ busca?: string }> }) {
  const [{ categorias, produtos }, config, sp] = await Promise.all([carregarCatalogo(), obterConfig(), searchParams]);

  const pecas = produtos.filter((p) => p.ativo);
  const categoriasDaLoja = categorias.filter((c) => c.ativo);

  return (
    <>
      <header className="miolo pb-6 pt-8 lg:pb-8 lg:pt-12">
        <h1 className="manchete text-[clamp(1.75rem,4vw,2.5rem)] text-tinta">Todas as peças</h1>
        <p className="falada mt-2 max-w-[48ch] text-[1.0625rem] text-tinta-fraca">
          {pecas.length} peças, entre sala, jantar e quarto. Toca numa para ver a ficha com as medidas e pedir o orçamento pelo WhatsApp.
        </p>
      </header>
      <Catalogo produtos={pecas} categorias={categoriasDaLoja} buscaInicial={sp.busca ?? ""} linkWhats={linkGeral(config.whatsapp)} />
    </>
  );
}
