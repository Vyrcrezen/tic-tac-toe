import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../global/redux/hooks";
import initializeGameStateThunk from "../redux/reducers/thunks/initializeGameStateThunk";
import runGameplayLoopThunk from "../redux/reducers/thunks/runGameplayLoopThunk";
import setupNextGameThunk from "../redux/reducers/thunks/setupNextGameThunk";

const RuntimeUpdater: React.FC = () => {

    const state = useAppSelector((state) => state.ticTacToe);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(!state.gameState.isInitialized && !state.gameState.isBeingInitialized) {
            dispatch(initializeGameStateThunk({ gameState: state.gameState, gameResources: state.gameResources }));
        }
        else if(state.gameState.isInitialized && !state.gameState.isRunning && !state.gameState.isGameOver) {
            dispatch(runGameplayLoopThunk({ gameState: state.gameState, gameResources: state.gameResources, gameInput: state.gameInput }));
        }
        else if (state.gameState.isGameOver && !state.gameState.isPostGameStateFinished && !state.gameState.isAdvancingPostGameState) {
            dispatch(setupNextGameThunk({ gameState: state.gameState, gameResources: state.gameResources }))
        }
    }, [state.gameState]);

    return null;
}

export default RuntimeUpdater;
