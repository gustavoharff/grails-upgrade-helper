export function getFromUrl(param: string, fallback?: any) {
  const urlParams = new URLSearchParams(window.location.search)

  const paramFromURL = urlParams.get(param)

  return paramFromURL || fallback
}
