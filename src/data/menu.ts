export type Category = 'cafe' | 'frio' | 'pasteleria' | 'brunch'

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
  { id: 'frio', label: 'Bebidas frías' },
  { id: 'pasteleria', label: 'Pastelería' },
  { id: 'brunch', label: 'Brunch' },
]

export const menu: MenuItem[] = [
  { id: 1, name: 'Espresso', description: 'Blend de la casa, notas a cacao y frutos secos.', price: 12000, category: 'cafe' },
  { id: 2, name: 'Flat white', description: 'Doble ristretto con leche texturizada.', price: 18000, category: 'cafe', tag: 'Favorito' },
  { id: 3, name: 'V60 de origen', description: 'Filtrado a mano, cambia cada semana.', price: 22000, category: 'cafe' },
  { id: 4, name: 'Cortado', description: 'Espresso con un toque de leche.', price: 14000, category: 'cafe' },
  { id: 5, name: 'Cold brew', description: '18 horas de extracción en frío.', price: 20000, category: 'frio' },
  { id: 6, name: 'Tónica espresso', description: 'Agua tónica, hielo y espresso.', price: 21000, category: 'frio', tag: 'Nuevo' },
  { id: 7, name: 'Limonada de menta', description: 'Limón, menta fresca y jengibre.', price: 16000, category: 'frio' },
  { id: 8, name: 'Chipa de la casa', description: 'Recién horneada, con queso Paraguay.', price: 8000, category: 'pasteleria', tag: 'Favorito' },
  { id: 9, name: 'Medialuna de manteca', description: 'Hojaldre artesanal de 27 capas.', price: 9000, category: 'pasteleria' },
  { id: 10, name: 'Torta de zanahoria', description: 'Con frosting de queso crema.', price: 19000, category: 'pasteleria' },
  { id: 11, name: 'Tostado de palta', description: 'Pan de masa madre, palta, huevo y semillas.', price: 32000, category: 'brunch' },
  { id: 12, name: 'Bowl de yogur', description: 'Granola casera, frutas de estación y miel.', price: 26000, category: 'brunch' },
  { id: 13, name: 'Panqueques', description: 'Con dulce de leche o frutos rojos.', price: 28000, category: 'brunch' },
]

export function formatGs(value: number): string {
  return '₲ ' + value.toLocaleString('es-PY')
}
