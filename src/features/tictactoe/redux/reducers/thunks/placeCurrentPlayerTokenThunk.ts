import { AppDispatch } from "../../../../../global/redux/store";
import GameResources from "../../../types/GameResources";
import GameState from "../../../types/GameState";
import getCurrentPlayer from "../../../util/getCurrentPlayer";
import isTokenPresentInCell from "../../../util/isTokenPresentInCell";
import { addPlayerToken, setDidCurrentPlayerMove, setPlayerDidMove } from "../slices/gameStateSlice";

/**
 * This thunk retrieves the cell index where which was clicked, checks if the cell already has a token, if empty it places the token and let's the gameplay loop take over
 * @param event a canvas onClick event
 * @param canvas the canvas, where the event took place
 * @param gameResources redux store slice holding the canvas' dimesions
 * @param gameState redux store slice, holding the list of the placed tokens
 * @returns 
 */
const placeCurrentPlayerTokenThunk =
(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>, canvas: HTMLCanvasElement, gameResources: GameResources, gameState: GameState) => (dispatch: AppDispatch) => {

    if (gameState.isGameOver) return;

    // Retrieve the canvas position as it is positioned inside the client DOM
    const canvasRect = canvas.getBoundingClientRect();

    // These are now relative positions to the top left of the canvas
    const canvasX = event.clientX - canvasRect.left;
    const canvasY = event.clientY - canvasRect.top;

    const { boardDimensions: { cellSize } } = gameResources;
    const { tokens } = gameState.inGameResource;

    // Get the cell index where the click event happened
    const cellX = Math.floor(canvasX / cellSize);
    const cellY = Math.floor(canvasY / cellSize);

    // See if there is already a token placed inside this cell
    const isCellOccupied = isTokenPresentInCell({ x: cellX, y: cellY }, tokens);

    if (!isCellOccupied) {
        // Get the player who placed the token, so we can get the token type
        const currentPlayer = getCurrentPlayer(gameState.inGameResource.playerActionsList);

        if (currentPlayer) {
            // Add the token to the list of tokens, at the postion
            dispatch(addPlayerToken({
                position: { x: cellX, y: cellY },
                type: currentPlayer.tokenType
            }));
    
            // Let the gameplay loop thunk take over, and see if the current player now won the game
            dispatch(setPlayerDidMove({ playerName: currentPlayer.name, didMove: true }));
            dispatch(setDidCurrentPlayerMove(true));
        }
    }
}

export default placeCurrentPlayerTokenThunk;
