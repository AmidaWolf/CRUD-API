# CRUD-API

## How to start working with this server
1. Open console, go to the project folder.
2. Run `npm install`.
3. Run `npm run start:build` or another script in `package.json`.

## Scripts  
* `npm run start:dev`  
Starts the application in development using `nodemon` and `ts-node` to do hot reloading.  
* `npm run start:build`   
Starts the app in production by first building the project with `npm run build`, and then executing the compiled JavaScript at `dist/index.js`.  
* `npm run build`  
Builds the app at build.
* `npm run test`  
Runs the `jest` tests once.
* `npm run test:watch`  
Run the jest tests in watch mode, waiting for file changes.
* `npm run lint`  
Run `eslint` for linting code.
* `npm run format`  
Run `eslint` for linting code with fix errors.

## How to check, what this server really work after `start:dev` or `start: build`:
Simple way is try to use `curl`:  
```curl http://localhost:4000/api/users```