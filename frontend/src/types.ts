export type Validator = (str: string) => boolean;

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
