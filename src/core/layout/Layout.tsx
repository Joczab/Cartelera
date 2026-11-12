import { Outlet } from 'react-router'
import { Header } from './Header'

// Estructura común de todas las páginas: Header arriba, contenido en el medio y footer abajo.
// <Outlet /> es el "hueco" donde React Router coloca la página que corresponde a la URL actual
// (catálogo, detalle, favoritas, persona o 404). Así el Header no se vuelve a crear al navegar.
export function Layout () {
    return (
        <div className="flex min-h-dvh flex-col">
            <Header />

            <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
                <Outlet />
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