import PlayerActions from "./PlayerActions";

export default interface InitializationData {
    isInitialized: boolean;
    isConfigFinished: boolean;
    isPlayerActionsListGenerated: boolean;
    playerActionsList: PlayerActions[];
}
