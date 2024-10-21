import dotenv from "dotenv";
import { defineConfig } from 'drizzle-kit';

// https://stackoverflow.com/questions/77593688/unable-to-load-env-database-url-in-drizzle-kits-drizzle-config-ts-with-next-js
dotenv.config({
  path: ".env.local",
});

export default defineConfig({
  schema: "./src/lib/db/schema",
  out: "./src/lib/db/migrations",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  }
})
