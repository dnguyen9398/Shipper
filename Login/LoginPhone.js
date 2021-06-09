import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GRAY, GREEN, MAIN_COLOR, RED, WHITE } from '../asset/color';
import {Hoshi} from 'react-native-textinput-effects'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const LoginPhone = ({navigation}) => {
  const [phoneNum, setPhoneNumber] = useState('')
  const [showError, setShowError] = useState('');
  const onChangePhone= (number) =>{
    setPhoneNumber(number)
  }
  const onPress = () =>{
    if(phoneNum == ''){
      setShowError('Vui lòng nhập OTP')
  }
  else{
    setShowError('')
    navigation.navigate('OTP',{
      phoneNumber : phoneNum
    })
  }
    
  }
  return (
    <SafeAreaView
      style={styles.container}>
        <KeyboardAwareScrollView>
        <Image
        source={require('../img/logo.png')}
        style={styles.logo}
        ></Image>
        <View style={{marginTop: 90, }}>
            <Text
                style={{alignSelf: 'center', fontSize: 20, color: WHITE}}>
                Nhập số điện thoại để tiếp tục
            </Text>
        </View>
        <View>
            <Hoshi
                value={phoneNum}
                onChangeText={onChangePhone}
                label={'Số điện thoại'}
                borderColor={WHITE}
                borderHeight={0}
                style={{width:'90%', alignSelf: 'center', margin: 30,marginBottom: 15}}
                labelStyle={{fontSize: 13, color:GRAY}}
                keyboardType={'number-pad'}
            ></Hoshi>
        </View>
        <View View style={{justifyContent: 'center', width: '90%', alignSelf: 'center', marginBottom: 10}}>
            <Text style={{fontStyle:'italic', color: RED}}>{showError}</Text>
        </View>
        <TouchableOpacity 
          style={styles.buttonStyle}
          onPress={onPress}>
            <Text 
                style={{color: WHITE, fontWeight: 'bold'}}
                >TIẾP TỤC</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', width: '90%', alignSelf: 'center', margin: 30}}>
            <View style={{backgroundColor: GRAY, height: 0.5, flex: 1, alignSelf: 'center'}} />
                <Text style={{ alignSelf:'center', paddingHorizontal:5, fontSize: 16, color: GRAY }}>Hoặc đăng nhập bằng</Text>
            <View style={{backgroundColor: GRAY, height: 0.5, flex: 1, alignSelf: 'center'}} />
        </View>
        <View style={{width:'95%', flexDirection: 'row',alignSelf: 'center',}}>
            <TouchableOpacity style={styles.smallbuttonStyle}>
                <Image source={require('../img/facebook.png')}></Image>
                <Text style={{margin: 10}}>Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.smallbuttonStyle}>
                <Image source={require('../img/google.png')}></Image>
                <Text style={{margin: 10}}>Google</Text>
            </TouchableOpacity>
        </View>
        </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: MAIN_COLOR,
    },
  logo:{
    alignSelf: 'center',
    marginTop: 100
    },
  buttonStyle:{
    height: 50,
    width:'90%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: GREEN,
    justifyContent: 'center',
    },
  smallbuttonStyle:{
    flex: 1, 
    backgroundColor: WHITE,
    alignItems: 'center', 
    height: 50,
    margin: 10, 
    justifyContent: 'center',
    flexDirection: 'row',
    },

})
export default LoginPhone;