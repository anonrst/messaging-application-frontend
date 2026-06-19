import type { InitialUserAuthStateType, ServerDTO, User } from "@/types/auth.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialUserAuthState: InitialUserAuthStateType = {
    user: null,
    isAuthenticated: false,
    currentServer:null
}


const authSlice = createSlice({
    name: "auth",
    initialState: initialUserAuthState,
    reducers: {
        loginSuccess: (state: InitialUserAuthStateType, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state: InitialUserAuthStateType) => {
            state.isAuthenticated = false;
            state.user = null;
            state.currentServer = null;
        },
        setCurrentServer: (state:InitialUserAuthStateType, selectedServer:PayloadAction<ServerDTO>) => {
            state.currentServer = selectedServer.payload;
        }
    }
});


export const { loginSuccess, logout,setCurrentServer} = authSlice.actions;
export default authSlice.reducer;


