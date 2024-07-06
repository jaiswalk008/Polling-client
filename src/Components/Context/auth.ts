import { createSlice } from "@reduxjs/toolkit"

const initialAuthState: {token:string,userName:string,profilePhotoURL:string} = {
    token:localStorage.getItem('token') || "",
    userName:'',
    profilePhotoURL:''
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
        setProfilePhotoURL(state, action){
            state.profilePhotoURL = action.payload;
        }   
    }
})
export default authSlice;