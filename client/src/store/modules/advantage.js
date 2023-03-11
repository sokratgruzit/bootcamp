import mainMixin from "@/mixins/main";
import axios from "axios";
import {SERVER_VARIABLES} from '@/variables'

export default { 
    state:{ 
        advantage: []
    }, 
    getters:{
        getAdvantage(state){
            return mainMixin.methods.translate(state.advantage);
        }
    },
    mutations:{
        updateAdvantage(state, data){
            state.advantage = data;
        },
    },
    actions:{
        async getAdvantageApi(context){ 
            const res = await axios({
                method: 'get',
                baseURL: SERVER_VARIABLES.SERVER_API + 'advantage',
            });
            if(res.status === 200){
                context.commit('updateAdvantage', res.data.results);
            }
        },
    }
}  