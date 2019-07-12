const cacheStatic = 'site-static-v2';
const dynamicCache = 'site-dynamic-v2';
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
  'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
  '/pages/fallback.html'
];

// cache size limit
const cacheSizeLimit = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(cacheSizeLimit(name, size));
      }
    });
  });
};

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
        keys
          .filter(key => key !== cacheStatic && key !== dynamicCache)
          .map(key => caches.delete(key))
      );
    })
  );
});

// service worker: fetch event
self.addEventListener('fetch', e => {
  if (e.request.url.indexOf('firestore.googleapis.com') === -1) {
    // console.log('fetch event', e);
    e.respondWith(
      caches
        .match(e.request)
        .then(cacheRes => {
          return (
            cacheRes ||
            fetch(e.request).then(fetchRes => {
              return caches.open(dynamicCache).then(cache => {
                cache.put(e.request.url, fetchRes.clone());
                cacheSizeLimit(dynamicCache, 15);
                return fetchRes;
              });
            })
          );
        })
        .catch(() => {
          if (e.request.url.indexOf('.html') > -1) {
            return caches.match('/pages/fallback.html');
          }
        })
    );
  }
});
