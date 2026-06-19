import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatchType, RootStateType } from "./RStore";
export const useAppDispatch: () => AppDispatchType = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

