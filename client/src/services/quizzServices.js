import {SERVER_VARIABLES} from '@/variables'
import axios from "axios"; 

class QuizzServices {  

    static async index(){
        try{
            const res = await axios({ 
                method: 'get',
                baseURL: SERVER_VARIABLES.SERVER_API + 'quizz',
            })
            return res
        }catch(e){
            return e.response;
        }
    } 

    static async indexResults(){
        try{
            const res = await axios({ 
                method: 'get',
                baseURL: SERVER_VARIABLES.SERVER_API + 'quizz-results',
            })
            return res
        }catch(e){
            return e.response;
        } 
    } 

    static async createResult(data){
        try{
            const res = await axios({ 
                method: 'post',
                baseURL: SERVER_VARIABLES.SERVER_API + 'quizz-results',
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
 
export default QuizzServices;


