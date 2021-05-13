import React, { useEffect } from 'react';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { MAIN_COLOR, WHITE } from '../asset/color';
import {UIActivityIndicator } from 'react-native-indicators'
import { Animated } from 'react-native';

const Splash = ({navigation}) => {
    useEffect(()=>{
        setTimeout(()=>{
            navigation.navigate('LoginPhone')
        },1900)
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