// TODO M8 · El mapa de la app con createBrowserRouter:
//   /               -> redirige a /peliculas
//   /peliculas      -> CatalogoPeliculas
//   /peliculas/:id  -> DetallePelicula
//   /favoritas      -> MisFavoritas
//   *               -> NoEncontrada
// Todas como hijas de una ruta padre con Component: Layout (ver core/layout).

import { createBrowserRouter, Navigate } from 'react-router'
import { Layout } from '@/core/layout/Layout'
import { NoEncontrada } from '@/core/layout/NoEncontrada'
import { CatalogoPeliculas } from '@/features/peliculas/pages/CatalogoPeliculas'
import { DetallePelicula } from '@/features/peliculas/pages/DetallePelicula'
import { MisFavoritas } from '@/features/favoritas/pages/MisFavoritas'

export const router = createBrowserRouter([
    {
        Component: Layout,
        children: [
            {path: '/', element: <Navigate to="/peliculas" replace/>},
            {path: '/peliculas', Component: CatalogoPeliculas},
            {path: '/peliculas/:id', Component: DetallePelicula},
            {path: '/favoritas', Component: MisFavoritas},
            {path: '*', Component: NoEncontrada}
        ]
    }
])
