import { IncomingMessage, ServerResponse } from 'http';
import { User } from '../types';
import { setResponseWithStatusCode } from './setResponseWithStatusCode';
import { httpStatusCodes } from '../constants';

export function getUsers(users: User[], req: IncomingMessage, res: ServerResponse & { req: IncomingMessage }) {
  setResponseWithStatusCode(httpStatusCodes.OK, users, res);
}
