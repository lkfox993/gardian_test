
import { injectable, inject } from "inversify";
import { AxiosStatic } from 'axios';

@injectable()
export class UserService {
    
    constructor( 
        @inject('HttpClient') private http: AxiosStatic
    ) {}

    getUsers(){
        return this.http.get('users');
    }

    createUser(data: any){
        return this.http.post('users', data);
    }

    removeUser(){
        return {}
    }

}