export function triggerOnIdle(callback: any) {
  if (window && 'requestIdleCallback' in window) {
    return requestIdleCallback(callback)
  }
  return setTimeout(() => callback(), 1)
}
