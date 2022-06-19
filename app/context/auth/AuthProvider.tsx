import React, { useEffect } from "react";
import Router from 'next/router';
import isJwtTokenExpired, { decode } from 'jwt-check-expiry';
import Cookies from 'universal-cookie';

export const AuthContext = React.createContext<any>(null);

export const withSecure = (Component: any) => {

    const { getInitialProps }: any = Component;
    
    Component.getInitialProps = async (ctx: any) => {

        var pageProps = {};
        const { req, res } = ctx;
        const isServer = !!req
        const cookies = new Cookies(isServer && req.headers.cookie);

        const token = cookies.get('token');

        if(!token || isJwtTokenExpired(token)){

            if (res) {

                res.writeHead(307, { Location: '/admin/login' })
                res.end();
    
            } else {
                Router.replace('/admin/login');
            }
    
        }
    
        if(getInitialProps){
            pageProps = await getInitialProps(ctx);
        }

        return pageProps;
    }

    return Component;

}

export function AuthProvider({ children }: { children: JSX.Element }) {

  useEffect(() => {}, [])

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}