Live at http://localhost:3001

## FIRST RUN DATABASE

```bash

$ docker-compose up

```

## SECOND RUN API

```bash

$ cd ./api
$ yarn install
$ yarn migrate:up
$ yarn start:dev

```

## LATEST RUN APP

```bash

$ cd ./app
$ yarn install
$ yarn dev

```

## CREDENTIALS

```bash

http://localhost:3001/admin/login

email: demo@gmail.com
password: demo

```

## AVAILABLE ROUTES

```bash

http://localhost:3001/admin/users // for manage users
http://localhost:3001/admin/slots // for manage slots
http://localhost:3001/admin/customers // for manage customers


```