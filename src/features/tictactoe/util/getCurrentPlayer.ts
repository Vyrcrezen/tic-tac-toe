import PlayerActions from "../types/PlayerActions";

export default function getCurrentPlayer(playerActionList: PlayerActions[]) {
    return playerActionList.reduce((currentPlayer: PlayerActions | undefined, player) => {

        if (!currentPlayer && !player.winConditionChecked) currentPlayer = player;
        else if(currentPlayer && !player.winConditionChecked && player.turnOrder < currentPlayer.turnOrder) currentPlayer = player;

        return currentPlayer;
    }, undefined);
}
