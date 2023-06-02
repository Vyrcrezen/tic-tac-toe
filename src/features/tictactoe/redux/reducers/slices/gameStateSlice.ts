import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialTicTacToeState from "../../initialTicTacToeState";
import ReduxStore from "../../../../../global/redux/types/ReduxStore";
import PlayerActions from "../../../types/PlayerActions";
import TokenType from "../../../types/TokenType";
import Coordinate from "../../../types/Coordinate";
import InitializationData from "../../../types/InitializationData";
import getDefaultGameState from "../../../initializers/getDefaultGameState";
import NextState from "../../../types/NextState";

const gameStateSlice = createSlice({
    name: 'ticTactToe/gameState',
    initialState: initialTicTacToeState.gameState,
    reducers: {
        setNeedsToRunAgain: (state, action: PayloadAction<boolean>) => {
            state.needsToRunAgain = action.payload;
        },
        setRoundWinner: (state, action: PayloadAction<{ name: string, tokenType: TokenType, winningCoordinates: Coordinate[], score: number }>) => {
            const { winningCoordinates, name, tokenType, score } = action.payload;

            state.roundWinner.name = name;
            state.roundWinner.tokenType = tokenType;
            state.roundWinner.winningCoordinates = winningCoordinates;
            state.roundWinner.score = score;
        },
        resetGameState: (state, action: PayloadAction<{ initializationData?: InitializationData }>) => {
            const { initializationData } = action.payload;

            return getDefaultGameState({ initializationData });
        },
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
        setIsPlayerActionsListGenerated: (state, action: PayloadAction<boolean>) => {
            state.initializationTasks.isPlayerActionsListGenerated = action.payload;
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

            const matchedPlayer = state.inGameResource.playerActionsList.find(player => player.name === playerName);

            if (!matchedPlayer) return;
            matchedPlayer.didMove = didMove;
        },
        setPlayerWinConditionChecked: (state, action: PayloadAction<{playerName: string, winConditionChecked: boolean}>) => {
            const { winConditionChecked,  playerName } = action.payload;

            const matchedPlayer = state.inGameResource.playerActionsList.find(player => player.name === playerName);

            if (!matchedPlayer) return;
            matchedPlayer.winConditionChecked = winConditionChecked;
        },
        setPlayerActionsList: (state, action: PayloadAction<PlayerActions[]>) => {
            state.inGameResource.playerActionsList = action.payload;
        },
        setDidCurrentPlayerMove: (state, action: PayloadAction<boolean>) => {
            state.inGameTasks.didCurrentPlayerMove = action.payload;
        },
        addPlayerToken: (state, action: PayloadAction<{ position: Coordinate, type: TokenType }>) => {

            state.inGameResource.tokens.push({
                position: action.payload.position,
                type: action.payload.type
            });
        },
        setPlayerScore: (state, action: PayloadAction<{ playerName: string, newScore: number }>) => {

            const { playerName, newScore } = action.payload;
            const playerIndex = state.inGameResource.playerActionsList.findIndex(player => player.name === playerName);

            if (playerIndex < 0) return;
            state.inGameResource.playerActionsList[playerIndex].score = newScore;

        },

        setIsAdvancingPostGameState: (state, action: PayloadAction<boolean>) => {
            state.isAdvancingPostGameState = action.payload;
        },
        setIsPostGameStateFinished: (state, action: PayloadAction<boolean>) => {
            state.isPostGameStateFinished = action.payload;
        },
        // postGameTasks
        setNextState: (state, action: PayloadAction<NextState | undefined>) => {
            state.postGameOptions.nextState = action.payload;
        },

        setIsNextStateSelected: (state, action: PayloadAction<boolean>) => {
            state.postGameTasks.isNextStateSelected = action.payload;
        },
    }
});

export const {
    setNeedsToRunAgain,
    setRoundWinner,
    resetGameState,
    setIsInitialized,
    setIsBeingInitialized,
    setIsConfigFinished,
    setIsPlayerActionsListGenerated,
    setIsRunning,
    setIsGameOver,
    setPlayerDidMove,
    setPlayerWinConditionChecked,
    setPlayerActionsList,
    setDidCurrentPlayerMove,
    addPlayerToken,
    setPlayerScore,
    setIsAdvancingPostGameState,
    setIsPostGameStateFinished,
    setNextState,
    setIsNextStateSelected,
} = gameStateSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: ReduxStore) => state;

export default gameStateSlice.reducer;
