self.addEventListener('install', (event) => {
  console.log('install service worker')

  return caches
    .open('bayer-quiz-pwa-cache')
    .then((cache) =>
      cache.addAll([
        '/',
        '/static/app.js',
        '/static/tablet1.jpg',
        '/static/bg-with-lady.jpg',
        '/static/bg-without-lady.jpg',
        '/static/HelveticaNeueLTStd-BdCn.otf',
        '/static/HelveticaNeueLTStd-LtCn.otf',
      ]),
    )
})

self.addEventListener('activate', (event) => {
  console.log('activate service worker')

  return caches
    .open('bayer-quiz-pwa-cache')
    .then((cache) =>
      cache.addAll([
        '/bayer-quiz.html',
        '/static/app.js',
        '/static/tablet1.jpg',
        '/static/bg-with-lady.jpg',
        '/static/bg-without-lady.jpg',
        '/static/HelveticaNeueLTStd-BdCn.otf',
        '/static/HelveticaNeueLTStd-LtCn.otf',
      ]),
    )
})

function cacheFirst(req) {
  return caches
    .open('bayer-quiz-pwa-cache')
    .then((cache) => {
      cache.match(req)
    })
    .then((cachedResponse) => cachedResponse || fetch(req))
}

self.addEventListener('fetch', (event) => {
  console.log('fetch event')
  var req = event.request
  event.respondWith(cacheFirst(req))
})
