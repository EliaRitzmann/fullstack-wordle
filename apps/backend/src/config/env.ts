import dotenv from "dotenv";
import * as process from "process";

const envFile = ".env.local";
dotenv.config({ path: envFile });

const requiredVars = ["NODE_ENV", "DATABASE_URL"];

// Validate environment variables
requiredVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

export default {
  nodeEnv: process.env.NODE_ENV,
};
