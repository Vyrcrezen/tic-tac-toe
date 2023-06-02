import { AppDispatch } from "../../../../../global/redux/store";
import GameInput from "../../../types/GameInput";
import GameResources from "../../../types/GameResources";
import GameState from "../../../types/GameState";
import getCurrentPlayer from "../../../util/getCurrentPlayer";
import getNextPlayer from "../../../util/getNextPlayer";
import getWinningTokenCoordinates from "../../../util/getWinningTokenCoordinates";
import { setDidCurrentPlayerMove, setIsGameOver, setIsRunning, setNeedsToRunAgain, setPlayerDidMove, setPlayerScore, setPlayerWinConditionChecked, setRoundWinner } from "../slices/gameStateSlice";

const runGameplayLoopThunk =
({gameState, gameResources, gameInput}: { gameState: GameState, gameResources: GameResources, gameInput: GameInput }) => async (dispatch: AppDispatch) => {

    dispatch(setIsRunning(true));
    dispatch(setNeedsToRunAgain(false));

    const currentPlayer = getCurrentPlayer(gameState.inGameResource.playerActionsList);

    if (gameState.inGameTasks.didCurrentPlayerMove && currentPlayer) {

        const winningTokenCoordinates = getWinningTokenCoordinates(gameState.inGameResource.tokens, currentPlayer.tokenType, gameInput.numAdjacentTokensToWin);

        if (winningTokenCoordinates.length >= gameInput.numAdjacentTokensToWin) {
            dispatch(setIsGameOver(true));

            const newScore = currentPlayer.score + 1;

            dispatch(setPlayerScore({ playerName: currentPlayer.name, newScore }))
            dispatch(setRoundWinner({
                name: currentPlayer.name,
                tokenType: currentPlayer.tokenType,
                winningCoordinates: winningTokenCoordinates,
                score: newScore
            }));
        }
        else {
            dispatch(setPlayerWinConditionChecked({ playerName: currentPlayer.name, winConditionChecked: true }));
            dispatch(setDidCurrentPlayerMove(false));
            dispatch(setNeedsToRunAgain(true));
        }

    }
    else if(!currentPlayer) {
        gameState.inGameResource.playerActionsList.forEach(player => {
            dispatch(setPlayerDidMove({ playerName: player.name, didMove: false }));
            dispatch(setPlayerWinConditionChecked({ playerName: player.name, winConditionChecked: false }));
        });
    }

    dispatch(setIsRunning(false));
};

export default runGameplayLoopThunk;