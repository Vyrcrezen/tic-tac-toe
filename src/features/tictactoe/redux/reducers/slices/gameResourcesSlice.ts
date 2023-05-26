import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialTicTacToeState from "../../initialTicTacToeState";
import ReduxStore from "../../../../../global/redux/types/ReduxStore";
import BoardDimensions from "../../../types/BoardDimensions";
import Coordinate from "../../../types/Coordinate";
import TokenType from "../../../types/TokenType";

const gameResourcesSlice = createSlice({
    name: 'ticTactToe/gameResources',
    initialState: initialTicTacToeState.gameResources,
    reducers: {
        setBoardDimensions: (state, action: PayloadAction<BoardDimensions>) => {
            state.boardDimensions = action.payload;
        },
        addPlayerToken: (state, action: PayloadAction<{ position: Coordinate, type: TokenType }>) => {

            state.tokens.push({
                position: action.payload.position,
                type: action.payload.type
            });
        },
    }
});

export const {
    setBoardDimensions,
    addPlayerToken
} = gameResourcesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: ReduxStore) => state;

export default gameResourcesSlice.reducer;
