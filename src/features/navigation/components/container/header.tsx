import React, { useContext } from "react";
import LanguageDropdown from "../../../localization/components/container/LanguageDropdown";

/**
 * 
 * @returns a black header bar, with a single dropdown component for selecting a language
 */
export function Header() {

    return (
        <header className="d-flex flex-row-reverse align-items-center">
            <div className="container d-flex flex-row-reverse" >
                <LanguageDropdown />
            </div>
        </header>
    );
}
