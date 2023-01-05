export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[] | [];
};

export enum HttpStatusCodes200 {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
}

export enum HttpStatusCodes400 {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
}

export enum HttpStatusCodes500 {
  INTERNAL_SERVER_ERROR = 500,
}

export type HttpStatusCodes = HttpStatusCodes200 | HttpStatusCodes400 | HttpStatusCodes500;
