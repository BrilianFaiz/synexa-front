import {colors,typography,radius,shadows,spacing} from "@/src/theme/";
import { StyleSheet } from "react-native";

export const secondaryButtonStyles = StyleSheet.create({
    button:{
        padding: spacing.sm,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.sm,
        backgroundColor:colors.secondary,
        borderRadius: radius.lg,
        shadowColor: shadows.small.shadowColor,
        marginBottom: spacing.sm,

    },
    text:{
        color: colors.textSecondary,
        fontSize: typography.button.fontsize,
        fontFamily: typography.button.fontfamily,
    }

});