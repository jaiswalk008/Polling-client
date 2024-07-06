import { createSlice } from "@reduxjs/toolkit"

const initialAuthState: {token:string,userName:string} = {
    token:localStorage.getItem('token') || "",
    userName:''
}

const authSlice = createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{
        setToken(state,action){
            state.token = action.payload;
            localStorage.setItem('token',action.payload);
        },
        
        setUserName(state,action){
            state.userName = action.payload;
        
        },
        logout(state){
            state.token = "";
            localStorage.removeItem('token');
        },
    }
})
export default authSlice;