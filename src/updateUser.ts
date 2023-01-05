import { IncomingMessage, ServerResponse } from 'http';
import { User } from './types.js';
import { writeFile } from 'fs';

function updateUser(req: IncomingMessage, res: ServerResponse & { req: IncomingMessage }, users: User[], user: User) {
  const index = users.findIndex((u) => u.id === user.id);

  users[index] = user;

  writeFile('./users.json', JSON.stringify(users), (err) => {
    if (err) throw err;
    console.log('User updated successfully');
  });
}
