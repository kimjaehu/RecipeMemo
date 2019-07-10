const cacheStatic = 'site-static';
const assets = [
  '/',
  '/index.html',
  '/js/app.js',
  '/js/ui.js',
  '/js/materialize.min.js',
  '/css/styles.css',
  '/css/materialize.min.css',
  '/img/recipe.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons'
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
  // console.log('service worker has been activated');
});

// service worker: fetch event
self.addEventListener('fetch', e => {
  // console.log('fetch event', e);
});
