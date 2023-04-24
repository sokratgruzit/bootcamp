import mainMixin from "@/mixins/main";
import axios from "axios";
import {SERVER_VARIABLES} from '@/variables'

export default {
    state:{ 
        services: null
    }, 
    getters:{
        getServices(state){
            return mainMixin.methods.translate(state.services);
        }
    },
    mutations:{
        updateServices(state, data){
            state.services = data;
        },
    },
    actions:{
        async getServicesApi(context){ 
            const res = await axios({
                method: 'get',
                baseURL: SERVER_VARIABLES.SERVER_API + 'services',
            });
            if(res.status === 200){
                context.commit('updateServices', res.data.results);
            }
        },
    }
};