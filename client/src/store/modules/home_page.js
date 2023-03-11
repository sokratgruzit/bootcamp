import mainMixin from "@/mixins/main";
import axios from "axios";
import {SERVER_VARIABLES} from '@/variables'

export default { 
    state:{ 
        home_page: null
    }, 
    getters:{
        mainPageData(state){
            return mainMixin.methods.translate(state.home_page);
        }
    },
    mutations:{
        updateHomePage(state, data){
            state.home_page = data;
        },
    },
    actions:{
        async getHomPageApi(context){ 
            const res = await axios({
                method: 'get',
                baseURL: SERVER_VARIABLES.SERVER_API + 'home-page',
            });
            if(res.status === 200){
                context.commit('updateHomePage', res.data.results[0]);
            }
        },
    }
}  