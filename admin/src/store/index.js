import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";
import {SERVER_VARIABLES} from '@/variables'
import mainInfo from './modules/mainInfo';

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        mainInfo
    },
    state:{   
        languages: '',  
    },
    getters:{
        getLanguages(state){
            return state.languages;
        }
    },
    mutations:{
        updateLanguage(state, languagies){
            state.languages = languagies;
        }
    },
    actions:{
        async getLanguage(context){ 
            const res = await axios({
                method: 'get',
                baseURL: SERVER_VARIABLES.SERVER_API + 'language',
            });
            if(res.status === 200){
                context.commit('updateLanguage', res.data.languages.list);
            }
        }
    }
})
 