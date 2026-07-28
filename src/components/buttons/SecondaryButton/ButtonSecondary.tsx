import { TouchableOpacity,Text } from "react-native";
import SecondaryButtonProps from "./ButtonSecondaryType";
import { secondaryButtonStyles } from "./ButtonSecondaryStyle";

export default function SecondaryButton({title,onPress}: SecondaryButtonProps){
    return(
        <TouchableOpacity style = {secondaryButtonStyles.button} onPress={onPress}>
            <Text style = {secondaryButtonStyles.text}>{title}</Text>
        </TouchableOpacity>

    )
}