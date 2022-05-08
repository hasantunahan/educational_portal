import React from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import storage from "../../../core/init/storage/storage";
import CacheConstant from '../../../core/constant/cache';
import AppColors from '../../../core/init/theme/colors';
import Lang from '../../../core/init/lang/en';
const StudentListView = () => {
    const isFocus = useIsFocused();
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {
                studentList != null ?
                    studentList?.map((item, index) => {
                        return <Text key={index}>{item.tckn}</Text>
                    }) : <Text>{Lang.list_empty}</Text>
            }
        </View>
    );
}

export default StudentListView;