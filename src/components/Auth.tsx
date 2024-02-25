import React, { ReactNode, useState, useEffect } from 'react';
import {Outlet, Navigate} from 'react-router-dom';
import {login as backendLogin, logout as backendLogout, checkLogin as backendCheckLogin} from '../lib/Backend'


async function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}



export async function login(){
    const res = await backendLogin();
    if(res){
        sessionStorage.setItem('authState', 'authenticated');
    }else{
        sessionStorage.setItem('authState', 'unauthenticated');
    }

}

export async function logout(){
    const res = await backendLogout();
    if(res){
        sessionStorage.setItem('authState', 'unauthenticated');
    }
}

export enum AuthState {
    authenticated,
    unauthenticated,
    unknown
}

export function AuthGuard() 
{
    const [authState, setAuthState] = useState<AuthState>(AuthState.unknown);

    useEffect(() => {
        (async () => {
            const state = sessionStorage.getItem('authState');
            if(state){
                setAuthState(state === 'authenticated' ? AuthState.authenticated : AuthState.unauthenticated);
            }else{
                const isOk = await backendCheckLogin();
                if(isOk){
                    setAuthState(AuthState.authenticated);
                    sessionStorage.setItem('authState', 'authenticated');
                }else{
                    setAuthState(AuthState.unauthenticated);
                    sessionStorage.setItem('authState', 'unauthenticated');
                }
            }
        })()
    },[]);

    if (authState === AuthState.unknown) {
        return <h1>Loading...</h1>;
    }

    if (authState === AuthState.unauthenticated) {
        return <Navigate to="/login" />;
    }

    if (authState === AuthState.authenticated) {
        return <Outlet />;
    }
}