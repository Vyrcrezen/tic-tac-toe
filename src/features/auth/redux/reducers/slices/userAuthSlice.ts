import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialUserAuthState from "../../initialUserAuthState";
import ReduxStore from "../../../../../global/redux/types/ReduxStore";

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState: initialUserAuthState,
    reducers: {
        setLoggedUser: (state, action: PayloadAction<string | undefined>) => {
            state.loggedUserName = action.payload;
        }
    }
});

export const {
    setLoggedUser
} = userAuthSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: ReduxStore) => state;

export default userAuthSlice.reducer;

