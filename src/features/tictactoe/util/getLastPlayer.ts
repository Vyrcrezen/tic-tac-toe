import PlayerActions from "../types/PlayerActions";

/**
 * 
 * @param playerActionList this an array of the object type which the gameState store slice uses to keep track of player data during gameplay
 * @returns one of the PlayerAction objects, which is determined to be the last player
 */
export default function getLastPlayer(playerActionList: PlayerActions[]) {
    // We will try to keep the last player inside the accumulator
    return playerActionList.reduce((lastPlayer: PlayerActions | undefined, player) => {

        // We will always have a last player, so if it's empty, let's just make it this player
        if (!lastPlayer) lastPlayer = player;
        // Higher turn order means the player has his/her turn later
        else if(player.turnOrder > lastPlayer.turnOrder) lastPlayer = player;

        return lastPlayer;
    }, undefined);
}
