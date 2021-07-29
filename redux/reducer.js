import {combineReducers} from 'redux'

const reducerStorePhone = (state = [], action) =>{
    if(action.type == 'STORE_MEMBER'){
        return action.data
    }
    return state;
}
const reducerStoreOTP = (state = null, action) => {
    if (action.type == 'STORE_OTP') {
        return action.data;
    }
    return state;
};
const reducer = combineReducers({
    phone : reducerStorePhone,
    otp : reducerStoreOTP,
})
export default reducer;
