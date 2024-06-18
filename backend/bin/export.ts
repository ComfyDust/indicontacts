import path from 'path';
import { access, mkdir, writeFile } from 'node:fs/promises';

import { AsyncParser } from '@json2csv/node';
import { flatten } from '@json2csv/transforms';

import { contactService } from '../src/contacts/service.js';

const exportsDir = 'exports';

const exportContacts = async () => {
  // Get contacts
  const contacts = await contactService.list('csv') as string;

  // Create exports directory if needed
  try {
    await access(exportsDir);
  } catch {
    await mkdir(exportsDir);
  }

  // Save CSV to disk
  // TODO: Expose filename/path config for export CSV
  const dateTimeStr = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15); // YYYYMMDDTHHMMSS
  const exportFullName = path.join(exportsDir, `contacts-${dateTimeStr}.csv`);

  await writeFile(exportFullName, contacts);
};

exportContacts().then(() => process.exit(0));
