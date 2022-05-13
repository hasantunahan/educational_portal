import React from "react";
import { View, StyleSheet } from "react-native"
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import storage from "../../../core/init/storage/storage";

const StundentTestView = (props) => {
    const { route } = props;
    const { params } = route;
    const isFocus = useIsFocused();
    const navigation = useNavigation();
    const [testData, setTestData] = React.useState(null);

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

                }
            } else {
                console.log("not found");
            }
        })
    }

    return (
        <View style={styles.body}>

        </View>
    );

}

const styles = StyleSheet.create({
    body: {

    }
})

export default StundentTestView;