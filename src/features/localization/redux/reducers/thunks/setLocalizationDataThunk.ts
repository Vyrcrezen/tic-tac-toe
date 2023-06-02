import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import getLocalizationData from "../../../api/getLocalizationData";


const setLocalizationDataThunk = ({language}: {language: string}) => async (dispatch: Dispatch<AnyAction>) => {

    const response = await getLocalizationData(language);

    if (!response) throw new Error();

    dispatch({ type: 'localization/setLocalizationData', payload: response });

}

export default setLocalizationDataThunk;