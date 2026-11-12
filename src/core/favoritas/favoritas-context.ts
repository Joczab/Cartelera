// TODO M7 · Context: un canal para pasar datos a cualquier componente del árbol
// sin ir pasándolos por props nivel por nivel (adiós "prop drilling").
//
//   1. Una interface FavoritasValor { favoritas, esFavorita, alternar }
//   2. export const FavoritasContext = createContext<FavoritasValor | null>(null)
//   3. export function useFavoritas()  -> use(FavoritasContext), con error si no hay Provider

import { createContext, useContext } from "react"
import type { PeliculaResumen } from "@/features/peliculas/models/pelicula"

// La "forma" de lo que publica el Provider: la lista, una pregunta y una acción
export interface FavoritasValor {
  favoritas: PeliculaResumen[]
  esFavorita: (id: number) => boolean
  alternar: (pelicula: PeliculaResumen) => void
}

// El canal en sí. Empieza en null porque, fuera de un Provider, no hay valor que leer
export const FavoritasContext = createContext<FavoritasValor | null>(null)

// Hook para consumir el canal. Si alguien lo usa fuera de <FavoritasProvider>, falla con un mensaje claro
// en vez de devolver null y romper más adelante con un error difícil de rastrear.
export function useFavoritas() {
  const valor = useContext(FavoritasContext)
  if (!valor) throw new Error('useFavoritas debe ser usado dentro de <FavoritasProvider>')
  return valor
}

