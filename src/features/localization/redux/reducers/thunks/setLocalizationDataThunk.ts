import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import getLocalizationData from "../../../api/getLocalizationData";
import SupportedLocale from "../../types/SupportedLocale";

/**
 * This Thunk requests the language data from the content server from here: `/lang/${language}.json`,
 * then updates the redux store's `localization` slice with the retrieved data
 * @param param0 an object, which takes the locale string as its `language` field
 * @returns 
 */
const setLocalizationDataThunk = ({language}: {language: SupportedLocale}) => async (dispatch: Dispatch<AnyAction>) => {

    // Fetch the lonaguage data
    const response = await getLocalizationData(language);

    if (!response) throw new Error();

    // Update the redux store's localization branch
    dispatch({ type: 'localization/setLocalizationData', payload: response });
}

export default setLocalizationDataThunk;