import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/StackNavigator';
import 'react-native-url-polyfill/auto';

export default function App() {
    return (
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
    );
}
