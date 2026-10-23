import { StyleSheet } from 'react-native';
import { colors, typography } from './theme.js';

// TODO: Get every color/typography from globalStyles
// instead of hard coded in components

// Global stylesheet
export const globalStyles = StyleSheet.create({
  // Screen container
  mainContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 30,
  },

  // Headers
  mainTitle: {
    fontSize: typography.sizes.screenTitle,
    fontWeight: typography.weights.bold,
    color: colors.textMain,
    marginBottom: 24,
  },
  smallTitle: {
    fontSize: typography.sizes.projectName,
    fontWeight: typography.weights.regular,
    color: colors.textMain,
    marginBottom: 8,
  },

  // Buttons
  buttonPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: colors.blank,
    borderColor: colors.cardProjectBorder,
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonDanger: {
    backgroundColor: colors.dangerBackground,
    borderColor: colors.dangerText,
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonTextSecondary: {
    fontWeight: typography.weights.medium,
    fontSize: typography.sizes.body,
    color: colors.textMain,
  },
  buttonTextPrimary: {
    fontWeight: typography.weights.medium,
    fontSize: typography.sizes.body,
    color: colors.blank,
  },
  buttonTextDanger: {
    color: colors.dangerText,
    fontWeight: typography.weights.medium,
    fontSize: typography.sizes.body,
  },

  // Big currency values
  importanValues: {
    color: colors.primary,
    fontSize: typography.sizes.importantSum,
    fontWeight: typography.weights.semiBold,
  },
  // Background big for currency values
  importantValuesContainer: {
    backgroundColor: '#D4E0D6',
    borderRadius: 6,
    padding: 10,
    alignItems: 'center',
    marginBottom: 24,
  },

  list: {
    backgroundColor: colors.listBackground,
    borderWidth: 0,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
  },

  // Colors
  colorDanger: {
    color: colors.dangerText,
  },
  colorPrimary: {
    color: colors.primary,
  },
  colorTextMain: {
    color: colors.textMain,
  },
  colorSecondary: {
    color: colors.background,
  },
});
