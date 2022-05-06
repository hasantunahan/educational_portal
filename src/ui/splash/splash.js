import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import NavigationConstant from '../../core/constant/navigation';
import AppColors from '../../core/init/theme/colors';
import Lang from '../../core/init/lang/en';

const SplashView = () => {
    const navigation = useNavigation()

    React.useEffect(() => {
        setTimeout(() => {
            navigation.navigate(NavigationConstant.login);
        }, 4000);
    }, [])

    return (
        <View style={styles.body}>
            <Image style={styles.logo} source={require("../../../assets/logo.png")} />
            <Text style={styles.appName}>{Lang.educational}</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: AppColors.whiteText,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 320,
        height: 250,
        resizeMode: 'contain'
    },
    appName: {
        fontSize: 24,
        letterSpacing: 1.2,
        marginTop: 8
    }

});

export default SplashView;