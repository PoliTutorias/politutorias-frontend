/**
 * Función debounce genérica (HU27)
 * 
 * Envuelve una función y retrasa su ejecución hasta que haya
 * pasado un cierto `delay` sin nuevas llamadas.
 * Útil para optimizar llamadas al Server Action cuando el slider se mueve.
 * 
 * @param func - Función a envolver
 * @param delay - Retraso en milisegundos
 * @returns Función debounced
 */
export function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  };
}
