import axios, { AxiosRequestConfig, Method } from 'axios';

import { Contact } from './types';

// TODO: Move this to an env config/settings
const apiBaseEndpoint = 'http://localhost:3000/v0';

export class IndiContactClient {
  _axios;
  constructor() {
    this._axios = axios.create({
      baseURL: apiBaseEndpoint,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async _makeRequest<D>(method: Method, path: string, data?: D) {
    const request: AxiosRequestConfig<D> = {
      url: path,
      method,
    };

    if (data) {
      if (method.toUpperCase() === 'GET') {
        request.params = data;
      } else {
        request.data = data;
      }
    }

    const response = await this._axios.request<D>(request);
    return response.data;
  }

  async createContact(newContact: Contact) {
    return this._makeRequest('POST', '/contacts', newContact);
  }

  async listContacts(format: 'json' | 'csv' = 'json') {
    return this._makeRequest<any>('GET', '/contacts', { format });
  }
};
