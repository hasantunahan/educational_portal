import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useIsFocused, useNavigation } from '@react-navigation/native';
import storage from "../../../core/init/storage/storage";
import CacheConstant from '../../../core/constant/cache';
import Lang from '../../../core/init/lang/en';
import StudentItems from "../../../_product/component/molecules/student_item";
import NavigationConstant from '../../../core/constant/navigation';
const StudentListView = () => {
    const isFocus = useIsFocused();
    const navigation = useNavigation();
    const [studentList, setStudentList] = React.useState(null);
    const [isLoading, setLoading] = React.useState(false);

    React.useEffect(() => {
        getStudentList();
    }, [isFocus])

    async function getStudentList() {
        setLoading(true);
        let list = await storage.get(CacheConstant.student_list);
        setLoading(false)
        setStudentList(list);
        console.log(list);
    }

    return (
        <View style={styles.body}>
            {
                studentList != null ?
                    <FlatList
                        data={studentList.sort((a, b) => parseInt(a) > parseInt(b))}
                        renderItem={({ item }) => {
                            return <StudentItems
                                onPress={() => {
                                    navigation.navigate(NavigationConstant.student_survey, {
                                        student_id: item.id
                                    })
                                }}
                                onPressSurvey={() => {
                                    navigation.navigate(NavigationConstant.student_survey, {
                                        student_id: item.id
                                    })
                                }}
                                testOnPress={() => {
                                    navigation.navigate(NavigationConstant.student_test, {
                                        student_id: item.id
                                    })
                                }}
                                data={item} />
                        }}
                    /> : <Text>{Lang.list_empty}</Text>
            }
        </View>
    );
}


const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 16,
        marginTop: 12
    }
})
export default StudentListView;