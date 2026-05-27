const CACHE_NAME = 'piezalord-v2'
const urlsToCache = [
  '/',
  '/index.html',
  '/piezalord-logo.png',
  '/piezalordicon.png'
]

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
    })
  )
})