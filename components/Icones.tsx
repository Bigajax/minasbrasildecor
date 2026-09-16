/**
 * Ícones de linha da loja, um traço só: o sofá (sala), a mesa com
 * cadeira (jantar), a cama (quarto), a régua, a tábua de madeira, a
 * mola, o rolo de tecido, a loja, o pino, a conversa. Herdam a cor do
 * texto; o tamanho vem da className.
 */
export type NomeIcone =
  | "novidade"
  | "sala"
  | "jantar"
  | "quarto"
  | "regua"
  | "madeira"
  | "mola"
  | "tecido"
  | "loja"
  | "lupa"
  | "whats"
  | "caminhao"
  | "conversa"
  | "etiqueta"
  | "cartao"
  | "pino"
  | "check"
  | "seta"
  | "seta-esq"
  | "fechar";

const TRACOS: Record<Exclude<NomeIcone, "whats">, React.ReactNode> = {
  novidade: <path d="M12 3.4l2.5 5.6 6.1.6-4.6 4.1 1.4 6L12 16.6l-5.4 3.1 1.4-6-4.6-4.1 6.1-.6z" />,
  /* o sofá: encosto, dois braços, o assento, os pés */
  sala: (
    <>
      <path d="M5 11V8.5A2.5 2.5 0 0 1 7.5 6h9A2.5 2.5 0 0 1 19 8.5V11" />
      <path d="M3.5 13.5A2 2 0 0 1 5.5 11.5h0a2 2 0 0 1 2 2V15h9v-1.5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2V18h-17z" />
      <path d="M6 18v1.5M18 18v1.5" />
    </>
  ),
  /* a mesa com a cadeira ao lado */
  jantar: (
    <>
      <path d="M8 10h13" />
      <path d="M10 10v9M19 10v9" />
      <path d="M3 7.5h3v11.5" />
      <path d="M3 13h3" />
      <path d="M6 13h1.5" />
    </>
  ),
  /* a cama box com a cabeceira */
  quarto: (
    <>
      <path d="M3 18V8" />
      <path d="M3 13h18v5" />
      <path d="M3 10h6a2 2 0 0 1 2 2v1" />
      <path d="M3 18v1.5M21 18v1.5" />
    </>
  ),
  /* a régua com os traços */
  regua: (
    <>
      <rect x="2.5" y="9" width="19" height="6" rx="1" />
      <path d="M6.5 9v3M10.5 9v2M14.5 9v3M18.5 9v2" />
    </>
  ),
  /* a tábua de madeira, com o veio */
  madeira: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="1" />
      <path d="M6 9c3 0 3 2 6 2s3-2 6-2M6 15c3 0 3-2 6-2s3 2 6 2" />
    </>
  ),
  /* a mola ensacada */
  mola: (
    <>
      <path d="M8 4h8M8 20h8" />
      <path d="M9 4c6 2-6 4 0 6s-6 4 0 6-6 4 0 4" />
      <path d="M15 4c-6 2 6 4 0 6s6 4 0 6 6 4 0 4" />
    </>
  ),
  /* o rolo de tecido */
  tecido: (
    <>
      <path d="M4 7a3 3 0 0 1 3-3h13v11H7a3 3 0 0 1-3-3z" />
      <path d="M4 7v10a3 3 0 0 0 3 3h13v-5" />
      <path d="M7 4a3 3 0 0 0 0 6h13" />
    </>
  ),
  loja: (
    <>
      <path d="M3.5 9.5 5 4.5h14l1.5 5" />
      <path d="M3.5 9.5a2.1 2.1 0 0 0 4.25 0 2.1 2.1 0 0 0 4.25 0 2.1 2.1 0 0 0 4.25 0 2.1 2.1 0 0 0 4.25 0" />
      <path d="M5 11.5v8h14v-8" />
      <path d="M10 19.5v-4.5h4v4.5" />
    </>
  ),
  lupa: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4.2-4.2" />
    </>
  ),
  caminhao: (
    <>
      <path d="M3 7h11v9H3z" />
      <path d="M14 10h4l3 3v3h-7" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  conversa: (
    <>
      <path d="M4 5h16v11H9l-5 4z" />
      <path d="M8 9h8M8 12h5" />
    </>
  ),
  etiqueta: (
    <>
      <path d="M3 12V4h8l9 9-8 8z" />
      <circle cx="7" cy="8" r="1.2" />
    </>
  ),
  cartao: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M3 10h18M7 14h4" />
    </>
  ),
  pino: (
    <>
      <path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  seta: <path d="M9.5 6l6 6-6 6" />,
  "seta-esq": <path d="M14.5 6l-6 6 6 6" />,
  fechar: <path d="M6 6l12 12M18 6L6 18" />,
};

export function Icone({ nome, className = "h-6 w-6", peso = 1.5 }: { nome: NomeIcone; className?: string; peso?: number }) {
  if (nome === "whats") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" fill="currentColor">
        <path d="M12 2.2a9.8 9.8 0 0 0-8.4 14.8L2.2 21.8l4.9-1.3A9.8 9.8 0 1 0 12 2.2zm0 17.9c-1.5 0-3-.4-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.1 8.1 0 1 1 12 20.1zm4.5-6c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.5 4c1.7.7 2.3.8 3.1.6a2.7 2.7 0 0 0 1.8-1.2c.2-.6.2-1.1.2-1.2-.1-.2-.3-.3-.5-.4z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth={peso} strokeLinecap="round" strokeLinejoin="round">
      {TRACOS[nome]}
    </svg>
  );
}
