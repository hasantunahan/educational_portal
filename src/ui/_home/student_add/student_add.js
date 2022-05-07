import React from "react";
import { Text, View, StyleSheet, StatusBar, TextInput } from "react-native";
import AppColors from '../../../core/init/theme/colors';
import Lang from '../../../core/init/lang/en';
import DefaultButton from '../../../_product/component/atom/button';


function renderTitle(title) {
    return <Text style={styles.title}>{title}</Text>
}

function renderNameTextField() {
    return <TextInput
        style={styles.input}
        placeholder={Lang.name}
    />
}

function renderSchoolNoTextField() {
    return <TextInput
        style={styles.input}
        placeholder={Lang.school_no}
    />
}

function renderTckn() {
    return <TextInput
        style={styles.input}
        placeholder={Lang.tckn}
    />
}

function renderPhoneNumber() {
    return <TextInput
        style={styles.input}
        placeholder={Lang.phone_number}
    />
}

function renderSaveButton() {
    return <DefaultButton
        text={Lang.save.toUpperCase()}
        onPress={() => {
            console.log("save");
        }}
    />
}

const StudentAddView = () => {
    return (
        <View style={styles.body}>
            {renderTitle(Lang.form_student_add)}
            {renderTckn()}
            {renderNameTextField()}
            {renderSchoolNoTextField()}
            {renderPhoneNumber()}
            {renderSaveButton()}
        </View>
    );
}

const styles = StyleSheet.create({
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

    }
})

export default StudentAddView;