export default defineEventHandler(async (event) => {
  // Simula delay de rede
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Obtém query parameters
  const query = getQuery(event)
  const name = query.name || 'World'
  
  // Headers personalizados
  setHeaders(event, {
    'X-Custom-Header': 'Nuxt SSR API',
    'Cache-Control': 'max-age=60'
  })
  
  return {
    message: `Hello, ${name}!`,
    timestamp: new Date().toISOString(),
    server: true,
    requestHeaders: getHeaders(event),
    userAgent: getHeader(event, 'user-agent'),
    ip: getHeader(event, 'x-forwarded-for') || getHeader(event, 'x-real-ip') || 'unknown'
  }
})