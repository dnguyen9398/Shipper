import React, { useState } from 'react';
import { Modal, SafeAreaView, TextInput } from 'react-native';
import { TouchableOpacity, ToastAndroid } from 'react-native';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { GREEN, MAIN_COLOR, WHITE,RED } from '../asset/color';

const Home = () => {
    const [QRcode, setQRcode] = useState('')
    const [showError, setShowError] = useState('');

    const onScanning = e =>{
        setQRcode(e.data)
    }
    const onConfirm = () =>{
        if(QRcode==''){
            setShowError('Vui lòng nhập OTP')
        }
        else{
            setShowError('')
        }
    }
    const [showSuggest, setShowSuggest] = useState(false)
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
                {/* <QRCodeScanner
                    reactivateTimeout={5000}
                    onRead={onScanning}
                    reactivate={true}
                    permissionDialogMessage="Cho phép camera"
                    showMarker={true}
                    containerStyle={{ marginTop: 10,}}
                    // cameraStyle={{ height: 400, marginTop: 20, width: 413, alignSelf: 'center', justifyContent: 'center' }}
                    cameraType={'back'}
                    cameraProps={{ ratio: '1:1'  }}
                ></QRCodeScanner> */}
            <View style={{marginTop: '105%'}}>
                <View style={{alignItems: 'center', marginBottom: 10}}>
                    <Text>Hoặc</Text>
                </View>
                <View>
                    <TextInput
                        style={{backgroundColor: '#F2F2F2', width: '90%', alignSelf:'center', borderRadius: 2, height: 50}}
                        placeholder='Nhập mã đơn hàng'
                        value={QRcode}
                        onChangeText={(val)=>{setQRcode(val)}}
                    ></TextInput>
                </View>
                <View View style={{justifyContent: 'center', width: '90%', alignSelf: 'center', marginTop:10}}>
                    <Text style={{fontStyle:'italic', color: RED}}>{showError}</Text>
                </View>
                <TouchableOpacity 
                onPress={()=>{onConfirm()}}
                style={styles.buttonStyle}>
                    <Text 
                        style={{color: WHITE, fontWeight: 'bold'}}>
                        TÌM MÃ ĐƠN HÀNG
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{alignSelf: 'center', marginTop: 15}}
                    onPress={()=>{setShowSuggest(true)}}>
                    <Text style={{textDecorationLine:'underline', color:'#828282'}}>Gợi ý cách tìm mã đơn hàng?</Text>
                </TouchableOpacity>
            </View>
            <Modal
                visible={showSuggest}
                transparent={true}
                animationType={'slide'}
                >
                    <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <View
                            style={{backgroundColor: WHITE, width: 312, height: 359, alignItems: 'center', elevation: 12}}>
                                <View style={{alignItems: 'center', marginTop: 10}}>
                                    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Gợi ý cách tìm mã</Text>
                                </View>
                                <Image
                                    style={{marginTop: 20}}
                                    source={require('../img/suggest.png')}
                                ></Image>
                                <TouchableOpacity
                                    onPress={()=>{setShowSuggest(false)}}
                                    style={styles.buttonStyle}>
                                        <Text 
                                            style={{color: WHITE, fontWeight: 'bold'}}>
                                            TÔI ĐÃ HIỂU RỒI
                                        </Text>
                                </TouchableOpacity>
                        </View>
                    </SafeAreaView>
            </Modal>
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
    },
    buttonStyle:{
        height: 50,
        width:'90%',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: GREEN,
        justifyContent: 'center',
        marginTop: 20
    },  
})
export default Home;