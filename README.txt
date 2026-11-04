Life RPG — публикация на GitHub Pages
=====================================
Файлы (все лежат в КОРНЕ репозитория, без вложенных папок):
  index.html           — само приложение
  manifest.json        — описание PWA (имя, иконки, цвета)
  sw.js                — Service Worker (работа без интернета)
  icon-192.png, icon-512.png, apple-touch-icon.png — иконки

Как выложить:
  1. На github.com: New repository (Public), например life-rpg.
  2. Add file -> Upload files: загрузи ВСЕ файлы из этой папки (не саму папку), Commit.
  3. Settings -> Pages -> Source: Deploy from a branch -> Branch: main, папка / (root) -> Save.
  4. Через 1-2 минуты сайт будет на https://ТВОЙ_НИК.github.io/life-rpg/

Установка на телефон:
  iPhone: открой ссылку в Safari -> «Поделиться» -> «На экран “Домой”».
  Android: открой в Chrome -> меню ⋮ -> «Установить приложение» / «Добавить на главный экран».

Обновление: заменяй index.html в репозитории и при КАЖДОМ обновлении прибавляй одну цифру в sw.js (CACHE_NAME 'life-rpg-v4' -> 'life-rpg-v5' и так далее).
