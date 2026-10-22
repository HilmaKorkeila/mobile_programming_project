import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { useActiveProject } from '../db/ActiveProjectContext';
import { globalStyles as gs } from '../styles/globalStyles';

// Import components
import AddTaskModal from '../components/AddTaskModal';
import EditTaskModal from '../components/EditTaskModal';

export default function TasksScreen({ navigation }) {
  const { activeProject, createTask, editTask, deleteTask } =
    useActiveProject();

  // Controls the visibility of the add task modal
  const [addModalVisible, setAddModalVisible] = useState(false);

  // Controls the visibility of the edit task modal
  const [editModalVisible, setEditModalVisible] = useState(false);

  // Store the selected task for editing
  const [selectedTask, setSelectedTask] = useState(null);

  // Function for opening the edit task modal
  const openEditModal = (task) => {
    setSelectedTask(task);
    setEditModalVisible(true);
  };

  // Function for adding a new task
  const handleAddTask = async (taskName) => {
    // Save the new task to SQLite
    await createTask(taskName);

    // Close the add task modal
    setAddModalVisible(false);
  };

  // Function for updating a task
  const handleUpdateTask = async (taskName, taskStatus) => {
    // Save the updated task name and status to SQLite
    await editTask(selectedTask.id, { name: taskName, status: taskStatus });

    // Close the edit task modal
    setEditModalVisible(false);
    setSelectedTask(null);
  };

  // Function for deleting a task
  const handleDeleteTask = async () => {
    // Delete the selected task from SQLite
    await deleteTask(selectedTask.id);

    // Close the edit task modal
    setEditModalVisible(false);
    setSelectedTask(null);
  };

  return (
    <View style={styles.container}>
      {/* Small heading above the main title */}
      <Text style={styles.smallTitle}>TASKS</Text>

      {/* Main title of the screen */}
      <Text style={styles.title}>{activeProject?.name}</Text>

      {/* Tasks list title */}
      <Text style={styles.label}>Tasks list</Text>

      {/* Tasks list */}
      <View style={styles.listContainer}>
        <FlatList
          style={styles.taskList}
          data={activeProject?.tasks ?? []}
          keyExtractor={(task) => task.id}
          renderItem={({ item: task }) => (
            <Pressable
              style={styles.taskItem}
              onPress={() => openEditModal(task)}
            >
              {/* Task name */}
              <Text style={styles.taskText}>{task?.name}</Text>

              {/* Current task status */}
              <Text style={styles.taskStatus}>{task?.status}</Text>

              {/* Edit task icon */}
              <Feather name="edit-2" size={18} color="#285943" />
            </Pressable>
          )}
        />
      </View>

      {/* Completed tasks summary */}
      <Text style={styles.summary}>
        {activeProject && activeProject.taskStats?.total
          ? 'Tasks completed ' +
            activeProject.taskStats?.completed +
            '/' +
            activeProject.taskStats?.total
          : null}
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
        style={[gs.button, gs.buttonSecondary, styles.backButton]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[gs.buttonText, gs.buttonTextSecondary]}>
          Back to Dashboard
        </Text>
      </Pressable>

      {/* Modal for adding a new task */}
      <AddTaskModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSave={handleAddTask}
      />

      {/* Modal for editing an existing task */}
      <EditTaskModal
        visible={editModalVisible}
        onClose={() => {
          setEditModalVisible(false);
          setSelectedTask(null);
        }}
        onSave={handleUpdateTask}
        onDelete={handleDeleteTask}
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

  listContainer: {
    flex: 1,
    backgroundColor: '#EBE9E5',
    borderRadius: 6,
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
    flex: 1,
  },

  // Single task row
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 10,
  },

  // Task name
  taskText: {
    fontSize: 16,
    color: '#242B28',
    flex: 1,
  },

  // Current task status
  taskStatus: {
    fontSize: 14,
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

  backButton: {
    marginBottom: 20,
  },
});
