import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Keyboard } from 'react-native';
import { ToastAndroid, Image } from 'react-native';
import { TextInput } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { GRAY, GREEN, MAIN_COLOR, WHITE,ORANGE, RED } from '../asset/color';
import { asyncPOST } from '../global/func';
import auth from '@react-native-firebase/auth';
import { useEffect } from 'react';

const OTP = ({route,navigation}) => {
  let textInput = useRef(null)
  const {phoneNumber, confirm, secretOTP} = route.params;
  const [internalVal, setInternalVal] = useState("")
  const lengthInput = 6;
  const [showError, setShowError] = useState('');
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const onChangeText = (val) => {
    setInternalVal(val)
    // if ((val.length == lengthInput)) {
    //     asyncGET(`api/MemberCode?CodeType=1&CodeText=${val}&IsActive=true`).then((res) => {

    //         if (res.Data.length != 0 || val === "123456") {

    //             navigation.navigate('Loading')
    //             Keyboard.dismiss();


    //         } else {
    //             createOneButtonAlert("Mã OTP không chính xác", "Vui lòng nhập lại")
    //         }
    //     })

    // }

}
  const onConfirm = () =>{
    if(internalVal.length == lengthInput){
        VerifyOTP()
    }
    else{
      setShowError('Vui lòng nhập mã OTP')
    }
  }
  // const VerifyOTP = async() => {
  //   var obj = {
  //     "phone": phoneNumber,
  //     "otp" : internalVal,
  //   }
  //   asyncPOST("api/verify",obj).then((res) => {
  //     if(res.Status = 200){
  //       if(res.message == "successful"){
  //         Keyboard.dismiss()
  //         navigation.navigate('Loading')
  //         console.log(res)
  //         AsyncStorage.setItem('token',res.token)
          
  //         // alert(AsyncStorage.getItem('token'))
  //       }
  //       else{
  //         setShowError('Mã OTP không đúng')
  //         console.log(res)
  //       }
  //     }
  //     else{
  //       console.log(res)
  //     }
  //   })
  //   }
  const VerifyOTP = async() => {
    // try {
    //   await confirm.confirm(internalVal)
    //     console.log(data)
    //     console.log('Đúng OTP')
    //     Keyboard.dismiss()
    //     // navigation.navigate('Loading')
    // } catch (error) {
    //   console.log(error)
    //   if(error){
    //     setShowError('Sai OTP')
    //   }
    // }
    
      const credential = auth.PhoneAuthProvider.credential(confirm.verificationId, internalVal)
      console.log('Credential là' + JSON.stringify(credential))
      auth().signInWithCredential(credential).then((res) =>{
          console.log('có code' + secretOTP)
          console.log('thành công' + JSON.stringify(res))
          console.log('Đúng OTP')
          navigation.navigate('Loading')
          setShowError('')
        })
      .catch(error => {
        console.log('lỗi' + error)
        setShowError('Sai mã OTP')
      })
  }
  return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity 
                style={{borderWidth: 0, left: 0, position: 'absolute', marginLeft: 20, marginTop: 15}}
                onPress={()=>{navigation.goBack()}}>
                <Image source={require('../img/arrow.png')} style={{tintColor: WHITE}}></Image>
            </TouchableOpacity>
        <View style={{marginTop: 122, alignSelf: 'center', width: '90%'}}>
          <Text style={{textAlign:'center', fontSize: 20, color: WHITE, fontWeight: 'bold'}}>Nhập 6 mã số được gửi đến số điện thoại bạn {phoneNumber}</Text>
        </View>
        <View>
        <View style={styles.containerInput}>
          {
              Array(lengthInput).fill().map((data, index) => (
                  <View
                      key={index}
                      style={[
                          styles.cellView,
                          {
                              borderBottomColor: index === internalVal.length ? WHITE : GRAY, borderBottomWidth: 0.5
                          }]}>

                      <TextInput
                          ref={(input) => textInput = input}
                          onChangeText={onChangeText}
                          style={{ width: 0, height: 0, borderWidth: 0, }}
                          value={internalVal}
                          maxLength={lengthInput}
                          returnKeyType='done'
                          keyboardType='numeric'
                          onPress={() => {
                              textInput.focus()
                          }}/>
                      <TouchableOpacity style={{ width: 30, height: 30, borderWidth: 0, alignItems:'center'}}
                          onPress={() => {
                              textInput.focus()
                          }
                          }>
                          <Text
                              style={styles.cellText}
                              onPress={() => {
                                  textInput.focus()
                              }
                              }>
                              {internalVal && internalVal.length > 0 ? internalVal[index] : ''}
                          </Text>
                      </TouchableOpacity>
                  </View>
                ))
              }
          </View>
        </View>
        <View style={{justifyContent: 'center', width: '90%', alignSelf: 'center', marginTop:10}}>
          <Text style={{fontStyle:'italic', color: RED}}>{showError}</Text>
        </View>
        <TouchableOpacity 
          onPress={()=>{onConfirm()}}
          style={styles.buttonStyle}>
            <Text 
                style={{color: WHITE, fontWeight: 'bold'}}>
                  XÁC NHẬN
            </Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center', marginTop: 30,}}>
          <Text style={{color: WHITE, fontSize: 16}}>Tôi không nhận được mã ?</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center',marginTop: 10}}>
          <TouchableOpacity>
            <Text style={{fontSize: 16, color: ORANGE}}>Gửi lại mã </Text>
          </TouchableOpacity>
          <View>
            <Text style={{fontSize: 16, color: ORANGE}}> | </Text>
          </View>
          <TouchableOpacity>
            <Text style={{fontSize: 16, color: ORANGE}}> Thay đổi SĐT</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container:{
        flex: 1, 
        backgroundColor: MAIN_COLOR
    },
    containerInput: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',

  },
    cellView: {
      paddingVertical: 5,
      width: 53,
      alignSelf:'center',
      margin: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderBottomWidth: 1.5,
  },
    cellText: {
      textAlign: 'center',
      fontSize: 18,
      color: WHITE,
      fontWeight: 'bold'
  },
    buttonStyle:{
      height: 50,
      width:'90%',
      alignSelf: 'center',
      alignItems: 'center',
      backgroundColor: GREEN,
      justifyContent: 'center',
      marginTop: 30
  },  
})
export default OTP;