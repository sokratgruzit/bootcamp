import mainMixin from "@/mixins/main";
import axios from "axios";
import {SERVER_VARIABLES} from '@/variables'

export default { 
    state:{ 
        strategy: null
    }, 
    getters:{
        getStrategy(state){
            return mainMixin.methods.translate(state.strategy);
        }
    },
    mutations:{
        updateStrategy(state, data){
            state.strategy = data;
        },
    },
    actions:{
        async getStrategyApi(context){ 
            const res = await axios({
                method: 'get',
                baseURL: SERVER_VARIABLES.SERVER_API + 'strategy',
            });
            if(res.status === 200){
                context.commit('updateStrategy', res.data.results);
            }
        },
    }
}  