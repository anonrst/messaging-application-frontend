import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./RSlices";
export const RStore = configureStore({
    reducer: {
        auth: authReducer,
    }
})
export type RootStateType = ReturnType<typeof RStore.getState>
export type AppDispatchType = typeof RStore.dispatch

