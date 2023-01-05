import { IncomingMessage, ServerResponse } from 'http';
import { User } from './types.js';

export function getUsers(
  users: User[],
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage> & { req: IncomingMessage },
) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(users));
}
