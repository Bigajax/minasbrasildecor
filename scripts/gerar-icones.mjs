/**
 * Gera a imagem de compartilhamento (public/og/site.jpg, 1200x630): o
 * selo real da loja sobre a parede, o nome em Bricolage e a cota
 * desenhada embaixo, que é a assinatura da vitrine. O favicon já sai
 * do selo (app/icon.png, app/apple-icon.png), recortado do avatar.
 *
 *   node scripts/gerar-icones.mjs
 */
import fs from "node:fs";
import sharp from "sharp";

fs.mkdirSync("public/og", { recursive: true });

const selo = await sharp("public/marca/selo.png").resize(300, 300).png().toBuffer();
const capa = await sharp("public/produtos/sofa-retratil-e-reclinavel-pillow-top-bege.webp").resize(560, 420, { fit: "cover" }).png().toBuffer();

const svg = Buffer.from(`<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#f3f1ec"/>
  <text x="80" y="330" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="88" fill="#1b1815" letter-spacing="-3">Minas</text>
  <text x="80" y="392" font-family="Arial, sans-serif" font-weight="700" font-size="34" fill="#1b1815" letter-spacing="4" opacity=".8">BRASIL DECOR</text>
  <text x="80" y="450" font-family="Arial, sans-serif" font-size="24" fill="#6a635b">Sofás, mesas de madeira e camas, medida por medida.</text>
  <text x="80" y="486" font-family="Arial, sans-serif" font-size="24" fill="#6a635b">Contagem, MG</text>
  <!-- a cota embaixo da foto -->
  <g stroke="#1b1815" stroke-width="2">
    <line x1="580" y1="548" x2="1140" y2="548"/>
    <line x1="580" y1="538" x2="580" y2="558"/>
    <line x1="1140" y1="538" x2="1140" y2="558"/>
  </g>
  <rect x="800" y="534" width="120" height="28" fill="#f3f1ec"/>
  <text x="860" y="554" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#1b1815">2,40 m</text>
</svg>`);

await sharp(svg)
  .composite([
    { input: capa, left: 580, top: 100 },
    { input: selo, left: 80, top: 70 },
  ])
  .jpeg({ quality: 88 })
  .toFile("public/og/site.jpg");
console.log("og ok");
