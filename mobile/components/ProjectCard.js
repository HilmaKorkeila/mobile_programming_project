import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function ProjectCard({ project, onToggleFavorite, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.projectInfo}>
        <Text style={styles.projectName}>{project.name}</Text>
        <Text style={styles.description}>{project.description}</Text>
      </View>

      {/* Toggle favorite */}
      <Pressable onPress={() => onToggleFavorite(project.id)}>
        <Text style={styles.star}>{project.favorite ? '★' : '☆'}</Text>
      </Pressable>

      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
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
  projectInfo: {
    flex: 1,
  },
  projectName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#242B28',
  },
  description: {
    fontSize: 14,
    color: '#242B28',
    marginTop: 4,
  },
  star: {
    fontSize: 24,
    color: '#285943',
    marginRight: 16,
  },
  arrow: {
    fontSize: 28,
    color: '#242B28',
  },
});
