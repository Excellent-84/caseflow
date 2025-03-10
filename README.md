## Система работы с обращениями

<br>

<div style="display: flex; flex-wrap: wrap;">
  <img src="https://img.shields.io/badge/typescript-FFFFFF?style=for-the-badge&logo=typescript&logoColor=3178C6"/>
  <img src="https://img.shields.io/badge/node.js-FFFFFF?style=for-the-badge&logo=node.js&logoColor=5FA04E"/>
  <img src="https://img.shields.io/badge/express-FFFFFF?style=for-the-badge&logo=express&logoColor=000000"/>
  <img src="https://img.shields.io/badge/typeorm-FFFFFF?style=for-the-badge&logo=typeorm&logoColor=FE0803"/>
  <img src="https://img.shields.io/badge/PostgreSQL-FFFFFF?style=for-the-badge&logo=PostgreSQL&logoColor=4169E1"/>
  <img src="https://img.shields.io/badge/Docker-FFFFFF?style=for-the-badge&logo=Docker&logoColor=2496ED"/>
</div>

<br>

<details>
<summary><strong>Описание проекта</strong></summary>

 - Система работы с обращениями. Каждое обращение имеет следующие статусы:
   - Новое.
   - В работе.
   - Завершено.
   - Отменено.

 - В системе есть следующие эндпоинты:
   - Создание обращения с возможностью отправить текст самого обращения и темой обращения.
   - Взять обращение в работу.
   - Завершить обработку обращения с возможностью отправить текст с решением проблемы.
   - Отмена обращения с возможностью отправить текст с причиной отмены.
   - Получение списка обращений с возможность фильтрации по конкретной дате и по диапазону дат.
   - Эндпоинт отмены всех обращений, которые находятся в статусе "В работе".

 - Все обращения анонимные.

 - Дополнительно:
   - Валидация входящих данных с использованием express-validator.
   - Логирование основных событий с помощью Winston.
   - Документация Swagger.
   - Развертывание проекта с помощью Docker.

</details>

<details>
<summary><strong>Как запустить проект</strong></summary>

##### Клонировать репозиторий и перейти в него в командной строке:

```bash
$ git clone https://github.com/Excellent-84/caseflow.git
$ cd caseflow
```

##### Создать файл .env и указать необходимые токены по примеру .env.example:

```bash
$ touch .env
```

##### Собрать и запустить контейнеры с помощью Docker:

```bash
$ docker compose up -d
```

##### При необходимости проверить логи запущенного контейнера:

```bash
$ docker logs caseflow_app
```

##### Остановить контейнеры:

```bash
$ docker compose down
```

##### Проект будет доступен по адресу:

```bash
http://localhost:3000
```

</details>

<details>
<summary><strong>Примеры запросов к API с помощью Postman</strong></summary>

##### Создание обращения:

Метод POST к эндпоинту   http://localhost:3000/cases

Во вкладке Body выбрать raw. Указать данные в формате json.

Пример запроса:

```bash
{
  "subject": "Проблема с заказом",
  "description": "Клиент не получил заказ вовремя."
}
```

Пример ответа:

```bash
{
  "subject": "Проблема с заказом",
  "description": "Клиент не получил заказ вовремя.",
  "resolutionText": null,
  "cancellationReason": null,
  "id": 2,
  "status": "new",
  "createdAt": "2025-03-09T23:51:24.921Z",
  "updatedAt": "2025-03-09T23:51:24.921Z"
}
```

##### Перевести обращение в статус "В работе":

Метод PATCH к эндпоинту   http://localhost:3000/cases/{id}/in-progress

Пример ответа:

```bash
{
  "id": 2,
  "subject": "Проблема с заказом",
  "description": "Клиент не получил заказ вовремя.",
  "status": "in_progress",
  "resolutionText": null,
  "cancellationReason": null,
  "createdAt": "2025-03-09T23:51:24.921Z",
  "updatedAt": "2025-03-09T23:52:52.367Z"
}
```

##### Получение списка всех обращений с фильтрацией по диапазону дат:

Метод GET к эндпоинту   http://localhost:3000/cases

Во вкладке Params в поле key указать startDate и endDate.
В поле value указать их значения в формате 'YYYY-MM-DD'.

Пример ответа:

```bash
[
  ...
  {
    "id": 2,
    "subject": "Проблема с заказом",
    "description": "Клиент не получил заказ вовремя.",
    "status": "in_progress",
    "resolutionText": null,
    "cancellationReason": null,
    "createdAt": "2025-03-09T23:51:24.921Z",
    "updatedAt": "2025-03-09T23:52:52.367Z"
  },
  ...
]
```

##### Завершить обращение:

Метод PATCH к эндпоинту   http://localhost:3000/cases/{id}/complete

Во вкладке Body выбрать raw. Указать данные в формате json.

Пример запроса:

```bash
{
  "resolutionText": "Проблема решена"
}
```

Пример ответа:

```bash
{
  "id": 2,
  "subject": "Проблема с заказом",
  "description": "Клиент не получил заказ вовремя.",
  "status": "completed",
  "resolutionText": "Проблема решена",
  "cancellationReason": null,
  "createdAt": "2025-03-09T23:51:24.921Z",
  "updatedAt": "2025-03-10T00:00:57.764Z"
}
```

##### Отменить обращение:

Метод PATCH к эндпоинту   http://localhost:3000/cases/{id}/cancel

Во вкладке Body выбрать raw. Указать данные в формате json.

Пример запроса:

```bash
{
  "cancellationReason": "Ошибка в данных"
}
```

Пример ответа:

```bash
{
    "id": 2,
    "subject": "Проблема с заказом",
    "description": "Клиент не получил заказ вовремя.",
    "status": "cancelled",
    "resolutionText": "Проблема решена",
    "cancellationReason": "Ошибка в данных",
    "createdAt": "2025-03-09T23:51:24.921Z",
    "updatedAt": "2025-03-10T00:03:33.626Z"
}
```

##### Отменить все обращения со статусом "В работе":

Метод PATCH к эндпоинту   http://localhost:3000/cases/cancel-all-in-progress

Пример ответа:

```bash
{
    "message": "Cancelled 1 cases in progress"
}
```

<br>

<strong>Подробную версию запросов можно посмотреть по адресу:</strong>
- Swagger: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

</details>

<br>

<strong>Автор: [Горин Евгений](https://github.com/Excellent-84)</strong>