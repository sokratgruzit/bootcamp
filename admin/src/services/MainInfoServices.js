import {SERVER_VARIABLES} from '@/variables'
import axios from "axios";

class MainInfoServices {
    static async update(data){ 
        try {
            const res = await axios({
                method: 'put',
                baseURL: SERVER_VARIABLES.SERVER_API + 'main-info',
                data: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            return res;
        } catch (err) {
            return err.response;
        }
    }
} 
 
export default MainInfoServices;

 