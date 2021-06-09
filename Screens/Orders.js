import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, SafeAreaView, Modal} from 'react-native';
import Barcode from '@kichiyaki/react-native-barcode-generator'
import { GRAY, GREEN, WHITE, ORANGE, BLUE } from '../asset/color';
import { data, myOrders } from '../asset/datasample';
const Orders = ({navigation}) => {
    const [colorStatus, setColorStatus] = useState(GREEN)
    const buttonColor = (item) =>{
        let color;
        if(item.status == 'Giao hàng thành công')
        {
            color = GREEN
        }
        else if (item.status === 'Giao hàng không thành công')
        {
            color = ORANGE
        }
        else(
            color = BLUE
        )
        return color;
    }
    const StatusItem = (item) => { 
        
        return(
            <View style={{borderBottomWidth: 0.5,}}>
                <View style={{paddingLeft: 20,flexDirection:'row', marginTop: 10}}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                        <Text style={{fontSize: 13}}>{item.time} - {item.date}:</Text>
                        <Text style={{fontSize: 13}}>Đã đóng gói</Text>
                    </View>
                        <Image source={require('../img/rightarrowector.png')} style={{marginRight: 20, alignSelf: 'center'}}></Image>
                </View>
                <View style={{padding: 20, flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', width: '90%'}}>{/*địa chỉ gửi*/}
                        <Image source={require('../img/sentplacevector.png')}></Image>
                        <View style={{paddingLeft: 10}}>
                            <Text style={{fontSize: 14}}>{item.sent}</Text>
                        </View>
                    </View>
                    <View style={{borderStyle:'dashed', borderLeftWidth: 0.4, borderRadius: 1, marginLeft: 7, padding: 10, borderColor: GREEN}}></View>
                    <View style={{flexDirection: 'row', alignItems: 'center', width: '90%'}}>{/*địa chỉ nhận*/}
                        <Image source={require('../img/recieveplacevector.png')}></Image>
                        <View style={{paddingLeft: 10}}>
                            <Text style={{fontSize: 14}}>{item.recieve}</Text>
                        </View>
                    </View>
                </View>
                <View style={{width: '90%', alignSelf: 'center', flexDirection:'row',alignItems: 'center', marginBottom: 11}}>
                    <View style={{flex: 1}}>
                        <Text style={{color: GRAY, fontSize: 13}}>Trạng thái</Text>
                    </View>
                    <TouchableOpacity style={{backgroundColor: buttonColor(item), padding: 6,paddingHorizontal: 10, alignItems:'center', flex: 1}}>
                        <Text style={{fontWeight: 'bold', color: WHITE, textAlign: 'center', fontSize: 12}}>{item.status}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    const ListItem = ({item}) => {
        return(
            <View>
                {StatusItem(item)}
            </View>
        )
    }
    return (
    <SafeAreaView style={styles.container}>
        <View style={styles.topView}>
            <TouchableOpacity style={{borderWidth: 0, left: 0, position: 'absolute', marginLeft: 20, marginTop: 15}}
                onPress={()=>{navigation.goBack()}}>
            <Image source={require('../img/arrow.png')} style={{tintColor: '#000000'}}></Image>
            </TouchableOpacity>
            <View>
                <Text style={{fontSize: 20}}>Đơn hàng của tôi</Text>
            </View>
            <View style={{borderWidth: 0,flexDirection: 'row', alignSelf: 'center', position: 'absolute', right: 0, justifyContent: 'space-between'}}>
            <TouchableOpacity style={{paddingRight: 20}}
                onPress={()=>navigation.navigate('Home')}>
                <Image source={require('../img/homevector.png')} style={{tintColor: '#000000'}}></Image>
            </TouchableOpacity>
            </View>
        </View>
        <FlatList
            data={myOrders}
            renderItem={(item)=>ListItem(item)}
        ></FlatList>
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
        backgroundColor: GREEN,
        justifyContent: 'center',
        marginBottom: 15,
        flexDirection: 'row'
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
export default Orders;