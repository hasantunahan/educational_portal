import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import storage from "../../../core/init/storage/storage";
import CacheConstant from '../../../core/constant/cache';
import DefaultButton from "../../../_product/component/atom/button";
import Lang from '../../../core/init/lang/en';
import Toast from 'react-native-toast-message';

const StudentSurvey = (props) => {
    const { route } = props;
    const { params } = route;
    const navigation = useNavigation();
    const isFocus = useIsFocused();
    const [userData, setUserData] = React.useState(null);
    const [goodFeel, setGodFeel] = React.useState("")
    const [address, setAddress] = React.useState("")
    const [oldSchool, setOldSchool] = React.useState("")
    const [motherName, setMotherName] = React.useState("")
    const [fatherName, setFatherName] = React.useState("")
    const [birthDay, setBirthDay] = React.useState("")
    const [placebirth, setPlaceBirth] = React.useState("")
    const [sisterorbrothercount, setSisterOrBrotherCount] = React.useState("")
    const [disabilityStatuation, setDisabilitySituation] = React.useState("")

    React.useEffect(() => {
        getStudentSurvey();
        console.log("params :::", params);
    }, [isFocus])

    async function getStudentSurvey() {
        let studentList = await storage.get(CacheConstant.student_list);
        Array.from(studentList).map((item) => {
            if (item.id == params.student_id) {
                if (item.survey != null) {
                    setUserData(item.survey)
                    console.log("userData", userData);
                    setAddress(item.survey.address)
                    setBirthDay(item.survey.birthDay)
                    setDisabilitySituation(item.survey.disability)
                    setMotherName(item.survey.motherName)
                    setFatherName(item.survey.fatherName)
                    setOldSchool(item.survey.oldSchool)
                    setPlaceBirth(item.survey.placeBirth)
                    setSisterOrBrotherCount(item.survey.sisterCount)
                    setGodFeel(item.survey.health)
                }
            } else {
                console.log("not found");
            }
        })
    }

    async function updateSurvey() {
        let studentList = await storage.get(CacheConstant.student_list);
        let list = Array.from(studentList).filter((item) => item.id != params.student_id);
        let user = Array.from(studentList).find((item) => item.id == params.student_id);
        let updateUser = {
            "id": user.id,
            "name": user.name,
            "password": user.password,
            "phoneNumber": user.phoneNumber,
            "schoolNo": user.schoolNo,
            "selectedTeacher":
            {
                "email": user.selectedTeacher.email,
                "id": user.selectedTeacher.id,
                "name": user.selectedTeacher.name,
                "password": user.selectedTeacher.password,
            },
            "survey": {
                "address": address,
                "oldSchool": oldSchool,
                "health": goodFeel,
                "motherName": motherName,
                "fatherName": fatherName,
                "birthDay": birthDay,
                "placeBirth": placebirth,
                "disability": disabilityStatuation,
                "sisterCount": sisterorbrothercount,
            },
            "tckn": user.tckn,
            "test" : user.test
        }
        await storage.remove(CacheConstant.student_list);
        list.push(updateUser)
        await storage.set(CacheConstant.student_list, list)
        Toast.show({
            type: 'success',
            text1: "Form added successfully"
        })
    }

    function renderQuestionOldSchool() {
        return <TextInput
            style={styles.input}
            defaultValue={userData?.oldSchool}
            placeholder="Education Level"
            onChangeText={(txt) => setOldSchool(txt)}
        />
    }

    function renderGoodFeal() {
        return <TextInput
            style={styles.input}
            defaultValue={userData?.health}
            placeholder="Health Situation"
            onChangeText={(txt) => setGodFeel(txt)}
        />
    }

    function renderMotherName() {
        return <TextInput
            style={styles.input}
            defaultValue={userData?.motherName}
            placeholder="Mother Name"
            onChangeText={(txt) => setMotherName(txt)}
        />
    }

    function renderFatherName() {
        return <TextInput
            style={styles.input}
            defaultValue={userData?.fatherName}
            placeholder="Father Name"
            onChangeText={(txt) => setFatherName(txt)}
        />
    }

    function renderBirtday() {
        return <TextInput
            style={styles.input}
            defaultValue={userData?.birthDay}
            placeholder="Birthday"
            onChangeText={(txt) => setBirthDay(txt)}
        />
    }

    function renderBirtWhere() {
        return <TextInput
            style={styles.input}
            defaultValue={userData?.placeBirth}
            placeholder="Place of birth"
            onChangeText={(txt) => setPlaceBirth(txt)}
        />
    }

    function renderSisterAndBrohterCount() {
        return <TextInput
            style={styles.input}
            defaultValue={userData?.sisterCount}
            placeholder="Sister and Brother count"
            onChangeText={(txt) => setSisterOrBrotherCount(txt)}
        />
    }

    function renderEngelStatus() {
        return <TextInput
            style={styles.input}
            defaultValue={userData?.disability}
            placeholder="Disability Situation"
            onChangeText={(txt) => setDisabilitySituation(txt)}
        />

    }


    function renderAddress() {
        return <TextInput
            style={styles.input}
            defaultValue={userData?.address}
            placeholder="Address"
            onChangeText={(txt) => setAddress(txt)}
        />
    }

    function renderSaveButton() {
        return <DefaultButton
            text={Lang.save}
            onPress={async () => {
                await updateSurvey()
            }}
        />
    }

    return (
        <View style={styles.body}>
            {renderAddress()}
            {renderQuestionOldSchool()}
            {renderGoodFeal()}
            {renderFatherName()}
            {renderMotherName()}
            {renderBirtday()}
            {renderBirtWhere()}
            {renderSisterAndBrohterCount()}
            {renderEngelStatus()}
            {renderSaveButton()}
            <Toast position="bottom" />
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 12,
        paddingTop: 12
    },
    input: {
        marginTop: 12,
        backgroundColor: AppColors.secondary,
        padding: 12,
        borderRadius: 8,
    }
})

export default StudentSurvey;