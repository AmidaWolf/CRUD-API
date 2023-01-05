import { createServer } from 'http';
import { parse, UrlWithParsedQuery } from 'url';
import { User } from './src/types.js';
import fs from 'fs';
import { getUser } from './src/getUser.js';
import { getUsers } from './src/getUsers.js';
import { setResponseWithStatusCode } from './src/setResponseWithStatusCode.js';
import { httpMessages, httpStatusCodes } from './src/constants.js';
import { addUser } from './src/addUser.js';

let users: User[];

try {
  const fileData = await fs.promises.readFile('./data.json');
  const dataString = fileData.toString('utf8');
  users = JSON.parse(dataString);
} catch (err) {
  throw err;
}

let lastIndex = users.length === 0 ? 0 : users[users.length - 1].id;

const server = createServer((req, res) => {
  let parsedUrl: UrlWithParsedQuery;

  if (req.url) {
    parsedUrl = parse(req.url, true);

    const userId = parsedUrl.pathname?.split('/')[2];

    if (req.method === 'GET') {
      if (parsedUrl.pathname === '/api/users') {
        getUsers(users, req, res);
      } else if (parsedUrl.pathname === '/api/users/' + userId && userId) {
        getUser(userId, users, req, res);
      } else {
        setResponseWithStatusCode(httpStatusCodes.NOT_FOUND, httpMessages.MISSED_GET_ENDPOINT, res);
      }
    } else if (req.method === 'POST') {
      if (parsedUrl.pathname === '/api/users') {
        addUser(req, res, users);
      } else {
        setResponseWithStatusCode(httpStatusCodes.NOT_FOUND, httpMessages.MISSED_POST_ENDPOINT, res);
      }
    } else if (req.method === 'PUT') {
      //put
    } else if (req.method === 'DELETE') {
      //delete
    }
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Server dont have this endpoint' }));
  }
});
