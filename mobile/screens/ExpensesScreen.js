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
    // If not, create new
    else {
      await createExpense(expense.name, expense.amount);
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
    <View style={gs.mainContainer}>
      {/* Small heading above the main title */}
      <Text style={gs.smallTitle}>{activeProject?.name}</Text>

      {/* Main title of the screen */}
      <Text style={gs.mainTitle}>Expenses</Text>

      {/* Total expenses */}
      <Text style={styles.label}>Total expenses</Text>
      <View style={gs.importantValuesContainer}>
        <Text style={gs.importanValues}>
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
      <Pressable style={gs.buttonPrimary} onPress={() => openEditModal()}>
        <Text style={gs.buttonTextPrimary}>Add expense</Text>
      </Pressable>

      {/* Button for returning to Dashboard */}
      <Pressable style={gs.buttonSecondary} onPress={() => navigation.goBack()}>
        <Text style={gs.buttonTextSecondary}>Back to Dashboard</Text>
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

  label: {
    fontSize: 14,
    fontWeight: '400',
    color: '#242B28',
    marginBottom: 8,
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
});
