import { useState } from 'react'
import { FiltrosPeliculas } from '../components/FiltrosPeliculas'
import { GrillaPeliculas } from '../components/GrillaPeliculas'
import { type Orden} from '../models/pelicula'
import { EstadoVacio } from '@/shared/components/EstadoVacio'
import { SearchX } from 'lucide-react'
import { MAX_PAGINAS } from '@/shared/models/pagina'
import { MensajeError } from '@/shared/components/MensajeError'
import { EsqueletoGrilla } from '@/shared/components/EsqueletoGrilla'
import { Paginador } from '@/shared/components/Paginador'
import { usePeliculas, useGeneros } from '../hooks/usePeliculas'
import { useFavoritas } from '@/core/favoritas/favoritas-context'

// Página CONTENEDORA: aquí viven el estado, las peticiones y las decisiones.
// Filtros, Grilla y Paginador solo pintan y avisan.
export function CatalogoPeliculas() {

  // M7 · Las favoritas ya no llegan por props: se leen del Context
  const { esFavorita, alternar } = useFavoritas()
  // Estado de la pantalla: los 4 filtros que el usuario puede cambiar.
  // `genero` empieza en undefined, que significa "todos los géneros".
  const [busqueda, setBusqueda ] = useState('')
  const [genero, setGenero] = useState<number>()
  const [orden, setOrden] = useState<Orden>('popularity.desc')
  const [pagina, setPagina] = useState(1)

  // M6 · Los datos ya no se piden aquí con useEffect: los hooks lo hacen por nosotros.
  // Cada vez que cambia un filtro, el componente se vuelve a pintar, el hook recibe valores nuevos y vuelve a pedir.
  // `datos: respuesta` renombra la propiedad: dentro de esta página se llama `respuesta`.
  const {datos: respuesta, error, cargando, reintentar } = usePeliculas({ busqueda, genero, orden, pagina})
  const generos = useGeneros()

  // Formatea números con separador de miles: 12345 -> "12.345"
  const formato = new Intl.NumberFormat('es-VE')

  // Al cambiar cualquier filtro se vuelve a la página 1: la página 7 de una búsqueda
  // no tiene sentido (o ni existe) en otra búsqueda distinta.
  function cambiarBusqueda(texto: string) {
    setBusqueda(texto)
    setPagina(1)
  }
  function cambiarGenero(genero: number | undefined) {
    setGenero(genero)
    setPagina(1)
  }
  function cambiarOrden(o: Orden) {
    setOrden(o)
    setPagina(1)
  }
  // Cambiar de página sube el scroll para que el usuario vea el inicio de la grilla nueva
  function irAPaginaNueva(nueva: number){
    setPagina(nueva)
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  // Dato derivado (no es estado): TMDB puede decir que hay miles de páginas pero solo deja pedir hasta la 500.
  // `?.` y `??` cubren el momento en que todavía no hay respuesta.
  const totalPaginas = Math.min(respuesta?.total_pages ?? 0, MAX_PAGINAS)

  return (
    <section>
      <title>{busqueda ? `"${busqueda}" - Cartelera ` : "Películas · Cartelera" }</title>

      <div className="mb-6 flex items-baseline justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">{busqueda ? `Resultados` : "Películas" }</h1>
        <p className='text-sm text-muted-foreground'>{ respuesta ? formato.format(respuesta.total_results) : '0' } peliculas</p>
      </div>

      <FiltrosPeliculas
        busqueda={busqueda}
        genero={genero}
        orden={orden}
        generos={generos}
        onBuscar={cambiarBusqueda}
        onGenero={cambiarGenero}
        onOrden={cambiarOrden}
      />
      {/* Renderizado condicional en cadena: se pinta UNA de cuatro cosas, en este orden de prioridad:
          1. error      -> mensaje con botón Reintentar
          2. sin datos  -> esqueleto (solo en la primera carga)
          3. lista vacía-> "Sin resultados"
          4. hay datos  -> grilla + paginador (semitransparentes mientras llega la página siguiente) */}
      {
        error ? (
          <MensajeError mensaje={error} onReintentar={reintentar} />
        ) : !respuesta ? (
          <EsqueletoGrilla/>
        ) : respuesta.results.length === 0 ? (
          <EstadoVacio icono={SearchX} titulo="Sin resultados">
            <p>No hay peliculas que coincidan con "{busqueda}"</p>
          </EstadoVacio>
        ) : (
          <div className={cargando ? 'opacity-50 transition-opacity' : 'transition-opacity'}>
            <GrillaPeliculas peliculas={respuesta.results} esFavorita={esFavorita} onFavorito={alternar} />
            <Paginador pagina={pagina} totalPaginas={totalPaginas} onCambiar={irAPaginaNueva} />
          </div>
        )
      }
    </section>
  )
}
