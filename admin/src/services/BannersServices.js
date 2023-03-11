import {SERVER_VARIABLES} from '@/variables'
import axios from "axios";

class BannersServices {
    static async index(){
        try{
            const res = await axios({ 
                method: 'get',
                baseURL: SERVER_VARIABLES.SERVER_API + 'banners'
            })
            return res
        }catch(e){
            return e.response;
        }
    }

    static async create(data){
        try{
            const res = await axios({ 
                method: 'post',
                baseURL: SERVER_VARIABLES.SERVER_API + 'banners',
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

    static async update(data){ 
        try{

            const res = await axios({ 
                method: 'put',
                baseURL: SERVER_VARIABLES.SERVER_API + 'banners' ,
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

    static async destroy(slug){ 
        try{
            const res = await axios({ 
                method: 'delete',
                baseURL: SERVER_VARIABLES.SERVER_API + 'banners/'  + slug,
            })
            return res
        }catch(e){
            return e.response;
        }
    }
} 
 
export default BannersServices;