import { Heart } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { GrillaPeliculas } from "@/features/peliculas/components/GrillaPeliculas";
import { useFavoritas } from "@/core/favoritas/favoritas-context";
import { EstadoVacio } from "@/shared/components/EstadoVacio";

// La misma Grilla, ahora con datos que no vienen de la API sino del estado de App
export function MisFavoritas() {
  const { favoritas, alternar } = useFavoritas();

  return (
    <section>
      <title>Mis favoritas · Cartelera</title>
      <h1 className="mb-8 text-3xl font-bold tracking-tight">Mis favoritas</h1>

      {favoritas.length === 0 ? (
        // M2 · children: lo que va entre <EstadoVacio> y </EstadoVacio> lo decide el padre
        <EstadoVacio icono={Heart} titulo="Todavía no marcas ninguna película">
          <Button variant="outline">
            <Link to="/peliculas">Ir al catálogo</Link>
          </Button>
        </EstadoVacio>
      ) : (
        <GrillaPeliculas
          peliculas={favoritas}
          esFavorita={() => true}
          onFavorito={alternar}
        />
      )}
    </section>
  );
}
