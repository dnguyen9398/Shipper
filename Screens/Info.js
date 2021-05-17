import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Barcode from '@kichiyaki/react-native-barcode-generator'
import { GRAY, GREEN, WHITE } from '../asset/color';
import DashedLine from 'react-native-dashed-line';
const Info = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.topView}>
            <TouchableOpacity 
                style={{borderWidth: 0, left: 0, position: 'absolute', marginLeft: 15}}
                onPress={()=>{navigation.goBack()}}>
                <Image source={require('../img/arrow.png')}></Image>
            </TouchableOpacity>
            <View style={{borderWidth: 0,flexDirection: 'row', position: 'absolute', right: 0}}>
                <TouchableOpacity style={{flex: 2, paddingRight: 20}}>
                    <Image source={require('../img/notivector.png')}></Image>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={{fontSize: 20}}>Thông tin đơn hàng</Text>
            </View>
        </View>
        <View>
            <Barcode format={'CODE128'} value={'Hello World'}
             text={'Hello World'}
             textStyle={{marginTop: 14, fontSize: 20, fontWeight: 'bold', marginBottom: 10}}></Barcode>
        </View>
        <View style={styles.titleContent}>
            <Text style={{fontSize: 14, color: GRAY, fontWeight: 'bold'}}>Lịch sử trạng thái</Text>
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
        <View style={styles.titleContent}>
            <Text style={{fontSize: 14, color: GRAY, fontWeight: 'bold'}}>Thông tin người gửi</Text>
        </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:WHITE
    },
    topView:{
        borderWidth: 0,
        width:'100%',
        height: '9%',
        elevation: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25
    },
    titleContent:{
        paddingLeft: 20,
        backgroundColor: '#F2F2F2',
        width: '100%',
        height:40,
        justifyContent: 'center'
    }
})
export default Info;