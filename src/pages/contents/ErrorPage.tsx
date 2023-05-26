import React from 'react';
import { useRouteError } from "react-router-dom";


export default function ErrorPage() {
    const error = useRouteError();
    console.log(error);

    return (
        <div>
            <h1>An unexpected error occured</h1>
            <p>
                Unfortuntely, there was an error.
            </p>
        </div>
    );
}