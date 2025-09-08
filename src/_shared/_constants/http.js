export const HTTP = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
  UNPROCESSED_ENTITY: 422,
};
// Add comments for each HTTP status code the  comment should be on top of the code
/**
 * @constant {number} HTTP.OK - The request has succeeded.
 * @constant {number} HTTP.CREATED - The request has been fulfilled and resulted in a new resource being created.
 * @constant {number} HTTP.BAD_REQUEST - The server cannot or will not process the request due to a client error.
 * @constant {number} HTTP.UNAUTHORIZED - Authentication is required and has failed or has not yet been provided.
 * @constant {number} HTTP.NOT_FOUND - The requested resource could not be found.
 * @constant {number} HTTP.SERVER_ERROR - A generic error message, given when an unexpected condition was encountered.
 * @constant {number} HTTP.UNPROCESSED_ENTITY - The server understands the content type of the request entity, and the syntax is correct, but it was unable to process the contained instructions.
 */

