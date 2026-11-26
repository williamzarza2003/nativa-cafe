// Recorta las fotos originales, les aplica el tratamiento de color de Nativa
// (menos saturación y un velo de tierra colorada) y las exporta a WebP en 640 y 1200 px.
//
// Las originales no se versionan: se bajan de Wikimedia Commons a fuentes-fotos/
// (enlaces y licencias en el README) y se corre `npm run fotos`.
import sharp from 'sharp'

const TIERRA = { r: 156, g: 59, b: 34 } // --earth

const fotos = [
  {
    // Chipa, cocido quemado y mbeju · Writin · CC0
    fuente: 'fuentes-fotos/merienda-commons.jpg',
    salida: 'chipa',
    recorte: { left: 0, top: 470, width: 1790, height: 2238 },
  },
  {
    fuente: 'fuentes-fotos/merienda-commons.jpg',
    salida: 'mbeju',
    recorte: { left: 2500, top: 0, width: 1580, height: 1975 },
  },
  {
    // Cocido quemado de Paraguay · Overkill53 · CC BY-SA 4.0
    fuente: 'fuentes-fotos/cocido-quemado-commons.jpg',
    salida: 'cocido',
    recorte: { left: 250, top: 0, width: 612, height: 765 },
  },
]

for (const f of fotos) {
  // Las originales son fotos de celular con luz de tubo (grises y planas):
  // se calientan (menos azul), se les da algo de contraste y se oscurecen los bordes
  // para que convivan con las fotos de Unsplash del resto de la página.
  const base = sharp(f.fuente)
    .rotate()
    .extract(f.recorte)
    .recomb([
      [1.06, 0.02, 0],
      [0.01, 1.0, 0],
      [0, 0.02, 0.86],
    ])
    .modulate({ saturation: 0.9, brightness: 0.97 })
    .linear(1.12, -18)

  for (const ancho of [640, 1200]) {
    const alto = Math.round((ancho * 5) / 4)
    const velo = await sharp({
      create: { width: ancho, height: alto, channels: 4, background: { ...TIERRA, alpha: 0.16 } },
    })
      .png()
      .toBuffer()
    const vineta = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${ancho}" height="${alto}">
        <defs><radialGradient id="v" cx="50%" cy="45%" r="75%">
          <stop offset="55%" stop-color="#241712" stop-opacity="0"/>
          <stop offset="100%" stop-color="#241712" stop-opacity=".55"/>
        </radialGradient></defs>
        <rect width="100%" height="100%" fill="url(#v)"/>
      </svg>`,
    )

    await base
      .clone()
      .resize(ancho, alto, { fit: 'cover', kernel: 'lanczos3' })
      .composite([
        { input: velo, blend: 'soft-light' },
        { input: vineta, blend: 'multiply' },
      ])
      .sharpen({ sigma: ancho > 700 ? 0.8 : 0.5 })
      .webp({ quality: 78, effort: 6 })
      .toFile(`public/img/${f.salida}-${ancho}.webp`)
    console.log(`public/img/${f.salida}-${ancho}.webp`)
  }
}
