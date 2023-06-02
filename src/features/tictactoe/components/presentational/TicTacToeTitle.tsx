import React from "react";
import { useAppSelector } from "../../../../global/redux/hooks";

export default function TicTacToeTitle() {

    const localization = useAppSelector(state => state.localization.data.ticTacToe);

    return (
        <div className="d-flex flex-column justify-content-center h-100 align-items-center text-center">
            <h1 className="m-0">{localization.title}</h1>
        </div>
    );
}
