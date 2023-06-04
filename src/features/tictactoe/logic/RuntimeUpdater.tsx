import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../global/redux/hooks";
import initializeGameStateThunk from "../redux/reducers/thunks/initializeGameStateThunk";
import runGameplayLoopThunk from "../redux/reducers/thunks/runGameplayLoopThunk";
import setupNextGameThunk from "../redux/reducers/thunks/setupNextGameThunk";

/**
 * This component keeps track of state changes throughout the game
 * @returns a React component without visual elements
 */
const RuntimeUpdater: React.FC = () => {

    const state = useAppSelector((state) => state.ticTacToe);
    const dispatch = useAppDispatch();

    // This React hook is called whenever a watched game state changes
    useEffect(() => {
        // If we are in the initialization stage, call the thunk responsible for performing the initialization tasks
        if(!state.gameState.isInitialized && !state.gameState.isBeingInitialized) {
            dispatch(initializeGameStateThunk({ gameState: state.gameState, gameResources: state.gameResources, gameInput: state.gameInput }));
        }
        // Else if we are in the gameplay stage, call the thunk responsible for performing the gameplay tasks
        else if(state.gameState.isInitialized && !state.gameState.isRunning && !state.gameState.isGameOver) {
            dispatch(runGameplayLoopThunk({ gameState: state.gameState, gameResources: state.gameResources, gameInput: state.gameInput }));
        }
        // Else if we are in the game ending stage, call the thunk responsible for performing the game ending tasks
        else if (state.gameState.isGameOver && !state.gameState.isPostGameStateFinished && !state.gameState.isAdvancingPostGameState) {
            dispatch(setupNextGameThunk({ gameState: state.gameState, gameResources: state.gameResources }))
        }
    }, [state.gameState.initializationTasks.isConfigFinished, state.gameState.needsToRunAgain, state.gameState.inGameTasks.didCurrentPlayerMove, state.gameState.isGameOver, state.gameState.postGameTasks.isNextStateSelected]);

    return null;
}

export default RuntimeUpdater;
