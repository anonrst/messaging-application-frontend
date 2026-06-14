import type { InitialUserAuthStateType, User } from "@/types/auth.types";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const initialUserAuthState: InitialUserAuthStateType = {
    user: null,
    isAuthenticated: false
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
        }
    }
});

export const { loginSuccess, logout} = authSlice.actions;
export default authSlice.reducer;
