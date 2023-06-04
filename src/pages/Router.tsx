import React from "react";
import { createRoot } from "react-dom/client";
import divToBody from "../global/util/divToBody";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./contents/LoginPage";
import RegisterPage from "./contents/RegisterPage";
import TicTacToePage from "./contents/TicTacToePage";
import DefaultLayout from "./layouts/DefaultLayout";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../global/styles/global.css';
import RootContext from "./contexts/RootContext";
import registerAction from "../features/auth/actions/registerAction";
import loginAction from "../features/auth/actions/loginAction";
import ErrorPage from "./contents/ErrorPage";

// This Browser Router from 'react-router-dom' is the central location of the web application
// All other pages and functionalities can be accessed here
// Currently, the application supports a local registration and login, and a Tic-Tac-Toe game
const router = createBrowserRouter([
    {
        path: '/',
        element: <RootContext />,
        errorElement: <ErrorPage />,
        children: [
            {
                element: <DefaultLayout />,
                children: [{
                    errorElement: <ErrorPage />,
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

// Create a new div inside the body Element, and attach our React root component.
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
