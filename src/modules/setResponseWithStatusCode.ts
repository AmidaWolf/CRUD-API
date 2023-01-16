import { IncomingMessage, ServerResponse } from 'http';
import { HttpStatusCodes, User } from '../types';

export function setResponseWithStatusCode(
  statusCode: HttpStatusCodes,
  message: string | User | User[],
  res: ServerResponse & { req: IncomingMessage },
) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(message));
}
