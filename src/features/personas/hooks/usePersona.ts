import {useConsulta} from "@/shared/hooks/useConsulta"
import {obtenerPersona} from "../services/personas.service"

export function usePersona(id:number){
    return useConsulta(`persona|${id}`, (signal) => obtenerPersona(id, signal))
}