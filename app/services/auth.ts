
import { injectable, inject } from "inversify";
import { AxiosStatic } from 'axios';
import { setCookies, removeCookies } from 'cookies-next';
import moment from 'moment';

@injectable()
export class AuthService {

    constructor( 
        @inject('HttpClient') private http: AxiosStatic
    ) {}

    login(data: any){
        return this.http.post('auth/login', data).then((response) => {

            const { data } = response;

            const expires = moment().add(10000, 'seconds').toDate();

            setCookies('token', data.access_token,{
                expires
            })

            return Promise.resolve(response);
        });
    }
    
    async logout(){
        removeCookies('token');
    }

}