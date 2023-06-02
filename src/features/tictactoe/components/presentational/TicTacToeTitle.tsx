import React from "react";
import { useAppSelector } from "../../../../global/redux/hooks";

export default function TicTacToeTitle() {

    const authState = useAppSelector(state => state.userAuth);

    const username = authState.loggedUserName;

    return (
        <div className="d-flex flex-column justify-content-center h-100 align-items-center text-center">
            <h1 className="m-0">Tic-Tac-Toe</h1>
        </div>
    );
}
