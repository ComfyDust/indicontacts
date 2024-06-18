import { Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';

import { BaseError, InternalServerError, InvalidParameterError } from './errors.js';
import { Controller } from './types.js';

export const handler = (rawHandler: Controller<any>) => async (req: Request, res: Response) => {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      throw new InvalidParameterError().withHttpResponse(
        'Invalid Parameter',
        validationErrors.array(),
      );
    }

    const validatedData = matchedData(req);
    await rawHandler(validatedData, res);
  } catch (rawError) {
    let error: BaseError;
    if (rawError instanceof BaseError) {
      error = rawError;
    } else if (rawError instanceof Error) {
      error = new InternalServerError([rawError.message, rawError.stack].join('\n'));
    } else {
      error = new InternalServerError(String(rawError));
    }
    console.error('ERROR: %s', error.message);

    res.status(error.httpStatus);
    res.send(error.httpResponse);
  }
};
