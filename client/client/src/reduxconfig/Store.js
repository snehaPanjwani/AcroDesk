import { configureStore } from "@reduxjs/toolkit";
import UserReducer from './UserSlice';

const store = configureStore({
    reducer : {
        userinfo : UserReducer
    }
});

store.subscribe(()=>{

    const data = store.getState().userinfo.value;
    //console.log("State Changed")
    localStorage.setItem("userinfo", JSON.stringify(data));
})
export default store;