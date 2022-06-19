
import { injectable, inject } from "inversify";
import { AxiosStatic } from 'axios';

@injectable()
export class CustomerService {

    constructor( 
        @inject('HttpClient') private http: AxiosStatic
    ) {}

    getCustomers(){
        return this.http.get('customers');
    }    

    register(data: any){
        return this.http.post('register',data);
    }

}