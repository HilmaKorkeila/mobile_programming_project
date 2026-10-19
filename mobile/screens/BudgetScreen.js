import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { eq } from 'drizzle-orm';

// Import database connection and tables
import { db } from '../db';
import { projects, expenses } from '../db/schema';

// Import component
import EditBudgetModal from '../components/EditBudgetModal';

export default function BudgetScreen({ route, navigation }) {
  // Get the selected project ID
  const { projectId } = route.params;

  // Controls the visibility of the budget modal
  const [modalVisible, setModalVisible] = useState(false);

  // Get the selected project from SQLite
  const { data: projectList = [] } = useLiveQuery(
    db.select().from(projects).where(eq(projects.id, projectId)),
  );

  // Get the selected project's expenses from SQLite
  const { data: expenseList = [] } = useLiveQuery(
    db.select().from(expenses).where(eq(expenses.projectId, projectId)),
  );

  // Get project information
  let projectName = '';
  let totalBudget = 0;

  if (projectList.length > 0) {
    projectName = projectList[0].name;
    totalBudget = projectList[0].budget;
  }

  // Calculate total expenses
  let spent = 0;

  for (let expense of expenseList) {
    spent = spent + expense.amount;
  }

  // Calculate remaining budget
  const remaining = totalBudget - spent;

  // Function for updating the project budget
  const updateBudget = async (newBudget) => {
    // Save the new budget to SQLite
    await db
      .update(projects)
      .set({ budget: newBudget })
      .where(eq(projects.id, projectId));

    // Close the modal after saving
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Small heading above the budget card */}
      <Text style={styles.screenTitle}>Budget</Text>

      {/* Main budget card */}
      <View style={styles.card}>
        {/* Card title */}
        <Text style={styles.cardTitle}>BUDGET</Text>

        {/* Project name */}
        <Text style={styles.projectName}>{projectName}</Text>

        {/* Total budget */}
        <Text style={styles.label}>Total budget</Text>
        <View style={styles.amountBox}>
          <Text style={styles.amountText}>{totalBudget} €</Text>
        </View>

        {/* Total expenses */}
        <Text style={styles.label}>Spent</Text>
        <View style={styles.amountBox}>
          <Text style={styles.amountText}>{spent} €</Text>
        </View>

        {/* Remaining budget */}
        <Text style={styles.label}>Remaining</Text>
        <View style={styles.amountBox}>
          <Text style={styles.amountText}>{remaining} €</Text>
        </View>

        {/* Button for editing the budget */}
        <Pressable
          style={styles.editButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.editButtonText}>Edit budget</Text>
        </Pressable>

        {/* Button for returning to Dashboard */}
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back to Dashboard</Text>
        </Pressable>
      </View>

      {/* Modal for editing the project budget */}
      <EditBudgetModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={updateBudget}
        currentBudget={totalBudget}
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

  // Small heading above the card
  screenTitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#242B28',
    marginBottom: 12,
  },

  // Main budget card
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
  },

  // Budget card title
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#242B28',
    marginBottom: 28,
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
