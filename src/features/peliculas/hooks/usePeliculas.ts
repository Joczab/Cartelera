// TODO M6 · Hooks de la feature: combinan useConsulta con el servicio.
//   usePeliculas({ busqueda, genero, orden, pagina })  -> buscar o descubrir
//   useGeneros()                                       -> la lista de géneros (o [])
//   usePelicula(id)                                    -> el detalle (lo usamos en M8)
import {useConsulta} from "../../../shared/hooks/useConsulta";
import {buscar, descubrir, obtenerDetalle, obtenerGeneros} from "../services/peliculas.service";
import type {Orden} from "../models/pelicula";

interface FiltrosCatalogo {
    busqueda : string
    genero? : number
    orden : Orden
    pagina : number
}

export function usePeliculas ({ busqueda, genero, orden, pagina}: FiltrosCatalogo){
    return useConsulta(
        `peliculas|${busqueda}|${genero}|${orden}|${pagina}`,
        (signal) => busqueda ? buscar(busqueda, pagina, signal) : descubrir({pagina, genero, orden}, signal)
    )
}

export function useGeneros(){
    const {datos} = useConsulta('generos', (signal) => obtenerGeneros(signal))
    return datos ?? []
}

export function usePelicula (id:number){
    return useConsulta(`pelicula|${id}`, (signal) => obtenerDetalle(id, signal))
}

export {}
