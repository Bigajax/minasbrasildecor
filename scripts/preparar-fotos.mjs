/**
 * PREPARAR FOTOS — das pastas colhidas do Instagram à pasta da fonte
 *
 * As fotos vieram de dois perfis da mesma loja (colhidos pela oficina do
 * estúdio para `_fonte/colhido/A` e `_fonte/colhido/B`). Este script lê
 * `data/fonte.json` e, para cada item, copia a capa e os ângulos extras
 * para `_fonte/minas/<slug>.jpg`, que é o que o montar-catalogo lê.
 *
 * As artes de fábrica trazem a ficha técnica impressa no pé da imagem
 * (Estofamento / Detalhes / Dimensões). A ficha já foi lida e virou
 * texto e medidas no fonte.json; aqui ela é recortada (`corte` é a
 * altura em px onde a foto termina), senão a vitrine mostraria uma
 * tabela ilegível dentro da foto.
 *
 *   node scripts/preparar-fotos.mjs && node scripts/montar-catalogo.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const fonte = JSON.parse(fs.readFileSync("data/fonte.json", "utf8"));
fs.mkdirSync(fonte.origem, { recursive: true });

const slugDe = (t) =>
  t
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);

function origemDe(ref) {
  const [pasta, arquivo] = ref.split("/");
  const base = fonte.colhido[pasta];
  if (!base) throw new Error(`Pasta colhida desconhecida em "${ref}"`);
  return path.join(base, arquivo);
}

async function preparar(ref, destino, corte) {
  const origem = origemDe(ref);
  if (!fs.existsSync(origem)) {
    console.log(`  falta a foto ${ref}`);
    return false;
  }
  let img = sharp(origem).rotate();
  if (corte) {
    const meta = await sharp(origem).metadata();
    img = img.extract({ left: 0, top: 0, width: meta.width, height: Math.min(corte, meta.height) });
  }
  await img.jpeg({ quality: 92 }).toFile(destino);
  return true;
}

const usados = new Set();
let n = 0;
for (const item of fonte.itens) {
  let slug = slugDe(item.nome);
  let i = 1;
  while (usados.has(slug)) slug = `${slugDe(item.nome)}-${++i}`;
  usados.add(slug);

  if (await preparar(item.local, path.join(fonte.origem, `${slug}.jpg`), item.corte)) n++;
  for (const [j, extra] of (item.extras ?? []).entries()) {
    /* os ângulos extras vêm de foto da loja, sem ficha: sem corte */
    await preparar(extra, path.join(fonte.origem, `${slug}-${j + 2}.jpg`));
  }
}
console.log(`${n} capas preparadas em ${fonte.origem}`);
