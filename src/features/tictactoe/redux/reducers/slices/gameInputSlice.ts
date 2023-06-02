import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialTicTacToeState from "../../initialTicTacToeState";
import ReduxStore from "../../../../../global/redux/types/ReduxStore";
import TokenType from "../../../types/TokenType";
import getDefaultPlayerInfo from "../../../initializers/getDefaultPlayerInfo";
import PlayerInfo from "../../../types/PlayerInfo";


const gameInputSlice = createSlice({
    name: 'ticTactToe/gameInput',
    initialState: initialTicTacToeState.gameInput,
    reducers: {
        addPlayer: (state, action: PayloadAction<{ playerName: string, token: TokenType, turnOrder?: number }>) => {

            const { playerName, token, turnOrder } = action.payload;

            // Resolve a turn position
            let defaultTurnPosition = 1;
            if (!turnOrder) {
                const turnPositions = Object.values(state.players).map(player => player.turnOrder);

                let foundFreePosition = false;
                while (!foundFreePosition) {
                    if (turnPositions.includes(defaultTurnPosition)) defaultTurnPosition++;
                    else foundFreePosition = true;
                }
            }

            // Remove previous if exists
            const previousPlayerInfoIndex = state.players.findIndex(player => player.name === playerName);
            if (previousPlayerInfoIndex !== -1) state.players.splice(previousPlayerInfoIndex, 1);

            const playerInfo: PlayerInfo = {
                tokenType: token,
                name: playerName,
                turnOrder: turnOrder ?? defaultTurnPosition,
                roundWins: 0
            };

            state.players.push(playerInfo);
        },
        removePlayer: (state, action: PayloadAction<{ playerName: string}>) => {

            const { playerName } = action.payload;

            const playerIndex = state.players.findIndex(player => player.name === playerName);

            if (playerIndex < 0) return;

            state.players.splice(playerIndex, 1);
        },
        setPlayerName: (state, action: PayloadAction<{ playerName: string, newName: string }>) => {

            const { playerName, newName } = action.payload;

            if (state.players.some(player => player.name === newName)) return;

            const playerIndex = state.players.findIndex(player => player.name === playerName);

            if (playerIndex < 0) return;

            state.players[playerIndex].name = newName;
        },
        setPlayerToken: (state, action: PayloadAction<{ playerName: string, newToken: TokenType }>) => {

            const { playerName, newToken } = action.payload;

            const playerIndex = state.players.findIndex(player => player.name === playerName);

            if (playerIndex < 0) return;

            state.players[playerIndex].tokenType = newToken;
        },
        setBoardColumns: (state, action: PayloadAction<number>) => {
            state.boardColumns = action.payload;
        },
        setBoardRows: (state, action: PayloadAction<number>) => {
            state.boardRows = action.payload;
        },
        setNumAdjacentTokensToWin: (state, action: PayloadAction<number>) => {
            state.numAdjacentTokensToWin = action.payload;
        },
    }
});

export const {
    addPlayer,
    removePlayer,
    setPlayerName,
    setPlayerToken,

    setBoardColumns,
    setBoardRows,
    setNumAdjacentTokensToWin,
} = gameInputSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: ReduxStore) => state;

export default gameInputSlice.reducer;
