// globalStyles.js
import { StyleSheet } from 'react-native';
import { colors, typography } from './theme';

export const globalStyles = StyleSheet.create({
  // --- LAYOUT & CONTAINERS ---
  screenContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 16,
  },

  // --- TYPOGRAPHY ---
  screenTitle: {
    fontSize: typography.sizes.screenTitle,
    fontWeight: typography.weights.bold,
    color: colors.textMain,
  },
  projectName: {
    fontSize: typography.sizes.projectName,
    fontWeight: typography.weights.semiBold,
    color: colors.textMain,
  },
  cardTitle: {
    fontSize: typography.sizes.cardTitle,
    fontWeight: typography.weights.semiBold,
    color: colors.textMain,
  },
  bodyText: {
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.regular,
    color: colors.textMain,
  },
  smallText: {
    fontSize: typography.sizes.small,
    fontWeight: typography.weights.regular,
    color: colors.textMain,
  },
  importantSum: {
    fontSize: typography.sizes.importantSum,
    fontWeight: typography.weights.semiBold,
    color: colors.textMain,
  },
  buttonText: {
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.medium,
    color: '#FFFFFF',
  },
  listTitle: {
    fontSize: typography.sizes.cardTitle,
    fontWeight: typography.weights.medium,
    color: colors.textMain,
  },
  listContent: {
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.regular,
    color: colors.textMain,
  },

  // --- COMPONENTS & CARDS ---
  // Buttons and Dashboard cards
  dashboardCard: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 16,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },

  // Budget sums and Expenses summary
  budgetSummaryBox: {
    backgroundColor: colors.budgetSummary,
    borderRadius: 8,
    padding: 12,
  },

  // Projects view cards
  projectCard: {
    backgroundColor: colors.cardProject,
    borderWidth: 1,
    borderColor: colors.cardProjectBorder,
    borderRadius: 8,
    padding: 16,
  },

  // Project overview, Expenses and Tasks lists
  listView: {
    backgroundColor: colors.listBackground,
    borderRadius: 8,
    padding: 12,
  },

  // Remove project button
  removeButton: {
    backgroundColor: colors.dangerBackground,
    borderWidth: 1,
    borderColor: colors.dangerText,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  removeButtonText: {
    fontSize: typography.sizes.body,
    fontWeight: typography.weights.medium,
    color: colors.dangerText,
  },
});
