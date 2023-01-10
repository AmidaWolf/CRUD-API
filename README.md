# CRUD-API
Simple CRUD API with node.js,nodemon, dotenv, cross-env, typescript, ts-node, eslint, prettier, uuid, jest, ts-jest, supertest with horizontal scaling based on Cluster API.

## How to start working with this app
1. Clone repo
```sh
git clone https://github.com/AmidaWolf/CRUD-API.git
```  
or download [zip](https://github.com/AmidaWolf/CRUD-API/archive/refs/heads/develop.zip).
2. Open console, go to the project folder `cd CRUD-API`.
3. Run `npm install`.
4. Run `npm run start:build` or another `run start` script in `package.json`.

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

## Endpoints
| HTTP Verbs | Endpoints          | Action                                                   | Error codes                                                                             |
|------------|--------------------|----------------------------------------------------------|-----------------------------------------------------------------------------------------|
| POST       | api/users          | To create record about new user and store it in database | `201` - created<br/>`400` - missed fields or incorrect type                             |
| GET        | api/users          | To return all users info                                 | `200` - OK with user data<br/>                                                          |
| GET        | api/users/{userId} | To return a user info with `userID`                      | `200` - OK with user data<br/>`400` - invalid ID<br/>`404` - user doesn't exist         |
| PUT        | api/users/{userId} | To edit a user info                                      | `200` - OK with updated user data<br/>`400` - invalid ID<br/>`404` - user doesn't exist |
| DELETE     | api/users/{userId} | To delete a user                                         | `204` - user deleted<br/>`400` - invalid ID<br/>`404` - user doesn't exist              |

## Example of valid collection of users data
```sh
[
  {
    id: 20354d7a-e4fe-47af-8ff6-187bca92f3f9, //generated in server as uuid4
    username: 'Test', //required
    age: 20, //required
    hobbies: ['tests', 'coding'], //required
  }
]
```

## Types of valid user
```sh
{
  id: string; //uuid4
  username: string;
  age: number;
  hobbies: string[] | [];
};
```