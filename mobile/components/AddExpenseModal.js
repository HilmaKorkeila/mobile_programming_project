import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';

export default function AddExpenseModal({ visible, onClose, onSave }) {
  // Store the expense name entered by the user
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState(0);

  // Function for saving a new expense
  const saveExpense = () => {
    // Check that the task name is not empty
    if (expenseName.trim() === '') {
      Alert.alert('Error', 'Please enter a valid name for an expense.');
      return;
    }

    const parsedExpenseAmount = parseInt(expenseAmount, 10) || null;

    // Check if expense is an integer and not negative
    if (!parsedExpenseAmount || parsedExpenseAmount < 0) {
      Alert.alert('Error', 'Please enter a valid expense amount.');
      return;
    }

    // Send the expense name to ExpensesScreen
    onSave(expenseName.trim(), parsedExpenseAmount);

    // Clear the input
    setExpenseName('');
    setExpenseAmount(0);
  };

  // Function for closing the modal
  const closeModal = () => {
    setExpenseName('');
    setExpenseAmount(0);
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
          <Text style={styles.title}>Add Expense</Text>

          {/* Expense name label */}
          <Text style={styles.label}>Expense name</Text>

          {/* Input for the expense name */}
          <TextInput
            style={styles.input}
            placeholder="Enter expense name"
            value={expenseName}
            onChangeText={setExpenseName}
            maxLength={50}
          />

          {/* Expense amount label */}
          <Text style={styles.label}>Expense amount</Text>

          {/* Input for the expense name */}
          <TextInput
            style={styles.input}
            placeholder="0.00"
            keyboardType="numeric"
            value={expenseAmount}
            onChangeText={setExpenseAmount}
            maxLength={50}
          />

          {/* Button for saving the expense */}
          <Pressable style={styles.saveButton} onPress={saveExpense}>
            <Text style={styles.saveButtonText}>Save expense</Text>
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

// Styles for AddExpenseModal
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

  // Expense name input
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D8DDD7',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    marginBottom: 20,
  },

  // Expense status label
  label: {
    fontSize: 14,
    color: '#242B28',
    marginBottom: 10,
  },

  // Save expense button
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
