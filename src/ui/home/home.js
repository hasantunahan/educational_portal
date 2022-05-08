import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { useIsFocused, useNavigation } from '@react-navigation/native';
import Lang from '../../core/init/lang/en';
import HomeMenuItem from "../../_product/component/molecules/home_menu_item";
import HomeMenu from './data/data';
import { AppSessions } from '../../_product/session/session';
import { HomeStyle } from './style';
import App from '../../../App';

const HomeView = () => {

    const isFocus = useIsFocused()
    const gridRowCount = 2;
    const navigation = useNavigation();
    const styles = HomeStyle
    const avatarUrl = "https://cdn-icons-png.flaticon.com/512/219/219986.png"
    const descriptionText = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,";

    function renderTopView() {
        return <View style={styles.topView}>
            <Text style={styles.topTitle}>{Lang.educational}</Text>
            <View style={{ flexDirection: 'row' }}>
                <Image style={styles.avatar} source={{ uri: avatarUrl }} />
                <Text style={styles.welcomeText}>{Lang.welcome}{","}{AppSessions.email}</Text>
            </View>
        </View>
    }

    function renderMenuList() {
        return <FlatList
            data={HomeMenu}
            contentContainerStyle={styles.contentcontainer}
            renderItem={({ item }) => {
                return item.perm == AppSessions.perm && <HomeMenuItem onPress={() => {
                    navigation.navigate(item.navigate)
                }} text={item.name} icon={item.icon} />
            }}
        />
    }

    function renderDescriptionView() {
        return <Text style={styles.descriptionText}>
            {descriptionText}
        </Text>
    }


    return (
        <View style={styles.body}>
            {renderTopView()}
            {renderDescriptionView()}
            {renderMenuList()}
        </View>
    );
}


export default HomeView;