import React, { useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { GRAY, GREEN, MAIN_COLOR, RED, WHITE } from '../asset/color';
import {Hoshi} from 'react-native-textinput-effects'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { asyncPOST, SERVER_ADDRESS, _storedata } from '../global/func';
import { ToastAndroid } from 'react-native';
import { Alert } from 'react-native';
import OTP from './OTP';
import { useDispatch } from 'react-redux';
import { STORE_MEMBER, STORE_OTP } from '../redux/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import  firebase  from '@react-native-firebase/app';

const LoginPhone = ({navigation}) => {
  const [phoneNum, setPhoneNumber] = useState('')
  const [showError, setShowError] = useState('');
  const dispatch = useDispatch()
  const [confirm, setConfirm] = useState(null)
  const [loading, setLoading] = useState(false)
  const [textlabel, setTextLabe] = useState(true)
  const onChangePhone= (number) =>{
    setPhoneNumber(number)
  }
  const onPressAnimation = () =>{
    setLoading(true)
    setTextLabe(false)}
  const onPress = () =>{
    if(phoneNum == ''){
      setShowError('Vui lòng nhập số điện thoại')
  }
  else{
    if(phoneNum.length != 10 )
    {
      setShowError('Không đúng số điện thoại')
    }
    else{ 
      setShowError('')
      SignInFirebase()
      onPressAnimation()}
    } 
  }
  const SignIn = async() => {
    var obj = {
      "phone": phoneNum
    }
    asyncPOST("api/login",obj).then((res) => {
      if(res.Status = 200){
        if(res.errors == 'The phone format is invalid.')
        {
          setShowError('Không đúng số điện thoại')
          console.log('Lỗi format SĐT')
        }
        else if(res.message == 'User does not exist')
        {
          setShowError('Không tìm thấy số điện thoại')
          console.log('Không tìm thấy số điện thoại')
        }
        else{
            console.log(res)
            AsyncStorage.setItem('token',res.token)
          }
        }
      else{
        ToastAndroid.show('Lỗi',ToastAndroid.TOP)
      }

    })
    
  }
  const SignInFirebase = async() => {
    await firebase.auth().verifyPhoneNumber('+84'+phoneNum)
      .then(function (confirmation) {
        console.log(confirmation)
        navigation.navigate('OTP',{
          confirm: confirmation,
          secretOTP : confirmation.code
        })
        SignIn()
        setLoading(false)
        setTextLabe(true)
    }).catch((error) =>{
      console.log(error)
    })
    // const confirmation = await auth().signInWithPhoneNumber('+84'+phoneNum)
    // setConfirm(confirmation)
    // navigation.navigate('OTP',{
    //     confirm: confirmation
    // })
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
            {
              textlabel &&(
                <Text 
                style={{color: WHITE, fontWeight: 'bold'}}
                >TIẾP TỤC</Text>
              )
            }
            {
              loading && (
                <ActivityIndicator animating={true} size='large' color={WHITE}></ActivityIndicator>
              )
            }
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