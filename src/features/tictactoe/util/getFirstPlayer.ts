import PlayerActions from "../types/PlayerActions";

export default function getFirstPlayer(playerActionList: PlayerActions[]) {
    return playerActionList.reduce((firstPlayer: PlayerActions | undefined, player) => {

        if (!firstPlayer) firstPlayer = player;
        else if(player.turnOrder < firstPlayer.turnOrder) firstPlayer = player;

        return firstPlayer;
    }, undefined);
}
