import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import HomeScreen from '../screens/home/HomeScreen';
import NewsDetailsScreen from '../screens/NewsData/NewsDetailsScreen';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>

            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="NewsDetailsScreen" component={NewsDetailsScreen} />
        </Stack.Navigator>
    );
}