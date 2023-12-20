import type { Config } from 'drizzle-kit';

if (!process.env.DB_NAME) {
  require('dotenv').config();
}

export default {
  schema: './src/**/*.schema.ts',
  out: './migrations',
  driver: 'better-sqlite',
  verbose: true,
  breakpoints: true,
  dbCredentials: { url: process.env.DB_NAME },
} satisfies Config;
