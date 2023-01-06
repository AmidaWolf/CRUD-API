import { createServer } from 'http';
import { parse, UrlWithParsedQuery } from 'url';
import dotenv from 'dotenv';
import fs from 'fs';
import { getUser } from './modules/getUser.js';
import { getUsers } from './modules/getUsers.js';
import { setResponseWithStatusCode } from './modules/setResponseWithStatusCode.js';
import { httpMessages, httpStatusCodes, pathToData } from './constants.js';
import { addUser } from './modules/addUser.js';
import { updateUser } from './modules/updateUser.js';
import { deleteUser } from './modules/deleteUser.js';
import { User } from './types.js';
import path from 'path';

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = createServer(async (req, res) => {
  let users: User[];

  try {
    const fileData = await fs.promises.readFile(path.resolve(pathToData));
    const dataString = fileData.toString('utf8');
    users = JSON.parse(dataString);
  } catch (err) {
    setResponseWithStatusCode(httpStatusCodes.INTERNAL_SERVER_ERROR, httpMessages.OPERATION_FAILED, res);
    return;
  }

  let parsedUrl: UrlWithParsedQuery;

  if (req.url) {
    parsedUrl = parse(req.url, true);

    const userId = parsedUrl.pathname?.split('/')[3];

    switch (req.method) {
      case 'GET':
        if (parsedUrl.pathname === '/api/users') {
          getUsers(users, req, res);
        } else if (parsedUrl.pathname === '/api/users/' + userId && userId) {
          getUser(userId, users, req, res);
        } else {
          setResponseWithStatusCode(httpStatusCodes.NOT_FOUND, httpMessages.MISSED_GET_ENDPOINT, res);
        }
        break;
      case 'POST':
        if (parsedUrl.pathname === '/api/users') {
          addUser(req, res, users);
        } else {
          setResponseWithStatusCode(httpStatusCodes.NOT_FOUND, httpMessages.MISSED_POST_ENDPOINT, res);
        }
        break;
      case 'PUT':
        if (parsedUrl.pathname === '/api/users/' + userId && userId) {
          updateUser(userId, users, req, res);
        } else {
          setResponseWithStatusCode(httpStatusCodes.NOT_FOUND, httpMessages.MISSED_PUT_ENDPOINT, res);
        }
        break;
      case 'DELETE':
        if (parsedUrl.pathname === '/api/users/' + userId && userId) {
          deleteUser(userId, users, req, res);
        } else {
          setResponseWithStatusCode(httpStatusCodes.NOT_FOUND, httpMessages.MISSED_DELETE_ENDPOINT, res);
        }
        break;
      default:
        res.statusCode = 405;
        res.end();
        break;
    }
  } else {
    setResponseWithStatusCode(httpStatusCodes.NOT_FOUND, httpMessages.MISSED_ENDPOINTS, res);
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
