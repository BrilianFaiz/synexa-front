import {colors,typography,radius,shadows,spacing} from "@/src/theme/";
import { StyleSheet } from "react-native";

export const secondaryButtonStyles = StyleSheet.create({
    button:{
        padding: spacing.sm,
        backgroundColor:colors.secondary,
        borderRadius: radius.md,
        shadowColor: shadows.small.shadowColor
    },
    text:{
        color: colors.textSecondary,
        fontSize: typography.button.fontsize,
        fontFamily: typography.button.fontfamily,
    }

});