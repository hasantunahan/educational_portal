
import React, { useState } from "react";
import Lang from '../../core/init/lang/en';
import AppColors from '../../core/init/theme/colors';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
} from "react-native";
import storage from "../../core/init/storage/storage";
import CacheConstant from '../../core/constant/cache';
import NavigationConstant from '../../core/constant/navigation';
import uuid from 'react-native-uuid';
import { AppSessions } from '../../_product/session/session';

export default function RegisterView() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = React.useState("");
    const navigation = useNavigation();
    const isFocus = useIsFocused()

    React.useEffect(() => {
        getRegisterUser();
    }, [isFocus])

    function renderLogo() {
        return <Image style={styles.logo} source={require("../../../assets/logo.png")}
        />
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

    function renderNameTextField() {
        return <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder={Lang.name}
                placeholderTextColor={AppColors.text}
                onChangeText={(text) => setName(text)}
            />
        </View>
    }

    function renderRegisterButton() {
        return <TouchableOpacity style={styles.registerButton} onPress={async () => {
            await register();
        }}>
            <Text style={styles.registerText}>{Lang.register.toUpperCase()}</Text>
        </TouchableOpacity>
    }

    function renderGoLogin() {
        return <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 16 }}>
            <Text>{Lang.ihaveaccount}{" ,"}</Text>
            <TouchableOpacity onPress={() => {
                navigation.navigate(NavigationConstant.login)
            }}>
                <Text style={[styles.loginText, { color: AppColors.background, fontWeight: 'bold' }]}>{Lang.login}</Text>
            </TouchableOpacity>
        </View>
    }

    return (
        <View style={styles.container}>
            {renderLogo()}
            {renderEmailTextField()}
            {renderPasswordTextField()}
            {renderNameTextField()}
            {renderRegisterButton()}
            <Text style={styles.or}>{Lang.or}</Text>
            {renderGoLogin()}
        </View>
    );

    async function getRegisterUser() {
        const acc = await storage.get(CacheConstant.account)
        console.log("register", acc);
    }

    async function register() {
        if (name != "" && password != "" && email != "") {
            const acc = await storage.get(CacheConstant.account);
            console.log("register acc", acc);
            let list = acc ?? [];
            list.push({ email: email, password: password, name: name, id: uuid.v4() })
            await storage.set(CacheConstant.account, list);
            console.log("list", list);
            setTimeout(() => {
                navigation.navigate(NavigationConstant.login);
            }, 250);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.whiteText,
        alignItems: "center",
        justifyContent: "center",
    },
    or :{ color: 'black', marginTop: 16 },
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

    registerText: {
        color: AppColors.whiteText,
    },

    registerButton: {
        width: "88%",
        borderRadius: 8,
        height: "4%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: AppColors.button,
    },
});
