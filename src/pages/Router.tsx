import React from "react";
import { createRoot } from "react-dom/client";
import divToBody from "../global/util/divToBody";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import LoginPage from "./contents/LoginPage";
import RegisterPage from "./contents/RegisterPage";
import TicTacToePage from "./contents/TicTacToePage";
import DefaultLayout from "./layouts/DefaultLayout";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../global/styles/global.css';
import { element } from "prop-types";
import RootContext from "./contexts/RootContext";
import registerAction from "../features/auth/actions/registerAction";
import loginAction from "../features/auth/actions/loginAction";

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootContext />,
        errorElement: <div>Error...</div>,
        children: [
            {
                element: <DefaultLayout />,
                children: [{
                    errorElement: <div>This is an error</div>,
                    children: [
                        {
                            index: true,
                            element: <TicTacToePage />
                        },
                        {
                            path: '/login',
                            element: <LoginPage />,
                            action: loginAction
                        },
                        {
                            path: '/register',
                            element: <RegisterPage />,
                            action: registerAction
                        }
                    ]
                }]
            }
        ]
    },
]);

const reactContainer = divToBody();
if (reactContainer) {
    const reactRoot = createRoot(reactContainer);
    reactRoot.render(
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}
else {
    console.log('Failed to load Router into the DOM');
}
