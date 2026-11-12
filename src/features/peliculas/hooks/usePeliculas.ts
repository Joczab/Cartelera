// M6 · Hooks de la feature: combinan useConsulta con el servicio.
//   usePeliculas({ busqueda, genero, orden, pagina })  -> buscar o descubrir
//   useGeneros()                                       -> la lista de géneros (o [])
//   usePelicula(id)                                    -> el detalle (lo usamos en M8)
//
// Cada hook solo decide QUÉ pedir (clave + función del servicio); useConsulta se encarga
// de cargar, de los errores, de cancelar y de reintentar.
import {useConsulta} from "../../../shared/hooks/useConsulta";
import {buscar, descubrir, obtenerDetalle, obtenerGeneros} from "../services/peliculas.service";
import type {Orden} from "../models/pelicula";

// Lo que el catálogo le pasa al hook. `genero?` es opcional: undefined significa "todos"
interface FiltrosCatalogo {
    busqueda : string
    genero? : number
    orden : Orden
    pagina : number
}

// Listado del catálogo. Si hay texto de búsqueda usa /search; si no, /discover (que sí filtra y ordena).
// La clave incluye TODOS los filtros: cambiar cualquiera produce una clave distinta y una petición nueva.
export function usePeliculas ({ busqueda, genero, orden, pagina}: FiltrosCatalogo){
    return useConsulta(
        `peliculas|${busqueda}|${genero}|${orden}|${pagina}`,
        (signal) => busqueda ? buscar(busqueda, pagina, signal) : descubrir({pagina, genero, orden}, signal)
    )
}

// Géneros para el Select de filtros. Devuelve directamente la lista (o [] mientras carga),
// porque el catálogo no necesita mostrar carga ni error para esto.
export function useGeneros(){
    const {datos} = useConsulta('generos', (signal) => obtenerGeneros(signal))
    return datos ?? []
}

// Detalle de una película por id (reparto, videos y similares vienen en la misma petición).
// Devuelve el objeto completo { datos, error, cargando, reintentar } porque la página sí maneja los tres estados.
export function usePelicula (id:number){
    return useConsulta(`pelicula|${id}`, (signal) => obtenerDetalle(id, signal))
}