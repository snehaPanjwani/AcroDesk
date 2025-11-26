import { createSlice } from "@reduxjs/toolkit";

const loadData = ()=>{
    const data = localStorage.getItem('userinfo')
    if(data == undefined || data==null)
        return {
            islogin : false,
            name : undefined,
            role : undefined,
            token : undefined
        }
    else 
        return JSON.parse(data);
}
const slice = createSlice({
    name : "user",
    initialState : {
        value : loadData()
    },
    reducers:{
        addUserData : (state,action)=>{
            const data = {...action.payload,islogin:true}
            state.value = data
        },
        remUserData : (state,action)=>{
            state.value = {
                islogin : false ,
                name : undefined,
                role : undefined,
                token : undefined
                }
        }
    }
});
export default slice.reducer;

export const {addUserData , remUserData} = slice.actions;