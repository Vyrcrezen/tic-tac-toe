import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialTicTacToeState from "../../initialTicTacToeState";
import ReduxStore from "../../../../../global/redux/types/ReduxStore";
import BoardDimensions from "../../../types/BoardDimensions";

const gameResourcesSlice = createSlice({
    name: 'ticTactToe/gameResources',
    initialState: initialTicTacToeState.gameResources,
    reducers: {
        setBoardDimensions: (state, action: PayloadAction<BoardDimensions>) => {
            state.boardDimensions = action.payload;
        },
    }
});

export const {
    setBoardDimensions,
} = gameResourcesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: ReduxStore) => state;

export default gameResourcesSlice.reducer;
