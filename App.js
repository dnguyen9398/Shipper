import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { MAIN_COLOR, WHITE } from './asset/color';
import LoginPhone from './Login/LoginPhone';
import {NavigationContainer, StackActions} from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator, StackView } from '@react-navigation/stack';
import OTP from './Login/OTP';
import Loading from './Loading/Loading';
import Home from './Screens/Home';
import Splash from './Loading/Splash';
import Info from './Screens/Info';
import InfoSuccess from './Screens/InfoSuccess';
import InfoFail from './Screens/InfoFail';
import Orders from './Screens/Orders';
import OrdersDetail from './Screens/OrdersDetail';
import { Provider } from 'react-redux';
import store from './redux/store';
import { MenuProvider } from 'react-native-popup-menu';

const App = () => {
  const Stack = createStackNavigator()
  return (
    <Provider store={store}>
      <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS}}>
        <Stack.Screen 
            name='Splash' component={Splash}
            options={{ headerShown: false}}
          ></Stack.Screen>
          <Stack.Screen 
            name='LoginPhone' component={LoginPhone}
            options={{ headerShown: false}}
          ></Stack.Screen>
          <Stack.Screen
            name='OTP' component={OTP}
            options={{ headerShown: false}}
          ></Stack.Screen>
          <Stack.Screen
            name='Loading' component={Loading}
            options={{headerShown: false}}
          ></Stack.Screen>
          <Stack.Screen
            name='Home' component={Home}
            options={{headerShown: false}}
          ></Stack.Screen>
          <Stack.Screen
            name='Info' component={Info}
            options={{headerShown: false}}
          ></Stack.Screen>
          <Stack.Screen
            name='Success' component={InfoSuccess}
            options={{headerShown: false}}
          ></Stack.Screen>
          <Stack.Screen
            name='Fail' component={InfoFail}
            options={{headerShown: false}}
          ></Stack.Screen>
          <Stack.Screen
            name='Order' component={Orders}
            options={{headerShown: false}}
          ></Stack.Screen>
          <Stack.Screen
            name='OrderDetail' component={OrdersDetail}
            options={{headerShown: false}}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      </MenuProvider>
      </Provider>
    )
}
export default App;