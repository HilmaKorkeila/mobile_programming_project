import { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useActiveProject } from '../db/ActiveProjectContext';
import { globalStyles as gs } from '../styles/globalStyles';

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
    <View style={gs.mainContainer}>
      {/* Small heading above the main title */}
      <Text style={gs.smallTitle}>{activeProject?.name}</Text>

      {/* Main title of the screen */}
      <Text style={gs.mainTitle}>Budget</Text>

      {/* Total budget */}
      <Text style={styles.label}>Total budget</Text>
      <View style={gs.importantValuesContainer}>
        <Text style={gs.importanValues}>
          {centsToEuros(activeProject?.budget)}
        </Text>
      </View>

      {/* Total expenses */}
      <Text style={styles.label}>Spent</Text>
      <View style={gs.importantValuesContainer}>
        <Text style={gs.importanValues}>
          {centsToEuros(activeProject?.totalExpenses)}
        </Text>
      </View>

      {/* Remaining budget */}
      <Text style={styles.label}>Remaining</Text>
      <View style={gs.importantValuesContainer}>
        <Text style={gs.importanValues}>{centsToEuros(remaining)}</Text>
      </View>

      {/* Button for editing the budget */}
      <Pressable style={gs.buttonPrimary} onPress={() => setModalVisible(true)}>
        <Text style={gs.buttonTextPrimary}>Edit budget</Text>
      </Pressable>

      {/* Button for returning to Dashboard */}
      <Pressable style={gs.buttonSecondary} onPress={() => navigation.goBack()}>
        <Text style={gs.buttonTextSecondary}>Back to Dashboard</Text>
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
});
