import type { PeliculaResumen } from "@/features/peliculas/models/pelicula";


// Actividad B · Modelo de una persona (actor) tal como la devuelve
// GET /person/:id?append_to_response=movie_credits
// Solo se declaran los campos que la pantalla usa; el resto de lo que manda TMDB se ignora.

// Una película en la que actuó la persona. Reutiliza PeliculaResumen (lo mismo que necesita la tarjeta)
// y añade `popularity`, que es el dato que se usa para ordenar "Conocido por".
export interface CreditoPelicula extends PeliculaResumen {
    popularity: number
}

export interface Persona {
    id: number
    name: string
    profile_path: string | null // null si TMDB no tiene foto -> se muestran las iniciales
    birthday: string | null // "1963-12-18"; null si no se conoce
    place_of_birth: string | null // null si no se conoce
    biography: string | null // puede venir null o '' (vacía) si no hay traducción al español
    // Gracias a append_to_response llegan las películas en la misma petición
    movie_credits: {
        cast: CreditoPelicula[]
    }
}