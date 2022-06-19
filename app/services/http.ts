
import axios from 'axios';
import Router from 'next/router';
import { injectable } from 'inversify';
import { AxiosStatic } from 'axios';
import { getCookie } from 'cookies-next';

@injectable()
export class HttpClient {

    constructor() {
        
        const instance = axios.create({
            baseURL: 'http://localhost:3000/api',
            timeout: 10000
        });

        instance.interceptors.request.use(
            (config) => {
              const token = getCookie('token');
             
              if(token){
                config.headers['Authorization'] = `Bearer ${token}`;
              }

              return config;
            },
            (error) => Promise.reject(error),
        );

        instance.interceptors.response.use((response) =>{
            return response
           }, (error) => {

            if (error.response.status === 401) {
                Router.push('/admin/login');
            }
            return Promise.reject(error.response.data)
        })


        return instance;
    }

}