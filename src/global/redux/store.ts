import { combineReducers, configureStore } from "@reduxjs/toolkit";
import initialUserAuthState from "../../features/auth/redux/initialUserAuthState";
import initialTicTacToeState from "../../features/tictactoe/redux/initialTicTacToeState";
import ReduxStore from "./types/ReduxStore";
import gameStateSlice from "../../features/tictactoe/redux/reducers/slices/gameStateSlice";
import gameResourcesSlice from "../../features/tictactoe/redux/reducers/slices/gameResourcesSlice";
import gameInputSlice from "../../features/tictactoe/redux/reducers/slices/gameInputSlice";
import userAuthSlice from "../../features/auth/redux/reducers/slices/userAuthSlice";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from "redux-persist";
import localizationSlice from "../../features/localization/redux/reducers/slices/localizationSlice";
import defaultLocalizationStore from "../../features/localization/redux/defaultLocalizationStore";

const initialState: ReduxStore = {
    ticTacToe: initialTicTacToeState,
    userAuth: initialUserAuthState,
    localization: defaultLocalizationStore
};


const combinedTicTacToeReducers = combineReducers({
    gameState: gameStateSlice,
    gameResources: gameResourcesSlice,
    gameInput: gameInputSlice,
});

const rootReducer = combineReducers({
    userAuth: userAuthSlice,
    ticTacToe: combinedTicTacToeReducers,
    localization: localizationSlice
});

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['userAuth']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        }).concat(thunk);
    },
    preloadedState: initialState
});

export const persistor = persistStore(store);

export default store;


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
