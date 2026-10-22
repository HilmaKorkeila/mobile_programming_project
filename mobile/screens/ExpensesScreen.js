import { useActiveProject } from '../db/ActiveProjectContext';
import { globalStyles as gs } from '../styles/globalStyles';
import { StyleSheet, Text, View, Pressable, FlatList } from 'react-native';
import { useState } from 'react';

// Components
import EditExpenseModal from '../components/EditExpenseModal';

export default function ExpensesScreen({ route, navigation }) {
  const { activeProject, createExpense, editExpense, deleteExpense } =
    useActiveProject();

  // Controls the visibility of the edit expense modal
  const [editModalVisible, setEditModalVisible] = useState(false);

  // Store the selected expense for editing
  const [selectedExpense, setSelectedExpense] = useState(null);

  // Function for opening the edit expense modal
  const openEditModal = (expense = null) => {
    setSelectedExpense(expense);
    setEditModalVisible(true);
  };

  // Function for adding a new expense
  const handleEditExpense = async (expense) => {
    if (!expense) return;

    // if expense contains id field, update existing
    if (expense.id) {
      await editExpense(expense.id, expense);
    }
    // Id not, create new
    else {
      await createExpense(expense.name, amount);
    }

    setSelectedExpense(null);
    // Close the edit expense modal
    setEditModalVisible(false);
  };

  const centsToEuros = (amount) => {
    return (amount / 100).toFixed(2) + ' €';
  };

  // Function for deleting an expense
  const handleDeleteTask = async () => {
    // Delete the selected expense from SQLite
    await deleteExpense(selectedExpense.id);

    // Close the edit expense modal
    setEditModalVisible(false);
    setSelectedExpense(null);
  };

  return (
    <View style={styles.container}>
      {/* Small heading above the main title */}
      <Text style={styles.smallTitle}>{activeProject?.name}</Text>

      {/* Main title of the screen */}
      <Text style={styles.title}>Expenses</Text>

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
      <Pressable style={styles.addButton} onPress={() => openEditModal()}>
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

      {/* Modal for adding/editing an expense */}
      <EditExpenseModal
        visible={editModalVisible}
        onClose={() => {
          setEditModalVisible(false);
          setSelectedExpense(null);
        }}
        onSave={handleEditExpense}
        onDelete={handleDeleteTask}
        expense={selectedExpense}
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
