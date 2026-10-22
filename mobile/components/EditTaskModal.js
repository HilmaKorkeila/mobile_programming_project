import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';

export default function EditTaskModal({
  visible,
  onClose,
  onSave,
  onDelete,
  task,
}) {
  // Store the task name entered by the user
  const [taskName, setTaskName] = useState('');

  // Store the selected task status
  const [taskStatus, setTaskStatus] = useState('Not complete');

  // Show the current task name and status when the modal opens
  useEffect(() => {
    if (visible && task) {
      setTaskName(task.name);
      setTaskStatus(task.status);
    }
  }, [visible, task]);

  // Function for saving changes to the task
  const saveTask = () => {
    // Check that the task name is not empty
    if (taskName.trim() === '') {
      Alert.alert('Error', 'Please enter a task name.');
      return;
    }

    // Send the updated task name and status to TasksScreen
    onSave(taskName.trim(), taskStatus);
  };

  // Function for deleting the task
  const deleteTask = () => {
    // Ask for confirmation before deleting
    Alert.alert('Delete task', 'Are you sure you want to delete this task?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: onDelete,
      },
    ]);
  };

  // Function for closing the modal
  const closeModal = () => {
    setTaskName('');
    setTaskStatus('Not complete');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={closeModal}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Modal title */}
          <Text style={styles.title}>Edit task</Text>

          {/* Task status label */}
          <Text style={styles.label}>Task name</Text>

          {/* Input for editing the task name */}
          <TextInput
            style={styles.input}
            placeholder="Enter task name"
            value={taskName}
            onChangeText={setTaskName}
            maxLength={50}
          />

          {/* Task status label */}
          <Text style={styles.label}>Task status</Text>

          {/* Task status options */}
          <View style={styles.statusContainer}>
            {['Not complete', 'In progress', 'Completed'].map((status) => (
              <Pressable
                key={status}
                style={[
                  styles.statusButton,
                  taskStatus === status && styles.selectedStatusButton,
                ]}
                onPress={() => setTaskStatus(status)}
              >
                <Text
                  style={[
                    styles.statusText,
                    taskStatus === status && styles.selectedStatusText,
                  ]}
                >
                  {status}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Button for saving changes */}
          <Pressable style={styles.saveButton} onPress={saveTask}>
            <Text style={styles.saveButtonText}>Save changes</Text>
          </Pressable>

          {/* Button for deleting the task */}
          <Pressable style={styles.deleteButton} onPress={deleteTask}>
            <Text style={styles.deleteButtonText}>Delete task</Text>
          </Pressable>

          {/* Button for closing the modal */}
          <Pressable style={styles.cancelButton} onPress={closeModal}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

// Styles for EditTaskModal
const styles = StyleSheet.create({
  // Background behind the modal
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },

  // Modal container
  modalContainer: {
    backgroundColor: '#FAF8F5',
    borderRadius: 12,
    padding: 24,
  },

  // Modal title
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#242B28',
    marginBottom: 20,
  },

  // Task name input
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8DDD7',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 20,
    color: '#242B28',
  },

  // Task status label
  label: {
    fontSize: 14,
    color: '#242B28',
    marginBottom: 10,
  },

  // Container for task status options
  statusContainer: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 24,
  },

  // Task status button
  statusButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8DDD7',
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Selected task status button
  selectedStatusButton: {
    backgroundColor: '#D4E0D6',
    borderColor: '#285943',
  },

  // Task status text
  statusText: {
    fontSize: 11,
    color: '#242B28',
    textAlign: 'center',
  },

  // Selected task status text
  selectedStatusText: {
    color: '#285943',
    fontWeight: '600',
  },

  // Save changes button
  saveButton: {
    backgroundColor: '#285943',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginBottom: 10,
  },

  // Save button text
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },

  // Delete task button
  deleteButton: {
    backgroundColor: '#F5EAE7',
    borderColor: '#A65F58',
    borderWidth: 1,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginBottom: 10,
  },

  // Delete button text
  deleteButtonText: {
    color: '#A65F58',
    fontSize: 14,
    fontWeight: '500',
  },

  // Cancel button
  cancelButton: {
    padding: 12,
    alignItems: 'center',
  },

  // Cancel button text
  cancelButtonText: {
    color: '#242B28',
    fontSize: 14,
  },
});
