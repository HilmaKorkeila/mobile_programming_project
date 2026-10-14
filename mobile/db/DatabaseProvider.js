import { View, Text, ActivityIndicator } from 'react-native';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { db } from './index';
import migrations from '../drizzle/migrations';

// Explanation
// https://orm.drizzle.team/docs/sqlite/migrations
export function DatabaseProvider({ children }) {
  const { success, error } = useMigrations(db, migrations);

  // Migration fails
  if (error) {
    return (
      <View>
        <Text>Database Error: {error.message}</Text>
      </View>
    );
  }

  // Waiting for migration (milliseconds)
  if (!success) {
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Migration succeeds, continue rendering nested components
  return children;
}
