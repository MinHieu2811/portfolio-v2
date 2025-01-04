let _context: CanvasRenderingContext2D
const cache = new Map<string, TextMetrics>()
const cacheLimit = 500
let ctxFontStyle = ''

export function getCanvasContext() {
  if (!_context) {
    _context = document.createElement('canvas').getContext('2d')!
  }

  return _context
}

export function measureText(text: string, fontSize: number, fontWeight = 400): TextMetrics {
  const fontStyle = `${fontWeight} ${fontSize}px 'Inter'`
  const cacheKey = text + fontStyle
  const fromCache = cache?.get(cacheKey)

  if (fromCache) {
    return fromCache
  }

  const context = getCanvasContext()

  if (ctxFontStyle !== fontStyle) {
    context.font = ctxFontStyle = fontStyle
  }

  const metrics = context?.measureText(text)

  if (cache?.size === cacheLimit) {
    cache?.clear()
  }

  cache?.set(cacheKey, metrics)

  return metrics
}
