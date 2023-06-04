import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialUserAuthState from "../../initialUserAuthState";
import ReduxStore from "../../../../../global/redux/types/ReduxStore";
import SupportedLocale from "../../../../localization/redux/types/SupportedLocale";

// This store is responsible for use authentication and for storing user settings
const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState: initialUserAuthState,
    reducers: {
        setLoggedUser: (state, action: PayloadAction<string | undefined>) => {
            state.loggedUserName = action.payload;
        },
        setUserLocale: (state, action: PayloadAction<SupportedLocale>) => {
            state.userSettings.locale = action.payload;
        },
    }
});

export const {
    setLoggedUser,
    setUserLocale
} = userAuthSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: ReduxStore) => state;

export default userAuthSlice.reducer;

