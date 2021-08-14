import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { Modal, SafeAreaView, TextInput } from 'react-native';
import { TouchableOpacity, ToastAndroid } from 'react-native';
import { Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { GREEN, MAIN_COLOR, WHITE,RED } from '../asset/color';
import { asyncGET } from '../global/func';

const Home = ({navigation, route}) => {
    const [QRcode, setQRcode] = useState('')
    const [showError, setShowError] = useState('');
    const [openMenu, setOpenMenu] = useState(false)
    // var token = AsyncStorage.getItem('token')
    const GetOrderByCode = () =>{
        asyncGET(`api/search/${QRcode}`).then((res) =>{
            if (res.Status = 200) {
                if(res.message == 'No result match')
                {
                    SetNotFound(true)
                }
                else{
                    setShowError('')
                    navigation.navigate('Info', {
                        BarcodeValue : QRcode,
                        ProductID : res[0].id
                    })
                    ToastAndroid.show('Tìm thành công', ToastAndroid.SHORT)
                    console.log('ID hàng là ' + res[0].id)
                }
            }
            else {
                console.log(res)
            } 
        })
    }
    const onScanning = e =>{
        setQRcode(e.data)
    }
    const onConfirm = () =>{
        if(QRcode==''){
            setShowError('Vui lòng nhập')
        }
        else{
            GetOrderByCode()
        }
    }
    const [showSuggest, setShowSuggest] = useState(false)
    const [notFound, SetNotFound] = useState(false)
    const onPressMenu=()=>{
        navigation.navigate('LoginPhone')
        setOpenMenu(false)
    }
  return (
    <SafeAreaView
      style={styles.container}>
    <View style={styles.topView}>
        <View style={{borderWidth: 0,}}>
            <Image source={require('../img/logosmall.png')}></Image>
        </View>
        <TouchableOpacity style={{borderWidth: 0, left: 0, position: 'absolute', marginTop: 15, padding:20}}
                onPress={()=>{setOpenMenu(true)}}>
                <Image source={require('../img/Menu.png')} style={{tintColor: 'black'}}></Image>
            </TouchableOpacity>
        <View style={{borderWidth: 0,flexDirection: 'row', alignSelf: 'center', position: 'absolute', right: 0, justifyContent: 'space-between',flex: 2}}>
            
            <TouchableOpacity style={{flex: 2,paddingRight: 20}}>
                <Image source={require('../img/mailvector.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 2, paddingRight: 20}}
                onPress={()=>navigation.navigate('Order')}>
                <Image source={require('../img/notivector.png')}></Image>
            </TouchableOpacity>
        </View>
    </View>
    <Menu opened={openMenu} onBackdropPress={()=>{setOpenMenu(false)}}>
        <MenuTrigger></MenuTrigger>
        <MenuOptions>
            <MenuOption onSelect={()=>onPressMenu()} style={{flexDirection: 'row', alignItems: 'center', elevation: 12}}>
                <Text style={{fontSize: 16, fontWeight:'bold', flex: 1}}>Đăng Xuất</Text>
                <Image source={require('../img/LogOut.png')} width={15} height={15}></Image>
            </MenuOption>
        </MenuOptions>
    </Menu>
    <KeyboardAwareScrollView>
        <View>
            <View style={{width:'87%', alignSelf: 'center', marginTop: 5}}>
                <Text style={{textAlign: 'center'}}>Theo dõi đơn hàng của bạn bằng cách quét/ nhập mã đơn hàng (Mã vận đơn).</Text>
            </View>
                <QRCodeScanner
                    reactivateTimeout={5000}
                    onRead={onScanning}
                    reactivate={true}
                    permissionDialogMessage="Cho phép camera"
                    showMarker={true}
                    containerStyle={{ marginTop: 10,}}
                    // cameraStyle={{ height: 400, marginTop: 20, width: 413, alignSelf: 'center', justifyContent: 'center' }}
                    cameraType={'back'}
                    cameraProps={{ ratio: '1:1'  }}
                ></QRCodeScanner>
            <View style={{marginTop: 10}}>
                <View style={{alignItems: 'center', marginBottom: 10}}>
                    <Text>Hoặc</Text>
                    {/* <Text>{JSON.stringify(token)}</Text> */}
                </View>
                <View>
                    <TextInput
                        style={{backgroundColor: '#F2F2F2', width: '90%', alignSelf:'center', borderRadius: 2, height: 50}}
                        placeholder='Nhập mã đơn hàng'
                        value={QRcode}
                        onChangeText={(val)=>{setQRcode(val)}}
                    ></TextInput>
                </View>
                <View View style={{justifyContent: 'center', width: '90%', alignSelf: 'center', marginTop:5}}>
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
                {/* <Text>{authToken}</Text> */}
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
                                    style={{marginTop: 10}}
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
            <Modal
                visible={notFound}
                transparent={true}
                animationType={'slide'}
                >
                    <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <View
                            style={{backgroundColor: WHITE, width: 312, height: 359, alignItems: 'center', elevation: 12}}>
                                <Image
                                    style={{marginTop: 30}}
                                    source={require('../img/van.png')}
                                ></Image>
                                <View style={{alignItems: 'center', marginTop: 20, width:'90%', alignSelf: 'center'}}>
                                    <Text style={{fontSize: 15, textAlign: 'center'}}>
                                        Chúng tôi không tìm thấy đơn hàng của bạn. Mã đơn hàng không hợp lệ hoặc đã hết hạn. Vui lòng kiểm tra lại mã đơn hàng bạn đã nhập.
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    onPress={()=>{SetNotFound(false)}}
                                    style={styles.buttonModalStyle}>
                                        <Text 
                                            style={{color: GREEN, fontWeight: 'bold', fontSize: 18}}>
                                            ĐÓNG
                                        </Text>
                                </TouchableOpacity>
                        </View>
                    </SafeAreaView>
            </Modal>
        </View>
        </KeyboardAwareScrollView>
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
        height: '9.5%',
        elevation: 1.5,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center', 
    },
    buttonModalStyle:{
        width:'90%',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: WHITE,
        justifyContent: 'flex-end',
        marginTop: 20
    },
    buttonStyle:{
        height: 50,
        width:'90%',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: GREEN,
        justifyContent: 'center',
        marginTop: 10
        },
})
export default Home;