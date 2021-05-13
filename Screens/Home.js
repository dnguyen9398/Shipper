import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { TouchableOpacity, ToastAndroid } from 'react-native';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { MAIN_COLOR, WHITE } from '../asset/color';

const Home = () => {
    const [QRcode, setQRcode] = useState('')
    const onScanning = e =>{
        setQRcode(e.data)
    }
  return (
    <SafeAreaView
      style={styles.container}>
      <View style={styles.topView}>
        <View style={{borderWidth: 0,alignSelf: 'center'}}>
            <Image source={require('../img/logosmall.png')}></Image>
        </View>
        <View style={{borderWidth: 0,flexDirection: 'row', alignSelf: 'center', position: 'absolute', right: 0, justifyContent: 'space-between',flex: 2}}>
            <TouchableOpacity style={{flex: 2,paddingRight: 20}}>
                <Image source={require('../img/mailvector.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 2, paddingRight: 20}}>
                <Image source={require('../img/notivector.png')}></Image>
            </TouchableOpacity>
        </View>
      </View>
      <View>
          <View style={{width:'87%', alignSelf: 'center', marginTop: 5}}>
              <Text style={{textAlign: 'center'}}>Theo dõi đơn hàng của bạn bằng cách quét/ nhập mã đơn hàng (Mã vận đơn).</Text>
          </View>
          <View style={{width:'100%', height: 414}}>
                <QRCodeScanner
                    reactivateTimeout={500}
                    onRead={onScanning}
                    reactivate={true}
                    permissionDialogMessage="Cho phép camera"
                    showMarker={true}
                    cameraStyle={{borderColor: 'red',marginTop: 40,}}
                ></QRCodeScanner>
          </View>
          <View style={{marginTop: 160}}>
              <Text>Code là: {QRcode}</Text>
          </View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: WHITE
      },
    topView:{
        borderWidth: 0,
        width: '100%',
        height: '9%',
        elevation: 1.5,
        justifyContent: 'center',
        flexDirection: 'row',
    }
})
export default Home;