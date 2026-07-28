import { Text, TouchableOpacity } from "react-native";
import  {PrimaryButtonProps} from "./ButtonPrimaryType";
import { primaryButtonStyles } from "./ButtonPrimaryStyle";

export default function PrimaryButton({ title, onPress }: PrimaryButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} style ={primaryButtonStyles.button} >
            <Text style ={primaryButtonStyles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}