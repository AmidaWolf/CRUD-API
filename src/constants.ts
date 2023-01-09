import { HttpStatusCodes200, HttpStatusCodes400, HttpStatusCodes500 } from './types';

export const pathToData = './src/data/data.json';

export const httpStatusCodes = {
  ...HttpStatusCodes200,
  ...HttpStatusCodes400,
  ...HttpStatusCodes500,
};

export const httpMessages = {
  MISSING_FIELDS: 'Missing required fields',
  AGE_NUMBER: `Age field should be a number`,
  MISSED_GET_ENDPOINT: 'Server dont have this endpoint for GET method',
  MISSED_POST_ENDPOINT: 'Server dont have this endpoint for POST method',
  MISSED_PUT_ENDPOINT: 'Server dont have this endpoint for PUT method',
  MISSED_DELETE_ENDPOINT: 'Server dont have this endpoint for DELETE method',
  MISSED_ENDPOINTS: 'Server dont have this endpoint',
  USER_ADDED: 'User added successfully',
  USER_UPDATED: 'User updated successfully',
  USER_DELETED: 'User deleted successfully',
  OPERATION_FAILED: 'Operation failed. Please try again',
  ID_IS_INVALID: 'User id is invalid (not uuid)',
  USER_NOT_FOUND: 'User not found',
  DELETE_SUCCESS: 'User deleted successfully',
};
