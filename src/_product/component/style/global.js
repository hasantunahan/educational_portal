import { View } from "react-native";

export function spacer(flex) {
    return <View style={{ flex: flex ?? 1 }}></View>
}