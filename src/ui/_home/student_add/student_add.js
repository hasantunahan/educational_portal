import React from "react";
import { Text, View, StyleSheet, StatusBar, TextInput } from "react-native";
import AppColors from '../../../core/init/theme/colors';
import Lang from '../../../core/init/lang/en';
import DefaultButton from '../../../_product/component/atom/button';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import storage from "../../../core/init/storage/storage";
import CacheConstant from '../../../core/constant/cache';
import { Picker } from "@react-native-picker/picker";
import { StudentAddStyle } from './style';
import uuid from 'react-native-uuid';
import Toast from 'react-native-toast-message'


const StudentAddView = () => {
    const styles = StudentAddStyle;
    const isFocus = useIsFocused();
    const [name, setName] = React.useState("");
    const [tckn, setTckn] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [schoolno, setSchoolNo] = React.useState("");
    const [phonenumber, setPhoneNumber] = React.useState("");
    const [userList, setUserList] = React.useState([])
    const [selectedTeacher, setSelectedTeacher] = React.useState(null);
    const navigation = useNavigation()

    React.useEffect(() => {
        getUserList();
        getStudentLis();
        //storage.remove(CacheConstant.student_list);
    }, [isFocus])

    async function getUserList() {
        const res = await storage.get(CacheConstant.account);
        let list = res ?? [];
        setUserList(list);
        setSelectedTeacher(list[0])
    }

    async function saveStudentList() {
        if (name != "" && password != "" && phonenumber != "" && tckn != "" && schoolno != "" && selectedTeacher != null) {
            let students = await getStudentLis();
            let list = students ?? [];
            if (students == null) {
                list.push({
                    id: uuid.v4(),
                    name: name.trim(),
                    phoneNumber: phonenumber.trim(),
                    schoolNo: schoolno.trim(),
                    tckn: tckn.trim(),
                    selectedTeacher: selectedTeacher,
                    survey: null
                });
                try {
                    await storage.set(CacheConstant.student_list, list);
                    navigation.goBack();
                } catch (error) {
                    console.log("error set new students");
                }
            } else {
                Array.from(students).map((item) => {
                    if (item.tckn !== tckn) {
                        list.push({
                            id: uuid.v4(),
                            name: name,
                            phoneNumber: phonenumber,
                            schoolNo: schoolno,
                            tckn: tckn,
                            selectedTeacher: selectedTeacher,
                            survey: null
                        });
                        storage.set(CacheConstant.student_list, list)
                        navigation.goBack();
                        return;
                    } else {
                        console.log("students already exits");
                        return;
                    }
                })
            }

        } else {
            Toast.show({
                type: 'error',
                text1: Lang.please_all_area_required
            });
            console.log("save error !!!");
        }
    }

    async function getStudentLis() {
        let students = await storage.get(CacheConstant.student_list);
        console.log("students list", students);
        return students;
    }


    function renderTitle(title) {
        return <Text style={styles.title}>{title}</Text>
    }

    function renderNameTextField() {
        return <TextInput
            style={styles.input}
            placeholder={Lang.name}
            maxLength={40}
            onChangeText={(text) => setName(text)}
        />
    }

    function renderSchoolNoTextField() {
        return <TextInput
            style={styles.input}
            placeholder={Lang.school_no}
            maxLength={6}
            onChangeText={(text) => setSchoolNo(text)}
        />
    }

    function renderTckn() {
        return <TextInput
            style={styles.input}
            placeholder={Lang.tckn}
            maxLength={11}
            onChangeText={(text) => setTckn(text)}
        />
    }

    function renderPhoneNumber() {
        return <TextInput
            style={styles.input}
            placeholder={Lang.phone_number}
            maxLength={13}
            onChangeText={(text) => setPhoneNumber(text)}
        />
    }

    function renderPassword() {
        return <TextInput
            style={styles.input}
            placeholder={Lang.password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
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
            {renderPassword()}
            {renderSchoolNoTextField()}
            {renderPhoneNumber()}
            {renderTeacherList()}
            {renderSaveButton()}
            <Toast position="bottom" />
        </View>
    );
}


export default StudentAddView;