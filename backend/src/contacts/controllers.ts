import { Contact, Controller } from '../types.js';
import { contactService } from './service.js';

export const createContact: Controller<Contact> = async(newContact, res) => {
  const createResult = await contactService.create(newContact);
  res.status(204).json({ result: createResult });
};

export const listContacts: Controller = async ({ format }, res) => {
  const listResult = await contactService.list(format);
  if (format === 'csv') {
    res.attachment('contacts.csv').send(listResult);
  } else {
    res.json({ result: listResult });
  }
  res.status(200)
};
