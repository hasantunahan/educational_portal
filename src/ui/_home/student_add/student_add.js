import React from "react";
import { Text, View, StyleSheet, StatusBar, TextInput } from "react-native";
import AppColors from '../../../core/init/theme/colors';
import Lang from '../../../core/init/lang/en';
import DefaultButton from '../../../_product/component/atom/button';
import { useIsFocused } from '@react-navigation/native';
import storage from "../../../core/init/storage/storage";
import CacheConstant from '../../../core/constant/cache';
import { Picker } from "@react-native-picker/picker";
import { StudentAddStyle } from './style';



const StudentAddView = () => {
    const styles = StudentAddStyle;
    const isFocus = useIsFocused();
    const [name, setName] = React.useState("");
    const [tckn, setTckn] = React.useState("");
    const [schoolno, setSchoolNo] = React.useState("");
    const [phonenumber, setPhoneNumber] = React.useState("");
    const [userList, setUserList] = React.useState([])
    const [selectedTeacher, setSelectedTeacher] = React.useState(null);

    React.useEffect(() => {
        getUserList();
    }, [isFocus])

    async function getUserList() {
        const res = await storage.get(CacheConstant.account);
        let list = res ?? [];
        setUserList(list);
        setSelectedTeacher(list[0])
    }

    async function saveStudentList() {
        if (name != "" && phonenumber != "" && tckn != "" && schoolno != "" && selectedTeacher != null) {
            console.log("success save");
        } else {
            console.log("save error !!!");
        }
    }


    function renderTitle(title) {
        return <Text style={styles.title}>{title}</Text>
    }

    function renderNameTextField() {
        return <TextInput
            style={styles.input}
            placeholder={Lang.name}
            onChangeText={(text) => setName(text)}
        />
    }

    function renderSchoolNoTextField() {
        return <TextInput
            style={styles.input}
            placeholder={Lang.school_no}
            onChangeText={(text) => setSchoolNo(text)}
        />
    }

    function renderTckn() {
        return <TextInput
            style={styles.input}
            placeholder={Lang.tckn}
            onChangeText={(text) => setTckn(text)}
        />
    }

    function renderPhoneNumber() {
        return <TextInput
            style={styles.input}
            placeholder={Lang.phone_number}
            onChangeText={(text) => setPhoneNumber(text)}
        />
    }

    function renderSaveButton() {
        return <DefaultButton
            text={Lang.save.toUpperCase()}
            onPress={async () => {
                await saveStudentList()
            }}
        />
    }

    function renderTeacherList() {
        return <View>
            <Text style={styles.titleText}>{Lang.chooseTeacher}</Text>
            <Picker
                itemStyle={{
                    height: 120
                }}
                selectedValue={selectedTeacher}
                onValueChange={(itemValue, itemIndex) =>
                    setSelectedTeacher(itemValue)
                }>
                {
                    userList.map((item, index) => {
                        return <Picker.Item key={index} label={item.name} value={item} />
                    })
                }
            </Picker>
        </View>
    }

    return (
        <View style={styles.body}>
            {renderTitle(Lang.form_student_add)}
            {renderTckn()}
            {renderNameTextField()}
            {renderSchoolNoTextField()}
            {renderPhoneNumber()}
            {renderTeacherList()}
            {renderSaveButton()}
        </View>
    );
}


export default StudentAddView;