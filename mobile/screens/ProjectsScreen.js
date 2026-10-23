import { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import {
  insertProjectToDb,
  toggleProjectFavouriteInDb,
} from '../db/projectService';

import { useActiveProject } from '../db/ActiveProjectContext';

// Import database connection and projects table
import { db } from '../db';
import { projects } from '../db/schema';

// Import components
import ProjectCard from '../components/ProjectCard';
import AddProjectModal from '../components/AddProjectModal';

export default function ProjectsScreen({ navigation }) {
  const { selectProject } = useActiveProject();

  // State for controlling the visibility of the add project modal
  const [modalVisible, setModalVisible] = useState(false);

  // Get projects from the local SQLite database
  // useLiveQuery updates the project list when database data changes
  const { data: projectList = [] } = useLiveQuery(db.select().from(projects));

  // Sort projects alphabetically by name (A-Z)
  const sortedProjects = [...projectList].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  // Function for changing the favorite status of a project
  const handleToggleFavorite = async (id) => {
    await toggleProjectFavouriteInDb(id);
  };

  // Function for creating a new project
  const handleAddProject = async (name, description) => {
    // Save the new project to the SQLite database
    await insertProjectToDb(name, description);

    // Close the modal after saving
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Main title of the screen */}
      <Text style={styles.title}>My projects</Text>

      {/* Display all projects from the local SQLite database */}
      {/* Each project is displayed using the ProjectCard component */}
      <FlatList
        data={sortedProjects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProjectCard
            project={item}
            onToggleFavorite={handleToggleFavorite}
            onPress={async () => {
              await selectProject(item.id);
              navigation.navigate('Dashboard');
            }}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No projects yet</Text>
        }
      />

      {/* Button for opening the add project modal */}
      <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>+ Add new project</Text>
      </Pressable>

      {/* Modal for creating a new project */}
      {/* Handles opening, closing and passing project data */}
      <AddProjectModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAddProject}
      />
    </View>
  );
}

// Styles for ProjectsScreen
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

  // Small heading above the main title
  smallTitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#242B28',
    marginBottom: 8,
  },

  // Message displayed when there are no projects
  emptyText: {
    fontSize: 14,
    color: '#242B28',
    textAlign: 'center',
    marginTop: 20,
  },

  // Button for adding a new project
  addButton: {
    backgroundColor: '#285943',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
  },

  // Text inside the add project button
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});
