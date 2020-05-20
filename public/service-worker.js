console.log('Hello from service-worker.js')
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js'
)

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`)
} else {
  console.log(`Boo! Workbox didn't load 😬`)
}
workbox.loadModule('workbox-strategies')
workbox.loadModule('workbox-expiration')
workbox.loadModule('workbox-precaching')

const registerRoute = workbox.routing.registerRoute
const {NetworkFirst, StaleWhileRevalidate, CacheFirst} = workbox.strategies
const {ExpirationPlugin} = workbox.expiration
const {precacheAndRoute} = workbox.precaching

registerRoute(
  ({request}) => request.destination === 'script',
  new NetworkFirst()
)

registerRoute(
  // Cache style resources, i.e. CSS files.
  ({request}) => request.destination === 'style',
  // Use cache but update in the background.
  new StaleWhileRevalidate({
    // Use a custom cache name.
    cacheName: 'css-cache'
  })
)

registerRoute(
  // Cache image files.
  ({request}) => request.destination === 'image',
  // Use the cache if it's available.
  new CacheFirst({
    // Use a custom cache name.
    cacheName: 'image-cache',
    plugins: [
      new ExpirationPlugin({
        // Cache only 20 images.
        maxEntries: 20,
        // Cache for a maximum of a week.
        maxAgeSeconds: 7 * 24 * 60 * 60
      })
    ]
  })
)

precacheAndRoute([
  {url: '/index.html', revision: null},
  {url: '/style.css', revision: null},
  {url: '/bundle.js', revision: null},
  {url: '/favicon.ico', revision: null},
  {url: '/logo.png', revision: null}
  // ... other entries ...
])
