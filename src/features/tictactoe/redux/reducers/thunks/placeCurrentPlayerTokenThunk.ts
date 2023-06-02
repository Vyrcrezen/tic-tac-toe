import { AppDispatch } from "../../../../../global/redux/store";
import GameResources from "../../../types/GameResources";
import GameState from "../../../types/GameState";
import getCurrentPlayer from "../../../util/getCurrentPlayer";
import isTokenPresentInCell from "../../../util/isTokenPresentInCell";
import { addPlayerToken, setDidCurrentPlayerMove, setPlayerDidMove } from "../slices/gameStateSlice";

const placeCurrentPlayerTokenThunk =
(event: React.MouseEvent<HTMLCanvasElement, MouseEvent>, canvas: HTMLCanvasElement, gameResources: GameResources, gameState: GameState) => (dispatch: AppDispatch) => {

    if (gameState.isGameOver) return;

    const canvasRect = canvas.getBoundingClientRect();

    const canvasX = event.clientX - canvasRect.left;
    const canvasY = event.clientY - canvasRect.top;

    const { boardDimensions: { cellSize } } = gameResources;
    const { tokens } = gameState.inGameResource;

    const cellX = Math.floor(canvasX / cellSize);
    const cellY = Math.floor(canvasY / cellSize);

    const isCellOccupied = isTokenPresentInCell({ x: cellX, y: cellY }, tokens);

    if (!isCellOccupied) {

        const currentPlayer = getCurrentPlayer(gameState.inGameResource.playerActionsList);

        if (currentPlayer) {
            dispatch(addPlayerToken({
                position: { x: cellX, y: cellY },
                type: currentPlayer.tokenType
            }));
    
            dispatch(setPlayerDidMove({ playerName: currentPlayer.name, didMove: true }));
            dispatch(setDidCurrentPlayerMove(true));
        }

    }
}

export default placeCurrentPlayerTokenThunk;