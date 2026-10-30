// TODO M7 · El Provider guarda el estado de las favoritas (lo que hoy vive en App) y lo publica.
import type { ReactNode } from "react";
import { toast } from "sonner";
import type { PeliculaResumen } from "@/features/peliculas/models/pelicula";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { FavoritasContext } from "./favoritas-context";

export function FavoritasProvider({ children }: { children: ReactNode }) {
  const [favoritas, setFavoritas] = useLocalStorage<PeliculaResumen[]>(
    "favoritas",
    [],
  );

  // copiado de app

  const esFavorita = (id: number) => favoritas.some((f) => f.id === id);

  function alternar(p: PeliculaResumen) {
    if (esFavorita(p.id)) {
      setFavoritas(favoritas.filter((f) => f.id !== p.id));
      toast(`Quitaste “${p.title}” de favoritas`);
    } else {
      setFavoritas([...favoritas, p]);
      toast.success(`“${p.title}” agregada a favoritas`);
    }
  }

  return (
    <FavoritasContext value={{ favoritas, esFavorita, alternar }}>
      {children}
    </FavoritasContext>
  );
}
export {};
