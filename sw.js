const CACHE_NAME = 'edfun-play-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/HOME/homepage.css',
  '/HOME/homepage.js',
  '/HOME/login.html',
  '/HOME/login.css',
  '/HOME/login.js',
  '/HOME/gunsboom.jpg',
  '/HOME/cardrive.jpg',
  '/HOME/history.jpg',
  '/HOME/wordpuzz.jpg',
  '/HOME/translate.jpg',
  '/HOME/animal.jpg',
  '/HOME/paintss.jpg',
  '/HOME/Cookmama.jpg',
  '/HOME/picture-word.jpg',
  '/HOME/block.jpg',
  '/HOME/bg3.jpg',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
  );
}); 