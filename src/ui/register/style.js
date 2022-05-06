import { StyleSheet } from "react-native";
export const RegisterStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: AppColors.whiteText,
        alignItems: "center",
        justifyContent: "center",
    },
    or :{ color: 'black', marginTop: 16 },
    logo: {
        width: 320,
        height: 220,
        resizeMode: 'contain'
    },

    image: {
        marginBottom: 10,
    },

    inputView: {
        backgroundColor: AppColors.secondary,
        borderRadius: 8,
        width: "88%",
        height: "5%",
        marginBottom: "5%",
    },

    TextInput: {
        height: 44,
        flex: 1,
        padding: 10,
        marginLeft: 2,
    },

    forgot_button: {
        height: "10%",
        marginBottom: "20%",
    },

    registerText: {
        color: AppColors.whiteText,
    },

    registerButton: {
        width: "88%",
        borderRadius: 8,
        height: "4%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: AppColors.button,
    },
});