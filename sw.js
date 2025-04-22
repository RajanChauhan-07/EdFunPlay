const CACHE_NAME = 'edfun-play-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './HOME/homepage.css',
  './HOME/homepage.js',
  './HOME/pin.css',
  './HOME/pin.js',
  './HOME/login.html',
  './HOME/login.css',
  './HOME/login.js',
  './HOME/gunsboom.jpg',
  './HOME/cardrive.jpg',
  './HOME/history.jpg',
  './HOME/wordpuzz.jpg',
  './HOME/translate.jpg',
  './HOME/animal.jpg',
  './HOME/paintss.jpg',
  './HOME/Cookmama.jpg',
  './HOME/picture-word.jpg',
  './HOME/block.jpg',
  './HOME/bg3.jpg',
  './icons/icon-48x48.png',
  './icons/icon-72x72.png',
  './icons/icon-96x96.png',
  './icons/icon-128x128.png',
  './icons/icon-144x144.png',
  './icons/icon-152x152.png',
  './icons/icon-192x192.png',
  './icons/icon-256x256.png',
  './icons/icon-384x384.png',
  './icons/icon-512x512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(
          response => {
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
  );
}); 