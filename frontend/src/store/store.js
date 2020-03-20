import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    token: null,
    userId: null,
    isUserLoggedIn: false
}

const mutations = {
    setToken(state, token){
        state.token = token
        if(token) {
            state.isUserLoggedIn = true
        }else {
            state.isUserLoggedIn = false
        }
    },
    setUser(state, user){
        state.userId = user
    }
}

const actions = {
    setToken({commit}, token) {
        commit('setToken', token)
    },
    setUser({commit}, user) {
        commit('setUser', user)
    }
}

const getters = {
    
}

export default new Vuex.Store({
    strict: true,
    state: state,
    mutations: mutations,
    actions: actions,
    getters: getters
    
})
