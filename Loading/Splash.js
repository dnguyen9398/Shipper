import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { MAIN_COLOR, WHITE } from '../asset/color';
import {UIActivityIndicator } from 'react-native-indicators'
import { Animated } from 'react-native';
import { _retrieveData } from '../global/func';
import { useDispatch } from 'react-redux';
import { STORE_MEMBER, STORE_OTP } from '../redux/action';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
    const [isLoading,setIsLoading]=useState()

    const dispatch = useDispatch();

    useEffect(()=>{
        setTimeout(()=>{
            onSignIn()
        },3000)
    },[])

    const startValue = new Animated.Value(-250);
    const endValue = 0;
    const duration = 2000;
    
    useEffect(() => {
        Animated.timing(startValue, {
          toValue: endValue,
          duration: duration,
          useNativeDriver: true,
        }).start();
      }, [startValue, endValue, duration]);
    
//     const LoadingData = () =>{
//         if(isLoading == true){
//         //     _retrieveData(['StorePhone','StoreOTP']).then((data) =>{
//         //         var _dataJSON = data
//         //         console.log(data[0][1], data[1][1])
//         //         if(_dataJSON != null){
//         //             dispatch(STORE_MEMBER(data[0][0]))
//         //             dispatch(STORE_OTP(data[0][1]))
//         //             navigation.navigate('Home')
//         //         }
//         // })
//         navigation.navigate('Home')
// }
//         else{
//             navigation.navigate('LoginPhone')
//         }
// }
    const onSignIn = () => {
        _retrieveData(['token']).then((data) => {
            console.log(data[0][1])
            if(data[0][1] == null)
        {
            setIsLoading(false)
            console.log('Đăng nhập thật bại')
            navigation.navigate('LoginPhone')

        }
        else{
            setIsLoading(true)
            console.log('Đăng nhập thành công')
            navigation.navigate('Home')
        } 
        })
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{marginTop: 280, alignItems: 'center',}}>
                <Animated.View style={{transform: [
              {
                translateY: startValue,
              },
            ],}}>
                    <Image source={require('../img/logo.png')}></Image>
                </Animated.View>
            </View>
            <View style={{borderWidth: 0, bottom: '2%', position: 'absolute', width: '90%', alignSelf: 'center', flexDirection: 'row'}}>
                <View>
                    <Image source={require('../img/TikiTech.png')}></Image>
                </View>
                <View style={{borderWidth: 0, position: 'absolute', right: 0}}>
                    <Text style={{fontSize: 16, color: WHITE}}>ver.0.1.1</Text>
                </View>
            </View>        
        </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: MAIN_COLOR,
    }
})
export default Splash;