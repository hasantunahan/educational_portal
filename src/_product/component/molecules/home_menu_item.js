import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import AppColors from '../../../core/init/theme/colors';


const HomeMenuItem = ({ text, icon, onPress }) => {

    return (

        <TouchableOpacity onPress={onPress}>
            <View style={styles.body}>
                <Image style={styles.logo} source={{ uri: icon }} />
                <Text style={styles.text}>{text}</Text>
            </View>
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    body: {
        backgroundColor: AppColors.whiteText,
        height: Dimensions.get('window').width * .44,
        width: Dimensions.get('window').width * .44,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        margin: 4
    },
    text: {
        color: AppColors.background,
        letterSpacing: 1.1
    },
    logo: {
        width: 75,
        height: 75,
        marginBottom: 12
    }
});

export default HomeMenuItem;