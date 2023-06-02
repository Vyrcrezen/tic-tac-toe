import PlayerActions from "../types/PlayerActions";
import PlayerInfo from "../types/PlayerInfo";

export default function generateDefaultPlayerActionsList(
  playerInfoList: PlayerInfo[]
): PlayerActions[] {
  return playerInfoList.map(
    (playerInfo) =>
      ({
        name: playerInfo.name,
        turnOrder: playerInfo.turnOrder,
        didMove: false,
        winConditionChecked: false,
        tokenType: playerInfo.tokenType,
        score: 0
      })
  );
}
