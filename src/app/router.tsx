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
import { DetallePersona } from '@/features/personas/pages/DetallePersona'

// Mapa de rutas: qué página se pinta para cada URL.
// Todas son hijas de Layout, que dibuja el Header y el footer y deja un <Outlet /> en el medio
// donde aparece la página que coincide con la URL.
// Las rutas con ":id" son dinámicas: la página lee ese valor con useParams().
export const router = createBrowserRouter([
    {
        Component: Layout,
        children: [
            // Entrar a "/" redirige a /peliculas. `replace` evita que "atrás" vuelva a "/" y rebote
            {path: '/', element: <Navigate to="/peliculas" replace/>},
            {path: '/peliculas', Component: CatalogoPeliculas},
            // Detalle de una película: /peliculas/550 -> id = "550"
            {path: '/peliculas/:id', Component: DetallePelicula},
            {path: '/favoritas', Component: MisFavoritas},
            // Actividad B · página de un actor/persona: /personas/287 -> id = "287"
            {path: '/personas/:id', Component: DetallePersona},
            // "*" atrapa cualquier URL que no coincidió con las anteriores (404). Debe ir al final
            {path: '*', Component: NoEncontrada}
        ]
    }
])
