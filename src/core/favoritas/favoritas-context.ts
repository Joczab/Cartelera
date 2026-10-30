// TODO M7 · Context: un canal para pasar datos a cualquier componente del árbol
// sin ir pasándolos por props nivel por nivel (adiós "prop drilling").
//
//   1. Una interface FavoritasValor { favoritas, esFavorita, alternar }
//   2. export const FavoritasContext = createContext<FavoritasValor | null>(null)
//   3. export function useFavoritas()  -> use(FavoritasContext), con error si no hay Provider

import { createContext, useContext } from "react"
import type { PeliculaResumen } from "@/features/peliculas/models/pelicula"

export interface FavoritasValor {
  favoritas: PeliculaResumen[]
  esFavorita: (id: number) => boolean
  alternar: (pelicula: PeliculaResumen) => void
}

export const FavoritasContext = createContext<FavoritasValor | null>(null)

export function useFavoritas() {
  const valor = useContext(FavoritasContext)
  if (!valor) throw new Error('useFavoritas debe ser usado dentro de <FavoritasProvider>')
  return valor
}

