### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
3. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
4. Выполните команду `yarn dev --scope=server` чтобы запустить только server


### Как добавить зависимости?
В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента 
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```


Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```


### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг

```yarn lint```

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

И чтобы посмотреть что получилось


`yarn preview --scope client`
`yarn preview --scope server`

## Хуки
В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Ой, ничего не работает :(

Откройте issue, я приду :)

## Автодеплой статики на vercel
Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере
Перед первым запуском выполните `node init.js`


`docker compose up` - запустит три сервиса
1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`

## Первоначальная настройка SSR:
1. На клиенте: добавил конфиг для билда серверной части приложения ssr.config.ts, обновил скрипты для сборки в package.json, сделал правки в файле main.tsx и добавил файл ssr.tsx для рендера на сервере.
2. На сервере: добавил реализацию ssr в файле index.ts, поправил скрипты в package.json.

## Для сборки клиентского и серверного пакетов:
```
yarn build --scope=client
yarn build --scope=server
```

После сборки на выходе будет: в клиентском пакете две папки dist и dist-ssr, в серверном пакете одна папка dist
Для запуска продакшен версии можно запустить: 

```
yarn preview --scope=server
```

Запуск проекта для разработки:
Клиент с сервером:
```
yarn dev
```
Только клиент:
```
yarn dev --scope=client
```
Только сервер (SSR): 
```
yarn dev --scope=server
```

## Backend

В index.ts для сервера добавилась инициализация sequelize в виде
```
  await sequelize.sync()
```

В этом случае на пустой базе  происходит создание схема для модели, если модель уже создана то при наличии новых полей произойдет их добавление в таблицу с заполненным дефолтовыми значениями

Если нужно создать схему заново с дропом существующих таблиц - надо использовать

```
await sequelize.sync({force: true});
```

Параметры подключения к базе лежат в файле server/.env - для докера это надо изменить и передавать через переменные окружения

Для работы с BE использовать следующие ручки:

Эхо-тест
```
curl localhost:3001/leaderboard/test
```

Добавить строчку в таблицу лидеров - параметр score должен тут быть пустым так как он будет рассчитываться на уровне сервера
```
curl -X POST -H 'Content-Type: application/json' -d '{"userId":"12345","usernick":"theo","level":"15","steps":"49","time":"120","score":""}' localhost:3001/leaderboard/setleader
```

Получить список лидеров отсортированных по убыванию поля score и с дефолтовым значением = 10 

```
curl localhost:3001/leaderboard/gettopleaders?number=2
curl localhost:3001/leaderboard/gettopleaders
```
