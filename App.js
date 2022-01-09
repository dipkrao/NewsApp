import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import ApplicationNavigator from './src/navigations/ApplicationNavigator';

export default function App() {
  return (
      <SafeAreaProvider>
       <NavigationContainer>
          <ApplicationNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
  )
};