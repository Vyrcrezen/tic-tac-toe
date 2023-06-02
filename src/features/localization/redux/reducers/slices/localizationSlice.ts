import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import defaultLocalizationStore from "../../defaultLocalizationStore";
import ReduxStore from "../../../../../global/redux/types/ReduxStore";
import LocalizationData from "../../types/LocalizationData";
import getDefaultLocalizationData from "../../../initializers/getDefaultLocalizationData";
import SupportedLocale from "../../types/SupportedLocale";


const localizationSlice = createSlice({
    name: 'localization',
    initialState: defaultLocalizationStore,
    reducers: {
        setLocalizationData: (state, action: PayloadAction<LocalizationData["data"]>) => {

            state.data = Object.assign({}, getDefaultLocalizationData().data, action.payload);
        },
    }
});

export const {
    setLocalizationData
} = localizationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: ReduxStore) => state;

export default localizationSlice.reducer;