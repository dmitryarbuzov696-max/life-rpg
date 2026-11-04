/*
  ФАЙЛ: sw.js  ->  сохрани в КОРЕНЬ репозитория GitHub (рядом с index.html).
  Простейший Service Worker: кэширует файлы приложения, чтобы оно открывалось без интернета.
  Стратегия: сначала сеть (чтобы обновления доходили), если сети нет, берём из кэша.

  ВАЖНО: когда меняешь index.html и выкладываешь заново, увеличь номер в CACHE_NAME
  (v1 -> v2 -> v3), иначе телефон может ещё какое-то время показывать старую версию.
*/
/* >>> ПРИ КАЖДОМ ОБНОВЛЕНИИ САЙТА ПРИБАВЛЯЙ К НОМЕРУ ОДНУ ЦИФРУ (v6 -> v7 -> v8 ...).
   Иначе телефон может ещё долго показывать старую версию из кэша. Меняется только число в строке ниже. */
var CACHE_NAME = 'life-rpg-v10';
var ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

// Установка: кладём основные файлы в кэш
self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (c) {
        /* cache:'reload' = брать файлы с сервера, а не из HTTP-кэша браузера (GitHub Pages кэширует на 10 минут) */
        return Promise.all(ASSETS.map(function (u) {
          return fetch(new Request(u, { cache: 'reload' }))
            .then(function (r) { if (r && r.ok) return c.put(u, r); })
            .catch(function () {});
        }));
      })
      .then(function () { return self.skipWaiting(); })
  );
});

// Активация: удаляем кэши старых версий
self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (k) { return k !== CACHE_NAME; })
          .map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

// Запросы: сеть -> кэш. Чужие сайты (Google Fonts) не трогаем.
self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(req, { cache: 'no-store' })
      .then(function (res) {
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(CACHE_NAME).then(function (c) { c.put(req, copy); });
        }
        return res;
      })
      .catch(function () {
        return caches.match(req).then(function (r) { return r || caches.match('./index.html'); });
      })
  );
});
