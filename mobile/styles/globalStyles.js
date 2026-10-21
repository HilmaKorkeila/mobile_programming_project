import { StyleSheet } from 'react-native';
import { colors, typography } from './theme.js';

export const globalStyles = StyleSheet.create({
  // Buttons
  button: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  buttonSecondary: {
    backgroundColor: colors.background,
    borderColor: colors.primary,
  },
  buttonDanger: {
    backgroundColor: colors.dangerBackground,
    borderColor: colors.dangerText,
  },
  buttonText: {
    fontWeight: typography.weights.medium,
    fontSize: typography.sizes.body,
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
