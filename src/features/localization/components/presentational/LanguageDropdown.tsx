import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../global/redux/hooks";
import { setLocalizationData } from "../../redux/reducers/slices/localizationSlice";

import translateSvg from '../../media/svg/translate.svg';

import langEn from '../../lang/en.json';
import langHu from '../../lang/hu.json';
import SupportedLocale from "../../redux/types/SupportedLocale";
import { setUserLocale } from "../../../auth/redux/reducers/slices/userAuthSlice";

const languages = {
    en: langEn,
    hu: langHu
};

export default function LanguageDropdown() {

    const state =  useAppSelector(state => state.localization);
    const userSettings = useAppSelector(state => state.userAuth.userSettings);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (userSettings && userSettings.locale !== 'en') dispatch(setLocalizationData(languages[userSettings.locale]));
    }, []);

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

                    const selectedLanguage = event.target.value as SupportedLocale;

                    dispatch(setUserLocale(selectedLanguage));
                    dispatch(setLocalizationData(languages[selectedLanguage]));
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
