import { AsyncParser } from '@json2csv/node/index.js';
import flatten from '@json2csv/transforms/flatten.js';
import { Collection, MongoClient } from 'mongodb';

import { databaseUrl } from '../settings.js';
import { Contact, DbContact } from '../types.js';

class ContactService {
  _dbName = 'indicontacts';
  _collectionName = 'contacts';
  _mongoClient?: MongoClient;

  // TODO: Move to parent `BaseService` class
  async _dbCollection(): Promise<Collection<DbContact>> {
    if (!this._mongoClient) {
      const client = new MongoClient(databaseUrl);
      this._mongoClient = await client.connect();
    }
    return this._mongoClient.db(this._dbName).collection<DbContact>(this._collectionName);
  }

  async create(newContact: Contact) {
    const dbContacts = await this._dbCollection();
    return dbContacts.updateOne(
      { _id: newContact.email },
      {
        $currentDate: { lastModified: true },
        $set: newContact,
      },
      { upsert: true },
    );
  }

  async list(outputFormat: 'json' | 'csv' = 'json') {
    const dbContacts = await this._dbCollection();
    const contactList = await dbContacts.find().project({ _id:0 }).toArray();

    if (outputFormat === 'csv') {
      const parser = new AsyncParser({ transforms: [flatten()] });
      return parser.parse(contactList).promise();
    }

    return contactList;
  }
}

export const contactService = new ContactService();
