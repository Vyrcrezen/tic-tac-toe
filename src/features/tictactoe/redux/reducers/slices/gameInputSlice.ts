import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialTicTacToeState from "../../initialTicTacToeState";
import ReduxStore from "../../../../../global/redux/types/ReduxStore";
import TokenType from "../../../types/TokenType";
import getDefaultPlayerInfo from "../../../initializers/getDefaultPlayerInfo";


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

                let foundFreePosition = true;
                while (!foundFreePosition) {
                    if (turnPositions.includes(defaultTurnPosition)) defaultTurnPosition++;
                    else foundFreePosition = false;
                }
            }

            // Remove previous if exists
            const previousPlayerInfoIndex = state.players.findIndex(player => player.name === playerName);
            if (previousPlayerInfoIndex !== -1) state.players.splice(previousPlayerInfoIndex, 1);

            const playerInfo = {
                tokenType: token,
                name: playerName,
                turnOrder: turnOrder ?? defaultTurnPosition
            };

            state.players.push(playerInfo);
        },
    }
});

export const {
    addPlayer
} = gameInputSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: ReduxStore) => state;

export default gameInputSlice.reducer;
