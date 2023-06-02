import PlayerActions from "../types/PlayerActions";

export default function getLastPlayer(playerActionList: PlayerActions[]) {
    return playerActionList.reduce((lastPlayer: PlayerActions | undefined, player) => {

        if (!lastPlayer) lastPlayer = player;
        else if(player.turnOrder > lastPlayer.turnOrder) lastPlayer = player;

        return lastPlayer;
    }, undefined);
}
