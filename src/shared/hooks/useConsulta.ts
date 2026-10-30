// TODO M6 · Hook propio: el useEffect + AbortController del catálogo, escrito UNA sola vez.
// Un hook es una función que empieza con "use" y usa otros hooks.
//
// Firma que vamos a escribir:
export function useConsulta<T>(clave: string, consultar: (signal: AbortSignal) => Promise<T>)
//   devuelve { datos, error, cargando, reintentar }
//
// `clave` describe QUÉ se pide (ej. "descubrir|28|popularity.desc|2"). Si cambia, se vuelve a pedir.
// Pista: es mover aquí los useState y el useEffect de CatalogoPeliculas.
export {}
