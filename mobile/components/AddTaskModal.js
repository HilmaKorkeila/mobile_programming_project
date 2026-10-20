import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';

export default function AddTaskModal({ visible, onClose, onSave }) {
  // Stote the task name entered by the user
  const [taskName, setTaskName] = useState('');

  // Function for saving a new task
  const saveTask = () => {
    // Check that the task name is not empty
    if (taskName.trim() === '') {
      Alert.alert('Error', 'Please enter a task name.');
      return;
    }

    // Send the task name to TasksScreen
    onSave(taskName.trim());

    // Clear the input
    setTaskName('');
  };

  // Function for closing the modal
  const closeModal = () => {
    setTaskName('');
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
          <Text style={styles.title}>Add task</Text>

          {/* Input for the task name */}
          <TextInput
            style={styles.input}
            placeholder="Enter task name"
            value={taskName}
            onChangeText={setTaskName}
            maxLength={50}
          />

          {/* Button for saving the task */}
          <Pressable style={styles.saveButton} onPress={saveTask}>
            <Text style={styles.saveButtonText}>Save task</Text>
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

// Styles for AddTaskModal
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
  },

  // Save task button
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
