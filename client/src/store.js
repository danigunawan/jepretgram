import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

// Use Notify

let host = 'http://localhost:3000'
const request = axios.create({ baseURL: host })

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    isLogin: false,
    posts: [],
    myPosts: [],
    loading: false
  },
  mutations: {
    loginState (state, payload) {
      state.isLogin = payload
    },
    postState (state, payload) {
      state.posts = payload
    },
    myPostState (state, payload) {
      state.myPosts = payload
    },
    loadingState (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    checkLogin (context) {
      const token = localStorage.token
      if (token) {
        context.commit('loginState', true)
      } else {
        context.commit('loginState', false)
      }
    },
    getPosts (context) {
      context.commit('loadingState', true)
      request.get('/posts').then(res => {
        context.commit('postState', res.data.data)
        context.commit('loadingState', false)
      }).catch(err => {
        console.log(err)
      })
    },
    getMyPosts (context) {
      context.commit('loadingState', true)
      request.get('/posts/me', { headers: { token: localStorage.token } }).then(res => {
        context.commit('myPostState', res.data.data)
        context.commit('loadingState', false)
      }).catch(err => {
        console.log(err)
      })
    }
  }
})
export default store