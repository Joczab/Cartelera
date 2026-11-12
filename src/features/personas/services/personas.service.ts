import { tmdb } from "@/core/api/tmdb";
import type { Persona } from "../models/persona";


// Servicio de personas: la única parte que sabe armar la URL de TMDB para una persona.
// Los componentes y hooks solo llaman a esta función, nunca arman rutas.
// Pide la persona Y sus películas en UNA sola petición con append_to_response.
// `signal` permite cancelar la petición (lo manda useConsulta). `tmdb` ya pone la URL base, el idioma y el token.
export async function obtenerPersona (id: number, signal?: AbortSignal){
    // <Persona> le dice a TypeScript la forma de la respuesta; Axios ya la convierte a JSON
    const {data} = await tmdb.get<Persona>(`/person/${id}`, {
        params: {
            append_to_response: "movie_credits"
        },signal,
    })
    return data;
}