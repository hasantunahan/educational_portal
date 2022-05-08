
import React, { useState } from "react";
import Lang from '../../core/init/lang/en';
import AppColors from '../../core/init/theme/colors';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import {
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
import { RegisterStyle } from './style';
import Toast from 'react-native-toast-message'

export default function RegisterView() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = React.useState("");
    const navigation = useNavigation();
    const isFocus = useIsFocused()
    const styles = RegisterStyle

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
            <Toast position="bottom" />
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
            Toast.show({
                type: 'success',
                text1: Lang.successful
            });
            setTimeout(() => {
                navigation.navigate(NavigationConstant.login);
            }, 500);
        }else{
            Toast.show({
                type: 'error',
                text1: Lang.please_all_area_required
            });
        }
    }
}