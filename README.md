# О проекте

"Water Sort Puzzle" - это увлекательная и сложная игра, которая проверяет ваши навыки сопоставления цветов и решения головоломок. Игра представляет игрокам сетку бутылок, заполненных жидкостями разного цвета, которые необходимо рассортировать.

Ключевая механика игры заключается в сортировке жидкостей в бутылках путем переливания их из одной бутылки в другую, достижения цели - разделить их по цвету. Игроки могут переливать жидкости из одной бутылки в другую, только если в принимающей бутылке достаточно места и переливаемые жидкости имеют одинаковый цвет. Задача состоит в том, чтобы найти правильную последовательность ходов для успешного разделения всех жидкостей по цветам.

[Документ с описанием механики игры](/diagramms/wp.pdf)

## Содержание

- [Технологии](#технологии)
- [Как запускать](#как-запускать)
- [Как добавить зависимости](#как-добавить-зависимости)
- [Тесты](#тесты)
- [Линтинг](#линтинг)
- [Форматирование prettier](#форматирование-prettier)
- [Production build](#production-build)
- [Хуки](#хуки)
- [Автодеплой статики на vercel](#автодеплой-статики-на-vercel)
- [Production окружение в докере](#production-окружение-в-докере)
- [Настройка SSR](#настройка-ssr)
- [Backend](#backend)
  - [Схема DB](#схема-db)
  - [Ручки](#ручки)
  - [Интеграционные тесты](#интеграционные-тесты)
  - [Useful SQL queries](#useful-sql-queries)
- [MEMORYLEAKS](#MEMORYLEAKS)

### Технологии

- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Sequelize](https://sequelize.org/)
- [Lerna](https://lerna.js.org/)

### Как запускать?

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
4. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
5. Выполните команду `yarn dev --scope=server` чтобы запустить только server

### Как добавить зависимости?

В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента
`yarn lerna add {your_dep} --scope client`

Для сервера
`yarn lerna add {your_dep} --scope server`

И для клиента и для сервера
`yarn lerna add {your_dep}`

Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
`yarn lerna add {your_dep} --dev --scope server`

### Тесты

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)
`yarn test`

### Линтинг

`yarn lint`

### Форматирование prettier

`yarn format`

### Production build

`yarn build`

И чтобы посмотреть что получилось

`yarn preview --scope client`
`yarn preview --scope server`

### Хуки

В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

### Автодеплой статики на vercel

Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

### Production окружение в докере
Для сборки приложения выполнить:

`docker-compose build ssrapp`

Для запуска контейнера выполнить:

`docker-compose up ssrapp`

Контейнер запустит два сервиса:
1. postgres - базу данных (postgres)
2. ssrapp - само приложение

### Настройка SSR

1. На клиенте: добавил конфиг для билда серверной части приложения ssr.config.ts, обновил скрипты для сборки в package.json, сделал правки в файле main.tsx и добавил файл ssr.tsx для рендера на сервере.
2. На сервере: добавил реализацию ssr в файле index.ts, поправил скрипты в package.json.

Для сборки клиентского и серверного пакетов:

```
yarn build --scope=client
yarn build --scope=server
```

После сборки на выходе будет: в клиентском пакете две папки dist и dist-ssr, в серверном пакете одна папка dist
Для запуска продакшен версии можно запустить:

`yarn preview --scope=server`

Запуск проекта для разработки:
Клиент с сервером:
`yarn dev`

Только клиент:
`yarn dev --scope=client`

Только сервер (SSR):
`yarn dev --scope=server`

### Backend

В index.ts для сервера добавилась инициализация sequelize в виде
`await sequelize.sync()`

В этом случае на пустой базе происходит создание схема для модели, если модель уже создана то при наличии новых полей произойдет их добавление в таблицу с заполненным дефолтовыми значениями

Если нужно создать схему заново с дропом существующих таблиц - надо использовать

`await sequelize.sync({force: true});`

Параметры подключения к базе лежат в файле server/.env - для докера это надо изменить и передавать через переменные окружения

#### **Схема DB**

![Схема DB](/diagramms/er.png)

#### **Ручки**

**Эхо-тест**

`curl localhost:3001/leaderboard/test`

**Leaderboard**

- Добавить строчку в таблицу лидеров - параметр score должен тут быть пустым так как он будет рассчитываться на уровне сервера по формуле

`Math.round((level / (time + steps * 5)) * 100000)`

В BODY передается объект Leaderboard с пустым score

Возвращается объект Leaderboard c заполненным score - включая назначенные базой поля Primary Key, CreatedAt, UpdatedAt

`curl -X POST -H 'Content-Type: application/json' -d '{"userId":"12345","usernick":"theo","level":"15","steps":"49","time":"120","score":""}' localhost:3001/leaderboard/setleader`

- Получить список лидеров отсортированных по убыванию поля score - либо в параметра number передается число элементов либо если он не указан то с дефолтовым значением = 10

Возвращается List объектов Leaderboard из server/src/model

```
curl localhost:3001/leaderboard/gettopleaders?number=2
curl localhost:3001/leaderboard/gettopleaders
```

**Forum**

- Получить все объекты Section - включая дочерние объекты topic для каждого section
  `curl localhost:3001/forum/getallsections`

- Получить объекты Topic по данному sectionId (обязательный параметр) - дочерние объекты Message выводятся только с аттрибутом messagetext, обрезанным до **MESSAGETEXT_CUT_LENGTH** = 20 символов - константа определена в файле **packages/server/src/routes/forum.ts**
  `curl localhost:3001/forum/getalltopicsbysectionid?sectionId=1`

- Получить объекты Message по данному topicId (обязательный параметр) - включая дочерние объекты Reply
  `curl localhost:3001/forum/getallmessagesbytopicid?topicId=1`

- Добавить Section с данными именем и usernick
  `curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111", "usernick" : "theo", "sectionname" : "Section1"}' localhost:3001/forum/addsection`

- Добавить Topic с данными именем, usernick и FK sectionId
  `curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111", "usernick" : "theo", "topicname" : "Topic1", "sectionId" : "1"}' localhost:3001/forum/addtopic`

- Добавить Message с данными текстом, usernick и FK topicId
  `curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111", "usernick" : "theo", "messagetext" : "blablabla", "topicId" : "1"}' localhost:3001/forum/addmessage`

- Oбновить Message по данному ID - проверяется равенство параметра запроса userId и userId для редактируемого сообщения. Если они не равны то Reject
  `curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111", "messagetext" : "qweqweqweqwqew", "id" : "1"}' localhost:3001/forum/updatemessage`

- Добавить Reply к данному Message
  `curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111", "usernick" : "theo", "messagetext" : "blablablaReply1 ", "messageId" : "1"}' localhost:3001/forum/addreply`

- Удалить каскадно Section по данному id
  `curl -X POST -H 'Content-Type: application/json' -d '{"id" : "1"}' localhost:3001/forum/deletesection`

- Удалить каскадно Topic по данному id
  `curl -X POST -H 'Content-Type: application/json' -d '{"id" : "1"}' localhost:3001/forum/deletetopic`

- Удалить Message по данному id
  `curl -X POST -H 'Content-Type: application/json' -d '{"id" : "1"}' localhost:3001/forum/deletemessage`

**Emoji**

- Получить все объекты Emoji с внешнего сервиса https://emoji-api.com/
  GET method `localhost:3001/emoji`

**Switch theme**

- Получить тему для авторизованного пользователя\
  GET method `localhost:3001/api/theme/<user_id>`

- Переключить тему для авторизованного пользователя\
  POST method `localhost:3001/api/theme`\
  body: {userId: number, theme: string}

#### **Интеграционные тесты**

Перед запуском каждого теста необходимо полностью очищать базу - делать это либо через DROP ALL TABLES в Querу browser либо запуском команды
`await sequelize.sync({force: true});`

- Аdd Message and Reply test

**Вход**

```
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "sectionname" : "Section1"}' localhost:3001/forum/addsection
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "topicname" : "Topic1", "sectionId" : "1"}' localhost:3001/forum/addtopic
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "messagetext" : "blablabla", "topicId" : "1"}' localhost:3001/forum/addmessage
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "messagetext" : "blablabla1", "topicId" : "1"}' localhost:3001/forum/addmessage
curl localhost:3001/forum/getallmessagesbytopicid?topicId=1 | python3 -m json.tool
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "messagetext" : "blablablaReply1", "messageId" : "1"}' localhost:3001/forum/addreply
curl localhost:3001/forum/getallmessagesbytopicid?topicId=1 | python3 -m json.tool
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "messagetext" : "blablablaReply2", "messageId" : "1"}' localhost:3001/forum/addreply
curl localhost:3001/forum/getallmessagesbytopicid?topicId=1 | python3 -m json.tool
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111", "usernick" : "theo", "messagetext" : "blablablaReply2", "messageId" : "2"}' localhost:3001/forum/addreply
curl localhost:3001/forum/getallmessagesbytopicid?topicId=1 | python3 -m json.tool
```

**Выход**

```
[
    {
        "id": 1,
        "topicId": 1,
        "replyID": null,
        "userId": 111,
        "usernick": "theo",
        "messagetext": "blablabla",
        "createdAt": "2023-06-18T07:05:46.082Z",
        "updatedAt": "2023-06-18T07:05:46.082Z",
        "parentReply": {
            "id": 1,
            "parentMessageID": 1,
            "createdAt": "2023-06-18T07:06:05.004Z",
            "updatedAt": "2023-06-18T07:06:05.004Z",
            "messages": [
                {
                    "id": 3,
                    "topicId": null,
                    "replyID": 1,
                    "userId": 111,
                    "usernick": "theo",
                    "messagetext": "blablablaReply1",
                    "createdAt": "2023-06-18T07:06:05.048Z",
                    "updatedAt": "2023-06-18T07:06:05.048Z"
                },
                {
                    "id": 4,
                    "topicId": null,
                    "replyID": 1,
                    "userId": 111,
                    "usernick": "theo",
                    "messagetext": "blablablaReply2",
                    "createdAt": "2023-06-18T07:06:10.364Z",
                    "updatedAt": "2023-06-18T07:06:10.364Z"
                }
            ]
        }
    },
    {
        "id": 2,
        "topicId": 1,
        "replyID": null,
        "userId": 111,
        "usernick": "theo",
        "messagetext": "blablabla1",
        "createdAt": "2023-06-18T07:05:52.380Z",
        "updatedAt": "2023-06-18T07:05:52.380Z",
        "parentReply": {
            "id": 2,
            "parentMessageID": 2,
            "createdAt": "2023-06-18T07:06:26.297Z",
            "updatedAt": "2023-06-18T07:06:26.297Z",
            "messages": [
                {
                    "id": 5,
                    "topicId": null,
                    "replyID": 2,
                    "userId": 111,
                    "usernick": "theo",
                    "messagetext": "blablablaReply2",
                    "createdAt": "2023-06-18T07:06:26.346Z",
                    "updatedAt": "2023-06-18T07:06:26.346Z"
                }
            ]
        }
    }
]
```

- Add delete Section test

**Вход**

```
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "sectionname" : "Section1"}' localhost:3001/forum/addsection
curl localhost:3001/forum/getallsections | python3 -m json.tool
```

**Выход**

```
[
    {
        "id": 1,
        "userId": 111,
        "usernick": "theo",
        "sectionname": "Section1",
        "createdAt": "2023-06-19T19:38:28.870Z",
        "updatedAt": "2023-06-19T19:38:28.870Z",
        "topics": []
    }
]
```

**Вход**

```
curl -X POST -H 'Content-Type: application/json' -d '{"id" : "1"}' localhost:3001/forum/deletesection
```

**Выход**

Нет объектов Section

- Add delete Topic test

**Вход**

```
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "sectionname" : "Section1"}' localhost:3001/forum/addsection
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "topicname" : "Topic1", "sectionId" : "1"}' localhost:3001/forum/addtopic
curl localhost:3001/forum/getallsections | python3 -m json.tool
```

**Выход**

```
[
    {
        "id": 1,
        "userId": 111,
        "usernick": "theo",
        "sectionname": "Section1",
        "createdAt": "2023-06-19T19:40:21.289Z",
        "updatedAt": "2023-06-19T19:40:21.289Z",
        "topics": [
            {
                "id": 1,
                "sectionId": 1,
                "userId": 111,
                "usernick": "theo",
                "topicname": "Topic1",
                "createdAt": "2023-06-19T19:40:28.147Z",
                "updatedAt": "2023-06-19T19:40:28.147Z"
            }
        ]
    }
]
```

**Вход**

```
curl -X POST -H 'Content-Type: application/json' -d '{"id" : "1"}' localhost:3001/forum/deletetopic
curl localhost:3001/forum/getalltopicsbysectionid?sectionId=1 | python3 -m json.tool
```

**Выход**

Нет объектов Topic

- Add delete Section and Topic test

**Вход**

```
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "sectionname" : "Section1"}' localhost:3001/forum/addsection
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "topicname" : "Topic1", "sectionId" : "1"}' localhost:3001/forum/addtopic
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "messagetext" : "blablablasadfsajfdhgsadjfghsakjfdhgadsfdsafsdaf", "topicId" : "1"}' localhost:3001/forum/addmessage
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "messagetext" : "blablabla1sdafsadlfkhsadkfjhdslkfhjdslfhsdlafksadjhflkdsjhf", "topicId" : "1"}' localhost:3001/forum/addmessage
curl localhost:3001/forum/getalltopicsbysectionid?sectionId=1 | python3 -m json.tool
```

**Выход**

```
[
    {
        "id": 1,
        "sectionId": 1,
        "userId": 111,
        "usernick": "theo",
        "topicname": "Topic1",
        "createdAt": "2023-06-20T08:51:02.238Z",
        "updatedAt": "2023-06-20T08:51:02.238Z",
        "messages": [
            {
                "messagetextcut": "blablablasadfsajfdhg"
            },
            {
                "messagetextcut": "blablabla1sdafsadlfk"
            }
        ]
    }
]
```

**Вход**

```
curl -X POST -H 'Content-Type: application/json' -d '{"id" : "1"}' localhost:3001/forum/deletesection
```

**Выход**

Нет объектов Section и Topic

- Delete message

**Вход**

```
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "sectionname" : "Section1"}' localhost:3001/forum/addsection
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "topicname" : "Topic1", "sectionId" : "1"}' localhost:3001/forum/addtopic
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "messagetext" : "blablabla", "topicId" : "1"}' localhost:3001/forum/addmessage
curl localhost:3001/forum/getallmessagesbytopicid?topicId=1 | python3 -m json.tool
```

**Выход**

```
[
    {
        "id": 1,
        "topicId": 1,
        "replyID": null,
        "userId": 111,
        "usernick": "theo",
        "messagetext": "blablabla",
        "createdAt": "2023-06-17T22:07:49.592Z",
        "updatedAt": "2023-06-17T22:07:49.592Z",
        "parentReply": null
    }
]
```

**Вход**

```
curl -X POST -H 'Content-Type: application/json' -d '{"id" : "1"}' localhost:3001/forum/deletemessage
```

**Выход**

Нет объектов Message

- Update message

**Вход**

```
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "sectionname" : "Section1"}' localhost:3001/forum/addsection
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "topicname" : "Topic1", "sectionId" : "1"}' localhost:3001/forum/addtopic
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111","usernick" : "theo", "messagetext" : "blablabla", "topicId" : "1"}' localhost:3001/forum/addmessage
curl localhost:3001/forum/getallmessagesbytopicid?topicId=1 | python3 -m json.tool
```

**Выход**

```
[
    {
        "id": 1,
        "topicId": 1,
        "replyID": null,
        "userId": 111,
        "usernick": "theo",
        "messagetext": "blablabla",
        "createdAt": "2023-06-17T22:10:09.854Z",
        "updatedAt": "2023-06-17T22:10:09.854Z",
        "parentReply": null
    }
]
```

**Вход**

```
curl -X POST -H 'Content-Type: application/json' -d '{"userId" : "111",  "messagetext" : "qweqweqweqwqew", "id" : "1"}' localhost:3001/forum/updatemessage
curl localhost:3001/forum/getallmessagesbytopicid?topicId=1 | python3 -m json.tool
```

**Выход**

```
[
    {
        "id": 1,
        "topicId": 1,
        "replyID": null,
        "userId": 111,
        "usernick": "theo",
        "messagetext": "qweqweqweqwqew",
        "createdAt": "2023-06-17T22:10:09.854Z",
        "updatedAt": "2023-06-17T22:10:53.563Z",
        "parentReply": null
    }
]
```

- Каскадное удаление всех объектов Section, Topic, Reply, Message

Выполнить тест **Аdd Message and Reply test**, потом выполнить

```
curl -X POST -H 'Content-Type: application/json' -d '{"id" : "1"}' localhost:3001/forum/deletesection
```

Убедиться что все созданные объекты удалены из базы

#### **Useful SQL queries**

- How to get pg table columns
  `SELECT * FROM information_schema.columns where table_name = 'Section'`

- How to get topic for specific sectionid
  `SELECT * FROM "public"."Topic" t WHERE t.sectionid= 1`

#### MEMORYLEAKS

Проект был проверен на утечку памяти. Утечек памяти не было обнаружено.
Ниже представлен скриншот с поведением памяти во время игры. Где видно возрастающий график, во время когда происходит анимация, и уменьшение потребляемой памяти, когда анимация была закончена.

![Профилировщик в реальном времени](/memoryleaks/profiler_real_time.png)

Так же была проведена проверка в режиме реального времени с открытой вкладкой Memory, где не было обнаружено многократное увеличение памяти во время перерисовки экрана и анимации. Память оставалась в переделах 6-8MB.

![Проверка утечки памяти](/memoryleaks/heap_real_time.png)

Проверка проводила в режиме непосредственной игры. Какие были возможные места утечки:
1. Многократная перерисовка всего экрана с игрой.

   **Проблема:** при любом изменении одного элемента на экране - делать перерисовку всей страницы.

   **Что было сделано:** изменяемые объекты были вынесены на отдельные слои-canvas. Следовательно, при изменении объекта (например, поднятие бутылки) перерисуется только этот объект, а не вся страница с другими объектами.

2. Незавершающаяся анимация.

   **Проблема:** возможно неправильное написание таймера для воспроизведения анимации.

   **Что было сделано:** анимация была сделано с помощью функций requestAnimationFrame, что упрощает работу с анимацией и предотвращает появление ошибок.

3. Уход в бесконечный цикл перерисовки элемента canvas.

   **Проблема:** при неккоректном использовании useEffect или смене свойства объекта можно было бесконечно перерисовывать этот объект.

   **Что было сделано:** разработка с использованием средств диагностики для исключения данных ситуаций.
