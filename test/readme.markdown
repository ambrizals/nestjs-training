# End to End Testing Information
Before starting some E2E testing, you need to know nestjs is not have access typeorm depedencies to creating mock or faker to input or process data. Sometime we need to test API endpoint to check is your code finish to process or fail to process, this is a step to start E2E testing on this repository :

1. Make sure all depedencies on packages.json is already installed or stored on node_modules directories.
2. Before run testing run 'npm run start:testing' or 'yarn start:testing' to serve the application on testing environment, on default this repository not automatically compile nestjs or running nestjs server when you execute test:e2e script.
3. Import SQL Query on database directory to creating user.
4. Now you can execute 'npm run test:e2e' or 'yarn test:e2e'

By default nestjs have E2E testing with jest and supertest, but in this repository i used jest and puppeteer to E2E testing based on browser testing.

# Directory Structure
In test directory i have 3 directory with difference function.

## Auth
This directory is created to process login authentication, this process is use puppeteer to login and return token to set on headers.

## Config
This directory is created to stored configuration needed on test.

## Schema
This directory is created to provide information about data input without touch test file to modify data input.
