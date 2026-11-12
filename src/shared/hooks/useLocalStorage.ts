import { useEffect, useState } from 'react'

// Como useState, pero el valor sobrevive a recargar la página.
// Ya viene hecho: lo usa el Provider de favoritas en M7. Léanlo, es un hook propio de 15 líneas.
export function useLocalStorage<T>(clave: string, inicial: T) {
  // Inicialización perezosa: al pasar una FUNCIÓN a useState, localStorage se lee solo la primera vez,
  // no en cada render.
  const [valor, setValor] = useState<T>(() => {
    // try/catch: si lo guardado está corrupto o el navegador bloquea localStorage, se usa el valor inicial
    try {
      const guardado = localStorage.getItem(clave)
      return guardado ? (JSON.parse(guardado) as T) : inicial
    } catch {
      return inicial
    }
  })

  // Cada vez que el valor cambia, se guarda. localStorage solo acepta texto, por eso JSON.stringify
  useEffect(() => {
    localStorage.setItem(clave, JSON.stringify(valor))
  }, [clave, valor])

  // `as const` hace que se devuelva una pareja fija [valor, función], igual que useState
  return [valor, setValor] as const
}
