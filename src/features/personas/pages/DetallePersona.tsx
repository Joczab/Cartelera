import { ArrowLeft, Cake, MapPin } from "lucide-react"
import { Link, useParams } from "react-router"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { imagen } from "@/core/config/tmdb"
import { useFavoritas } from "@/core/favoritas/favoritas-context"
import { GrillaPeliculas } from "@/features/peliculas/components/GrillaPeliculas"
import { EsqueletoGrilla } from "@/shared/components/EsqueletoGrilla"
import { MensajeError } from "@/shared/components/MensajeError"
import { usePersona } from "../hooks/usePersona"

function iniciales(nombre: string) {
  return nombre
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0])
    .join("");
}

function fecha(texto: string) {
  return new Date(texto).toLocaleDateString("es-VE", {
    dateStyle: "long",
    timeZone: "UTC",
  });
}

// Página de una persona: /personas/:id
export function DetallePersona() {
  // PARTE 1 · Leer el :id de la URL y pedir los datos (igual que DetallePelicula)
  const { id } = useParams();
  const { datos: persona, error, reintentar } = usePersona(Number(id));
  const { esFavorita, alternar } = useFavoritas();

  // PARTE 2 · "Conocido por" = DATO DERIVADO.
  // No es un useState: se CALCULA en cada render a partir de persona.
  // Si persona cambia, esto se recalcula solo.
  const conocidoPor = persona
    ? [...persona.movie_credits.cast] // copia: sort() modifica el arreglo y el original no se toca
        .sort((a, b) => b.popularity - a.popularity) // de mayor a menor popularidad
        .filter((p, i, lista) => lista.findIndex((x) => x.id === p.id) === i) // sin repetidas
        .slice(0, 15) // solo las primeras 15
    : [];

  return (
    <section>
      {/* PARTE 3 · Enlace para volver (siempre visible, incluso con error) */}
      <Button asChild variant="ghost" className="mb-6">
        <Link to="/peliculas">
          <ArrowLeft /> Volver al catálogo
        </Link>
      </Button>

      {/* PARTE 4 · Los tres estados: error, cargando o datos */}
      {error ? (
        <MensajeError mensaje={error} onReintentar={reintentar} />
      ) : !persona ? (
        <EsqueletoPersona />
      ) : (
        <>
          <title>{`${persona.name} · Cartelera`}</title>

          {/* PARTE 5 · La ficha de la persona */}
          <div className="grid gap-8 md:grid-cols-[220px_1fr]">
            {/* Avatar muestra la foto; si no hay o no carga, muestra el Fallback (iniciales) */}
            <Avatar className="aspect-2/3 size-auto w-48 rounded-xl md:w-full">
              <AvatarImage
                src={imagen(persona.profile_path, "w500") ?? undefined}
                alt={persona.name}
                className="object-cover"
              />
              <AvatarFallback className="rounded-xl text-5xl font-bold">
                {iniciales(persona.name)}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {persona.name}
              </h1>

              {/* && : si no hay fecha o lugar, la línea no aparece */}
              {persona.birthday && (
                <p className="mt-3 flex items-center gap-2 text-muted-foreground">
                  <Cake className="size-4" /> {fecha(persona.birthday)}
                </p>
              )}
              {persona.place_of_birth && (
                <p className="mt-1 flex items-center gap-2 text-muted-foreground">
                  <MapPin className="size-4" /> {persona.place_of_birth}
                </p>
              )}

              {/* || : si viene vacía ('') o null, el texto por defecto */}
              <p className="mt-6 max-w-2xl leading-relaxed whitespace-pre-line">
                {persona.biography || "Sin biografía en español"}
              </p>
            </div>
          </div>

          {conocidoPor.length > 0 && (
            <div className="mt-12">
              <h2 className="mb-4 text-2xl font-bold tracking-tight">
                Conocido por
              </h2>
              {/* La misma grilla del catálogo: al hacer clic, PeliculaCard ya lleva al detalle */}
              <GrillaPeliculas
                peliculas={conocidoPor}
                esFavorita={esFavorita}
                onFavorito={alternar}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
}

// Lo que se ve mientras llega la persona
function EsqueletoPersona() {
  return (
    <div aria-busy="true" aria-label="Cargando">
      <div className="grid gap-8 md:grid-cols-[220px_1fr]">
        <Skeleton className="aspect-2/3 w-48 rounded-xl md:w-full" />
        <div className="space-y-4">
          <Skeleton className="h-10 w-2/3" />
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
      <div className="mt-12">
        <EsqueletoGrilla />
      </div>
    </div>
  );
}
