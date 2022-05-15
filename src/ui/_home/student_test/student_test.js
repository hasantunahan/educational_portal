import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from "react-native"
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
    const [create, setCreate] = React.useState(null)
    const [timeManagement, setTimeManagement] = React.useState(null)
    const [mood, setMood] = React.useState(null)
    const [strongSchool, setStrongSchool] = React.useState(null)
    const [orderAlphabet, setOrderAlphabet] = React.useState(null);

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
                    setPeopleReleations(item.test.relations)
                    setCreate(item.test.create)
                    setMood(item.test.mood)
                    setOrderAlphabet(item.test.orderAlphabet)
                    setStrongSchool(item.test.strongSchool)
                    setTimeManagement(item.test.timeManagement)
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
                "relations": peopleRelations,
                "timeManagement": timeManagement,
                "strongSchool": strongSchool,
                "orderAlphabet": orderAlphabet,
                "create": create,
                "mood": mood,
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

    function renderRelationscontainer() {
        return <TestItem
            onPress={(item) => setPeopleReleations(item)}
            selected={peopleRelations}
            title={Lang.test_people_relations}
        />
    }

    function renderCreateIdeasContainer() {
        return <TestItem
            onPress={(item) => setCreate(item)}
            selected={create}
            title={Lang.test_create}
        />
    }

    function renderorderAlphabetContainer() {
        return <TestItem
            onPress={(item) => setOrderAlphabet(item)}
            selected={orderAlphabet}
            title={Lang.test_order_alphabet}
        />
    }

    function renderStrongSchoolContainer() {
        return <TestItem
            onPress={(item) => setStrongSchool(item)}
            selected={strongSchool}
            title={Lang.test_strong_school}
        />
    }

    function renderMoodContainer() {
        return <TestItem
            onPress={(item) => setMood(item)}
            selected={mood}
            title={Lang.test_mood}
        />
    }

    function renderTimeManagementContainer() {
        return <TestItem
            onPress={(item) => setTimeManagement(item)}
            selected={timeManagement}
            title={Lang.test_time}
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
            <ScrollView>
                {renderTitlebuilder(Lang.test_personel_title)}
                {renderRuleContainer()}
                {renderRelationscontainer()}
                {renderCreateIdeasContainer()}
                {renderTimeManagementContainer()}
                {renderMoodContainer()}
                {renderTitlebuilder(Lang.general_qua_title)}
                {renderStrongSchoolContainer()}
                {renderorderAlphabetContainer()}
                {renderSaveButton()}
            </ScrollView>
            <Toast position="bottom" />
        </View>
    );

}

const styles = StyleSheet.create({
    body: {

    }
})

export default StundentTestView;