import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = ['DATABASE_URL'];
const missingEnvVars = requiredEnvVars.filter((varName) => !Object.prototype.hasOwnProperty.call(process.env, varName));

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variable(s): ${missingEnvVars}`);
}

export const databaseUrl = process.env.DATABASE_URL!;
