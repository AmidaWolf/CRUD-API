import { IncomingMessage, ServerResponse } from 'http';
import { HttpStatusCodes } from './types.js';

export function setResponseWithStatusCode(
  statusCode: HttpStatusCodes,
  message: string,
  res: ServerResponse & { req: IncomingMessage },
) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: message }));
}
