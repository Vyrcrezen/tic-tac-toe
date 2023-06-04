import PlayerActions from "../types/PlayerActions";

/**
 * 
 * @param playerActionList this an array of the object type which the gameState store slice uses to keep track of player data during gameplay
 * @returns one of the PlayerAction objects, which is determined to be the current player
 */
export default function getCurrentPlayer(playerActionList: PlayerActions[]) {
    // We will try to keep the current player inside the accumulator
    return playerActionList.reduce((currentPlayer: PlayerActions | undefined, player) => {

        // If win condition is not checked, that means theat the player didn't finish his/her turn this round yet
        if (!currentPlayer && !player.winConditionChecked) currentPlayer = player;
        // If this player's turn order is lower, and hasn't had his/her turn finished, then he/she is better candidate to be the current player
        else if(currentPlayer && !player.winConditionChecked && player.turnOrder < currentPlayer.turnOrder) currentPlayer = player;

        return currentPlayer;
    }, undefined);
}
