import type { PeliculaResumen } from '../models/pelicula'
import { PeliculaCard } from './PeliculaCard'

interface Props {
  peliculas: PeliculaResumen[]
  esFavorita: (id: number) => boolean
  onFavorito: (pelicula: PeliculaResumen) => void
}

//* Listas: .map() convierte cada dato en un elemento JSX.
//* `key` le dice a React cuál es cuál entre renders (como track en @for). Usa el id, nunca el índice.
//* Ojo: la grilla recibe onFavorito solo para pasárselo a la tarjeta. Eso es "prop drilling" (lo arreglamos en M7).
//* La reutilizan tres páginas: el catálogo, Mis favoritas y "Conocido por" en la página de persona.
export function GrillaPeliculas({ peliculas, esFavorita, onFavorito }: Props) {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
      {peliculas.map((p) => (
        <PeliculaCard key={p.id} pelicula={p} favorita={esFavorita(p.id)} onFavorito={onFavorito} />
      ))}
    </div>
  )
}
