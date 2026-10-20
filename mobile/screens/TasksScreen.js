import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { eq } from 'drizzle-orm';
import * as Crypto from 'expo-crypto';
import { Feather } from '@expo/vector-icons';

// Import database connection and tables
import { db } from '../db';
import { projects, tasks } from '../db/schema';

// Import components
import AddTaskModal from '../components/AddTaskModal';
import EditTaskModal from '../components/EditTaskModal';

export default function TasksScreen({ route, navigation }) {
  // Get the selected project ID
  const { projectId } = route.params;

  // Controls the visibility of the add task modal
  const [addModalVisible, setAddModalVisible] = useState(false);

  // Controls the visibility of the edit task modal
  const [editModalVisible, setEditModalVisible] = useState(false);

  // Store the selected task for editing
  const [selectedTask, setSelectedTask] = useState(null);

  // Get the selected project from SQLite
  const { data: projectList = [] } = useLiveQuery(
    db.select().from(projects).where(eq(projects.id, projectId)),
  );

  // Get the selected project's tasks from SQLite
  const { data: taskList = [] } = useLiveQuery(
    db.select().from(tasks).where(eq(tasks.projectId, projectId)),
  );

  // Get project name
  let projectName = '';

  if (projectList.length > 0) {
    projectName = projectList[0].name;
  }

  // Calculate completed tasks
  let completedTasks = 0;

  for (let task of taskList) {
    if (task.status === 'Completed') {
      completedTasks = completedTasks + 1;
    }
  }

  // Function for opening the edit task modal
  const openEditModal = (task) => {
    setSelectedTask(task);
    setEditModalVisible(true);
  };

  // Function for adding a new task
  const addTask = async (taskName) => {
    // Save the new task to SQLite
    await db.insert(tasks).values({
      id: Crypto.randomUUID(),
      projectId: projectId,
      name: taskName,
      createdAt: Date.now(),
      status: 'Not complete',
    });

    // Close the add task modal
    setAddModalVisible(false);
  };

  // Function for updating a task
  const updateTask = async (taskName, taskStatus) => {
    // Save the updated task name and status to SQLite
    await db
      .update(tasks)
      .set({
        name: taskName,
        status: taskStatus,
      })
      .where(eq(tasks.id, selectedTask.id));

    // Close the edit task modal
    setEditModalVisible(false);
    setSelectedTask(null);
  };

  // Function for deleting a task
  const deleteTask = async () => {
    // Delete the selected task from SQLite
    await db.delete(tasks).where(eq(tasks.id, selectedTask.id));

    // Close the edit task modal
    setEditModalVisible(false);
    setSelectedTask(null);
  };

  return (
    <View style={styles.container}>
      {/* Small heading above the tasks card */}
      <Text style={styles.screenTitle}>Tasks</Text>

      {/* Main tasks card */}
      <View style={styles.card}>
        {/* Card title */}
        <Text style={styles.cardTitle}>TASKS</Text>

        {/* Project name */}
        <Text style={styles.projectName}>{projectName}</Text>

        {/* Tasks list title */}
        <Text style={styles.label}>Tasks list</Text>

        {/* Tasks list */}
        <FlatList
          style={styles.taskList}
          data={taskList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              style={styles.taskItem}
              onPress={() => openEditModal(item)}
            >
              {/* Task name */}
              <Text style={styles.taskText}>{item.name}</Text>

              {/* Current task status */}
              <Text style={styles.taskStatus}>{item.status}</Text>

              {/* Edit task icon */}
              <Feather name="edit-2" size={18} color="#285943" />
            </Pressable>
          )}
        />

        {/* Completed tasks summary */}
        <Text style={styles.summary}>
          Tasks completed {completedTasks}/{taskList.length}
        </Text>

        {/* Button for adding a task */}
        <Pressable
          style={styles.addButton}
          onPress={() => setAddModalVisible(true)}
        >
          <Text style={styles.addButtonText}>Add task</Text>
        </Pressable>

        {/* Button for returning to Dashboard */}
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back to Dashboard</Text>
        </Pressable>
      </View>

      {/* Modal for adding a new task */}
      <AddTaskModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSave={addTask}
      />

      {/* Modal for editing an existing task */}
      <EditTaskModal
        visible={editModalVisible}
        onClose={() => {
          setEditModalVisible(false);
          setSelectedTask(null);
        }}
        onSave={updateTask}
        onDelete={deleteTask}
        task={selectedTask}
      />
    </View>
  );
}

// Styles for TasksScreen
const styles = StyleSheet.create({
  // Main screen container
  container: {
    flex: 1,
    backgroundColor: '#FAF8F5',
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  // Small heading above the card
  screenTitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#242B28',
    marginBottom: 12,
  },

  // Main tasks card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
  },

  // Tasks card title
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#242B28',
    marginBottom: 28,
  },

  // Project name
  projectName: {
    fontSize: 14,
    fontWeight: '400',
    color: '#242B28',
    marginBottom: 24,
  },

  // Tasks list label
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: '#242B28',
    marginBottom: 8,
  },

  // Tasks list background
  taskList: {
    backgroundColor: '#EBE9E5',
    borderRadius: 6,
    height: 180,
    padding: 10,
  },

  // Single task row
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    gap: 10,
  },

  // Task name
  taskText: {
    fontSize: 14,
    color: '#242B28',
    flex: 1,
  },

  // Current task status
  taskStatus: {
    fontSize: 12,
    color: '#285943',
  },

  // Completed tasks summary
  summary: {
    fontSize: 14,
    color: '#242B28',
    marginTop: 12,
    marginBottom: 28,
  },

  // Add task button
  addButton: {
    backgroundColor: '#285943',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
    marginBottom: 8,
  },

  // Add task button text
  addButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },

  // Back to Dashboard button
  backButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8DDD7',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
  },

  // Back to Dashboard button text
  backButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#242B28',
  },
});
