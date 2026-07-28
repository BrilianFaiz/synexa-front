import { StyleSheet } from "react-native";
import { colors, spacing, radius, typography, shadows } from "../../../theme";

export const primaryButtonStyles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    shadowColor: shadows.small.shadowColor,
    borderEndEndRadius: radius.lg,
    padding: spacing.md,  
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  buttonText: {
    color: colors.white,
    fontSize: typography.button.fontsize,
    textAlign: "center",
    }
});  