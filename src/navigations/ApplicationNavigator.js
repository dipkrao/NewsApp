/* eslint-disable prettier/prettier */
import React, { useEffect, useMemo, useReducer, useState } from 'react';
import {
    CardStyleInterpolators,
    createStackNavigator,
} from '@react-navigation/stack';
import HomeNavigator from './StackNavigator';

const Stack = createStackNavigator();

export default function ApplicationNavigator() {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                keyboardHidesTabBar: true,
            }}>
            <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
        </Stack.Navigator>
    );
}
