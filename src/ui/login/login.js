
import React, { useState } from "react";
import Lang from '../../core/init/lang/en';
import AppColors from '../../core/init/theme/colors';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavigationConstant from '../../core/constant/navigation';

export default function LoginView() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../../../assets/logo.png")}
            />
            <View style={[styles.inputView, { marginTop: -120 }]}>
                <TextInput
                    style={styles.TextInput}
                    placeholder={Lang.email}
                    placeholderTextColor={AppColors.text}
                    onChangeText={(email) => setEmail(email)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder={Lang.password}
                    placeholderTextColor={AppColors.text}
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>


            <TouchableOpacity style={styles.loginBtn}>
                <Text style={styles.loginText}>{Lang.login.toUpperCase()}</Text>
            </TouchableOpacity>

            <Text style={{ color: 'white', marginTop: 16 }}>{Lang.or}</Text>

            <TouchableOpacity style={{ marginTop: 16 }} onPress={() => {
                navigation.navigate(NavigationConstant.register)
            }}>
                <Text style={[styles.loginText, { color: AppColors.secondary }]}>{Lang.register}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.background,
        alignItems: "center",
        justifyContent: "center",
    },

    logo: {
        width: "80%",
    },

    image: {
        marginBottom: 10,
    },

    inputView: {
        backgroundColor: AppColors.secondary,
        borderRadius: 30,
        width: "88%",
        height: "5%",
        marginBottom: "5%",
        alignItems: "center",
    },

    TextInput: {
        height: 44,
        flex: 1,
        padding: 10,
        marginLeft: 2,
    },

    forgot_button: {
        height: "10%",
        marginBottom: "20%",
    },

    loginText: {
        color: AppColors.whiteText,
    },

    loginBtn: {
        width: "88%",
        borderRadius: 25,
        height: "8%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: AppColors.button,
    },
});
