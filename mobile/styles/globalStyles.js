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

  // Buttons
  button: {
    borderWidth: 1,
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  buttonSecondary: {
    backgroundColor: colors.blank,
    borderColor: colors.cardProjectBorder,
    borderWidth: 1,
  },
  buttonDanger: {
    backgroundColor: colors.dangerBackground,
    borderColor: colors.dangerText,
  },
  buttonText: {
    fontWeight: typography.weights.medium,
    fontSize: typography.sizes.body,
  },
  buttonTextSecondary: {
    color: colors.textMain,
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
