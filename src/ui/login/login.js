
import React, { useState } from "react";
import Lang from '../../core/init/lang/en';
import AppColors from '../../core/init/theme/colors';
import {
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import NavigationConstant from '../../core/constant/navigation';
import storage from "../../core/init/storage/storage";
import CacheConstant from '../../core/constant/cache';
import { AppSessions } from "../../_product/session/session";
import { LoginStyle } from './style';
import Toast from 'react-native-toast-message'

const LoginView = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigation = useNavigation();
    const styles = LoginStyle

    function renderLogo() {
        return (
            <Image style={styles.logo} source={require("../../../assets/logo.png")} />
        )
    }

    function renderEmailTextField() {
        return <View style={[styles.inputView, { marginTop: 32 }]}>
            <TextInput
                style={styles.TextInput}
                placeholder={Lang.email}
                placeholderTextColor={AppColors.text}
                onChangeText={(email) => setEmail(email)}
            />
        </View>
    }

    function renderPasswordTextField() {
        return <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder={Lang.password}
                placeholderTextColor={AppColors.text}
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
            />
        </View>
    }

    function renderLoginButton() {
        return <TouchableOpacity style={styles.loginBtn} onPress={async () => {
            await loginUser()
        }}>
            <Text style={styles.loginText}>{Lang.login.toUpperCase()}</Text>
        </TouchableOpacity>
    }

    function renderGoRegister() {
        return <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>
            <Text>{Lang.idonthaveaccount}{" ,"}</Text>
            <TouchableOpacity onPress={() => {
                navigation.navigate(NavigationConstant.register)
            }}>
                <Text style={[styles.loginText, { color: AppColors.background, fontWeight: 'bold' }]}>{Lang.register}</Text>
            </TouchableOpacity>
        </View>
    }

    function renderChangeLogin() {
        return <TouchableOpacity style={{ marginVertical: 12 }} onPress={() => {
            navigation.navigate(NavigationConstant.student_login)
        }}>
            <Text style={[styles.loginText, { color: AppColors.background, fontWeight: 'bold' }]}>{Lang.student_login}</Text>
        </TouchableOpacity>
    }

    return (
        <View style={styles.container}>
            {renderLogo()}
            {renderEmailTextField()}
            {renderPasswordTextField()}
            {renderLoginButton()}
            <Text style={styles.or}>{Lang.or}</Text>
            {renderGoRegister()}
            {renderChangeLogin()}
            <Toast position="bottom" />
        </View>
    );

    async function loginUser() {
        const acc = await storage.get(CacheConstant.account)
        let users = acc ?? [];
        if (email != "" && password != "") {
            Array.from(users).filter((item) => {
                if (item.email == email && item.password == password) {
                    navigation.navigate(NavigationConstant.home)
                    AppSessions.email = email;
                    AppSessions.perm = 1;
                    AppSessions.name = item.name;
                    AppSessions.userId = item.id;
                    AppSessions.tckn = item.tckn;
                    return;
                } else {
                    Toast.show({
                        type: 'error',
                        text1: Lang.account_or_password_wrong
                    })
                }
            })
        } else {
            Toast.show({
                type: 'error',
                text1: Lang.account_or_password_wrong
            })
        }
    }

}
export default LoginView;