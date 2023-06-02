import PlayerActions from "../types/PlayerActions";

export default function getPreviousPlayer(playerActionList: PlayerActions[]) {
    return playerActionList.reduce((previousPlayer: PlayerActions | undefined, player) => {

        if (!previousPlayer && player.winConditionChecked) previousPlayer = player;
        else if(previousPlayer && player.winConditionChecked && player.turnOrder > previousPlayer.turnOrder) previousPlayer = player;

        return previousPlayer;
    }, undefined);
}
