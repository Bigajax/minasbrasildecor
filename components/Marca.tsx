import Image from "next/image";

/**
 * A marca: o selo redondo real da loja (preto, ouro e a montanha
 * vermelha, recortado do avatar do Instagram) e, ao lado, o nome em
 * Bricolage em duas linhas, "Minas" pesado em cima e "Brasil Decor"
 * mais leve embaixo. O letreiro herda a cor do texto; o selo mantém as
 * cores dele em qualquer chão.
 */
export function Selo({ className = "" }: { className?: string }) {
  return <Image src="/marca/selo.png" alt="" width={72} height={72} className={className} priority />;
}

export function Logo({ className = "", comSelo = true }: { className?: string; comSelo?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-[0.45em] ${className}`}>
      {comSelo ? <Selo className="h-[1.9em] w-[1.9em] shrink-0" /> : null}
      <span className="flex flex-col leading-none">
        <span className="manchete text-[1em] leading-[0.95]">Minas</span>
        <span className="romana text-[0.5em] font-medium leading-[1.05] tracking-[0.06em] opacity-80">Brasil Decor</span>
      </span>
    </span>
  );
}

/* a montanha vermelha do selo, sozinha: a marca miúda que aparece nas placas */
export function Montanha({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path d="M3 19 11 6l4 6 2-3 4 10z" fill="#b8232e" />
    </svg>
  );
}

/* a assinatura do estúdio, em máscara, pintada pela cor do texto */
export function MarcaEstudio({ altura, className = "" }: { altura: number; className?: string }) {
  return (
    <span
      role="img"
      aria-label="Rafael Razeira Estúdio"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        height: altura,
        width: Math.round(altura * (956 / 519)),
        WebkitMaskImage: "url(/marca/rafael-razeira.png)",
        maskImage: "url(/marca/rafael-razeira.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
