<<<<<<< HEAD
const options = {"workboxURL":"https://cdn.jsdelivr.net/npm/workbox-cdn@5.1.4/workbox/workbox-sw.js","importScripts":[],"config":{"debug":false},"cacheOptions":{"cacheId":"client-prod","directoryIndex":"/","revision":"rhTAuKmVuMy7"},"clientsClaim":true,"skipWaiting":true,"cleanupOutdatedCaches":true,"offlineAnalytics":false,"preCaching":[{"revision":"rhTAuKmVuMy7","url":"/?standalone=true"}],"runtimeCaching":[{"urlPattern":"/_nuxt/","handler":"CacheFirst","method":"GET","strategyPlugins":[]},{"urlPattern":"/","handler":"NetworkFirst","method":"GET","strategyPlugins":[]}],"offlinePage":null,"pagesURLPattern":"/","offlineStrategy":"NetworkFirst"}
=======
// THIS FILE SHOULD NOT BE VERSION CONTROLLED
>>>>>>> cabc76a7d8f95bc111da6afc64fc9a38f3f5a576

// https://github.com/NekR/self-destroying-sw

self.addEventListener('install', function (e) {
  self.skipWaiting()
})

self.addEventListener('activate', function (e) {
  self.registration.unregister()
    .then(function () {
      return self.clients.matchAll()
    })
    .then(function (clients) {
      clients.forEach(client => client.navigate(client.url))
    })
})
