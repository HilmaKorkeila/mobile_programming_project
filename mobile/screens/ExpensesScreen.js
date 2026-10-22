import { useActiveProject } from '../db/ActiveProjectContext';
import { globalStyles as gs } from '../styles/globalStyles';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import { useState } from 'react';

// Components
import AddExpenseModal from '../components/AddExpenseModal';

export default function ExpensesScreen({ route, navigation }) {
  const { activeProject, createExpense } = useActiveProject();

  // Controls the visibility of the add expense modal
  const [addModalVisible, setAddModalVisible] = useState(false);

  // Controls the visibility of the edit expense modal
  const [editModalVisible, setEditModalVisible] = useState(false);

  // Store the selected expense for editing
  const [selectedExpense, setSelectedExpense] = useState(null);

  // Function for opening the edit expense modal
  const openEditModal = (expense) => {
    setSelectedExpense(expense);
    setEditModalVisible(true);
  };

  // Function for adding a new expense
  const handleAddExpense = async (name, amount) => {
    // Save the new expense to SQLite
    await createExpense(name, amount);

    // Close the add expense modal
    setAddModalVisible(false);
  };

  const centsToEuros = (amount) => {
    return (amount / 100).toFixed(2) + ' €';
  };

  return (
    <View style={styles.container}>
      {/* Small heading above the main title */}
      <Text style={styles.smallTitle}>EXPENSES</Text>

      {/* Main title of the screen */}
      <Text style={styles.title}>{activeProject?.name}</Text>

      {/* Total expenses */}
      <Text style={styles.label}>Total expenses</Text>
      <View style={styles.amountBox}>
        <Text style={styles.amountText}>
          {centsToEuros(activeProject?.totalExpenses)}
        </Text>
      </View>

      {/* Expenses list */}
      <Text style={styles.label}>Expenses list</Text>

      <View style={styles.listContainer}>
        <FlatList
          style={styles.expensesList}
          data={activeProject?.expenses ?? []}
          keyExtractor={(expense) => expense.id}
          renderItem={({ item: expense }) => (
            <Pressable
              style={styles.expenseItem}
              onPress={() => openEditModal(expense)}
            >
              {/* Expense name */}
              <Text style={styles.expenseName}>{expense?.name}</Text>

              {/* Expense amount */}
              <Text style={styles.expenseAmount}>
                {centsToEuros(expense?.amount)}
              </Text>
            </Pressable>
          )}
        />
      </View>

      {/* Button for adding an expense */}
      <Pressable
        style={styles.addButton}
        onPress={() => setAddModalVisible(true)}
      >
        <Text style={[styles.buttonText, styles.addButtonText]}>
          Add expense
        </Text>
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

      {/* Modal for adding a new expense */}
      <AddExpenseModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSave={handleAddExpense}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // Main screen container
  container: {
    flex: 1,
    backgroundColor: '#FAF8F5',
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  // Expenses list container
  listContainer: {
    flex: 1,
    backgroundColor: '#EBE9E5',
    borderRadius: 6,
  },

  // Expenses list
  expensesList: {
    flex: 1,
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

  label: {
    fontSize: 14,
    fontWeight: '400',
    color: '#242B28',
    marginBottom: 8,
  },

  amountBox: {
    backgroundColor: '#D4E0D6',
    borderRadius: 6,
    padding: 10,
    alignItems: 'center',
    marginBottom: 24,
  },

  expenseAmount: {
    fontSize: 14,
    fontWeight: '400',
    color: '#242B28',
  },

  // Single expense row
  expenseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 10,
  },

  // Expense name
  expenseName: {
    fontSize: 16,
    color: '#242B28',
    flex: 1,
  },

  // Button for adding a new expense
  addButton: {
    backgroundColor: '#285943',
    borderRadius: 6,
    padding: 12,
    alignItems: 'center',
    marginBottom: 8,
  },

  addButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },

  // Text inside the add expense button
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },

  backButton: {
    marginBottom: 20,
  },
});
