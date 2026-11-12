import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { imagen } from '@/core/config/tmdb'
import type { Credito } from '../models/pelicula'
import { Link } from 'react-router'

// Cuadrícula de actores de una película. Cada actor es un <Link> de React Router
// (no un <a href>) que lleva a /personas/:id sin recargar la página (Actividad B).
// "Keanu Reeves" -> "KR": iniciales que se muestran si el actor no tiene foto
function iniciales(nombre: string) {
  return nombre
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
}

export function Reparto({ actores }: { actores: Credito[] }) {
  // Retorno temprano: sin reparto, no se pinta ni el título "Reparto"
  if (actores.length === 0) return null

  return (
    <section>
      <h3 className="mb-3 font-semibold">Reparto</h3>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {actores.map((a) => (
          <li key={a.id}>
            {/* El enlace envuelve a todo el actor (foto, nombre y personaje) para que toda la fila sea clicable */}
            <Link to={`/personas/${a.id}`} className="flex items-center gap-3 rounded-lg p-1 transition hover:bg-accent">
              <Avatar className="size-10">
                <AvatarImage src={imagen(a.profile_path, 'w185') ?? undefined} alt={a.name} className="object-cover" />
                {/* Si la foto no existe o no carga, shadcn muestra el fallback */}
                <AvatarFallback>{iniciales(a.name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 text-sm leading-tight">
                <p className="truncate font-medium">{a.name}</p>
                <p className="truncate text-xs text-muted-foreground">{a.character}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
