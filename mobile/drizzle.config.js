import { defineConfig } from 'drizzle-kit';

// https://orm.drizzle.team/docs/get-started/expo-new#step-5---setup-drizzle-config-file
export default defineConfig({
  dialect: 'sqlite',
  driver: 'expo',
  schema: './db/schema.js',
  out: './drizzle',
});
