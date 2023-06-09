import React from "react";
import { Provider } from "react-redux";
import store, { persistor } from "../../global/redux/store";
import { Outlet } from "react-router";
import { ThemeProvider } from "@mui/material";
import defaultMuiTheme from "../../global/mui/defaultMuiTheme";
import { PersistGate } from "redux-persist/integration/react" ;
import registerNewUser from "../../features/auth/util/registerNewUser";

/**
 * This React Component encapsulates all context used by the application
 * @returns a React element, which includes all necessary global context with an Outlet inside
 */
export default function RootContext() {

    registerNewUser({ email: 'test@email.com', username: 'test', password: 'test1234' })

    return (
        <Provider store={store} >
            <PersistGate loading={null} persistor={persistor} >
                <ThemeProvider theme={defaultMuiTheme} >
                    <Outlet />
                </ThemeProvider>
            </PersistGate>
        </Provider>
    );
};
