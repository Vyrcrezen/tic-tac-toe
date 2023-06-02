import Button from "@mui/material/Button";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../global/redux/hooks";
import { setIsConfigFinished } from "../../redux/reducers/slices/gameStateSlice";
import TextField from "@mui/material/TextField";
import { addPlayer, removePlayer, setBoardColumns, setBoardRows, setNumAdjacentTokensToWin, setPlayerName, setPlayerToken } from "../../redux/reducers/slices/gameInputSlice";
import { FormControl, Icon, IconButton, InputLabel, MenuItem, Select, SvgIcon } from "@mui/material";
import TokenType, { tokenTypes } from "../../types/TokenType";
import PlayerSetupCard from "../presentational/PlayerSetupCard";
import importMapAssets from "../../imports/importMapAssets";
import { setLoggedUser } from "../../../auth/redux/reducers/slices/userAuthSlice";

import personFillX from '../../media/svgs/person-fill-x.svg';

export default function GameSetup({mapAssets}: {mapAssets?: Awaited<ReturnType<typeof importMapAssets>>}) {
    const dispatch = useAppDispatch();
    
    const inputState = useAppSelector(state => state.ticTacToe.gameInput);
    const userAuth = useAppSelector(state => state.userAuth);
    const locale = useAppSelector(state => state.localization.data.ticTacToe.gameSetup);

    return (
        <div className="d-flex flex-column justify-content-center vy-game-setup" >
            <div className="position-relative">
                <h4 className="text-center">{locale.welcome}{userAuth.loggedUserName}</h4>
                <IconButton
                    className="position-absolute rounded"
                    color='primary'
                    onClick={() => dispatch(setLoggedUser(undefined))}
                >
                    <img src={personFillX} />
                </IconButton>

            </div>
            <h6 className="text-center mb-5">{locale.readyToPlay}</h6>
            <div className="d-flex flex-row flex-wrap justify-content-evenly">
                <TextField
                    variant="standard"
                    className='mb-4'
                    label={locale.boardCol}
                    type="number"
                    value={inputState.boardColumns}
                    onChange={(event) => dispatch(setBoardColumns(+event.target.value))}
                />
                <TextField
                    variant="standard"
                    className='mb-4'
                    label={locale.boardRow}
                    type="number"
                    value={inputState.boardRows}
                    onChange={(event) => dispatch(setBoardRows(+event.target.value))}
                />
                <TextField
                    variant="standard"
                    className='mb-4'
                    label={locale.adjacentTokensToWin}
                    type="number"
                    value={inputState.numAdjacentTokensToWin}
                    onChange={(event) => dispatch(setNumAdjacentTokensToWin(+event.target.value))}
                />
            </div>
            <div className="container mb-3">
                <div className="row g-2">
                    {
                        inputState.players.map((player, playerIndex) => <PlayerSetupCard mapAssets={mapAssets} player={player} key={`player-setup-${playerIndex}`} />)
                    }
                </div>
            </div>
            <div className="d-flex flex-row justify-content-evenly">
                <Button
                    className="mb-2"
                    variant='contained'
                    color='primary'
                    onClick={() => dispatch(addPlayer({ playerName: `Player-${inputState.players.length}`, token: 'ring' }))}
                >
                    {locale.addPlayer}
                </Button>
            </div>
            <div className="d-flex flex-row justify-content-evenly">
                <Button
                    variant='contained'
                    color='primary'
                    onClick={() => dispatch(setIsConfigFinished(true))}
                >
                    {locale.start}
                </Button>
            </div>
        </div>
    );
}
