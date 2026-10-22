import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useActiveProject } from '../db/ActiveProjectContext';

// Import component
import EditBudgetModal from '../components/EditBudgetModal';

export default function BudgetScreen({ route, navigation }) {
  const { activeProject, editProject } = useActiveProject();

  const centsToEuros = (amount) => {
    return (amount / 100).toFixed(2) + ' €';
  };

  // Controls the visibility of the budget modal
  const [modalVisible, setModalVisible] = useState(false);

  // Calculate remaining budget
  const remaining = activeProject?.budget - activeProject?.totalExpenses;

  // Function for updating the project budget
  const handleUpdateBudget = async (budget) => {
    await editProject(activeProject?.id, { budget });
    // Close the modal after saving
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Small heading above the main title */}
      <Text style={styles.smallTitle}>{activeProject?.name}</Text>

      {/* Main title of the screen */}
      <Text style={styles.title}>Budget</Text>

      {/* Total budget */}
      <Text style={styles.label}>Total budget</Text>
      <View style={styles.amountBox}>
        <Text style={styles.amountText}>
          {centsToEuros(activeProject?.budget)}
        </Text>
      </View>

      {/* Total expenses */}
      <Text style={styles.label}>Spent</Text>
      <View style={styles.amountBox}>
        <Text style={styles.amountText}>
          {centsToEuros(activeProject?.totalExpenses)}
        </Text>
      </View>

      {/* Remaining budget */}
      <Text style={styles.label}>Remaining</Text>
      <View style={styles.amountBox}>
        <Text style={styles.amountText}>{centsToEuros(remaining)}</Text>
      </View>

      {/* Button for editing the budget */}
      <Pressable
        style={styles.editButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.editButtonText}>Edit budget</Text>
      </Pressable>

      {/* Button for returning to Dashboard */}
      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back to Dashboard</Text>
      </Pressable>

      {/* Modal for editing the project budget */}
      <EditBudgetModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleUpdateBudget}
        currentBudget={activeProject?.budget}
      />
    </View>
  );
}

// Styles for BudgetScreen
const styles = StyleSheet.create({
  // Main screen container
  container: {
    flex: 1,
    backgroundColor: '#FAF8F5',
    paddingHorizontal: 20,
    paddingTop: 50,
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

  // Project name
  projectName: {
    fontSize: 14,
    fontWeight: '400',
    color: '#242B28',
    marginBottom: 24,
  },

  // Labels for budget amounts
  label: {
    fontSize: 14,
    fontWeight: '400',
    color: '#242B28',
    marginBottom: 8,
  },

  // Background for budget amounts
  amountBox: {
    backgroundColor: '#D4E0D6',
    borderRadius: 6,
    padding: 10,
    alignItems: 'center',
    marginBottom: 24,
  },

  // Budget amount text
  amountText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#242B28',
  },

  // Edit budget button
  editButton: {
    backgroundColor: '#285943',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },

  // Text inside the edit button
  editButtonText: {
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

  // Text inside the back button
  backButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#242B28',
  },
});
