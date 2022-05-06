
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
import { useNavigation, useIsFocused } from "@react-navigation/native";
import NavigationConstant from '../../core/constant/navigation';
import storage from "../../core/init/storage/storage";
import CacheConstant from '../../core/constant/cache';
import { AppSessions } from "../../_product/session/session";

export default function LoginView() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    const isFocus = useIsFocused();

    async function loginUser() {
        const acc = await storage.get(CacheConstant.account)
        let users = acc ?? [];
        if (email != "" && password != "") {
            Array.from(users).filter((item) => {
                if (item.email == email && item.password == password) {
                    navigation.navigate(NavigationConstant.home)
                    AppSessions.name = email;
                    return;
                }
            })
        }
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../../../assets/logo.png")} />
            <View style={[styles.inputView, { marginTop: 32 }]}>
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


            <TouchableOpacity style={styles.loginBtn} onPress={async () => {
                await loginUser()
            }}>
                <Text style={styles.loginText}>{Lang.login.toUpperCase()}</Text>
            </TouchableOpacity>

            <Text style={{ color: 'black', marginTop: 16 }}>{Lang.or}</Text>

            <View style={{flexDirection :'row',justifyContent: 'center', alignItems :'center',marginTop: 16 }}>
                <Text>{Lang.idonthaveaccount}{" ,"}</Text>
                <TouchableOpacity  onPress={() => {
                    navigation.navigate(NavigationConstant.register)
                }}>
                    <Text style={[styles.loginText, { color: AppColors.background, fontWeight: 'bold' }]}>{Lang.register}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.whiteText,
        alignItems: "center",
        justifyContent: "center",
    },

    logo: {
        width: 320,
        height: 220,
        resizeMode: 'contain'
    },

    image: {
        marginBottom: 10,
    },

    inputView: {
        backgroundColor: AppColors.secondary,
        borderRadius: 8,
        width: "88%",
        height: "5%",
        marginBottom: "5%",
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
        borderRadius: 8,
        height: "4%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: AppColors.button,
    },
});
