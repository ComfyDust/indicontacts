import { HttpStatusCode } from 'axios';

export class BaseError extends Error {
  httpStatus = HttpStatusCode.InternalServerError;
  httpResponse: { error: string, payload?: object } = { error: 'Unknown Error' };

  constructor(message = 'An unknown error occurred', exposeMessageInResponse = false) {
    super(message);
    if (exposeMessageInResponse) {
      this.httpResponse.error = message;
    }
  }

  withHttpResponse(message: string, payload: object | null = null) {
    if (message) {
      this.message = message;
    }

    this.httpResponse = { error: message };
    if (payload) {
      this.httpResponse.payload = payload;
    }
    return this;
  }
}

export class InternalServerError extends BaseError {}

export class InvalidParameterError extends BaseError {
  httpStatus = HttpStatusCode.BadRequest;
}

export class ResourceNotFoundError extends BaseError {
  httpStatus = HttpStatusCode.NotFound;
}
