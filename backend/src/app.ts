import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import router from './router.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // TODO: Lock this down!

app.use('/v0', router);

app.use((req, res, _next) => {
  res.status(404);
  res.json({ error: 'Not Found' });
});

// export default app;
export default app;
