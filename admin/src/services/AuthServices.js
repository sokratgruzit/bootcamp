import Vue from 'vue'
import axios from "axios";
const jwt = require('jsonwebtoken'); 



class AuthServices {
    static maxAge(){
        //day * hours * minutes * seconds
        return 3 * 60 * 60;
    }

    static createToken(id, roles){
        const payload = {
            id,
            roles
        }
        const token = jwt.sign(payload, process.env.VUE_APP_SECRET_KEY, {
            expiresIn: this.maxAge(),
        });
        return token;
    };

    static async login(data){ 
        try {
            const res = await axios({
                method: 'post',
                baseURL: Vue.prototype.$SERVER_API_AUTH + 'login',
                data: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                } 
            }); 
            const token = this.createToken(res.data.user._id, res.data.user.roles);
            Vue.$cookies.set("user", token, this.maxAge() * 1000 )
            return res;
        } catch (err) {
            return err.response;
        }
    }

    static async signup(data){
        try {
            const res = await axios({
                method: 'post',
                baseURL: Vue.prototype.$SERVER_API_AUTH + 'sign-up', 
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
 
export default AuthServices;

