const CACHE_NAME = 'edfun-play-v1';
const urlsToCache = [
  '/EdFunPlay/',
  '/EdFunPlay/index.html',
  '/EdFunPlay/manifest.json',
  '/EdFunPlay/HOME/homepage.css',
  '/EdFunPlay/HOME/homepage.js',
  '/EdFunPlay/HOME/pin.css',
  '/EdFunPlay/HOME/pin.js',
  '/EdFunPlay/HOME/login.html',
  '/EdFunPlay/HOME/login.css',
  '/EdFunPlay/HOME/login.js',
  '/EdFunPlay/HOME/gunsboom.jpg',
  '/EdFunPlay/HOME/cardrive.jpg',
  '/EdFunPlay/HOME/history.jpg',
  '/EdFunPlay/HOME/wordpuzz.jpg',
  '/EdFunPlay/HOME/translate.jpg',
  '/EdFunPlay/HOME/animal.jpg',
  '/EdFunPlay/HOME/paintss.jpg',
  '/EdFunPlay/HOME/Cookmama.jpg',
  '/EdFunPlay/HOME/picture-word.jpg',
  '/EdFunPlay/HOME/block.jpg',
  '/EdFunPlay/HOME/bg3.jpg'
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