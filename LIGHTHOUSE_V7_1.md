# Evelasting v7.1 — Lighthouse update

## Что изменено

- Убрана искусственная заставка на 1,1 секунды, которая ухудшала Speed Index.
- SoundCloud SDK и iframe больше не загружаются при первом открытии страницы.
  Они подключаются при приближении к секции Music или после нажатия Play.
- Большие MP4-файлы Story больше не входят в первоначальную сетевую загрузку.
  Видео получает `src` только рядом с viewport.
- `/api/artist` больше не возвращает 500 при проблеме YouTube API.
  Используется частичный результат и кеширование на edge.
- Разрешён `encrypted-media` только для SoundCloud.
- Скрытый плеер больше не содержит `aria-hidden` вокруг интерактивных элементов.
- Повышен контраст второстепенного текста.

## Установка патча

1. Закрой запущенный dev-server.
2. Скопируй содержимое архива патча в корень проекта с заменой файлов.
3. Не удаляй свой `.env.local`.
4. Выполни:

```bash
npm install
npm run build
npm run start
```

5. Проверь локально сайт и кнопку Play.
6. Затем:

```bash
git add .
git commit -m "Optimize Lighthouse performance and reliability"
git push
```

7. После завершения деплоя повтори Lighthouse на `https://evelasting.com` в режиме Mobile.

## Важно

В среде подготовки патча полный `npm run build` не удалось завершить из-за временной ошибки npm registry `503 Service Temporarily Unavailable`. Изменённые TypeScript/TSX-файлы прошли отдельную синтаксическую проверку TypeScript.
