import express from 'express';
import { query } from 'express-validator';

import { handler } from './handler.js';
import { createContact, listContacts } from './contacts/controllers.js';
import { contactValidator } from './contacts/validators.js';

const router = express.Router();

router.post('/contacts', contactValidator, handler(createContact));
router.get('/contacts', query('format').isIn(['json', 'csv']).default('json').optional(), handler(listContacts));

export default router;
