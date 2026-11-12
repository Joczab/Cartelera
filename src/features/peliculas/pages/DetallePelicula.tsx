import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router";
import { useFavoritas } from "@/core/favoritas/favoritas-context";
import { usePelicula } from "../hooks/usePeliculas";
import { EsqueletoFicha, FichaPelicula} from "../components/FichaPelicula";
import { MensajeError } from "@/shared/components/MensajeError";

// M8 · Página de detalle de una película: /peliculas/:id
// Es una página contenedora: lee la URL, pide los datos y decide qué pintar.
// El dibujo de la ficha lo hace FichaPelicula (componente de presentación).
export function DetallePelicula(){

    // useParams lee el ":id" de la URL. Llega como texto, por eso Number(id)
    const { id } = useParams()
    const {datos: peli, error, reintentar} = usePelicula(Number(id))
    const {esFavorita, alternar} = useFavoritas()

    return (
        <section>
            {/* asChild: el Button presta su estilo al Link, así el resultado es un enlace con apariencia de botón.
                Está fuera del condicional para que se vea siempre, incluso si hay error. */}
            <Button asChild variant="ghost" className="mb-6">
                <Link to="/peliculas">
                    <ArrowLeft />
                    Volver al catálogo
                </Link>
            </Button>

        {/* Tres estados: error, cargando (aún no hay peli) o datos */}
        {error ? (
            <MensajeError mensaje={error} onReintentar={reintentar} />
        ) : !peli ? (
            <EsqueletoFicha />
        ) : (
            <>
                {/* React 19: un <title> dentro del componente cambia el título de la pestaña */}
                <title>{`${peli.title} · Cartelera`}</title>
                <FichaPelicula
                pelicula={peli}
                favorita={esFavorita(peli.id)}
                // En favoritas solo se guarda un resumen (5 campos), no el detalle completo:
                // es lo único que necesita la tarjeta y así localStorage no se llena de datos de más.
                onFavorito={() => alternar({
                    id: peli.id,
                    title: peli.title,
                    poster_path: peli.poster_path,
                    release_date: peli.release_date,
                    vote_average: peli.vote_average,
                })
                
                } 
                />
            </>
        )}
        </section>
    )
}