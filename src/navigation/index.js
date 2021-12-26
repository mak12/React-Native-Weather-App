import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScreenKeys } from '../utilities';
import { Home } from '../screens/Home'
import { MapScreen } from '../screens/MapScreen'

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={ScreenKeys.Home}
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <Stack.Screen name={ScreenKeys.Home} component={Home} />
                    <Stack.Screen name={ScreenKeys.MapView} component={MapScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
};

export { AppNavigator };
