const cacheStatic = 'site-static-v1';
const assets = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/ui.js',
  '/js/materialize.min.js',
  '/css/styles.css',
  '/css/materialize.min.css',
  '/img/recipe.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

// service worker: install event
self.addEventListener('install', e => {
  // console.log('service worker has been installed');
  e.waitUntil(
    caches.open(cacheStatic).then(cache => {
      console.log('caching shell');
      cache.addAll(assets);
    })
  );
});

// service worker: activate event
self.addEventListener('activate', e => {
  console.log('service worker has been activated');
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheStatic).map(key => caches.delete(key))
      );
    })
  );
});

// service worker: fetch event
self.addEventListener('fetch', e => {
  // console.log('fetch event', e);
  e.respondWith(
    caches.match(e.request).then(cacheRes => {
      return cacheRes || fetch(e.request);
    })
  );
});
