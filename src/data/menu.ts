export type Category = 'cafe' | 'bebidas' | 'salados' | 'dulces'

export interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: Category
  tag?: string
}

export const categories: { id: Category; label: string }[] = [
  { id: 'cafe', label: 'Café' },
  { id: 'bebidas', label: 'Bebidas' },
  { id: 'salados', label: 'Salados' },
  { id: 'dulces', label: 'Dulces' },
]

export const menu: MenuItem[] = [
  { id: 1, name: 'Espresso', description: 'Blend de la casa, notas a cacao y frutos secos.', price: 12000, category: 'cafe' },
  { id: 4, name: 'Cortado', description: 'Espresso con un chorrito de leche.', price: 14000, category: 'cafe' },
  { id: 2, name: 'Flat white', description: 'Doble ristretto con leche texturizada.', price: 18000, category: 'cafe', tag: 'El más pedido.' },
  { id: 3, name: 'V60 de origen', description: 'Filtrado a mano, cambia cada semana.', price: 22000, category: 'cafe' },

  { id: 20, name: 'Cocido quemado', description: 'Yerba y azúcar quemadas con una brasa, hervidas y con leche. Como en la merienda de casa.', price: 10000, category: 'bebidas', tag: 'Con mbeju es otra cosa.' },
  { id: 21, name: 'Cocido negro', description: 'El mismo cocido quemado, sin leche.', price: 8000, category: 'bebidas' },
  { id: 5, name: 'Cold brew', description: '18 horas de extracción en frío.', price: 20000, category: 'bebidas' },
  { id: 6, name: 'Tónica espresso', description: 'Agua tónica, hielo y espresso.', price: 21000, category: 'bebidas', tag: 'Nuevo en la carta.' },
  { id: 7, name: 'Limonada con menta’i', description: 'Limón, menta’i del mercado y hielo.', price: 15000, category: 'bebidas' },
  { id: 22, name: 'Jugo de naranja', description: 'Exprimido al momento, sin azúcar.', price: 14000, category: 'bebidas' },

  { id: 8, name: 'Chipa', description: 'En rosca, de almidón, queso Paraguay y anís. Dorada por fuera y densa por dentro.', price: 7000, category: 'salados', tag: 'Sale del horno cada media hora.' },
  { id: 30, name: 'Mbeju', description: 'Almidón y queso Paraguay tostados en la sartén al momento. Crocante afuera, blandito adentro.', price: 15000, category: 'salados' },
  { id: 31, name: 'Sopa paraguaya', description: 'Porción de la de siempre: harina de maíz, queso, cebolla y leche, al horno.', price: 14000, category: 'salados' },
  { id: 32, name: 'Chipa guasu', description: 'Choclo rallado, queso y huevo, al horno. Más húmeda que la sopa.', price: 16000, category: 'salados' },

  { id: 40, name: 'Kosereva con queso', description: 'Dulce de cáscara de apepú con miel negra y una tajada de queso Paraguay.', price: 13000, category: 'dulces' },
  { id: 41, name: 'Dulce de mamón con queso', description: 'Mamón en almíbar cocinado despacio, con queso Paraguay.', price: 13000, category: 'dulces' },
  { id: 42, name: 'Pastafrola', description: 'De guayaba, con masa de manteca y enrejado. Por porción.', price: 12000, category: 'dulces' },
  { id: 43, name: 'Alfajor de maicena', description: 'Dulce de leche y coco rallado en el borde.', price: 8000, category: 'dulces' },
  { id: 44, name: 'Torta de naranja', description: 'Con naranjas de la zona y glaseado de jugo. Por porción.', price: 15000, category: 'dulces' },
]

export function formatGs(value: number): string {
  return '₲ ' + value.toLocaleString('es-PY')
}
