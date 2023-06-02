import React from "react";
import { useAppSelector } from "../../../../global/redux/hooks";
import getCurrentPlayer from "../../util/getCurrentPlayer";
import importMapAssets from "../../imports/importMapAssets";
import getNextPlayer from "../../util/getNextPlayer";
import getPreviousPlayer from "../../util/getPreviousPlayer";
import getLastPlayer from "../../util/getLastPlayer";
import getFirstPlayer from "../../util/getFirstPlayer";

export default function PlayerTurns({mapAssets}: {mapAssets?: Awaited<ReturnType<typeof importMapAssets>>}) {

    const playerActionsList = useAppSelector(state => state.ticTacToe.gameState.inGameResource.playerActionsList);
    const locale = useAppSelector(state => state.localization.data.ticTacToe.playerTurns);

    const previousPlayer = getPreviousPlayer(playerActionsList) ?? getLastPlayer(playerActionsList);
    const currentPlayer = getCurrentPlayer(playerActionsList);
    const nextPlayer = getNextPlayer(playerActionsList) ?? getFirstPlayer(playerActionsList);


    return (
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-row align-items-end vy-player-turn-container">
                <div className="d-flex flex-column align-items-center rounded vy-secondary vy-adjacent-player">
                    <small>{locale.previous}</small>
                    <h6>{previousPlayer?.name ?? 'Player'}</h6>
                    <small>{locale.score}: {previousPlayer?.score}</small>
                    <div className="d-flex flex-row  align-items-center justify-content-center">
                        {   mapAssets
                        ? <img className="h-100" src={mapAssets[previousPlayer?.tokenType ?? 'ring'].src} alt="" />
                        : <img className="h-100" src="" alt="" />
                        }
                    </div>
                </div>

                <div className="d-flex flex-column align-items-center rounded vy-secondary vy-current-player">
                    <small>{locale.current}</small>
                    <h5>{currentPlayer?.name ?? 'Player'}</h5>
                    <small>{locale.score}: {currentPlayer?.score}</small>
                    <div className="d-flex flex-row  align-items-center justify-content-center">
                        {   mapAssets
                        ? <img className="h-100" src={mapAssets[currentPlayer?.tokenType ?? 'ring'].src} alt="" />
                        : <img className="h-100" src="" alt="" />
                        }
                    </div>
                </div>

                <div className="d-flex flex-column align-items-center rounded vy-secondary vy-adjacent-player">
                    <small>{locale.next}</small>
                    <h6>{nextPlayer?.name ?? 'Player'}</h6>
                    <small>{locale.score}: {nextPlayer?.score}</small>
                    <div className="d-flex flex-row  align-items-center justify-content-center">
                        {   mapAssets
                        ? <img className="h-100" src={mapAssets[nextPlayer?.tokenType ?? 'ring'].src} alt="" />
                        : <img className="h-100" src="" alt="" />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
