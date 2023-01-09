# CRUD-API

## How to start working with this server
1. Open console, go to the project folder.
2. Run `npm install`.
3. Run `npm run start:build` or another script in `package.json`.

## Scripts  
* `npm run start:dev`  
Starts the app in development using `nodemon` and `ts-node` to do hot reloading.  
* `npm run start:build`
Starts the app in production by first building the project with `npm run build`, and then executing the compiled JavaScript at `dist/index.js`. 
* `npm run start:multi`  
Starts the app with multiple instances for horizontal scaling in production by building the project with `npm run build`, and then executing the compiled JavaScript at `dist/index.js`. 
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

## How to check, what this server really work after `npm run start:dev` or `npm run start: build`:
Simple way is try to use `curl`:  
`curl http://localhost:4000/api/users`. Expected response: empty array or array with users if they placed on database early.
Or just run `npm run test`.

## How to check, what this server really work after `npm run start:multi`:
1. Run app with `npm run start:multi`:
2. Open console and write `url -X POST -H "Content-Type: application/json" -d 'username=Test&age=20&hobbies=['tests', 'coding']' http://localhost:4001/api/users`
3. Write `curl http://localhost:4002/api/users`. Expected response: array with one user (`username: Test`).
This means what state of db is consistent between different workers (4001 and 4002 port).