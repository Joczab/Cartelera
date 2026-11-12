import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from '@/components/ui/sonner'
import { FavoritasProvider } from './core/favoritas/FavoritasProvider'
import { router } from './app/router'
import './index.css'
import { RouterProvider } from 'react-router'

// Punto de entrada: React toma el <div id="root"> del index.html y pinta ahí toda la app
//
// Orden del árbol, de afuera hacia adentro:
//   StrictMode        -> avisa de errores comunes mientras desarrollamos
//   FavoritasProvider -> publica las favoritas (Context) a TODA la app, por eso envuelve al router
//   RouterProvider    -> decide qué página pintar según la URL (ver app/router.tsx)
//   Toaster           -> contenedor de las notificaciones (toast) de sonner
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FavoritasProvider>
      <RouterProvider router={router} />
    </FavoritasProvider>
    <Toaster position="bottom-right" richColors />
  </StrictMode>,
)
