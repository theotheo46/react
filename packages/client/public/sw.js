import { assetsUrls } from '../assetsUrls.js'
const staticCacheName = 'static-cache-wp-app-v6'
const dynamicCacheName = 'dynamic-cache-wp-app-v1'

self.addEventListener('install', async event => {
  console.log('service worker is installed!', event)
  const cache = await caches.open(staticCacheName)
  await cache.addAll(assetsUrls)
})

self.addEventListener('activate', async event => {
  console.log('service worker is active!', event)
  const cachesNames = await caches.keys()
  await Promise.all(
    cachesNames
      .filter(name => name !== staticCacheName)
      .filter(name => name !== dynamicCacheName)
      .map(name => caches.delete(name))
  )
})

self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)
  if (url.origin === location.origin) {
    event.respondWith(cacheFirst(request))
  } else {
    event.respondWith(networkFirst(request))
  }
})

async function cacheFirst(request) {
  const cached = await caches.match(request)
  return cached ?? (await fetch(request))
}

async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName)
  try {
    const response = await fetch(request)
    await cache.put(request, response.clone())
    return response
  } catch (e) {
    const cached = await caches.match(request)
    return cached ?? (await caches.match(staticCacheName))
  }
}
