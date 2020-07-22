# Nest JS Training
![GitHub last commit](https://img.shields.io/github/last-commit/ambrizals/nestjs-training)
![GitHub commit activity](https://img.shields.io/github/commit-activity/w/ambrizals/nestjs-training)

This repository is used to learn how to use Nestjs to build microservices for providing API Endpoint, you can use this repository to for templates but some built in packages from nestjs is not used because some reason.

# Installation
```
yarn

## or

npm run install

```
# Running Application
```
# Development mode
$ npm run start

# Watch Mode
$ npm run start:dev

# Production Mode
$ npm run start:prod
```

# E2E Testing
Before starting some E2E testing, you need to know nestjs is not have access typeorm depedencies to creating mock or faker to input or process data. Sometime we need to test API endpoint to check is your code finish to process or fail to process, this is a step to start E2E testing on this repository :

1. Make sure all depedencies on packages.json is already installed or stored on node_modules directories.
2. Before run testing run 'npm run start:testing' or 'yarn start:testing' to serve the application on testing environment, on default this repository not automatically compile nestjs or running nestjs server when you execute test:e2e script.
3. Import SQL Query on database directory to creating user.
4. Now you can execute 'npm run test:e2e' or 'yarn test:e2e'

By default nestjs have E2E testing with jest and supertest, but in this repository i used jest and puppeteer to E2E testing based on browser testing.

# NestJS
More information about nestjs please see [Nest JS Readme](https://github.com/ambrizals/nestjs-training/blob/master/NEST_README.md)