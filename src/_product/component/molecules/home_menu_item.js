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
        width: Dimensions.get('window').width * .9,
        alignItems: 'center',
        borderRadius: 8,
        margin: 4,
        padding: 8,
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: {
        color: AppColors.background,
        letterSpacing: 1.1,
        marginLeft: 16,
        fontWeight: '500'
    },
    logo: {
        width: 40,
        height: 40,
    }
});

export default HomeMenuItem;