import React from "react";
import { View, Text, StyleSheet, StatusBar, FlatList } from "react-native";
import AppColors from '../../core/init/theme/colors';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Lang from '../../core/init/lang/en';
import HomeMenuItem from "../../_product/component/molecules/home_menu_item";
import HomeMenu from './data/data';
import { AppSessions } from '../../_product/session/session';

const HomeView = () => {

    const isFocus = useIsFocused()
    const navigation = useNavigation();


    return (
        <View style={styles.body}>
            <Text style={styles.topTitle}>{Lang.educational}</Text>
            <Text style={styles.welcomeText}>{Lang.welcome}{","}{AppSessions.name}</Text>
            <FlatList
                data={HomeMenu}
                numColumns={2}
                contentContainerStyle={styles.contentcontainer}
                renderItem={({ item }) => {
                    return <HomeMenuItem onPress={()=>{
                        navigation.navigate(item.navigate)
                    }} text={item.name} icon={item.icon}/>
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
        color: AppColors.secondary
    },
    contentcontainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcomeText :{
        marginBottom: 16,
        marginLeft: 4,
        alignItems: 'center',
        justifyContent: 'center',
        letterSpacing: 1.2,
        color: AppColors.whiteText
    }
})

export default HomeView;