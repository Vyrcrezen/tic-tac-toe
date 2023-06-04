import PlayerActions from "../types/PlayerActions";

/**
 * 
 * @param playerActionList this an array of the object type which the gameState store slice uses to keep track of player data during gameplay
 * @returns one of the PlayerAction objects, which is determined to be the first player
 */
export default function getFirstPlayer(playerActionList: PlayerActions[]) {

    // We will try to keep the first player inside the accumulator
    return playerActionList.reduce((firstPlayer: PlayerActions | undefined, player) => {

        // We will always have a first player, so if it's empty, let's just make it this player
        if (!firstPlayer) firstPlayer = player;
        // Lower turn order means the player has his/her turn sooner
        else if(player.turnOrder < firstPlayer.turnOrder) firstPlayer = player;

        return firstPlayer;
    }, undefined);
}
