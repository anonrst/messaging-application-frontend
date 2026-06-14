import ServerSideBar from '@/components/ServerSideBar';
import { EnvConfig } from '@/util/envConfg';
import React, { useLayoutEffect } from 'react'
import { Outlet, useNavigate } from 'react-router'
import "@/styles/MainLayout.css"
import { loginSuccess } from '@/util/redux/RSlices';
import type { User } from '@/types/auth.types';
import { useDispatch } from 'react-redux';

const MessagingLayout = () => {
    const dispatch = useDispatch();
    const naviage = useNavigate();
    useLayoutEffect(() => {
        if (EnvConfig.dev === "dev") {
            return;
        }
        (async () => {
            const res = await fetch(`${EnvConfig.backend}${EnvConfig.basePath}/friends/isUserLogin`, { credentials: "include" })
            console.log(res.status);
            if (res.status == 400) {
                naviage("/sign-in");
            } else if (res.status == 202) {
                const user: User = await res.json();
                dispatch(loginSuccess(user));
                
                return;
            } else {
                const refresToken = await fetch(`${EnvConfig.backend}${EnvConfig.basePath}/oauth/refresh`, { credentials: "include" });
                if (!refresToken.ok) {
                    naviage("/sign-in");
                }
                const user: User = await refresToken.json();
                dispatch(loginSuccess(user));
                return;
            }
        })();
    }, [])
    console.log("MessagingLayout()");
    return (
        <>
            <div className='mainAppContainer'>
                <ServerSideBar />
                <main className='mainApplicationLayout'>
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default MessagingLayout