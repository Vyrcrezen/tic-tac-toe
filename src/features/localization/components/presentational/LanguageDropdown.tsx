import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../global/redux/hooks";
import { setLocale, setLocalizationData } from "../../redux/reducers/slices/localizationSlice";

import translateSvg from '../../media/svg/translate.svg';

import langEn from '../../lang/en.json';
import langHu from '../../lang/hu.json';
import SupportedLocale from "../../redux/types/SupportedLocale";

const languages = {
    en: langEn,
    hu: langHu
};

export default function LanguageDropdown() {

    const state =  useAppSelector(state => state.localization);
    const dispatch = useAppDispatch();

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
                value={state.locale}
                onChange={(event) => {

                    const selectedLanguage = event.target.value as SupportedLocale;

                    dispatch(setLocale(selectedLanguage));
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
