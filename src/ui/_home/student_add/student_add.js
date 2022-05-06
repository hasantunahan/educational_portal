import React from "react";
import { Text, View, StyleSheet, StatusBar } from "react-native";
import AppColors from '../../../core/init/theme/colors';

const StudentAddView = () => {
    return (
        <View style={styles.body}>
            <Text>Addd</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    body : {
        flex : 1,
        backgroundColor : AppColors.whiteText,
    }
})

export default StudentAddView;