import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import storage from "../../../core/init/storage/storage";
import Toast from 'react-native-toast-message';
import { test_text } from './data/data';
import AppColors from '../../../core/init/theme/colors';
import Lang from '../../../core/init/lang/en';
import TestItem from "../../../_product/component/molecules/test_item";

const StundentTestView = (props) => {
    const { route } = props;
    const { params } = route;
    const isFocus = useIsFocused();
    const navigation = useNavigation();
    const [testData, setTestData] = React.useState(null);
    const [rule, setRule] = React.useState(null);
    const [peopleRelations, setPeopleReleations] = React.useState(null)

    React.useEffect(() => {
        getStudentTest()
    }, [isFocus])

    async function getStudentTest() {
        let studentList = await storage.get(CacheConstant.student_list);
        Array.from(studentList).map((item) => {
            if (item.id == params.student_id) {
                if (item.test != null) {
                    setTestData(item.test)
                    console.log("userData", testData);
                    //setAddress(item.survey.address)
                    setRule(item.test.rule);
                    // setPeopleReleations(item.test.relations)
                }
            } else {
                console.log("not found");
            }
        })
    }

    async function updateTest() {
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
            "survey": user.survey,
            "tckn": user.tckn,
            "test": {
                "rule": rule,
                //"relations" : peopleRelations
            }
        }
        await storage.remove(CacheConstant.student_list);
        list.push(updateUser)
        await storage.set(CacheConstant.student_list, list)
        Toast.show({
            type: 'success',
            text1: "Form added successfully"
        })
    }


    function renderRuleContainer() {
        return <TestItem
            onPress={(item) => setRule(item)}
            selected={rule}
            title={Lang.test_rule}
        />
    }

    function renderSaveButton() {
        return <TouchableOpacity
            style={{ margin: 16, borderRadius: 8, height: 44, backgroundColor: AppColors.background, alignItems: 'center', justifyContent: 'center' }}
            onPress={async () => {
                await updateTest()
            }}
        >
            <Text style={{ color: AppColors.whiteText }}>{Lang.save}</Text>
        </TouchableOpacity>
    }

    function renderTitlebuilder(text) {
        return <View style={{ marginVertical: 8, marginHorizontal: 16, padding: 8, borderRadius: 8, backgroundColor: AppColors.secondary }}>
            <Text>{"#"}{text}</Text>
        </View>
    }

    return (
        <View style={styles.body}>
            {renderTitlebuilder(Lang.test_personel_title)}
            {renderRuleContainer()}
            {renderSaveButton()}
            <Toast position="bottom" />
        </View>
    );

}

const styles = StyleSheet.create({
    body: {

    }
})

export default StundentTestView;