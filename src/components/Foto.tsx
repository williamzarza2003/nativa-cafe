interface Props {
  /** Nombre base en public/img (se sirven las versiones -640 y -1200) */
  nombre: string
  alt: string
  /** Proporción de la foto exportada, para reservar el espacio y evitar saltos */
  ancho: number
  alto: number
  sizes: string
  className?: string
  prioridad?: boolean
}

/** Foto con el tratamiento de color de Nativa, en WebP y con dos tamaños. */
export default function Foto({ nombre, alt, ancho, alto, sizes, className = '', prioridad = false }: Props) {
  return (
    <img
      className={`foto ${className}`}
      src={`/img/${nombre}-1200.webp`}
      srcSet={`/img/${nombre}-640.webp 640w, /img/${nombre}-1200.webp 1200w`}
      sizes={sizes}
      width={ancho}
      height={alto}
      alt={alt}
      loading={prioridad ? 'eager' : 'lazy'}
      decoding="async"
    />
  )
}
