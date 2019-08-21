import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMenuVisible: false,
    user: null
  },
  mutations: {
    TOGGLE_MENU(state, isMenuVisible) {
      state.isMenuVisible = isMenuVisible
    },
    SET_USER(state, user) {
      state.user = user
      axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
      state.isMenuVisible = true
    },
    CLEAR_USER(state) {
      state.user = null
      delete axios.defaults.headers.common['Authorization']
      state.isMenuVisible = false
    }
  },
  actions: {
    toggleMenu({ commit }, payload) {
      commit('TOGGLE_MENU', payload)
    },
    setUser({ commit }, payload) {
      commit('SET_USER', payload)
    },
    clearUser({ commit }) {
      commit('CLEAR_USER')
    }
  },
  getters: {
    isMenuVisible: state => {
      return state.isMenuVisible
    },
    user: state => {
      return state.user
    }
  }
})
