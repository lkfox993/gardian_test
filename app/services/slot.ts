
import { injectable, inject } from "inversify";
import { AxiosStatic } from 'axios';

@injectable()
export class SlotService {

    constructor( 
        @inject('HttpClient') private http: AxiosStatic
    ) {}

    getSlots(){
        return this.http.get('slots');
    }

    createSlot(data: any){
        return this.http.post('slots', data);
    }

    deleteSlot(id: string){
        return {}
    }

}