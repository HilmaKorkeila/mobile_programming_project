import { StyleSheet } from 'react-native';
import { colors, typography } from './theme.js';

export const globalStyles = StyleSheet.create({
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
