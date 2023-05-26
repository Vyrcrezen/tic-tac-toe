import React from "react";
import { Header } from "../../features/navigation/components/container/header";
import { Footer } from "../../features/navigation/components/container/footer";
import { Outlet } from "react-router";

export default function DefaultLayout() {
    return (
        <div className='footer-container'>
        <div>
            <Header />
            <Outlet />
        </div>
        <Footer />
    </div>
    );
}
