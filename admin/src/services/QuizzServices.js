import {SERVER_VARIABLES} from '@/variables'
import axios from "axios";

class CommonServices {
    static async index(limit, page, route){
        try{
            const res = await axios({ 
                method: 'get',
                baseURL: SERVER_VARIABLES.SERVER_API + route+ `?limit=${limit}&page=${page}`,
            })
            return res
        }catch(e){
            return e.response;
        }
    } 

    static async create(data, route){
        try{
            const res = await axios({ 
                method: 'post',
                baseURL: SERVER_VARIABLES.SERVER_API + route,
                data: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            return res
        }catch(e){
            return e.response;
        }
    }

    static async update(data, route){ 
        try{

            const res = await axios({ 
                method: 'put',
                baseURL: SERVER_VARIABLES.SERVER_API + route ,
                data: JSON.stringify(data), 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            return res 
        }catch(e){
            return e.response;
        }
    }

    static async destroy(id, route){ 
        try{
            const res = await axios({ 
                method: 'delete',
                baseURL: SERVER_VARIABLES.SERVER_API + route  + '/' + id,
            })
            return res
        }catch(e){
            return e.response;
        }
    }


    static async updateStatus(data, route){ 
        try{

            const res = await axios({ 
                method: 'put',
                baseURL: SERVER_VARIABLES.SERVER_API + route + '/' + 'update-status',
                data: JSON.stringify(data), 
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            return res 
        }catch(e){
            return e.response;
        }
    }
} 
 
export default CommonServices;


