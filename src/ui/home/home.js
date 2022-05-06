import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Lang from '../../core/init/lang/en';
import HomeMenuItem from "../../_product/component/molecules/home_menu_item";
import HomeMenu from './data/data';
import { AppSessions } from '../../_product/session/session';
import { HomeStyle } from './style';

const HomeView = () => {

    const isFocus = useIsFocused()
    const gridRowCount = 2;
    const navigation = useNavigation();
    const styles = HomeStyle
    const avatarUrl = "https://cdn-icons-png.flaticon.com/512/219/219986.png"

    function renderTopView() {
        return <View style={styles.topView}>
            <Text style={styles.topTitle}>{Lang.educational}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Image style={styles.avatar} source={{ uri: avatarUrl }} />
                <Text style={styles.welcomeText}>{Lang.welcome}{","}{AppSessions.name}</Text>
            </View>
        </View>
    }

    function renderMenuList() {
        return <FlatList
            data={HomeMenu}
            numColumns={gridRowCount}
            contentContainerStyle={styles.contentcontainer}
            renderItem={({ item }) => {
                return <HomeMenuItem onPress={() => {
                    navigation.navigate(item.navigate)
                }} text={item.name} icon={item.icon} />
            }}
        />
    }

    return (
        <View style={styles.body}>
            {renderTopView()}
            {renderMenuList()}
        </View>
    );
}


export default HomeView;