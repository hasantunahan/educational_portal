import { StyleSheet } from "react-native";

export const HomeStyle = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: AppColors.whiteText,
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
    welcomeText: {
        marginBottom: 16,
        marginLeft: 4,
        alignItems: 'center',
        justifyContent: 'center',
        letterSpacing: 1.2,
        color: AppColors.whiteText
    },
    topView: {
        backgroundColor: AppColors.background,
        marginHorizontal: -16,
        paddingVertical: 16,
        marginBottom: 16,
        paddingHorizontal: 16
    }
})
