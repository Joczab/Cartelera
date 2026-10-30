import { Header, type Vista } from '@/core/layout/Header'
import { MisFavoritas } from '@/features/favoritas/pages/MisFavoritas'
import { useFavoritas } from './core/favoritas/favoritas-context'
import { CatalogoPeliculas } from '@/features/peliculas/pages/CatalogoPeliculas'
import { useState } from 'react'

// App es el componente raíz: arma la pantalla y guarda el estado que comparten varias partes.
export default function App() {
  // M1 · Levantar el estado: el Header (contador) y las tarjetas (corazón) necesitan las favoritas,
  // así que viven en el padre común y bajan por props.
  const {favoritas} = useFavoritas()
  // M2 · Otra memoria independiente: qué pantalla se está viendo
  const [vista, setVista] = useState<Vista>('catalogo')

  return (
    <div className="flex min-h-dvh flex-col">
      <Header vista={vista} totalFavoritas={favoritas.length} onCambiarVista={setVista} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
        {/* M2 · Renderizado condicional: según la vista se pinta una página u otra.
            En M8 esto lo reemplaza React Router. */}
        {vista === 'catalogo' ? (
          <CatalogoPeliculas />
        ) : (
          <MisFavoritas onIrAlCatalogo={() => setVista('catalogo')} />
        )}
      </main>

      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        Datos e imágenes de{' '}
        <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer" className="underline hover:text-foreground">
          TMDB
        </a>
        . Este producto usa la API de TMDB pero no está avalado ni certificado por TMDB.
      </footer>
    </div>
  )
}
