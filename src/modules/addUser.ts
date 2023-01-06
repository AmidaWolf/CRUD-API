import { writeFile } from 'fs';
import { User } from '../types.js';
import { IncomingMessage, ServerResponse } from 'http';
import querystring from 'querystring';
import { v4 as uuidv4 } from 'uuid';
import { setResponseWithStatusCode } from './setResponseWithStatusCode.js';
import { httpMessages, httpStatusCodes, pathToData } from '../constants.js';
import path from 'path';

export function addUser(req: IncomingMessage, res: ServerResponse & { req: IncomingMessage }, users: User[]) {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    const parsedBody = querystring.parse(body);

    if (!parsedBody.username || !parsedBody.age || !parsedBody.hobbies) {
      setResponseWithStatusCode(httpStatusCodes.BAD_REQUEST, httpMessages.MISSING_FIELDS, res);
      return;
    }

    if (Array.isArray(parsedBody.age) || isNaN(Number(parsedBody.age))) {
      setResponseWithStatusCode(httpStatusCodes.BAD_REQUEST, httpMessages.AGE_NUMBER, res);
      return;
    }

    const user: User = {
      id: uuidv4(),
      username: Array.isArray(parsedBody.username) ? parsedBody.username.join(' ') : parsedBody.username,
      age: Number(parsedBody.age),
      hobbies: Array.isArray(parsedBody.hobbies) ? parsedBody.hobbies : [parsedBody.hobbies],
    };

    users.push(user);

    writeFile(path.resolve(pathToData), JSON.stringify(users), (err) => {
      if (err) {
        setResponseWithStatusCode(httpStatusCodes.INTERNAL_SERVER_ERROR, httpMessages.OPERATION_FAILED, res);
        return;
      }

      setResponseWithStatusCode(httpStatusCodes.CREATED, JSON.stringify(user), res);
    });
  });
}
