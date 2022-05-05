import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import AppColors from '../../../core/init/theme/colors';


const HomeMenuItem = ({ text, icon, onPress }) => {

    return (

        <TouchableOpacity onPress={onPress}>
            <View style={styles.body}>
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    body: {
        backgroundColor: AppColors.whiteTextOpacity,
        height: Dimensions.get('window').width*.42,
        width: Dimensions.get('window').width*.42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        margin:4
    }
});

export default HomeMenuItem;