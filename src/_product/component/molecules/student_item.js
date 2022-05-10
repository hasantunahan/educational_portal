import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import AppColors from '../../../core/init/theme/colors';
import Lang from '../../../core/init/lang/en';


const StudentItems = ({ data, onPress, onPressSurvey }) => {
    const [thanMore, setThanMore] = React.useState(true)

    return (
        <TouchableOpacity onPress={onPress} style={styles.body}>
            <View style={styles.row}>
                <Image style={styles.logo} source={{ uri: "https://cdn.pixabay.com/photo/2016/11/08/15/21/user-1808597_960_720.png" }} />
                <Text style={styles.text}>{data.name}</Text>
            </View>
            {thanMore &&
                <View>
                    <Text style={styles.subtitle}>{Lang.tckn}{" : "}{data.tckn}</Text>
                    <Text style={styles.subtitle}>{Lang.school_no}{" : "}{data.schoolNo}</Text>
                    <Text style={styles.subtitle}>{Lang.phone_number}{" : "}{data.phoneNumber}</Text>
                    <Text style={styles.subtitle}>{"Teacher "}{" : "}{data.selectedTeacher?.name}</Text>
                    {data.surver == null ? <Text style={{ color: 'red' }}>
                        {Lang.survey_not_fill}
                    </Text> : <TouchableOpacity onPress={onPressSurvey}>
                        <Text style={{ color: 'blue', marginVertical: 4 }}>{Lang.survey_see}</Text>
                    </TouchableOpacity >
                    }
                </View>
            }
        </TouchableOpacity>
    );

}

const styles = StyleSheet.create({
    body: {
        backgroundColor: AppColors.whiteText,
        width: Dimensions.get('screen').width * .9,
        justifyContent: 'center',
        borderRadius: 8,
        marginVertical: 4,
        padding: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 3,
    },
    subtitle: {
        fontSize: 15,
        letterSpacing: 0.25
    },
    logo: {
        width: 20,
        height: 20,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        letterSpacing: 0.25,
        marginLeft: 8
    }
});

export default StudentItems;