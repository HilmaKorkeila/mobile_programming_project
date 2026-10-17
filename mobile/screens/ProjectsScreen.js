import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { eq } from 'drizzle-orm';

import { db } from '../db';
import { projects } from '../db/schema';
import ProjectCard from '../components/ProjectCard';

export default function ProjectsScreen({ navigation }) {
  // Get projects from local database
  const { data: projectList = [] } = useLiveQuery(db.select().from(projects));

  // Toggle project favorite status
  const toggleFavorite = async (id) => {
    const project = projectList.find((item) => item.id === id);

    if (!project) return;

    await db
      .update(projects)
      .set({ is_favourite: !project.is_favourite })
      .where(eq(projects.id, id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.smallTitle}>PROJECTS</Text>
      <Text style={styles.title}>My projects</Text>

      {/* Project list */}
      <FlatList
        data={projectList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProjectCard
            project={item}
            onToggleFavorite={toggleFavorite}
            onPress={() =>
              navigation.navigate('Dashboard', { projectId: item.id })
            }
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No projects yet</Text>
        }
      />

      {/* Add new project button */}
      <Pressable style={styles.addButton}>
        <Text style={styles.buttonText}>+ Add new project</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF8F5',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#242B28',
    marginBottom: 24,
  },
  smallTitle: {
    fontSize: 12,
    fontWeight: '500',
    color: '#242B28',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#242B28',
    textAlign: 'center',
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#285943',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
});
