import { AppDispatch } from "../../../../../global/redux/store";
import GameInput from "../../../types/GameInput";
import GameResources from "../../../types/GameResources";
import GameState from "../../../types/GameState";
import getCurrentPlayer from "../../../util/getCurrentPlayer";
import getWinningTokenCoordinates from "../../../util/getWinningTokenCoordinates";
import { setDidCurrentPlayerMove, setIsGameOver, setIsRunning, setNeedsToRunAgain, setPlayerDidMove, setPlayerScore, setPlayerWinConditionChecked, setRoundWinner } from "../slices/gameStateSlice";

/**
 * Whenever this thunk is called, it checks the current state of the game and might update it to move the game forward
 * @param param0 takes the redux store slices
 * @returns 
 */
const runGameplayLoopThunk =
({gameState, gameResources, gameInput}: { gameState: GameState, gameResources: GameResources, gameInput: GameInput }) => async (dispatch: AppDispatch) => {

    // This vairable helps making sure that only one instance of this thunk runs at any time
    dispatch(setIsRunning(true));
    // Some tasks might set this value to true to trigger a re-run of the game state updater
    // If this is true, the task successfully triggered a re-run
    dispatch(setNeedsToRunAgain(false));

    // The player who did the most recent action
    const currentPlayer = getCurrentPlayer(gameState.inGameResource.playerActionsList);

    // If the current player placed a token
    if (gameState.inGameTasks.didCurrentPlayerMove && currentPlayer) {
        // Check if the current player won, by retrieving a list of adjacent token coordinates
        const winningTokenCoordinates = getWinningTokenCoordinates(gameState.inGameResource.tokens, currentPlayer.tokenType, gameInput.numAdjacentTokensToWin);

        // If the number of adjacent coordinates returned isn't empty, the player won
        if (winningTokenCoordinates.length >= gameInput.numAdjacentTokensToWin) {
            // The gameplay phase is over
            dispatch(setIsGameOver(true));

            // The new score of the current player
            const newScore = currentPlayer.score + 1;

            // Store the current player's score
            dispatch(setPlayerScore({ playerName: currentPlayer.name, newScore }));
            // Store separately the winning player's data
            dispatch(setRoundWinner({
                name: currentPlayer.name,
                tokenType: currentPlayer.tokenType,
                winningCoordinates: winningTokenCoordinates,
                score: newScore
            }));
        }
        // The current player didn't win
        else {
            // Only after setting the winConditionChecked to true, does the next in line player become the 'current player'
            dispatch(setPlayerWinConditionChecked({ playerName: currentPlayer.name, winConditionChecked: true }));
            // This state is watched by the gameplay state updater, and when an outside function sets this to true, we can check the win condition here
            dispatch(setDidCurrentPlayerMove(false));
            // Run again, and see if we still have a 'current player', or if all players already moved
            dispatch(setNeedsToRunAgain(true));
        }

    }
    // This is the case if all players moved
    else if(!currentPlayer) {
        // Reset the didMove and winConditionChecked value to false, so that all players can have a turn again
        gameState.inGameResource.playerActionsList.forEach(player => {
            dispatch(setPlayerDidMove({ playerName: player.name, didMove: false }));
            dispatch(setPlayerWinConditionChecked({ playerName: player.name, winConditionChecked: false }));
        });
    }

    dispatch(setIsRunning(false));
};

export default runGameplayLoopThunk;