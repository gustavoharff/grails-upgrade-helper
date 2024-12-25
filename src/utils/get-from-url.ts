export function getFromUrl<T extends string>(param: string, fallback?: string): T {
  const urlParams = new URLSearchParams(window.location.search)

  const paramFromURL = urlParams.get(param) as T | null

  return (paramFromURL ?? fallback) as T
}
