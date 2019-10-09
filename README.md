# Amazon Photo App
>This project is aimed at optimizing the performance of the legacy photo service.

## Related Projects

  - https://github.com/rpt13-bohemian-rhapsody/rpt13-SDC-maddie-service
  - https://github.com/rpt13-bohemian-rhapsody/rpt13-SDC-alicia-service
  - https://github.com/rpt13-bohemian-rhapsody/rpt13-SDC-david-service

## Engineering Journal
  - [Google document Link](https://drive.google.com/file/d/1Z-u6jwoJUng5UYMMGGgedn06sXM8zC79/view?usp=sharing)

## Table of Contents 
  1. [Requirements](#1-Requirements)
  2. [Development](#2-Development)
  - 2.1 [Installing Dependencies](#21-Installing-Dependencies)
  - 2.2 [API Endpoints](#22-API-Endpoints)

## 1. Requirements

- Node >=10.13.0
- MySql

## 2. Development
### 2.1 Installing Dependencies

From within the root directory:

```sh
npm install
```
### Seeding Database
```sh
npm run seed (This will require the API key from, need to look at seed.js to see where to place API key.)
```
### Setting up Webpack
```sh
npm run react-dev
```
### Run server
```sh
npm run server-dev
```

## 2.2 API Endpoints
  - GET /product/:id
    - returns all photo data based on specific product id

  - POST /product/:id/:ptag
    - posts 5 photo data to specific product id (if the same data doesn't exist in database)
    - photo data is generated from unplash API based on product tag name
    - no return value
      
  - PUT /product/:id/:user
    - updates user info of photo data based on specific product id
    - returns updated item counts
  
  - DELETE /product/:id
    - deletes all photo data based on specific product id
    - returns deleted item counts

  * Sample data in JSON stringified format 
  ```
  [
      {"id":225,
      "photoid":"cukIbtQ5Hdk",
      "link":"https://images.unsplash.com/photo-1484068043587-e86f6124d2ee?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb&ixid=eyJhcHBfaWQiOjcyNjg1fQ",
      "username":"hibow",
      "productTag":"window",
      "tagID":"2"}
  ]
  ```
