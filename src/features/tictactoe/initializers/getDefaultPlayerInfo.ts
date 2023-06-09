import * as _ from 'lodash';

import PlayerInfo from "../types/PlayerInfo";

export default function getDefaultPlayerInfo() {
    const playerInfo: PlayerInfo = {
        name: 'Default',
        tokenType: 'coin',
        turnOrder: 99,
        roundWins: 0,
    };

    return _.cloneDeep(playerInfo);
}
