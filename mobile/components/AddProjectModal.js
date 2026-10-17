import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';

export default function AddProjectModal({ visible, onClose, onSave }) {
  // State for storing project name and description
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Function for adding a new project
  const addProjectHandler = () => {
    // Prevent creating a project without a name
    if (!name.trim()) {
      return;
    }

    // Pass project name and description to ProjectsScreen
    onSave(name.trim(), description.trim());

    // Clear input fields after saving
    setName('');
    setDescription('');
  };

  // Function for closing the modal
  const closeModal = () => {
    // Clear input fields
    setName('');
    setDescription('');

    // Close the modal
    onClose();
  };

  return (
    // Modal for creating a new project
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={closeModal}
    >
      {/* Background overlay */}
      <View style={styles.modalOverlay}>
        {/* Modal content */}
        <View style={styles.modalView}>
          {/* Title of the modal */}
          <Text style={styles.modalTitle}>Add new project</Text>

          {/* Input for project name */}
          <TextInput
            style={styles.input}
            placeholder="Project name..."
            value={name}
            onChangeText={setName}
            maxLength={50}
          />

          {/* Input for project description */}
          <TextInput
            style={[styles.input, styles.descriptionInput]}
            placeholder="Description..."
            value={description}
            onChangeText={setDescription}
            maxLength={200}
            multiline={true}
          />

          {/* Button for creating a new project */}
          <Pressable style={styles.addButton} onPress={addProjectHandler}>
            <Text style={styles.buttonText}>Create project</Text>
          </Pressable>

          {/* Button for closing the modal without saving */}
          <Pressable style={styles.cancelButton} onPress={closeModal}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

// Styles for AddProjectModal
const styles = StyleSheet.create({
  // Dark transparent background behind the modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    padding: 20,
  },

  // Modal container
  modalView: {
    backgroundColor: '#FAF8F5',
    borderRadius: 16,
    padding: 24,
  },

  // Title of the modal
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#242B28',
    marginBottom: 24,
  },

  // Input fields for project name and description
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8DDD7',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    marginBottom: 20,
  },

  // Additional styling for the description input
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },

  // Button for creating a new project
  addButton: {
    backgroundColor: '#285943',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginBottom: 12,
  },

  // Text inside the create project button
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },

  // Button for closing the modal
  cancelButton: {
    padding: 14,
    alignItems: 'center',
  },

  // Text inside the cancel button
  cancelButtonText: {
    color: '#242B28',
    fontSize: 14,
    fontWeight: '500',
  },
});
