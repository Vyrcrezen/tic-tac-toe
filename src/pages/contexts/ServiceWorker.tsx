import React, { useEffect } from "react";
import { Outlet } from "react-router";

/**
 * This React Component handles the registration of the service worker
 * @returns a React element, wihch consits only of an outlet
 */
export default function ServiceWorker() {

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js').then(() => {
            }).catch((error) => {
              console.warn(error);
            });
          }
    }, []);

    return (
        <Outlet />
    );
};
