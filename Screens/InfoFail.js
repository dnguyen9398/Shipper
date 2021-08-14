import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, SafeAreaView, Modal} from 'react-native';
import Barcode from '@kichiyaki/react-native-barcode-generator'
import { GRAY, GREEN, WHITE, ORANGE, BLUE } from '../asset/color';
import DashedLine from 'react-native-dashed-line';
import { asyncGET, asyncPOST } from '../global/func';
import { ToastAndroid } from 'react-native';
import { getStatus } from '../global/status';
const InfoFail = ({navigation, route}) => {
    const [twoButton, setTwoButton] = useState(false)
    const [success, setSuccess] = useState(false)
    const [fail, setFail] = useState(false)
    const {BarcodeValue, ProductID} = route.params;
    const [data,setData] = useState()
    useEffect(()=>{
        getData();
      },[]);
    const getData = () => {
        ordersData()
    }
    const ordersData = () => {
        asyncGET(`api/search/${BarcodeValue}`).then((res) => {
            if(res.Status = 200)
            {
                setData(res)
                console.log(res)
            }
            else{
                if(res.Status == 500)
                {
                  ToastAndroid.showWithGravity('lỗi',ToastAndroid.SHORT,ToastAndroid.BOTTOM)
                  console.log(res)
                } else{
                  ToastAndroid.showWithGravity('lỗi data',ToastAndroid.SHORT,ToastAndroid.BOTTOM)
                  console.log(res)
                }
              }
        })
    }
    const onConfirm = () => {
        ChangeStatus(8, 'Hoàn trả hàng thành công')
        navigation.navigate('Success',{
            BarcodeValue : BarcodeValue
        })
    }
    const ChangeStatus = async(status, note) => {
        var obj = {
            "Status" : status,
            'note' : note
        }
        asyncPOST(`api/updateStatus/${ProductID}`,obj).then((res)=>{
            if(res.Status = 200)
            {
                console.log(res)
            }
            else{
                ToastAndroid.show('Lỗi',ToastAndroid.TOP)
            }
        })
    }
    const BarcodeItem = (item) =>{
        return(
            <Barcode 
            style={{marginTop: 20}}
            format={'CODE128'} value={BarcodeValue}
            text={BarcodeValue}
            textStyle={{marginTop: 14, fontSize: 20, fontWeight: 'bold', marginBottom: 10}}/>
        )
    }
    const StatusItem = ({item}) => {
        return(
            <View>
                <View style={styles.titleContent}>
                    <Text style={{fontSize: 14, color: GRAY, fontWeight: 'bold'}}>Lịch sử trạng thái {ProductID}</Text>
                </View>
                <View style={{padding: 20, flexDirection: 'column'}}> 
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>{/*trạng thái*/}
                        <Image source={require('../img/loadingicon.png')}></Image>
                        <View style={{paddingLeft: 10}}>
                            <Text style={{fontWeight: 'bold', fontSize: 15}}>Đang xử lý</Text>
                        </View>
                    </View>
                    <View style={{borderStyle:'dashed', borderLeftWidth: 0.2, borderRadius: 1, marginLeft: 7, padding: 10, borderColor: GREEN}}>
                        <View style={{paddingLeft: 10}}>
                            <View style={{flexDirection: 'row', marginBottom: 5}}>
                                <Text>13:05:13  - 12/05/2021:</Text>
                                <Text> Đã đóng gói</Text>
                            </View>
                            <View style={{flexDirection: 'row',  marginBottom: 5}}>
                                <Text>13:05:13  - 12/05/2021:</Text>
                                <Text> Đang đóng gói</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    const SentInfo = (item) =>{
        return(
            <View>
                <View style={styles.titleContent}>
                    <Text style={{fontSize: 14, color: GRAY, fontWeight: 'bold'}}>Thông tin người gửi</Text>
                </View>
                <View style={{flexDirection: 'column', }}>
                    <View style={{flexDirection: 'row',borderBottomWidth: 0.2, padding: 20, }}>
                        <View style={{borderWidth: 0, flex: 1}}>
                            <Text style={styles.textTitle}>Số điện thoại</Text>
                        </View>
                        <View style={{borderWidth: 0, flex: 1, alignItems: 'flex-end'}}>
                            <TouchableOpacity style={{flexDirection: 'row', backgroundColor: GREEN,alignItems: 'center', paddingLeft: 20, paddingRight: 10, padding: 2, borderRadius: 4}}>
                                <Text style={{fontWeight: 'bold', color: WHITE, marginRight: 10}}>{item.sendermobile}</Text>
                                <Image source={require('../img/phongvector.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',borderBottomWidth: 0.2, padding: 20, }}>
                        <View style={{borderWidth: 0, flex: 1,}}>
                            <Text style={styles.textTitle}>Họ và tên </Text>
                        </View>
                        <View style={{borderWidth: 0, flex: 1, alignItems: 'flex-end'}}>
                            <Text>{item.sender}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'column',borderBottomWidth: 0.2, padding: 20, }}>
                        <View style={{borderWidth: 0, marginBottom: 5 }}>
                            <Text style={styles.textTitle}>Địa chỉ</Text>
                        </View>
                        <View style={{borderWidth: 0,  alignItems: 'flex-start', flexDirection: 'row'}}>
                            <View style={{width: '90%'}}>
                                <Text>{item.senderaddress}</Text>
                            </View>
                            <View style={{alignItems: 'flex-end', flex: 1, borderWidth: 0, alignSelf: 'center'}}>
                                <Image source={require('../img/placevector.png')}></Image>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    const ProductInfo = (item) =>{
        return(
        <View>
            <View style={styles.titleContent}>
                <Text style={{fontSize: 14, color: GRAY, fontWeight: 'bold'}}>Thông tin kiện hàng</Text>
            </View>
            <View style={{flexDirection: 'column', }}>
                <View style={{flexDirection: 'row',borderBottomWidth: 0.2, padding: 20, }}>
                    <View style={{borderWidth: 0, flex: 1}}>
                        <Text style={styles.textTitle}>Trạng thái</Text>
                    </View>
                    <View style={{borderWidth: 0, flex: 1, alignItems: 'flex-end'}}>
                        <Text>{getStatus(item)}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row',borderBottomWidth: 0.2, padding: 20, }}>
                    <View style={{borderWidth: 0, flex: 1,}}>
                        <Text style={styles.textTitle}>Tổng tiền thu</Text>
                    </View>
                    <View style={{borderWidth: 0, flex: 1, alignItems: 'flex-end'}}>
                        <Text>{item.cod}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row',borderBottomWidth: 0.2, padding: 20, }}>
                    <View style={{borderWidth: 0, flex: 1,}}>
                        <Text style={styles.textTitle}>Thông tin kiện hàng</Text>
                    </View>
                    <View style={{borderWidth: 0, flex: 1, alignItems: 'flex-end'}}>
                        <Text>{item.description}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row',borderBottomWidth: 0.2, padding: 20, }}>
                    <View style={{borderWidth: 0, flex: 1,}}>
                        <Text style={styles.textTitle}>Ghi Chú</Text>
                    </View>
                    <View style={{borderWidth: 0, flex: 1, alignItems: 'flex-end'}}>
                        <Text>--------------</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row',borderBottomWidth: 0.2, padding: 20, }}>
                    <View style={{borderWidth: 0, flex: 1,}}>
                        <Text style={styles.textTitle}>Hình thức thanh toán</Text>
                    </View>
                    <View style={{borderWidth: 0, flex: 1, alignItems: 'flex-end'}}>
                        <Text>Người gửi gửi tiền</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row',borderBottomWidth: 0.2, padding: 20, }}>
                    <View style={{borderWidth: 0, flex: 1,}}>
                        <Text style={styles.textTitle}>Phí thu hộ (COD)</Text>
                    </View>
                    <View style={{borderWidth: 0, flex: 1, alignItems: 'flex-end'}}>
                        <Text>{item.price}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row',borderBottomWidth: 0.2, padding: 20, }}>
                    <View style={{borderWidth: 0, flex: 1,}}>
                        <Text style={styles.textTitle}>Hình thức vận chuyển</Text>
                    </View>
                    <View style={{borderWidth: 0, flex: 1, alignItems: 'flex-end'}}>
                        <Text>{item.Methodtrans}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row',borderBottomWidth: 0.2, padding: 20, }}>
                    <View style={{borderWidth: 0, flex: 1,}}>
                        <Text style={styles.textTitle}>Chỉ dẫn của người gửi/ chủ hàng khi không phát được vật phẩm:</Text>
                    </View>
                    <View style={{borderWidth: 0, flex: 1, alignItems: 'flex-end'}}>
                        <Text>Chuyển khoản</Text>
                    </View>
                </View>
            </View>
        </View>
        )
    }
    const RecieveInfo = (item) =>{
        return(
            <View>
                <View style={styles.titleContent}>
                    <Text style={{fontSize: 14, color: GRAY, fontWeight: 'bold'}}>Thông tin người gửi</Text>
                </View>
                <View style={{flexDirection: 'column', }}>
                    <View style={{flexDirection: 'row',borderBottomWidth: 0.2, padding: 20, }}>
                        <View style={{borderWidth: 0, flex: 1}}>
                            <Text style={styles.textTitle}>Số điện thoại</Text>
                        </View>
                        <View style={{borderWidth: 0, flex: 1, alignItems: 'flex-end'}}>
                            <TouchableOpacity style={{flexDirection: 'row', backgroundColor: GREEN,alignItems: 'center', paddingLeft: 20, paddingRight: 10, padding: 2, borderRadius: 4}}>
                                <Text style={{fontWeight: 'bold', color: WHITE, marginRight: 10}}>{item.customermobile}</Text>
                                <Image source={require('../img/phongvector.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',borderBottomWidth: 0.2, padding: 20, }}>
                        <View style={{borderWidth: 0, flex: 1,}}>
                            <Text style={styles.textTitle}>Họ và tên </Text>
                        </View>
                        <View style={{borderWidth: 0, flex: 1, alignItems: 'flex-end'}}>
                            <Text>{item.customer}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'column',borderBottomWidth: 0.2, padding: 20, }}>
                        <View style={{borderWidth: 0, marginBottom: 5 }}>
                            <Text style={styles.textTitle}>Địa chỉ</Text>
                        </View>
                        <View style={{borderWidth: 0,  alignItems: 'flex-start', flexDirection: 'row',}}>
                            <View style={{width: '90%'}}>
                                <Text>{item.customeraddress}</Text>
                            </View>
                            <View style={{alignItems: 'flex-end', flex: 1, borderWidth: 0, alignSelf: 'center'}}>
                                <Image source={require('../img/placevector.png')}></Image>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    const BottomButton = () =>{
        return(
            <View>
                <TouchableOpacity style={styles.buttonStyle}
                    onPress={()=>{setSuccess(true)}}>
                    <Text style={{color: WHITE, fontWeight:'bold'}}>HOÀN HÀNG THÀNH CÔNG</Text>
                </TouchableOpacity>
            </View>
            
        )
    }
    const ListItem = ({item}) => {
        return(
            <View>
                {BarcodeItem(item)}
                {StatusItem(item)}
                {SentInfo(item)}
                {ProductInfo(item)}
                {RecieveInfo(item)}
                {BottomButton()}
            </View>
        )
    }
    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.topView}>
            <View style={{borderWidth: 0,flexDirection: 'row', position: 'absolute', right: 0}}>
                <TouchableOpacity style={{flex: 2, paddingRight: 20}}
                    onPress={()=>navigation.navigate('Order')}>
                    <Image source={require('../img/notivector.png')}></Image>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{fontSize: 20}}>Thông tin đơn hàng</Text>
            </View>
        </View>
                
        {/* <StatusItem></StatusItem>
        <SentInfo></SentInfo>
        <ProductInfo></ProductInfo>
        <RecieveInfo></RecieveInfo> */}
            {/* <MainList></MainList> */}
        <FlatList
            data={data}
            renderItem={(item)=>ListItem(item)}
        ></FlatList>
        <Modal
            visible={success}
            transparent={true}
            animationType={'slide'}>
            <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <View
                    style={{backgroundColor: WHITE, width: 312, height: 295, alignItems: 'center', elevation: 12}}>
                    <Image
                        style={{marginTop: 30}}
                        source={require('../img/packagereturn.png')}
                    ></Image>
                    <View style={{alignItems: 'center', marginTop: 20, width:'70%', alignSelf: 'center'}}>
                        <Text style={{fontSize: 18, textAlign: 'center', fontWeight: 'bold'}}>
                            Xác nhận Hoàn hàng thành công!                       
                        </Text>
                    </View>
                    <View style={{flexDirection: 'row',flex: 1}}>
                        <TouchableOpacity
                            onPress={()=>{setSuccess(false)}}
                            style={styles.buttonModalStyle}>
                                <Text 
                                    style={{color: '#000000', fontSize: 18}}>
                                    ĐÓNG
                                </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.buttonModalStyle}
                            onPress={()=>{onConfirm()}}>
                                <Text 
                                    style={{color: GREEN, fontWeight: 'bold', fontSize: 18}}>
                                    XÁC NHẬN
                                </Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </SafeAreaView>
        </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:WHITE, flexDirection:'column'
    },
    topView:{
        borderWidth: 0,
        width:'100%',
        height: '9%',
        elevation: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    titleContent:{
        paddingLeft: 20,
        backgroundColor: '#F2F2F2',
        width: '100%',
        height:40,
        justifyContent: 'center'
    }, 
    textTitle:{
        color: GRAY
    },
    buttonStyle:{
        height: 50,
        width:'90%',
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: BLUE,
        justifyContent: 'center',
        marginBottom: 15
    },  
    buttonModalStyle:{
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: WHITE,
        justifyContent: 'flex-end',
        borderWidth: 0,
        flex: 1
    },
})
export default InfoFail;