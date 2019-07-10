// service worker: install event
self.addEventListener('install', e => {
  console.log('service worker has been installed');
});

// service worker: activate event
self.addEventListener('activate', e => {
  console.log('service worker has been activated');
});
