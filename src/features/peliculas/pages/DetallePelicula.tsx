import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router";
import { useFavoritas } from "@/core/favoritas/favoritas-context";
import { usePelicula } from "../hooks/usePeliculas";
import { EsqueletoFicha, FichaPelicula} from "../components/FichaPelicula";
import { MensajeError } from "@/shared/components/MensajeError";

export function DetallePelicula(){
    
    const { id } = useParams()
    const {datos: peli, error, reintentar} = usePelicula(Number(id))
    const {esFavorita, alternar} = useFavoritas()
    
    return (
        <section>
            <Button asChild variant="ghost" className="mb-6">
                <Link to="/peliculas">
                    <ArrowLeft />
                    Volver al catálogo
                </Link>
            </Button>

        {error ? (
            <MensajeError mensaje={error} onReintentar={reintentar} />
        ) : !peli ? (
            <EsqueletoFicha />
        ) : (
            <>
                <title>{`${peli.title} · Cartelera`}</title>
                <FichaPelicula 
                pelicula={peli} 
                favorita={esFavorita(peli.id)} 
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