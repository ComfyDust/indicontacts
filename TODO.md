Proof of Concept

- Add support for filtering CSV export by signup time

Requirement Clarifications

- What are some example scenarios where new duplicate contacts may need to be merged and what merge strategy should be used? Is a simple upsert sufficient since all contact fields are required?
    - Follow-up: (backend) Review merge logic in `ContactService.create()`
- Is populating `updatedAt` on upsert sufficient to track signup time or is another field needed? (I.e., Will the API be used by anything other than the signup process?)

House Keeping

- Finish Docker Compose configuration
- Consolidate front/back-end TS models in `models` package including US state abbreviations (currently defined in both `backend/src/contacts/validators.ts` & `frontend/src/signup/Form.tsx`)
- Add pagination
    - NOTE: Also helps avoid hitting memory cap!
- Build test database seeder
- Configure eslint & fix linting errors

Pre-MVP

- Lock down CORS config
- Review licenses for dependencies
- Audit & improve UI accessibility
