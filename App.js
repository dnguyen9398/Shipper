import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { MAIN_COLOR, WHITE } from './asset/color';

const Shipper = () => {
  return (
    <SafeAreaView
      style={styles.container}>
      <Image
      source={require('./img/logo.png')}
      style={styles.logo}
      ></Image>
      <Text
        style={{top:114, alignSelf: 'center', fontSize: 20, color: WHITE}}>
        Nhập số điện thoại để tiếp tục
      </Text>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: MAIN_COLOR
  },
  logo:{
    alignSelf: 'center',
    marginTop: 100
  }
})
export default Shipper;