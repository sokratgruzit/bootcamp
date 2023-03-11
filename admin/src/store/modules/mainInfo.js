import axios from "axios";
import {SERVER_VARIABLES} from '@/variables'

export default { 
    state:{
        data: []
    },
    getters:{
        mainInfoData(state){
            return state.data;
        }
    },
    mutations:{
        updateMainInfoData(state, data){
            state.data = data;
        }
    },
    actions:{
        async getMainInfoData(context){ 
            const res = await axios({
                method: 'get',
                baseURL: SERVER_VARIABLES.SERVER_API + 'main-info',
            });
            if(res.status === 200){
                context.commit('updateMainInfoData', res.data);
            }
        }
    }
} 