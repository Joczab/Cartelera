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

  const { esFavorita, alternar } = useFavoritas()
  const [busqueda, setBusqueda ] = useState('')
  const [genero, setGenero] = useState<number>()
  const [orden, setOrden] = useState<Orden>('popularity.desc')
  const [pagina, setPagina] = useState(1)

  const {datos: respuesta, error, cargando, reintentar } = usePeliculas({ busqueda, genero, orden, pagina})
  const generos = useGeneros()

  const formato = new Intl.NumberFormat('es-VE')
  
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
  function irAPaginaNueva(nueva: number){
    setPagina(nueva)
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

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
