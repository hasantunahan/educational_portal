import React from "react";
import { View, Text, StyleSheet, StatusBar, FlatList, Image } from "react-native";
import AppColors from '../../core/init/theme/colors';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Lang from '../../core/init/lang/en';
import HomeMenuItem from "../../_product/component/molecules/home_menu_item";
import HomeMenu from './data/data';
import { AppSessions } from '../../_product/session/session';
import { HomeStyle } from './style';

const HomeView = () => {

    const isFocus = useIsFocused()
    const navigation = useNavigation();
    const styles = HomeStyle

    return (
        <View style={styles.body}>
            <View style={styles.topView}>
                <Text style={styles.topTitle}>{Lang.educational}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Image style={{ width: 20, height: 20 }} source={{ uri: "https://cdn-icons-png.flaticon.com/512/219/219986.png" }} />
                    <Text style={styles.welcomeText}>{Lang.welcome}{","}{AppSessions.name}</Text>
                </View>
            </View>
            <FlatList
                data={HomeMenu}
                numColumns={2}
                contentContainerStyle={styles.contentcontainer}
                renderItem={({ item }) => {
                    return <HomeMenuItem onPress={() => {
                        navigation.navigate(item.navigate)
                    }} text={item.name} icon={item.icon} />
                }}
            />
        </View>
    );
}


export default HomeView;