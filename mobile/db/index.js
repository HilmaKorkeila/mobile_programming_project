import * as SQLite from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as schema from './schema';

const expo = SQLite.openDatabaseSync('data.db', { enableChangeListener: true });

// Enable ON DELETE CASCADE
expo.execSync('PRAGMA foreign_keys = ON;');

export const db = drizzle(expo, { schema });
