import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginView from '../../../ui/login/login';
import NavigationConstant from '../../constant/navigation';
import RegisterView from '../../../ui/register/register';
import HomeView from '../../../ui/home/home';

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
            </Stack.Navigator>
        </NavigationContainer>
    );
}