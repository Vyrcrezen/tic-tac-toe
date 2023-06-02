import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React from "react";

import TokenType, { tokenTypes } from "../../types/TokenType";
import PlayerInfo from "../../types/PlayerInfo";
import { useAppDispatch } from "../../../../global/redux/hooks";
import { removePlayer, setPlayerName, setPlayerToken } from "../../redux/reducers/slices/gameInputSlice";
import importMapAssets from "../../imports/importMapAssets";

export default function PlayerSetupCard({player, mapAssets}: { player: PlayerInfo, mapAssets?: Awaited<ReturnType<typeof importMapAssets>> }) {

    const dispatch = useAppDispatch();

    return (
        <div className="col-lg-6" >
            <div className="d-flex flex-row flex-wrap align-items-center justify-content-evenly rounded vy-player-setup-card p-2">
                <TextField
                    variant="standard"
                    className=''
                    label='Player name'
                    type="text"
                    value={player.name}
                    onChange={(event) => dispatch(setPlayerName({ playerName: player.name, newName: event.target.value }))}
                />
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id={`${player.name}-token`}>Token</InputLabel>
                    <Select
                        labelId={`${player.name}-token`}
                        value={player.tokenType}
                        onChange={(event) => dispatch(setPlayerToken({ playerName: player.name, newToken: event.target.value as TokenType }))}
                        label="Token"
                    >
                        <MenuItem value={player.tokenType}>
                            <em>{player.tokenType}</em>
                        </MenuItem>
                        {
                            tokenTypes.map(token => (
                                <MenuItem key={`TokenType-${token}`} value={token}>{token}</MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
                {   mapAssets
                            ? <img className="" src={mapAssets[player?.tokenType ?? 'ring'].src} alt="" />
                            : <img className="" src="" alt="" />
                            }
                <IconButton
                    color='primary'
                    type='submit'
                    onClick={() => dispatch(removePlayer({ playerName: player.name }))}
                >
                    x
                </IconButton>
            </div>
        </div>
    );
}

