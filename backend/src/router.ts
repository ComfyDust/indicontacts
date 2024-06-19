import express from 'express';
import { query } from 'express-validator';

import { handler } from './handler.js';
import { createContact, listContacts } from './contacts/controllers.js';
import { contactValidator, listContactsParamValidator } from './contacts/validators.js';

const router = express.Router();

router.post('/contacts', contactValidator, handler(createContact));
router.get('/contacts', listContactsParamValidator, handler(listContacts));

export default router;
