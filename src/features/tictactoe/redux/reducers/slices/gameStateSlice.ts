import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialTicTacToeState from "../../initialTicTacToeState";
import ReduxStore from "../../../../../global/redux/types/ReduxStore";

const gameStateSlice = createSlice({
    name: 'ticTactToe/gameState',
    initialState: initialTicTacToeState.gameState,
    reducers: {
        setIsInitialized: (state, action: PayloadAction<boolean>) => {
            state.isInitialized = action.payload;
        },
        setIsBeingInitialized: (state, action: PayloadAction<boolean>) => {
            state.isBeingInitialized = action.payload;
        },
        // initializationTasks
        setIsConfigFinished: (state, action: PayloadAction<boolean>) => {
            state.initializationTasks.isConfigFinished = action.payload;
        },
        setIsPlayerActionTrackerGenerated: (state, action: PayloadAction<boolean>) => {
            state.initializationTasks.isPlayerActionTrackerGenerated = action.payload;
        },

        setIsRunning: (state, action: PayloadAction<boolean>) => {
            state.isRunning = action.payload;
        },
        setIsGameOver: (state, action: PayloadAction<boolean>) => {
            state.isGameOver = action.payload;
        },
        // inGameTasks
        setPlayerDidMove: (state, action: PayloadAction<{playerName: string, didMove: boolean}>) => {
            const { didMove,  playerName } = action.payload;

            const matchedPlayer = state.inGameTasks.playerActions.find(player => player.name === playerName);

            if (!matchedPlayer) return;
            matchedPlayer.didMove = didMove;
        },
        setPlayerWinConditionChecked: (state, action: PayloadAction<{playerName: string, winConditionChecked: boolean}>) => {
            const { winConditionChecked,  playerName } = action.payload;

            const matchedPlayer = state.inGameTasks.playerActions.find(player => player.name === playerName);

            if (!matchedPlayer) return;
            matchedPlayer.winConditionChecked = winConditionChecked;
        },

        setIsPostGameState: (state, action: PayloadAction<boolean>) => {
            state.isAdvancingPostGameState = action.payload;
        },
        setIsPostGameStateFinished: (state, action: PayloadAction<boolean>) => {
            state.isPostGameStateFinished = action.payload;
        },
        // postGameTasks
        setIsNextGameSelected: (state, action: PayloadAction<boolean>) => {
            state.postGameTasks.isNextGameSelected = action.payload;
        },
    }
});

export const {
    setIsInitialized,
    setIsBeingInitialized,
    setIsConfigFinished,
    setIsPlayerActionTrackerGenerated,
    setIsRunning,
    setIsGameOver,
    setPlayerDidMove,
    setPlayerWinConditionChecked,
    setIsPostGameState,
    setIsPostGameStateFinished,
    setIsNextGameSelected,
} = gameStateSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: ReduxStore) => state;

export default gameStateSlice.reducer;
