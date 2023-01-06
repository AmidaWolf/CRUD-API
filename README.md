# CRUD-API

For test server with `curl` in console:
0. ```curl http://localhost:4000/api/users```
1. ```curl -X POST -H "Content-Type: application/json" -d 'id=20354d7a-e4fe-47af-8ff6-187bca92f3f9&username=Test&age=20&hobbies=['tests', 'coding']' http://localhost:4000/api/users```
2. ```curl http://localhost:4000/api/users/20354d7a-e4fe-47af-8ff6-187bca92f3f9```
3. ```curl -X PUT -H "Content-Type: application/json" -d 'username=Test1&age=20&hobbies=['tests', 'coding']' http://localhost:4000/api/users/20354d7a-e4fe-47af-8ff6-187bca92f3f9```
4. ```curl -X DELETE http://localhost:4000/api/users/20354d7a-e4fe-47af-8ff6-187bca92f3f9```