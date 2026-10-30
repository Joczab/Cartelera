import { Clapperboard, Heart } from "lucide-react";
import { Link, useMatch } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFavoritas } from "@/core/favoritas/favoritas-context";

/* export type Vista = 'catalogo' | 'favoritas'

interface Props {
  vista: Vista
  totalFavoritas: number
  onCambiarVista: (vista: Vista) => void
} */

// Componente de presentación: no guarda nada, todo le llega por props y avisa con onCambiarVista
export function Header() {
  const { favoritas } = useFavoritas();
  const enFavoritas = useMatch("/favoritas");

  return (
    <header className="sticky top-0 z-20 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-6 py-4">
        <Link to="/peliculas" className="flex items-center gap-3 text-left">
          <span className="grid size-10 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Clapperboard className="size-5" />
          </span>
          <span>
            <span className="block text-xl leading-tight font-bold tracking-tight">
              Cartelera
            </span>
            <span className="block text-xs text-muted-foreground">
              Catálogo de películas
            </span>
          </span>
        </Link>

        <nav className="ml-auto flex items-center gap-1">
          {/* La variante del botón depende de qué vista está activa */}
          <Button asChild variant={enFavoritas ? "ghost" : "secondary"}>
            <Link to="/peliculas">Peliculas</Link>
          </Button>
          <Button asChild variant={enFavoritas ? "secondary" : "ghost"}>
            <Link to="/favoritas">
              <Heart className="fill-primary text-primary" />
              Favoritas
              {favoritas.length > 0 && (
                <Badge className="ml-1 h-5 min-w-5 px-1.5 tabular-nums">
                  {favoritas.length}
                </Badge>
              )}
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
