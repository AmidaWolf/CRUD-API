import { IncomingMessage, ServerResponse } from 'http';
import { User } from '../types.js';
import { setResponseWithStatusCode } from './setResponseWithStatusCode.js';
import { httpStatusCodes } from '../constants.js';

export function getUsers(users: User[], req: IncomingMessage, res: ServerResponse & { req: IncomingMessage }) {
  setResponseWithStatusCode(httpStatusCodes.OK, JSON.stringify(users), res);
}
