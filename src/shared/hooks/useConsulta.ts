// TODO M6 · Hook propio: el useEffect + AbortController del catálogo, escrito UNA sola vez.
// Un hook es una función que empieza con "use" y usa otros hooks.
//
// Firma que vamos a escribir:
import { useEffect, useState } from "react";
import axios from "axios";

export function useConsulta<T>(
  clave: string,
  consultar: (signal: AbortSignal) => Promise<T>,
) {
  const [datos, setDatos] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const control = new AbortController();

    async function cargar() {
      setCargando(true);
      setError(null);
      try {
        const resultado = await consultar(control.signal);
        setDatos(resultado);
      } catch (e) {
        if (!axios.isCancel(e)) {
          setError((e as Error).message);
        }
      } finally {
        if (!control.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargar();

    return () => control.abort();
  }, [clave, intento]);

  return {
    datos,
    error,
    cargando,
    reintentar: () => setIntento((i) => i + 1),
  };
}

//   devuelve { datos, error, cargando, reintentar }
//
// `clave` describe QUÉ se pide (ej. "descubrir|28|popularity.desc|2"). Si cambia, se vuelve a pedir.
// Pista: es mover aquí los useState y el useEffect de CatalogoPeliculas.
export {};
