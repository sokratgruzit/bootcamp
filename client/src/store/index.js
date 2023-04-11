import Vue from 'vue'
import Vuex from 'vuex'
import home_page from './modules/home_page';
import strategy from './modules/strategy';
import services from './modules/services';
import advantage from './modules/advantage';
import history from './modules/history';
import quizz from './modules/quizz'; 

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    scrolled: 0,
    visibleObjects: {
      intro_hand: true,
      socrates: false,
      techno_hand: false,
      cosmo: false,
      sphere: false,
      hello_hand: false
    },
    direction: 'down',
    scrollTo: null,
    sliderCount: 0,
    scrollTop: false,
    allowScrollStrategy: false,
  },
  mutations: {
    setObjects(state, payload) {
      let result = payload;
      let stateCopy = state;
      stateCopy.visibleObjects = result.visibleObjects;
      stateCopy.direction = result.direction;
      stateCopy.scrolled = result.scrolled;
      state = stateCopy;
    },
    deform(state, payload) {
      let result = payload;
      let stateCopy = state;
      stateCopy.sliderCount = result.sliderCount;
      state = stateCopy;
    },
    scrollTo(state, payload) {
      state.scrollTo = payload;
    },
    setStrategyScroll(state, payload) {
      state.allowScrollStrategy = payload;
    }, 
    setScrollToTop(state,payload){
      state.scrollTop = payload;
    }
  },
  actions: {
    sphereDeform({commit}, payload) {
      commit('deform', payload);
    },
    checkScrolled({commit}, payload) {
      commit('setObjects', payload);
    }
  },
  modules: {
    home_page,
    strategy,
    advantage,
    history,
    quizz,
    services
  }
})

  