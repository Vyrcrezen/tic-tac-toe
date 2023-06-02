import React from 'react';
import { Link, useRouteError } from "react-router-dom";


export default function ErrorPage() {
    const error = useRouteError();
    console.log(error);

    return (
        <div className='container'>
            <h1 className='text-center'>404, Not Found</h1>
            <p className='text-center'>
                You can return to the home page <Link to={"/"} >here</Link>
            </p>
        </div>
    );
}