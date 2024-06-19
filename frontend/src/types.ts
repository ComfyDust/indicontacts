export type Validator = (str: string) => boolean;

export type Contact = {
  lastModified: Date;
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
export type NewContact = Omit<Contact, 'lastModified'>;

export type ListContactsParams = {
  format?: 'json' | 'csv';
  startTime?: Date;
  endTime?: Date;
};
export type ListContactsResp = {
  result: Contact[];
};
