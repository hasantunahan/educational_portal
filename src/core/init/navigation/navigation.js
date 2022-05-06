import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginView from '../../../ui/login/login';
import NavigationConstant from '../../constant/navigation';
import RegisterView from '../../../ui/register/register';
import HomeView from '../../../ui/home/home';
import StudentAddView from '../../../ui/_home/student_add/student_add';
import StudentListView from '../../../ui/_home/student_list/student_list';
import StudentSurvey from '../../../ui/_home/student_survey/student_survey';
import AppColors from '../theme/colors';

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen options={{
                    headerShown: false
                }} name={NavigationConstant.login} component={LoginView} />
                <Stack.Screen options={{
                    headerShown: false
                }} name={NavigationConstant.register} component={RegisterView} />
                <Stack.Screen options={{
                    headerShown: false
                }} name={NavigationConstant.home} component={HomeView} />
                <Stack.Screen options={{
                    headerStyle :{
                        backgroundColor : AppColors.whiteText
                    }
                }} name={NavigationConstant.student_add} component={StudentAddView} />
                <Stack.Screen name={NavigationConstant.student_list} component={StudentListView} />
                <Stack.Screen name={NavigationConstant.student_survey} component={StudentSurvey} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}