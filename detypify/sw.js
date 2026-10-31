self.addEventListener('install', event => event.waitUntil(self.skipWaiting()))

self.addEventListener('activate', event => event.waitUntil((async () => {
  const scope = self.registration.scope
  const cacheNames = await caches.keys()
  await Promise.all(
    cacheNames
      .filter(name => name.includes(scope) || name.includes('detypify'))
      .map(name => caches.delete(name)),
  )

  await self.clients.claim()
  const windows = await self.clients.matchAll({ type: 'window' })
  await Promise.all(windows.map((client) => {
    const url = new URL(client.url)
    return url.pathname.startsWith('/detypify/')
      ? client.navigate('/blog/48hdcfmx/')
      : undefined
  }))
  await self.registration.unregister()
})()))
