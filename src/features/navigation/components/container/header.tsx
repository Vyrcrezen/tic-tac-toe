import React, { useContext } from "react";
import LanguageDropdown from "../../../localization/components/presentational/LanguageDropdown";

export function Header() {

    return (
        <header className="d-flex flex-row-reverse align-items-center">
            <div className="container d-flex flex-row-reverse" >
                <LanguageDropdown />
            </div>
        </header>
    );
}
