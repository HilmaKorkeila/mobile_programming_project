import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function ProjectCard({ project, onToggleFavorite, onPress }) {
  return (
    // Project card that opens the dashboard when pressed
    <Pressable style={styles.card} onPress={onPress}>
      {/* Display project name and description */}
      <View style={styles.projectInfo}>
        {/* Project name */}
        <Text style={styles.projectName}>{project.name}</Text>

        {/* Project description */}
        <Text style={styles.description}>{project.description}</Text>
      </View>

      {/* Button for changing the favorite status */}
      <Pressable onPress={() => onToggleFavorite(project.id)}>
        {/* Show filled star if favorite, otherwise empty star */}
        <Text style={styles.star}>{project.is_favourite ? '★' : '☆'}</Text>
      </Pressable>

      {/* Arrow indicating navigation to the dashboard */}
      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}

// Styles for ProjectCard
const styles = StyleSheet.create({
  // Main project card container
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D8DDD7',
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Container for project name and description
  projectInfo: {
    flex: 1,
  },

  // Project name
  projectName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#242B28',
  },

  // Project description
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: '#242B28',
    marginTop: 4,
  },

  // Favorite star
  star: {
    fontSize: 24,
    color: '#285943',
    marginRight: 16,
  },

  // Arrow for navigating to the dashboard
  arrow: {
    fontSize: 28,
    color: '#242B28',
  },
});
