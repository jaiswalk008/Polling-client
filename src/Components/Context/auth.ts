import { createSlice } from "@reduxjs/toolkit"

const initialAuthState: {token:string,userName:string,profilePhotoURL:string} = {
    token:localStorage.getItem('token') || "",
    userName:localStorage.getItem('userName')|| '',
    profilePhotoURL:localStorage.getItem('profilePhotoURL')|| '',
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
            localStorage.setItem('userName', action.payload);
        },
        logout(state){
            state.token = "";
            localStorage.removeItem('token');
            localStorage.removeItem('profilePhotoURL');
            localStorage.removeItem('userName');
        },
        setProfilePhotoURL(state, action){
            state.profilePhotoURL = action.payload;
            localStorage.setItem('profilePhotoURL', action.payload);
        }   
    }
})
export default authSlice;