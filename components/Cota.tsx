/**
 * A cota: a linha de desenho técnico com os traços nas pontas e a
 * medida no meio. Horizontal por padrão; vertical com `vertical`.
 * Herda a cor de --cota da superfície onde está.
 */
export function Cota({ valor, vertical = false, className = "" }: { valor: string; vertical?: boolean; className?: string }) {
  return (
    <span className={`cota ${vertical ? "cota--v" : ""} ${className}`} aria-label={valor}>
      <span className="cota-rotulo">{valor}</span>
    </span>
  );
}

/* a cota miúda do cartão: o fio com traços e a medida ao lado */
export function CotaCurta({ texto, className = "" }: { texto: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="cota cota--fina" aria-hidden="true" />
      <span className="medida text-[0.8125rem]">{texto}</span>
    </span>
  );
}
