import { StyleSheet } from "react-native";
import { colors, spacing, radius, typography, shadows } from "../../../theme";

export const primaryButtonStyles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.lg,
    shadowColor: shadows.small.shadowColor,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.button.fontsize,
    textAlign: "center",
    }
});  