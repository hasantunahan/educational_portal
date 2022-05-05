
import React, { useState } from "react";
import Lang from '../../core/init/lang/en';
import AppColors from '../../core/init/theme/colors';
import { useNavigation } from '@react-navigation/native';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
} from "react-native";

export default function RegisterView() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = React.useState("");
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

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder={Lang.name}
                    placeholderTextColor={AppColors.text}
                    onChangeText={(text) => setName(text)}
                />
            </View>

            <TouchableOpacity style={styles.registerButton}>
                <Text style={styles.registerText}>{Lang.login.toUpperCase()}</Text>
            </TouchableOpacity>

            <Text style={{ color: 'white', marginTop: 16 }}>{Lang.or}</Text>

            <TouchableOpacity style={{ marginTop: 16 }} onPress={() => {
                navigation.navigate(NavigationConstant.login)
            }}>
                <Text style={[styles.loginText, { color: AppColors.secondary }]}>{Lang.login}</Text>
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

    registerText: {
        color: AppColors.whiteText,
    },

    registerButton: {
        width: "88%",
        borderRadius: 25,
        height: "8%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: AppColors.button,
    },
});
