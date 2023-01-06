import { validate as uuidValidate } from 'uuid';
import { IncomingMessage, ServerResponse } from 'http';
import { User } from '../types.js';
import { setResponseWithStatusCode } from './setResponseWithStatusCode.js';
import { httpMessages, httpStatusCodes } from '../constants.js';

export function getUser(
  userId: string,
  users: User[],
  req: IncomingMessage,
  res: ServerResponse & { req: IncomingMessage },
) {
  if (!uuidValidate(userId)) {
    setResponseWithStatusCode(httpStatusCodes.BAD_REQUEST, httpMessages.ID_IS_INVALID, res);
    return;
  }

  const user = users.find((u) => u.id === userId);

  if (!user) {
    setResponseWithStatusCode(httpStatusCodes.NOT_FOUND, httpMessages.USER_NOT_FOUND, res);
    return;
  }

  setResponseWithStatusCode(httpStatusCodes.OK, JSON.stringify(user), res);
}
