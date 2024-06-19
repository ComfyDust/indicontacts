import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

import { ListContactsParams, ListContactsResp, NewContact } from './types';

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

  async _makeRequest<TReq, TResp>(method: Method, path: string, data?: TReq) {
    const request: AxiosRequestConfig<TReq> = {
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

    const response = await this._axios.request<TReq, AxiosResponse<TResp>>(request);
    return response.data;
  }

  async createContact(newContact: NewContact) {
    return this._makeRequest('POST', '/contacts', newContact);
  }

  async listContacts(params: ListContactsParams) {
    const resp = await this._makeRequest<ListContactsParams, ListContactsResp | string>('GET', '/contacts', params);
    if (params.format === 'csv') {
      return resp; // string
    } else {
      const rawResult = (resp as ListContactsResp).result;
      // TODO: Define a more dynamic deserialization strategy if needed
      return { result: rawResult.map((contact) => ({ ...contact, lastModified: new Date(contact.lastModified) })) };
    }
  }
};
