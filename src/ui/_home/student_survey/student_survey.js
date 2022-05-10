import React from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import { useNavigation, useIsFocused } from '@react-navigation/native';
import storage from "../../../core/init/storage/storage";
import CacheConstant from '../../../core/constant/cache';
import DefaultButton from "../../../_product/component/atom/button";
import Lang from '../../../core/init/lang/en';

const StudentSurvey = (props) => {
    const {route} = props;
    const {params } = route;
    const navigation = useNavigation();
    const isFocus = useIsFocused();
    const [userData, setUserData] = React.useState(null);
    const [address, setAddress] = React.useState("")

    React.useEffect(() => {
        getStudentSurvey();
        console.log("params :::",params);
    }, [isFocus])

    async function getStudentSurvey() {
        let studentList = await storage.get(CacheConstant.student_list);
        Array.from(studentList).map((item) => {
            if (item.id == params.student_id) {
                if (item.survey != null) {
                    setUserData(item.survey)
                    console.log("userData",userData);
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
                "address": address
            },
            "tckn": user.tckn,
        }
        await storage.remove(CacheConstant.student_list);
        list.push(updateUser)
        await storage.set(CacheConstant.student_list, list)
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
            {renderSaveButton()}
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