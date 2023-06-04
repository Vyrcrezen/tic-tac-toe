import PlayerActions from "../types/PlayerActions";

/**
 * 
 * @param playerActionList this an array of the object type which the gameState store slice uses to keep track of player data during gameplay
 * @returns one of the PlayerAction objects, which is determined to be the previous player, or undefined if the current player is the first in the list
 */
export default function getPreviousPlayer(playerActionList: PlayerActions[]) {
    // We will try to keep the previous  player inside the accumulator
    return playerActionList.reduce((previousPlayer: PlayerActions | undefined, player) => {

        // If win condition is checked, that means theat the player already finished his/her turn this round
        if (!previousPlayer && player.winConditionChecked) previousPlayer = player;
        // If this player's turn order is higher, and had his/her turn finished, then he/she is better candidate to be the previous player
        else if(previousPlayer && player.winConditionChecked && player.turnOrder > previousPlayer.turnOrder) previousPlayer = player;

        return previousPlayer;
    }, undefined);
}
