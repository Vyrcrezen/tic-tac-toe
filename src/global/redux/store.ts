import { combineReducers, configureStore } from "@reduxjs/toolkit";
import initialUserAuthState from "../../features/auth/redux/initialUserAuthState";
import initialTicTacToeState from "../../features/tictactoe/redux/initialTicTacToeState";
import ReduxStore from "./types/ReduxStore";
import gameStateSlice from "../../features/tictactoe/redux/reducers/slices/gameStateSlice";
import gameResourcesSlice from "../../features/tictactoe/redux/reducers/slices/gameResourcesSlice";
import gameInputSlice from "../../features/tictactoe/redux/reducers/slices/gameInputSlice";
import userAuthSlice from "../../features/auth/redux/reducers/slices/userAuthSlice";
import thunk from "redux-thunk";

const initialState: ReduxStore = {
    ticTacToe: initialTicTacToeState,
    userAuth: initialUserAuthState
};

const combinedTicTacToeReducers = combineReducers({
    gameState: gameStateSlice,
    gameResources: gameResourcesSlice,
    gameInput: gameInputSlice,
});

const store = configureStore({
    reducer: {
        userAuth: userAuthSlice,
        ticTacToe: combinedTicTacToeReducers,
    },
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware().concat(thunk);
    },
    preloadedState: initialState
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
