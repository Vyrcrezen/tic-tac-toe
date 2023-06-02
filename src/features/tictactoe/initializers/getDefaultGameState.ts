import _ from "lodash";
import GameState from "../types/GameState";
import InitializationData from "../types/InitializationData";

export default function getDefaultGameState(Options?: { initializationData?: InitializationData }) {

    const { initializationData } = Options ?? {};
    const { isConfigFinished, isInitialized, isPlayerActionsListGenerated, playerActionsList } = initializationData ?? {};

    const defaultGameState: GameState = {
        needsToRunAgain: false,

        roundWinner: {
            name: 'null',
            tokenType: 'bipyramid',
            winningCoordinates: [],
            score: 0
        },

        isInitialized: isInitialized ?? false,
        isBeingInitialized: false,
        initializationTasks: {
            isConfigFinished: isConfigFinished ?? false,
            isPlayerActionsListGenerated: isPlayerActionsListGenerated ?? false
        },
    
        isRunning: false,
        isGameOver: false,
        inGameTasks: {
            
            didCurrentPlayerMove: false,
        },
        inGameResource: {
            playerActionsList: playerActionsList ?? [],
            tokens: [],
        },
    
        isAdvancingPostGameState: false,
        isPostGameStateFinished: false,
        postGameOptions: {
            nextState: undefined
        },
        postGameTasks: {
            isNextStateSelected: false
        }
    };

    return _.cloneDeep(defaultGameState);
}
