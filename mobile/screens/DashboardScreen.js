import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { eq } from 'drizzle-orm';

// Import database connection and projects table
import { db } from '../db';
import { projects } from '../db/schema';

export default function DashboardScreen({ route, navigation }) {
  // Get the selected project ID from navigation
  const { projectId } = route.params;

  // Function for deleting a project from the database
  const deleteProject = async () => {
    // Delete the selected project using its ID
    await db.delete(projects).where(eq(projects.id, projectId));

    // Return to the projects screen after deleting
    navigation.goBack();
  };

  // Function for confirming project deletion
  const confirmDelete = () => {
    // Show confirmation dialog before deleting
    Alert.alert(
      'Remove project',
      'Are you sure you want to remove this project?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: deleteProject,
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      {/* Main title of the dashboard */}
      <Text style={styles.title}>Dashboard</Text>

      {/* Button for removing the selected project */}
      <Pressable style={styles.removeButton} onPress={confirmDelete}>
        <Text style={styles.removeButtonText}>Remove project</Text>
      </Pressable>
    </View>
  );
}

// Styles for DashboardScreen
const styles = StyleSheet.create({
  // Main screen container
  container: {
    flex: 1,
    backgroundColor: '#FAF8F5',
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  // Main screen title
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#242B28',
    marginBottom: 24,
  },

  // Button for removing a project
  removeButton: {
    backgroundColor: '#F5EAE7',
    borderColor: '#A65F58',
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },

  // Text inside the remove project button
  removeButtonText: {
    color: '#A65F58',
    fontSize: 14,
    fontWeight: '500',
  },
});
