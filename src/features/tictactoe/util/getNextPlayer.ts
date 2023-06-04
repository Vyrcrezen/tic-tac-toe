import PlayerActions from "../types/PlayerActions";
import getCurrentPlayer from "./getCurrentPlayer";

/**
 * 
 * @param playerActionList this an array of the object type which the gameState store slice uses to keep track of player data during gameplay
 * @returns one of the PlayerAction objects, which is determined to be the next player, or undefined if the current player is the last one
 */
export default function getNextPlayer(playerActionList: PlayerActions[]) {

    const currentPlayer = getCurrentPlayer(playerActionList);

    if (!currentPlayer) return;

    // We will try to keep the next player inside the accumulator
    return playerActionList.reduce((nextPlayer: PlayerActions | undefined, player) => {

        // We need players who have a larger turn order than the current player
        if (!nextPlayer && player.turnOrder > currentPlayer.turnOrder) nextPlayer = player;
        // If this player comes after the current player, but sooner than the one stored in the accumulator
        else if(nextPlayer && !player.winConditionChecked && currentPlayer.turnOrder < player.turnOrder && nextPlayer.turnOrder > player.turnOrder) nextPlayer = player;

        return nextPlayer;
    }, undefined);
}
