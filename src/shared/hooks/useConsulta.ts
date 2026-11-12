// M6 · Hook propio: el useEffect + AbortController del catálogo, escrito UNA sola vez.
// Un hook es una función que empieza con "use" y usa otros hooks.
//
// useConsulta<T>(clave, consultar) -> { datos, error, cargando, reintentar }
//
// `clave` describe QUÉ se pide (ej. "descubrir|28|popularity.desc|2"). Si cambia, se vuelve a pedir.
// `consultar` es la función que hace la petición: recibe un `signal` (para poder cancelarla)
//   y devuelve una promesa con los datos de tipo T.
// Lo usan usePeliculas, useGeneros, usePelicula y usePersona.
import { useEffect, useState } from "react";
import axios from "axios";

// <T> es un tipo genérico: el hook sirve para cualquier dato (películas, géneros, personas...)
// y TypeScript sabe que `datos` es del mismo tipo que devuelve `consultar`.
export function useConsulta<T>(
  clave: string,
  consultar: (signal: AbortSignal) => Promise<T>,
) {
  // Las 4 memorias del hook: lo que llegó, el mensaje de error, si está cargando y el contador de reintentos
  const [datos, setDatos] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(true);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    // Botón de cancelar: si la clave cambia mientras hay una petición en vuelo, se cancela
    // para que una respuesta vieja y lenta no pise a la nueva.
    const control = new AbortController();

    async function cargar() {
      setCargando(true);
      setError(null);
      try {
        const resultado = await consultar(control.signal);
        setDatos(resultado);
      } catch (e) {
        // Cancelar no es un error real: no se le muestra nada al usuario
        if (!axios.isCancel(e)) {
          setError((e as Error).message);
        }
      } finally {
        // Si esta petición fue cancelada, la nueva ya se encarga de `cargando`
        if (!control.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargar();

    // Limpieza: React la ejecuta antes de repetir el efecto y al desmontar el componente
    return () => control.abort();
    // Se vuelve a ejecutar cuando cambia la clave (otra consulta) o el intento (botón Reintentar).
    // `consultar` no va aquí a propósito: la clave ya resume todo lo que la hace distinta.
  }, [clave, intento]);

  return {
    datos,
    error,
    cargando,
    // Sumar 1 a `intento` cambia una dependencia del efecto y fuerza una petición nueva
    reintentar: () => setIntento((i) => i + 1),
  };
}

export {};
