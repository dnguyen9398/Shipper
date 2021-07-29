import AsyncStorage from "@react-native-async-storage/async-storage";

export const SERVER_ADDRESS = 'https://khach-hang.chanh8.com/'
export const asyncGET = async (url, newLocalHost = null,) => {
    var urlFetch =
        (newLocalHost == null ? SERVER_ADDRESS: newLocalHost) + url;
    const token = await AsyncStorage.getItem('token')
    try {
        const response = await fetch(urlFetch,{
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const responseJson = response.json();
        return responseJson;
    }catch(error){
        var obj = {
            Status: 500,
            Message: 'The server is not responding!' + '\n\n' + error,
        };
        return obj; 
    }
}
export const asyncPOST = async (url, object, newLocalHost = null) => {
    var urlFetch =
        (newLocalHost == null ? SERVER_ADDRESS: newLocalHost) + url;
    const token = await AsyncStorage.getItem('token')
    try {
        const response = await fetch(urlFetch,{
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object),
        });
        const responseJson = response.json();
        return responseJson;
    }catch(error){
        var obj = {
            Status: 500,
            Message: 'The server is not responding!' + '\n\n' + error,
        };
        return obj; 
    }
}

export const _storedata = async(arrKeyValue, value)=>{
    try{
        await AsyncStorage.multiSet(arrKeyValue);
        return true
    }
    catch (error){
        console.log(error)
        return error;
    }
}

export const _retrieveData = async (arrKey) => {
    try {
        const value = await AsyncStorage.multiGet(arrKey);
        if (value !== null) {
            return value;
        }
    } catch (error) {
        console.log(error)
        return error;
    }
};