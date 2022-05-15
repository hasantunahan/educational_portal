import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native"
import { test_text } from '../../../ui/_home/student_test/data/data';

const TestItem = ({ title, selected, onPress }) => {
    return <View>
        <Text style={{ paddingHorizontal: 24, marginTop: 16 }}>{title}</Text>
        <View style={{ flexDirection: 'row', paddingHorizontal: 16, width: '100%', justifyContent: 'space-around', }}>
            {test_text.map((item, index) => {
                return <TouchableOpacity key={index} onPress={()=> onPress(item)} style={{ borderRadius: 8, width: '30%', margin: 8, padding: 8, backgroundColor: item == selected ? AppColors.button : 'white' }}>
                    <Text>{item}</Text>
                </TouchableOpacity>
            })}
        </View>
        <View style={{ height: 0.5, backgroundColor: 'black', marginHorizontal: 32, opacity: 0.5, marginVertical: 8 }}>
        </View>
    </View>

}

export default TestItem;