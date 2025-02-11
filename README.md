# News Aggregator Webapp

News Aggregator Webapp built with React + TypeScript, that pulls data from
multiple news sources, bind that data together into a nice.

Required Node 20 >=

## Running a production build with Docker

1. Make sure you have [docker](https://docs.docker.com/) installed on your
   machine
2. The app needs API keys from each api provide:
   [NewsAPI](https://newsapi.org/docs)
   [TheGuardian](https://open-platform.theguardian.com/documentation/)
   [NyTimes](https://developer.nytimes.com/docs/articlesearch-product/1/routes/articlesearch.json/get)

3. Before running the docker containte, it is needed to have the API keys in an
   `.env` file. Make sure all `.env` keys are prefixed with `VITE_`, otherwise
   Vite and Docker will ignore them

```shell
docker compose up --build
```

This will automatically download Node and all the needed dependencies, then the
app will be built for production and a `localhost` server will start running on
port `8080`

After the setup simply go to `http://localhost:8080` to access the app.

## Running the project locally

You can run the project following this steps:

1. Clone the repo
2. Make sure to do `npm i`
3. Run `npm run dev`

This will start the project and listen for code changes and automatically
refresh very fast because Vite is amazing.

## Stack

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-4B3263?style=for-the-badge&logo=docker&logoColor=white)

## Dev scripts

For code linting run:
`npm run lint`

For styling linting SCSS run `npm run lint:style`
Note: Make sure an SCSS module contains `@define .class` above the parent class,
otherwise the check will be skipped

Example:

```scss
/* @define my-component */
.my-component {
}
```

Code formatting: `npm run format`
To fix code formatting use: `npm run format:fix`
For type checking run `npm run type-check`

## Branches

Each PR is checked for code quality using Github actions. Stable code is pushed
to `production` Main staging branch is `main`

## Project structure

Each directory contains all the components, hooks, reducers, and utilities
specific to that feature, with some minor modifications

For styling SCSS with BEM pattern is used
