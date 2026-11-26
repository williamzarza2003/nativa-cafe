import { describe, expect, it } from 'vitest'
import { categories, formatGs, menu } from '../src/data/menu.js'

describe('carta', () => {
  it('cada categoría tiene platos y no hay ids repetidos', () => {
    for (const c of categories) expect(menu.some((m) => m.category === c.id)).toBe(true)
    expect(new Set(menu.map((m) => m.id)).size).toBe(menu.length)
  })

  it('los precios son redondos, en miles de guaraníes', () => {
    for (const m of menu) expect(m.price % 1000).toBe(0)
  })

  it('el tereré no se vende: es del cliente y su ronda', () => {
    expect(menu.some((m) => /terer/i.test(m.name))).toBe(false)
  })

  it('tiene los destacados de la merienda', () => {
    const nombres = menu.map((m) => m.name)
    expect(nombres).toEqual(expect.arrayContaining(['Chipa', 'Mbeju', 'Cocido quemado']))
  })

  it('formatea con separador de miles paraguayo', () => {
    expect(formatGs(15000)).toBe('₲ 15.000')
  })
})
