# INDICONTACTS - Backend

App Server: Express

## Database

Engine: MongoDB

## Running

In separate terminals:

`docker-compose up mongodb` (or start separately and adjust `DATABASE_URL` in [./.env](./.env))

`pnpm start` or `pnpm dev` (listens at `http://localhost:3000/v0`)

## API

**CreateContact**

- Method: `POST`
- Path: `/contacts`

Example:

```bash
curl -H 'Content-Type: application/json' -d '{
  "email": "mario.mario@nintendo.org",
  "name": {
    "first": "Mario",
    "last": "Mario"
  },
  "address": {
    "street": "123 Toadstool Ct.",
    "city": "Mushroom Kingdom",
    "state": "OH",
    "zip":"12345"
  }
}' localhost:3000/v0/contacts
```

**ListContacts**

- Method: `GET`
- Path: `/contacts`

Example:

```bash
curl localhost:3000/v0/contacts | jq '.'
```
