import {useConsulta} from "@/shared/hooks/useConsulta"
import {obtenerPersona} from "../services/personas.service"

// Hook de la feature: pide una persona por id apoyándose en useConsulta.
// La clave incluye el id: si cambia el id, se hace una petición nueva.
// Devuelve { datos, error, cargando, reintentar }, igual que usePelicula.
export function usePersona(id:number){
    return useConsulta(`persona|${id}`, (signal) => obtenerPersona(id, signal))
}