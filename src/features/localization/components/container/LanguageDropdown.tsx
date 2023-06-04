import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../global/redux/hooks";

import translateSvg from '../../media/svg/translate.svg';

import SupportedLocale from "../../redux/types/SupportedLocale";
import { setUserLocale } from "../../../auth/redux/reducers/slices/userAuthSlice";
import setLocalizationDataThunk from "../../redux/reducers/thunks/setLocalizationDataThunk";

/**
 * Everything related to language selection is centralized here
 * The dropdown has the responsibility of updating the language data inside the `localization` feature, as well as the selected locale inside the `userAuth` feature
 * @returns a dropdown for selecting a language
 */
export default function LanguageDropdown() {

    const userSettings = useAppSelector(state => state.userAuth.userSettings);
    const dispatch = useAppDispatch();

    // Load another language, if the selected one isn't the default English
    useEffect(() => {
        if (userSettings && userSettings.locale !== 'en') dispatch(setLocalizationDataThunk({language: userSettings.locale}));
    }, []);

    // This is what will be visible inside the closed dropdown button, a language icon and the locale
    const renderValue = (selected: string) => {
        return (
            <>
            <img className="p-0 me-3 rounded" src={translateSvg} alt="" />
            {selected}
            </>
        );
    }

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small" className="vy-secondary border-0">
            <Select
                value={userSettings.locale}
                onChange={(event) => {
                    // Let TypeScript know that the value is of type SupportedLocale
                    const selectedLanguage = event.target.value as SupportedLocale;

                    // Update both the locale setting and the language data
                    dispatch(setUserLocale(selectedLanguage));
                    dispatch(setLocalizationDataThunk({ language: selectedLanguage }));
                }}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
                renderValue={renderValue}
            >
                <MenuItem value={'en'}>En (English)</MenuItem>
                <MenuItem value={'hu'}>Hu (Magyar)</MenuItem>
            </Select>
        </FormControl>
    );
}
