import React from "react";
import { Provider } from "react-redux";
import store from "../../global/redux/store";
import { Outlet } from "react-router";
import { ThemeProvider } from "@mui/material";
import defaultMuiTheme from "../../global/mui/defaultMuiTheme";

export default function RootContext() {
    return (
        <Provider store={store} >
            <ThemeProvider theme={defaultMuiTheme} >
                <Outlet />
            </ThemeProvider>
        </Provider>
    );
};
