import { IncomingMessage, ServerResponse } from 'http';
import { User } from '../types.js';
import { writeFile } from 'fs';
import { validate as uuidValidate } from 'uuid';
import { setResponseWithStatusCode } from './setResponseWithStatusCode.js';
import { httpMessages, httpStatusCodes, pathToData } from '../constants.js';
import path from 'path';

export function deleteUser(
  userId: string,
  users: User[],
  req: IncomingMessage,
  res: ServerResponse & { req: IncomingMessage },
) {
  if (!uuidValidate(userId)) {
    setResponseWithStatusCode(httpStatusCodes.BAD_REQUEST, httpMessages.ID_IS_INVALID, res);
    return;
  }

  const userIndex = users.findIndex((u) => u.id === userId);
  if (userIndex === -1) {
    setResponseWithStatusCode(httpStatusCodes.NOT_FOUND, httpMessages.USER_NOT_FOUND, res);
    return;
  }

  users.splice(userIndex, 1);

  writeFile(path.resolve(pathToData), JSON.stringify(users), (err) => {
    if (err) {
      setResponseWithStatusCode(httpStatusCodes.INTERNAL_SERVER_ERROR, httpMessages.OPERATION_FAILED, res);
      return;
    }

    setResponseWithStatusCode(httpStatusCodes.CREATED, httpMessages.DELETE_SUCCESS, res);
  });
}
