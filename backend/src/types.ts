import { Response } from 'express';

export type Controller<ReqBody = Record<string, any>> = (req: ReqBody, res: Response) => Promise<void>;

export type Contact = {
  email: string;
  name: {
    first: string;
    last: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
};

export interface DbContact extends Contact {
  _id: string; // email
  lastModified: Date;
};

export type ListContactsParams = {
  format?: 'json' | 'csv';
  startTime?: string; // ISO 8601
  endTime?: string; // ISO 8601
};
