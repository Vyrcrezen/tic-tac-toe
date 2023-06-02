import PlayerActions from "../types/PlayerActions";
import getCurrentPlayer from "./getCurrentPlayer";

export default function getNextPlayer(playerActionList: PlayerActions[]) {

    const currentPlayer = getCurrentPlayer(playerActionList);

    if (!currentPlayer) return;

    return playerActionList.reduce((nextPlayer: PlayerActions | undefined, player) => {

        if (!nextPlayer && player.turnOrder > currentPlayer.turnOrder) nextPlayer = player;
        else if(nextPlayer && !player.winConditionChecked && currentPlayer.turnOrder < player.turnOrder && nextPlayer.turnOrder > player.turnOrder) nextPlayer = player;

        return nextPlayer;
    }, undefined);
}
