import { StyleSheet } from "react-native"

export const StudentAddStyle = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: AppColors.whiteText,
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    title: {
        fontSize: 18,
        letterSpacing: 0.24,
        fontWeight: '500'
    },
    input: {
        marginTop: 12,
        backgroundColor: AppColors.secondary,
        padding: 12,
        borderRadius: 8,

    },
    titleText: {
        letterSpacing: 0.25,
        marginVertical: 12,
        marginLeft: 4,
    }
})