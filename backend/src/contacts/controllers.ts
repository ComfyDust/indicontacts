import { Contact, Controller, ListContactsParams } from '../types.js';
import { contactService } from './service.js';

export const createContact: Controller<Contact> = async(newContact, res) => {
  const createResult = await contactService.create(newContact);
  res.status(204).json({ result: createResult });
};

export const listContacts: Controller<ListContactsParams> = async ({ format, startTime, endTime }, res) => {
  const safeDate = (isoTime: string | undefined) => !!isoTime ? new Date(isoTime) : undefined;
  const listResult = await contactService.list(safeDate(startTime), safeDate(endTime), format);
  if (format === 'csv') {
    res.attachment('contacts.csv').send(listResult);
  } else {
    res.json({ result: listResult });
  }
  res.status(200)
};
