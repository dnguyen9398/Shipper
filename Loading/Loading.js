import React from 'react';
import { Image } from 'react-native';
import { SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { MAIN_COLOR, WHITE } from '../asset/color';
import {UIActivityIndicator } from 'react-native-indicators'

const Loading = () => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={{marginTop: 280, alignItems: 'center',}}>
            <View>
                <Image source={require('../img/logo.png')}></Image>
            </View>
                <UIActivityIndicator 
                    size={30}
                    color={WHITE} 
                    style={{marginTop: 89,}}
                    animationDuration={3000}>
                </UIActivityIndicator>
        </View>
        <View style={{borderWidth: 0, bottom: '2%', position: 'absolute', width: '90%', alignSelf: 'center', flexDirection: 'row'}}>
            <Image source={require('../img/TikiTech.png')}></Image>
            <View style={{borderWidth: 0, position: 'absolute', right: 0}}>
                <Text style={{fontSize: 18, color: WHITE}}>ver.0.1.1</Text>
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
export default Loading;