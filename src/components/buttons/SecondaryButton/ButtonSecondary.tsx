import { TouchableOpacity, Text } from "react-native";

import SecondaryButtonProps from "./ButtonSecondaryType";
import { secondaryButtonStyles } from "./ButtonSecondaryStyle";

export default function SecondaryButton({
  title,
  onPress,
  isLoading = false,
  disabled = false,
}: SecondaryButtonProps) {
  return (
    <TouchableOpacity
      style={secondaryButtonStyles.button}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      <Text style={secondaryButtonStyles.text}>
        {isLoading ? "Loading..." : title}
      </Text>
    </TouchableOpacity>
  );
}