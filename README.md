# Minas Brasil Decor — vitrine digital

Site público + painel da loja para a **Minas Brasil Decor**, loja de móveis de
Contagem, MG (Av. Fernão Dias, 880, Jardim Laguna): sofás retráteis, sofás e
cantos, poltronas, painéis ripados, mesas de jantar em madeira maciça,
bistrôs, cadeiras, camas box, cômodas e roupeiros. A conversão é
**exclusivamente pelo WhatsApp** — não existe carrinho, checkout nem login.

- **Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Supabase opcional
- **Catálogo:** 33 peças reais, fotos dos dois Instagrams da loja
  ([@minasbrasildecorltda](https://instagram.com/minasbrasildecorltda) e
  [@minasbrasildecor](https://instagram.com/minasbrasildecor)); 15 são artes de
  fábrica com ficha técnica, lidas e transcritas em `data/fonte.json`
- **Assinatura:** a **cota** de desenho técnico (largura, altura, profundidade)
  no hero, em cada cartão e na ficha da peça; e "Cabe na sua parede?", a trena
  que filtra os sofás pela largura

## Como rodar

```bash
npm install
npx next dev -p 3130
```

Sem as chaves do Supabase o projeto roda em modo local: lê o catálogo de
`data/catalogo.json` e as fotos de `public/produtos`.

## Como o catálogo é montado

1. `_fonte/colhido/A` e `_fonte/colhido/B` são as fotos colhidas dos dois perfis
   pela oficina do estúdio (não vão para o git).
2. `data/fonte.json` diz, para cada peça: nome, categoria, foto de capa
   (`local`), ângulos extras, `corte` (onde a foto termina, para tirar a ficha
   impressa no pé das artes), cor, descrição e `medidas`.
3. `node scripts/preparar-fotos.mjs` copia e recorta para `_fonte/minas/`.
4. `node scripts/montar-catalogo.mjs` gera `data/catalogo.json` e
   `public/produtos/*.webp`.
5. `node scripts/gerar-icones.mjs` refaz a imagem de compartilhamento.

## Modo prévia

Enquanto `PREVIA` em `data/site.config.ts` estiver preenchido, todo botão de
WhatsApp aponta para o estúdio. Ao contratar: `PREVIA = null`, preencher
`site.whatsapp`, e as mensagens passam a ir para a loja.
