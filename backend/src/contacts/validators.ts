import { checkSchema } from 'express-validator';

const usStates = [
  'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID',
  'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE',
  'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY',
];

export const contactValidator = checkSchema({
  email: { isEmail: true },

  // "name"
  'name.first': { isString: true, notEmpty: true },
  'name.last': { isString: true, notEmpty: true },

  // "address"
  'address.street': { isString: true, notEmpty: true },
  'address.city': { isString: true, notEmpty: true },
  'address.state': { isString: true, notEmpty: true, isIn: { options: [usStates] } },
  'address.zip': { isString: true, notEmpty: true, isNumeric: true, isLength: { options: { min: 5, max: 5 } } },
});
