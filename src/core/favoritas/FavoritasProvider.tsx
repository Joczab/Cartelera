// TODO M7 · El Provider guarda el estado de las favoritas (lo que hoy vive en App) y lo publica.
import type { ReactNode } from "react";
import { toast } from "sonner";
import type { PeliculaResumen } from "@/features/peliculas/models/pelicula";
import { useLocalStorage } from "@/shared/hooks/useLocalStorage";
import { FavoritasContext } from "./favoritas-context";

// El Provider es el DUEÑO del estado de las favoritas (antes vivía en App y bajaba por props).
// Cualquier componente que esté dentro de él puede leerlas con useFavoritas(), sin prop drilling.
// `children` es todo lo que se envuelve: en main.tsx, el router completo.
export function FavoritasProvider({ children }: { children: ReactNode }) {
  // useLocalStorage = useState que además se guarda en el navegador con la clave "favoritas",
  // así las favoritas sobreviven aunque se recargue la página.
  const [favoritas, setFavoritas] = useLocalStorage<PeliculaResumen[]>(
    "favoritas",
    [],
  );

  // Pregunta rápida: ¿esta película ya está en favoritas? La usan tarjetas y fichas para pintar el corazón
  const esFavorita = (id: number) => favoritas.some((f) => f.id === id);

  // Agrega la película si no estaba y la quita si ya estaba (de ahí "alternar").
  // Inmutabilidad: nunca push ni splice; siempre un arreglo NUEVO para que React note el cambio.
  function alternar(p: PeliculaResumen) {
    if (esFavorita(p.id)) {
      setFavoritas(favoritas.filter((f) => f.id !== p.id));
      toast(`Quitaste “${p.title}” de favoritas`);
    } else {
      setFavoritas([...favoritas, p]);
      toast.success(`“${p.title}” agregada a favoritas`);
    }
  }

  // `value` es lo que se publica: lo que reciba useFavoritas() en cualquier componente hijo
  return (
    <FavoritasContext value={{ favoritas, esFavorita, alternar }}>
      {children}
    </FavoritasContext>
  );
}
export {};
