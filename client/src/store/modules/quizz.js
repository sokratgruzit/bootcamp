import mainMixin from "@/mixins/main";
import axios from "axios";
import {SERVER_VARIABLES} from '@/variables'

export default { 
    state:{ 
        quizz: null
    }, 
    getters:{
        getQuizz(state){
            return mainMixin.methods.translate(state.quizz);
        }
    },
    mutations:{
        updateQuizz(state, data){
            state.quizz = data;
        },
    }, 
    actions:{
        async getQuizzApi(context){ 
            const res = await axios({
                method: 'get',
                baseURL: SERVER_VARIABLES.SERVER_API + 'quizz',
            });
            if(res.status === 200){
                context.commit('updateQuizz', res.data);
            }
        },
    }
}  