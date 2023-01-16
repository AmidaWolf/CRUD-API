import { validate as uuidValidate } from 'uuid';
import { IncomingMessage, ServerResponse } from 'http';
import { User } from '../types';
import { setResponseWithStatusCode } from './setResponseWithStatusCode';
import { httpMessages, httpStatusCodes } from '../constants';

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

  setResponseWithStatusCode(httpStatusCodes.OK, user, res);
}
