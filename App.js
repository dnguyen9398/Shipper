import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { MAIN_COLOR, WHITE } from './asset/color';
import LoginPhone from './Login/LoginPhone';
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import OTP from './Login/OTP';
const App = () => {
  const Stack = createStackNavigator()
  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name='LoginPhone' component={LoginPhone}
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen 
            name='OTP' component={OTP}
            options={{ headerShown: false }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    )
}
export default App;