import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../../global/redux/hooks";

export default function LoginPrompt() {

    const localization = useAppSelector(state => state.localization.data.ticTacToe.loginPrompt);

    return (
        <div>
            <h4 className="text-center m-5">{localization.please}
            <Link className="mx-1" to="/login">{localization.login}</Link>
            {localization.or}
            <Link className="mx-1" to="/register">{localization.register}</Link>
            {localization.toPlay}</h4>
        </div>
    );
}
