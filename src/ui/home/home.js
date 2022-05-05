import React from "react";
import { View, Text, StyleSheet, StatusBar, FlatList } from "react-native";
import AppColors from '../../core/init/theme/colors';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Lang from '../../core/init/lang/en';
import HomeMenuItem from "../../_product/component/molecules/home_menu_item";
import HomeMenu from './data/data';

const HomeView = () => {

    const isFocus = useIsFocused()
    const navigation = useNavigation();


    return (
        <View style={styles.body}>
            <Text style={styles.topTitle}>{Lang.educational}</Text>
            <FlatList
                data={HomeMenu}
                numColumns={2}
                contentContainerStyle={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                renderItem={({ item }) => {
                    return <HomeMenuItem text={item.name} />
                }}
            />


        </View>
    );


}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: AppColors.background,
        paddingHorizontal: 16
    },
    topTitle: {
        marginTop: 48 + StatusBar.currentHeight,
        marginBottom: 16,
        marginLeft: 4,
        fontSize: 24,
        alignItems: 'center',
        justifyContent: 'center',
        letterSpacing: 1.2,
        color: AppColors.whiteText
    }
})

export default HomeView;