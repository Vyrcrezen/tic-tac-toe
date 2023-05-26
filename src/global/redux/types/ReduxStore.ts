import UserAuthStore from "../../../features/auth/redux/types/UserAuthStore";
import TicTacToeStore from "../../../features/tictactoe/redux/types/TicTacToeStore";

export default interface ReduxStore {
    userAuth: UserAuthStore;
    ticTacToe: TicTacToeStore
}
