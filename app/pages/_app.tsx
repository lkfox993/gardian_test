import '../styles/globals.css'
import 'antd/dist/antd.css';

import 'reflect-metadata';
import type { AppProps } from 'next/app'
import { Provider } from 'inversify-react';
import { MittProvider } from "react-mitt";
import { AuthProvider } from '../context/auth/AuthProvider';

import { dependencyContainer } from '../services';

function App(appProps: AppProps) {

  const { Component, pageProps } = appProps;
  
  return (
    <MittProvider>
      <Provider container={dependencyContainer}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </Provider>
    </MittProvider>
  )
}

export default App;
