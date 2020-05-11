importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.5.0/workbox-sw.js'
)

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`)

  workbox.precaching.precacheAndRoute([
    {
      url: 'bundle.js',
      revision: 'f27d4678134dc097f65ee92d541c77ba'
    },
    {
      url: 'favicon.ico',
      revision: '831304c8708a7008aa36905ed8a7dd8d'
    },
    {
      url: 'index.html',
      revision: '137131a08af2af80bff5282476ab9cb0'
    },
    {
      url: 'style.css',
      revision: 'a19eb3bf618cd2ff7b2227b4f86cd79a'
    }
  ])
} else {
  console.log(`Boo! Workbox didn't load 😬`)
}
