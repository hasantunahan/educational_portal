import React from "react";
import { TouchableOpacity, Text } from "react-native";
import AppColors from '../../../core/init/theme/colors';
const DefaultButton = ({ text, onPress }) => {
    return <TouchableOpacity style={{
        width: "100%",
        marginVertical: 16,
        borderRadius: 8,
        height: "4%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: AppColors.blue_tone,
    }} onPress={onPress}>
        <Text style={{
            color: AppColors.whiteText,
        }}>{text}</Text>
    </TouchableOpacity>;
}

export default DefaultButton;