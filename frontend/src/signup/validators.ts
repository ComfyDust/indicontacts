import { Validator } from '../types';

export const isValidZip: Validator = (zipCode: string) => !!zipCode.match(/^[0-9]{5}$/);

// Adapted from https://stackoverflow.com/a/46181/4959694
export const isValidEmail: Validator = (email: string) => !!String(email)
  .toLowerCase()
  .match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
