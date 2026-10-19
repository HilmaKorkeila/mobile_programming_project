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

export default function EditBudgetModal({
  visible,
  onClose,
  onSave,
  currentBudget,
}) {
  // State for the budget input
  const [budget, setBudget] = useState('');

  // Function for saving the budget
  const saveBudget = () => {
    // Check that the input is not empty
    if (budget.trim() === '') {
      Alert.alert('Error', 'Please enter a budget.');
      return;
    }

    // Convert the input to a number
    const newBudget = Number(budget);

    // Check that the budget is a valid number
    if (!Number.isInteger(newBudget) || newBudget < 0) {
      Alert.alert('Error', 'Please enter a valid budget.');
      return;
    }

    // Send the new budget to BudgetScreen
    onSave(newBudget);

    // Clear the input
    setBudget('');
  };

  // Function for closing the modal
  const closeModal = () => {
    setBudget('');
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
          <Text style={styles.title}>Edit budget</Text>

          {/* Show the current budget */}
          <Text style={styles.label}>Current budget: {currentBudget} €</Text>

          {/* Input for the new budget */}
          <TextInput
            style={styles.input}
            placeholder="Enter new budget"
            keyboardType="numeric"
            value={budget}
            onChangeText={setBudget}
          />

          {/* Button for saving the budget */}
          <Pressable style={styles.saveButton} onPress={saveBudget}>
            <Text style={styles.saveButtonText}>Save budget</Text>
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

// Styles for EditBudgetModal
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

  // Current budget label
  label: {
    fontSize: 14,
    color: '#242B28',
    marginBottom: 12,
  },

  // Budget input field
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8DDD7',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 20,
  },

  // Save button
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
