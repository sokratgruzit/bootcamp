import mainMixin from "@/mixins/main";
import axios from "axios";
import {SERVER_VARIABLES} from '@/variables'

export default { 
    state:{ 
        history: null
    }, 
    getters:{
        getHistory(state){
            return mainMixin.methods.translate(state.history);
        }
    },
    mutations:{
        updateHistory(state, data){
            state.history = data;
        },
    },
    actions:{
        async getHistoryApi(context){ 
            const res = await axios({
                method: 'get',
                baseURL: SERVER_VARIABLES.SERVER_API + 'history',
            });
            if(res.status === 200){
                context.commit('updateHistory', res.data.results);
            }
        },
    }
}  