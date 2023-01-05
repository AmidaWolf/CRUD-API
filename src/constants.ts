import { HttpStatusCodes200, HttpStatusCodes400, HttpStatusCodes500 } from './types.js';

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
  MISSED_ENDPOINTS: 'Server dont have this endpoint',
  USER_ADDED: 'User added successfully',
  USER_UPDATED: 'User updated successfully',
  USER_DELETED: 'User deleted successfully',
  OPERATION_FAILED: 'Operation failed. Please try again',
};
