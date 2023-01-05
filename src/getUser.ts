import { validate as uuidValidate } from 'uuid';
import { IncomingMessage, ServerResponse } from 'http';
import { User } from './types.js';

export function getUser(
  userId: string,
  users: User[],
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage> & {req: IncomingMessage}
) {
  if (!uuidValidate(userId)) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'Invalid userId' }));
    return;
  }

  const user = users.find((u) => u.id === userId);

  if (!user) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'User not found' }));
    return;
  }
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(user));
}